import { describe, it, expect, beforeEach } from 'vitest'

import { chunked, chunkSizeOf, csvChunks, splitCsvRows } from '../src/api/utils.js'
import { isFlatObject, isPointValue, jsonImportRequiresLabel } from '../src/common/utils.js'
import { buildSchema, buildSchemaMarkdown } from '../src/direct/schema.js'
import type { DirectEngine } from '../src/direct/engine.js'
import type { HttpClientInterface, HttpClientResponseInterface } from '../src/network/HttpClient.js'
import { responseError } from '../src/network/errors.js'
import { CatalogCheckError, DirectModeError, UniqueConstraintError } from '../src/sdk/errors.js'
import { RushDB, initSDK } from '../src/sdk/sdk.js'
import { distanceFrom, point, withinBox, withinRadius } from '../src/sdk/spatial.js'
import type { SearchQuery } from '../src/types/query.js'

// Features of RushDB 3.0.14: typed temporal and point values, spatial filters,
// the catalog check (`warnings`, `context.check`), unique indexes, ingest
// chunking and reading your own writes from an eventual text index.

const RECORD = { id: '0190a7e2-0000-7000-8000-000000000001', label: 'Cafe', properties: { name: 'Kaffeehaus' } }
const BERLIN = { type: 'Point' as const, coordinates: [13.405, 52.52] as [number, number] }
const WARNING = {
  kind: 'unknownValue',
  labels: ['Person'],
  property: 'city',
  value: 'berlin',
  suggestions: [{ value: 'Berlin', reason: 'spelling' }]
}
const FLAGS_3014 = ['typedTemporalValues', 'pointValues', 'spatialFilters', 'uniqueIndexes', 'catalogCheck']

function fakeResponse(body: any, status = 200): HttpClientResponseInterface {
  return {
    getHeaders: () => ({}),
    getRawResponse: () => body,
    getStatusCode: () => status,
    toJSON: async () => body,
    toStream: () => undefined
  } as HttpClientResponseInterface
}

type Answer = { body: any; status?: number }
let calls: Array<{ url: string; body: any }>

/** A fake server: `answer` gets each request body and returns the response. */
function useServer(answer: (body: any, url: string) => Answer) {
  calls = []
  const client: HttpClientInterface = {
    makeRequest: async (url, config) => {
      const body = config.requestData as any
      calls.push({ url, body })
      const { body: responseBody, status } = answer(body, url)
      return fakeResponse(responseBody, status)
    }
  }
  initSDK(client)
}

/** A fake engine answering each operation; `flags` is its `describe.capabilities`. */
function useEngine(answer: (operation: any) => any, flags: string[] = FLAGS_3014) {
  useServer((envelope) => {
    const operation = envelope.operation
    if (operation.kind === 'describe' && operation.describe.kind === 'capabilities') {
      return { body: { protocolVersion: 1, response: { kind: 'capabilities', capabilities: flags } } }
    }
    const out = answer(operation)
    return out && 'envelope' in out ? { body: out.envelope, status: out.status } : { body: { protocolVersion: 1, response: out } }
  })
}

const directDb = () => new RushDB('ENGINE-SECRET', { direct: true, engineUrl: 'http://engine:3000' })
const cloudDb = (options?: any) => new RushDB('TOKEN', { url: 'https://cloud.test/api/v1', options })
const engineCalls = () => calls.map((call) => call.body).filter((body) => body.operation.describe?.kind !== 'capabilities')

// ── errors ──────────────────────────────────────────────────────────────────

describe('typed errors', () => {
  it('a unique-index conflict is a UniqueConstraintError with its details', () => {
    const error = responseError(409, {
      protocolVersion: 1,
      error: {
        code: 'conflict',
        retryable: false,
        message: 'unique constraint conflict on `User`.`email`',
        details: { label: 'User', property: 'email', recordId: 'r-1' }
      }
    })
    expect(error).toBeInstanceOf(UniqueConstraintError)
    expect(error).toBeInstanceOf(Error)
    expect(error).toMatchObject({
      status: 409,
      code: 'conflict',
      retryable: false,
      label: 'User',
      property: 'email',
      recordId: 'r-1',
      details: { label: 'User', property: 'email', recordId: 'r-1' }
    })
    expect(error.message).toBe('409 unique constraint conflict on `User`.`email`')
  })

  it('reads the details of a RushDB Cloud error body', () => {
    const error = responseError(409, {
      statusCode: 409,
      message: 'unique constraint conflict',
      code: 'conflict',
      details: { label: 'User', property: 'email', recordId: 'r-1' }
    })
    expect(error).toBeInstanceOf(UniqueConstraintError)
    expect(error).toMatchObject({ code: 'conflict', recordId: 'r-1' })
  })

  it('another 409 stays a plain error', () => {
    const error = responseError(409, { protocolVersion: 1, error: { code: 'conflict', message: 'record exists' } })
    expect(error).not.toBeInstanceOf(UniqueConstraintError)
    expect(error).toMatchObject({ status: 409, code: 'conflict' })
  })

  it('a strict catalog check refusal is a CatalogCheckError with the warnings', () => {
    const error = responseError(400, {
      protocolVersion: 1,
      error: { code: 'invalid_request', message: 'catalog check failed', details: { warnings: [WARNING] } }
    })
    expect(error).toBeInstanceOf(CatalogCheckError)
    expect((error as unknown as CatalogCheckError).warnings).toEqual([WARNING])
    expect(error).toMatchObject({ status: 400, code: 'invalid_request', details: { warnings: [WARNING] } })
  })
})

// ── catalog check ───────────────────────────────────────────────────────────

describe('catalog check, direct mode', () => {
  it('sends context.check in the envelope, not in the query document', async () => {
    useEngine(() => ({ kind: 'records', records: [], total: 0 }))
    await directDb().records.find({ labels: ['Person'], where: { city: 'berlin' }, context: { check: 'strict' } })
    const [envelope] = engineCalls()
    expect(envelope.context).toEqual({ check: 'strict' })
    expect(envelope.operation.query.query).not.toHaveProperty('context')
    expect(envelope.operation.query.query.predicate).toEqual({ city: 'berlin' })
  })

  it('sends no context and asks no capabilities when check is unset', async () => {
    useEngine(() => ({ kind: 'records', records: [], total: 0 }))
    await directDb().records.find({ labels: ['Person'] })
    expect(calls).toHaveLength(1)
    expect(calls[0].body).not.toHaveProperty('context')
  })

  it('returns the envelope warnings as catalogWarnings', async () => {
    useEngine(() => ({
      envelope: { protocolVersion: 1, response: { kind: 'records', records: [], total: 0 }, warnings: [WARNING] }
    }))
    const result = await directDb().records.find({ labels: ['Person'], where: { city: 'berlin' } })
    expect(result.catalogWarnings).toEqual([WARNING])
    expect(result.warnings).toBeUndefined()
  })

  it('has no catalogWarnings when nothing is missing', async () => {
    useEngine(() => ({ kind: 'records', records: [RECORD], total: 1 }))
    const result = await directDb().records.find({ labels: ['Cafe'] })
    expect(result.catalogWarnings).toBeUndefined()
  })

  it('carries warnings of an aggregate query', async () => {
    useEngine(() => ({
      envelope: { protocolVersion: 1, response: { kind: 'rows', rows: [{ count: 0 }], total: 1 }, warnings: [WARNING] }
    }))
    const result = await directDb().records.find({
      labels: ['Person'],
      where: { city: 'berlin' },
      select: { count: { $count: '*' } }
    })
    expect(result.catalogWarnings).toEqual([WARNING])
  })

  it('puts property-values warnings on the values data', async () => {
    useEngine(() => ({
      envelope: {
        protocolVersion: 1,
        response: { kind: 'propertyValues', property: 'city', values: [] },
        warnings: [WARNING]
      }
    }))
    const response = await directDb().properties.values('city', { labels: ['Person'], context: { check: 'warn' } })
    expect(response.data.catalogWarnings).toEqual([WARNING])
    expect(engineCalls()[0].context).toEqual({ check: 'warn' })
  })

  it('refuses context.check on an engine without catalogCheck, before sending the query', async () => {
    useEngine(() => ({ kind: 'records', records: [], total: 0 }), [])
    await expect(directDb().records.find({ labels: ['Person'], context: { check: 'strict' } })).rejects.toBeInstanceOf(
      DirectModeError
    )
    expect(engineCalls()).toHaveLength(0)
  })

  it('throws CatalogCheckError for a strict refusal', async () => {
    useEngine(() => ({
      status: 400,
      envelope: {
        protocolVersion: 1,
        error: { code: 'invalid_request', message: 'catalog check failed', details: { warnings: [WARNING] } }
      }
    }))
    await expect(
      directDb().records.find({ labels: ['Person'], where: { city: 'berlin' }, context: { check: 'strict' } })
    ).rejects.toMatchObject({ name: 'CatalogCheckError', warnings: [WARNING] })
  })
})

describe('catalog check, RushDB Cloud', () => {
  it('sends context in the search body only when set, and reads warnings beside data', async () => {
    useServer(() => ({ body: { success: true, data: [], total: 0, warnings: [WARNING] } }))
    const db = cloudDb()
    const result = await db.records.find({ labels: ['Person'], where: { city: 'berlin' }, context: { check: 'warn' } })
    expect(calls[0].body.context).toEqual({ check: 'warn' })
    expect(result.catalogWarnings).toEqual([WARNING])

    await db.records.find({ labels: ['Person'] })
    expect(calls[1].body).not.toHaveProperty('context')
  })

  it('ignores warnings that are not catalog findings', async () => {
    useServer(() => ({ body: { success: true, data: [], total: 0, warnings: ['an assumption'] } }))
    const result = await cloudDb().records.find({ labels: ['Person'] })
    expect(result.catalogWarnings).toBeUndefined()
  })
})

// ── spatial ─────────────────────────────────────────────────────────────────

describe('spatial queries', () => {
  it('passes $within and $distance to the engine unchanged', async () => {
    useEngine(() => ({ kind: 'records', records: [RECORD], total: 1 }))
    await directDb().records.find({
      labels: ['Cafe'],
      where: { location: { $within: { center: BERLIN, meters: 2000 } } },
      orderBy: { location: { $distance: BERLIN } },
      limit: 5
    })
    const query = engineCalls()[0].operation.query.query
    expect(query.predicate).toEqual({ location: { $within: { center: BERLIN, meters: 2000 } } })
    expect(query.order).toEqual({ location: { $distance: BERLIN } })
  })

  it('accepts a box', async () => {
    useServer(() => ({ body: { success: true, data: [], total: 0 } }))
    const box: [typeof BERLIN, typeof BERLIN] = [
      { type: 'Point', coordinates: [13.3, 52.45] },
      { type: 'Point', coordinates: [13.5, 52.55] }
    ]
    await cloudDb().records.find({ labels: ['Cafe'], where: { location: { $within: { box } } } })
    expect(calls[0].body.where).toEqual({ location: { $within: { box } } })
  })
})

describe('point values', () => {
  it('are property values, not nested records', () => {
    expect(isPointValue(BERLIN)).toBe(true)
    expect(isPointValue({ type: 'Point', coordinates: [1, 2, 3], crs: 'cartesian-3d' })).toBe(true)
    expect(isPointValue({ type: 'Point', coordinates: [1] })).toBe(false)
    expect(isPointValue({ type: 'Point', coordinates: [1, 2], name: 'x' })).toBe(false)
    expect(isPointValue({ type: 'LineString', coordinates: [1, 2] })).toBe(false)
    expect(isFlatObject({ name: 'Mitte', location: BERLIN, stops: [BERLIN, BERLIN] })).toBe(true)
    expect(isFlatObject({ name: 'Mitte', owner: { name: 'Ada' } })).toBe(false)
    expect(jsonImportRequiresLabel({ CAFE: BERLIN })).toBe(true)
  })

  it('can be written with create and createMany', async () => {
    useServer(() => ({ body: { success: true, data: { __id: 'r', __label: 'Cafe' } } }))
    const db = cloudDb()
    await db.records.create({ label: 'Cafe', data: { name: 'Mitte', location: BERLIN } })
    await db.records.createMany({ label: 'Cafe', data: [{ name: 'Mitte', location: BERLIN }] })
    expect(calls.map((call) => call.body.data)).toEqual([
      { name: 'Mitte', location: BERLIN },
      [{ name: 'Mitte', location: BERLIN }]
    ])
  })
})

// ── unique indexes ──────────────────────────────────────────────────────────

describe('db.indexes', () => {
  it('creates a unique index with kind unique and a default name', async () => {
    useEngine((operation) =>
      operation.kind === 'describe' ?
        { kind: 'indexes', indexes: [] }
      : { kind: 'index', index: { ...operation.index.definition, state: 'building' } }
    )
    const { data } = await directDb().indexes.create({ label: 'User', property: 'email', unique: true })
    const created = engineCalls().find((body) => body.operation.kind === 'index')
    expect(created.operation.index.definition).toEqual({
      name: 'User.email.unique',
      label: 'User',
      property: 'email',
      kind: 'unique'
    })
    expect(data).toEqual({
      name: 'User.email.unique',
      label: 'User',
      property: 'email',
      kind: 'unique',
      unique: true,
      status: 'building'
    })
  })

  it('refuses a unique index on an engine without uniqueIndexes', async () => {
    useEngine(() => ({ kind: 'indexes', indexes: [] }), [])
    await expect(directDb().indexes.create({ label: 'User', property: 'email', unique: true })).rejects.toBeInstanceOf(
      DirectModeError
    )
  })

  it('lists ordered and unique indexes, not text ones', async () => {
    useEngine(() => ({
      kind: 'indexes',
      indexes: [
        { kind: 'ordered', name: 'a', label: 'User', property: 'age', state: 'ready' },
        { kind: 'unique', name: 'b', label: 'User', property: 'email', state: 'ready' },
        { kind: 'text', name: 'c', label: 'User', property: 'bio', state: 'ready' }
      ]
    }))
    const { data } = await directDb().indexes.find()
    expect(data.map((index) => [index.name, index.kind, index.unique])).toEqual([
      ['a', 'ordered', false],
      ['b', 'unique', true]
    ])
  })

  it('sends kind over REST to RushDB Cloud', async () => {
    useServer(() => ({ body: { success: true, data: {} } }))
    const db = cloudDb()
    await db.indexes.create({ label: 'User', property: 'email', unique: true, name: 'user_email' })
    await db.indexes.create({ label: 'User', property: 'age' })
    await db.indexes.delete('user_email')
    expect(calls.map((call) => [call.url, call.body])).toEqual([
      ['https://cloud.test/api/v1/indexes', { label: 'User', property: 'email', name: 'user_email', kind: 'unique' }],
      ['https://cloud.test/api/v1/indexes', { label: 'User', property: 'age', kind: 'ordered' }],
      ['https://cloud.test/api/v1/indexes/user_email', undefined]
    ])
  })

  it('a write a unique index refuses throws UniqueConstraintError', async () => {
    useEngine(() => ({
      status: 409,
      envelope: {
        protocolVersion: 1,
        error: {
          code: 'conflict',
          message: 'unique constraint conflict',
          details: { label: 'User', property: 'email', recordId: 'r-1' }
        }
      }
    }))
    await expect(directDb().records.create({ label: 'User', data: { email: 'a@b.c' } })).rejects.toMatchObject({
      name: 'UniqueConstraintError',
      label: 'User',
      property: 'email',
      recordId: 'r-1'
    })
  })
})

// ── ingest chunking ─────────────────────────────────────────────────────────

const rows = (n: number) => Array.from({ length: n }, (_, i) => ({ n: i }))
const ingestAnswer = (body: any) => ({
  body: { success: true, data: body.data.map((row: any) => ({ __id: `id-${row.n}`, __label: 'Row', ...row })), total: body.data.length }
})

describe('ingest chunking', () => {
  beforeEach(() => useServer((body) => ingestAnswer(body)))

  it('sends one all-or-nothing request by default, however large', async () => {
    const result = await cloudDb().records.createMany({ label: 'Row', data: rows(12001), options: { returnResult: true } })
    expect(calls.map((call) => call.body.data.length)).toEqual([12001])
    expect(result.total).toBe(12001)
  })

  it('splits createMany by chunkSize', async () => {
    const result = await cloudDb().records.createMany({
      label: 'Row',
      data: rows(12001),
      options: { returnResult: true },
      chunkSize: 5000
    })
    expect(calls.map((call) => call.body.data.length)).toEqual([5000, 5000, 2001])
    expect(result.total).toBe(12001)
    expect(result.data).toHaveLength(12001)
    expect(result.data[12000].data.n).toBe(12000)
  })

  it('keeps vectors with their rows', async () => {
    await cloudDb().records.createMany({
      label: 'Row',
      data: rows(3),
      vectors: [[{ propertyName: 'v', vector: [0] }], [], [{ propertyName: 'v', vector: [2] }]],
      chunkSize: 2
    })
    expect(calls.map((call) => call.body.data)).toEqual([
      [{ n: 0, $vectors: [{ propertyName: 'v', vector: [0] }] }, { n: 1 }],
      [{ n: 2, $vectors: [{ propertyName: 'v', vector: [2] }] }]
    ])
  })

  it('takes the chunk size from the call, then the client, and 0 turns it off', async () => {
    await cloudDb({ ingestChunkSize: 4 }).records.createMany({ label: 'Row', data: rows(10) })
    expect(calls.map((call) => call.body.data.length)).toEqual([4, 4, 2])
    calls.length = 0
    await cloudDb({ ingestChunkSize: 4 }).records.createMany({ label: 'Row', data: rows(10), chunkSize: 0 })
    expect(calls.map((call) => call.body.data.length)).toEqual([10])
  })

  it('sends one request when the write fits', async () => {
    await cloudDb().records.createMany({ label: 'Row', data: rows(5000), chunkSize: 5000 })
    expect(calls).toHaveLength(1)
  })

  it('splits importJson arrays by the nested or the flat chunk size', async () => {
    const options = { ingestChunkSize: 5000, nestedIngestChunkSize: 10000 }
    const nested = Array.from({ length: 20001 }, (_, n) => ({ n, author: { name: 'A' } }))
    await cloudDb(options).records.importJson({ label: 'Row', data: nested })
    expect(calls.map((call) => call.body.data.length)).toEqual([10000, 10000, 1])
    calls.length = 0
    await cloudDb(options).records.importJson({ label: 'Row', data: rows(5001) })
    expect(calls.map((call) => call.body.data.length)).toEqual([5000, 1])
    calls.length = 0
    await cloudDb().records.importJson({ label: 'Row', data: nested })
    expect(calls).toHaveLength(1)
  })

  it('says which chunks were written when one fails', async () => {
    let n = 0
    useServer((body) =>
      ++n === 3 ?
        { status: 503, body: { statusCode: 503, message: 'unavailable', retryable: true } }
      : ingestAnswer(body)
    )
    const error = await cloudDb()
      .records.createMany({ label: 'Row', data: rows(10), chunkSize: 3 })
      .catch((e) => e)
    expect(error).toMatchObject({
      status: 503,
      retryable: true,
      ingest: { chunks: 4, failedChunk: 2, completedChunks: 2, completedRecords: 6, inTransaction: false }
    })
    expect(calls).toHaveLength(3)
  })

  it('adds no chunk report to a single request', async () => {
    useServer(() => ({ status: 503, body: { statusCode: 503, message: 'unavailable' } }))
    const error = await cloudDb().records.createMany({ label: 'Row', data: rows(10) }).catch((e) => e)
    expect(error).not.toHaveProperty('ingest')
  })

  it('sends a label-less container as it is', async () => {
    useServer(() => ({ body: { success: true, data: true } }))
    await cloudDb().records.importJson({ data: { ROW: rows(20000) } })
    expect(calls).toHaveLength(1)
  })

  it('passes the transaction to every chunk', async () => {
    useServer((body) => ingestAnswer(body))
    await cloudDb().records.createMany({ label: 'Row', data: rows(3), chunkSize: 2 }, 'tx-1')
    expect(calls).toHaveLength(2)
  })
})

describe('CSV chunking', () => {
  it('splits rows outside quotes only', () => {
    expect(splitCsvRows('a,b\r\n"x\r\ny",1\r\nz,2')).toEqual({ rows: ['a,b', '"x\r\ny",1', 'z,2'], newline: '\r\n' })
    expect(splitCsvRows('a\n"say ""hi""\nthere"\nb\n')).toEqual({ rows: ['a', '"say ""hi""\nthere"', 'b'], newline: '\n' })
    expect(splitCsvRows('a\n"x\\"\ny"\nb', '"', '\\')).toEqual({ rows: ['a', '"x\\"\ny"', 'b'], newline: '\n' })
  })

  it('repeats the header, names the line break and slices vectors', () => {
    const data = 'name,bio\r\nA,"line\r\nbreak"\r\nB,x\r\nC,y\r\n'
    const vectors = [[{ propertyName: 'v', vector: [1] }], [], [{ propertyName: 'v', vector: [3] }]]
    const chunks = csvChunks({ label: 'P', data, vectors }, 2)
    expect(chunks.map((chunk) => chunk.data)).toEqual(['name,bio\r\nA,"line\r\nbreak"\r\nB,x', 'name,bio\r\nC,y'])
    expect(chunks.map((chunk) => chunk.parseConfig)).toEqual([{ newline: '\r\n' }, { newline: '\r\n' }])
    expect(chunks.map((chunk) => chunk.vectors)).toEqual([vectors.slice(0, 2), vectors.slice(2)])
  })

  it('has no header row to repeat when header is false', () => {
    const chunks = csvChunks({ data: 'a\nb\nc', parseConfig: { header: false } }, 2)
    expect(chunks.map((chunk) => chunk.data)).toEqual(['a\nb', 'c'])
  })

  it('sends a file with blank lines and vectors whole', () => {
    const params = { data: 'a\n1\n\n2\n3', vectors: [[], [], []] }
    expect(csvChunks(params, 2)).toEqual([params])
  })

  it('importCsv sends one request per chunk', async () => {
    useServer(() => ({ body: { success: true, data: true } }))
    const data = ['n', ...Array.from({ length: 7 }, (_, i) => String(i))].join('\n')
    await cloudDb().records.importCsv({ label: 'Row', data, chunkSize: 3 })
    expect(calls.map((call) => call.body.data)).toEqual(['n\n0\n1\n2', 'n\n3\n4\n5', 'n\n6'])
    expect(calls.every((call) => !('chunkSize' in call.body))).toBe(true)
  })

  it('sizes and splits', () => {
    expect(chunkSizeOf(undefined, undefined)).toBe(Infinity)
    expect(chunkSizeOf(undefined, 7)).toBe(7)
    expect(chunkSizeOf(3, 7)).toBe(3)
    expect(chunkSizeOf(0, 7)).toBe(Infinity)
    expect(chunked([], 2)).toEqual([[]])
    expect(chunked([1, 2, 3], 2)).toEqual([[1, 2], [3]])
  })
})

// ── reading your own writes ─────────────────────────────────────────────────

describe('waitForPending', () => {
  const pendingAnswers = (pending: number[]) => {
    let i = 0
    useServer(() => {
      const p = pending[Math.min(i++, pending.length - 1)]
      return { body: { success: true, data: [], total: 0, meta: { textSearch: { matches: 0, pending: p } } } }
    })
  }

  it('repeats a text search while changes are pending', async () => {
    pendingAnswers([3, 1, 0])
    const result = await cloudDb().records.textSearch({ query: 'dune', waitForPending: { intervalMs: 1 } })
    expect(calls).toHaveLength(3)
    expect(result.textSearch?.pending).toBe(0)
    expect(calls.every((call) => !('waitForPending' in call.body))).toBe(true)
  })

  it('searches once without it', async () => {
    pendingAnswers([3])
    const result = await cloudDb().records.textSearch({ query: 'dune' })
    expect(calls).toHaveLength(1)
    expect(result.textSearch?.pending).toBe(3)
  })

  it('returns the last result when the timeout passes', async () => {
    pendingAnswers([5])
    const result = await cloudDb().records.textSearch({ query: 'dune', waitForPending: { timeoutMs: 30, intervalMs: 5 } })
    expect(result.textSearch?.pending).toBe(5)
    expect(calls.length).toBeGreaterThan(1)
  })

  it('applies to a hybrid search', async () => {
    pendingAnswers([1, 0])
    await cloudDb().records.vectorSearch({
      index: 'v',
      queryVector: [1],
      text: { query: 'dune' },
      waitForPending: { intervalMs: 1 }
    })
    expect(calls).toHaveLength(2)
  })
})

// ── direct-mode schema ──────────────────────────────────────────────────────

describe('direct-mode schema with the new types', () => {
  const engineWith = (properties: any[]) =>
    ({
      execute: async (operation: any) =>
        operation.describe.kind === 'schema' ?
          { schema: { labels: [{ name: 'Event', recordsCount: 2 }], properties, relationships: [] } }
        : { indexes: [] }
    }) as unknown as DirectEngine

  it('shows ranges for every ordered type and none for points', async () => {
    const schema = await buildSchema(
      engineWith([
        { id: '1', label: 'Event', name: 'at', type: 'datetime', min: '2024-05-01T12:30:00+02:00', max: '2024-05-02T00:00:00Z' },
        { id: '2', label: 'Event', name: 'day', type: 'date', min: '2024-05-01', max: '2024-05-03' },
        { id: '3', label: 'Event', name: 'opens', type: 'localtime', min: '08:00:00', max: '10:30:00.5' },
        { id: '4', label: 'Event', name: 'local', type: 'localdatetime', min: '2024-05-01T10:30:00', max: '2024-05-01T11:00:00' },
        { id: '5', label: 'Event', name: 'lasts', type: 'duration', min: 'PT90M', max: 'P1DT2H' },
        { id: '6', label: 'Event', name: 'where', type: 'point' }
      ]),
      undefined,
      (index) => index
    )
    const props = schema[0].properties
    // A datetime keeps the offset it was written with.
    expect(props[0].min).toBe('2024-05-01T12:30:00+02:00')
    const md = buildSchemaMarkdown(schema)
    expect(md).toContain('| `at` | datetime | `2024-05-01T12:30:00+02:00`..`2024-05-02T00:00:00Z` |')
    expect(md).toContain('| `day` | date | `2024-05-01`..`2024-05-03` |')
    expect(md).toContain('| `opens` | localtime | `08:00:00`..`10:30:00.5` |')
    expect(md).toContain('| `local` | localdatetime | `2024-05-01T10:30:00`..`2024-05-01T11:00:00` |')
    expect(md).toContain('| `lasts` | duration | `PT90M`..`P1DT2H` |')
    expect(md).toContain('| `where` | point | — |')
  })

  it('shows epoch-millisecond datetime bounds of older engines as instants', async () => {
    const schema = await buildSchema(
      engineWith([{ id: '1', label: 'Event', name: 'at', type: 'datetime', min: 1714559400000, max: 1714559400000 }]),
      undefined,
      (index) => index
    )
    expect(schema[0].properties[0].min).toBe('2024-05-01T10:30:00.000Z')
  })
})

describe('spatial helpers', () => {
  it('builds GeoJSON points, longitude first', () => {
    expect(point(13.405, 52.52)).toEqual(BERLIN)
    expect(point(13.405, 52.52, 34)).toEqual({ type: 'Point', coordinates: [13.405, 52.52, 34] })
    expect(point(3, 4, { crs: 'cartesian' })).toEqual({ type: 'Point', coordinates: [3, 4], crs: 'cartesian' })
    expect(point(3, 4, 5, { crs: 'cartesian-3d' })).toEqual({
      type: 'Point',
      coordinates: [3, 4, 5],
      crs: 'cartesian-3d'
    })
    expect(point(0, 0, 0)).toEqual({ type: 'Point', coordinates: [0, 0, 0] })
    expect('crs' in point(1, 2)).toBe(false)
    expect(isPointValue(point(1, 2, 3, { crs: 'wgs-84-3d' }))).toBe(true)
  })

  it('builds $within and $distance operands', () => {
    const sw = point(13.3, 52.45)
    const ne = point(13.5, 52.55)
    expect(withinRadius(BERLIN, 2000)).toEqual({ $within: { center: BERLIN, meters: 2000 } })
    expect(withinBox(sw, ne)).toEqual({ $within: { box: [sw, ne] } })
    expect(distanceFrom(BERLIN)).toEqual({ $distance: BERLIN })
  })

  it('fits the where and orderBy of a search query', async () => {
    useServer(() => ({ body: { success: true, data: [], total: 0 } }))
    const search: SearchQuery = {
      labels: ['CAFE'],
      where: {
        location: withinRadius(point(13.405, 52.52), 2000),
        area: withinBox(point(13.3, 52.45), point(13.5, 52.55))
      },
      orderBy: { location: distanceFrom(point(13.405, 52.52)) }
    }
    await cloudDb().records.find(search)
    expect(calls[0].body).toMatchObject({
      where: {
        location: { $within: { center: BERLIN, meters: 2000 } },
        area: { $within: { box: [point(13.3, 52.45), point(13.5, 52.55)] } }
      },
      orderBy: { location: { $distance: BERLIN } }
    })
  })
})
