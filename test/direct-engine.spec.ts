import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'

import { describe, it, expect, beforeEach } from 'vitest'

import { CLOUD_ONLY_METHODS } from '../src/direct/capabilities.js'
import { DirectEngine } from '../src/direct/engine.js'
import { HttpClientInterface, HttpClientResponseInterface } from '../src/network/HttpClient.js'
import { NodeHttpClient } from '../src/network/NodeHttpClient.js'
import { CloudOnlyError, DirectModeError } from '../src/sdk/errors.js'
import { RushDB, initSDK } from '../src/sdk/sdk.js'

// ── a fake engine ─────────────────────────────────────────────────────────────

const RECORD = { id: '0190a7e2-0000-7000-8000-000000000001', label: 'Book', properties: { title: 'Dune' } }
const TEXT_INDEX = { kind: 'text', name: 'Book.title.text', label: 'Book', property: 'title', state: 'ready' }
const VECTOR_INDEX = {
  name: 'book-vec',
  label: 'Book',
  property: 'title',
  similarity: 'cosine',
  dimensions: 3
}

/** What a standalone engine answers, by operation. */
function engineAnswer(operation: any): any {
  const inner = (operation.kind === 'mutate' ? operation.mutation : operation[operation.kind]) ?? {}
  switch (`${operation.kind}.${inner.kind ?? ''}`) {
    case 'query.record':
      return { kind: 'record', record: RECORD }
    case 'query.records':
    case 'query.vector':
    case 'query.hybrid':
      return { kind: 'records', records: [RECORD], total: 1 }
    case 'query.relationships':
      return { kind: 'relationships', relationships: [], total: 0 }
    case 'query.propertyValues':
      return { kind: 'propertyValues', property: 'title', values: ['Dune'] }
    case 'query.statement':
      return { kind: 'rows', rows: [{ n: 1 }], total: 1 }
    case 'query.exportCsv':
      return { kind: 'csv', content: '__id,__label,title\r\nr1,Book,Dune', count: 1 }
    case 'describe.schema':
      return {
        kind: 'schema',
        schema: {
          labels: [{ name: 'Book', recordsCount: 1 }],
          properties: [{ id: 'p1', name: 'title', type: 'string', recordsCount: 1, label: 'Book' }],
          relationships: []
        }
      }
    case 'describe.labels':
      return { kind: 'labels', labels: ['Book'] }
    case 'describe.properties':
      return {
        kind: 'properties',
        properties: [{ id: 'p1', name: 'title', type: 'string', recordsCount: 1 }]
      }
    case 'describe.indexes':
      return { kind: 'indexes', indexes: [TEXT_INDEX] }
    case 'describe.vectorIndexes':
      return { kind: 'vectorIndexes', indexes: [VECTOR_INDEX] }
    case 'describe.vectorIndex':
      return { kind: 'vectorIndexStats', stats: { totalRecords: 1, indexedRecords: 1, index: VECTOR_INDEX } }
    case 'mutate.putRecord':
      return { kind: 'record', record: RECORD }
    case 'index.create':
      return { kind: 'index', index: { ...TEXT_INDEX, name: inner.definition.name } }
    case 'index.createVector':
      return { kind: 'vectorIndex', index: { ...VECTOR_INDEX, name: inner.definition.name } }
    case 'index.upsertVectors':
      return { kind: 'vectorsUpserted', updated: 1, requested: 1 }
    case 'ingest.documents':
    case 'ingest.csv':
      return { kind: 'ingested', count: 1, relationships: 0, records: [] }
    case 'transaction.begin':
      return { kind: 'transactionBegun', transactionId: 'tx-1' }
    case 'transaction.commit':
      return { kind: 'transactionOutcome', transactionId: 'tx-1', status: 'committed', retryable: false }
    case 'transaction.stage':
      return inner.mutation?.kind === 'getRecord' ?
          {
            kind: 'transactionGet',
            transactionId: 'tx-1',
            record: { _id: inner.mutation.record.id, __label: 'Book', properties: { title: 'Dune' } }
          }
        : { kind: 'transactionStaged', transactionId: 'tx-1' }
    default:
      return { kind: 'mutation', affected: 1 }
  }
}

function fakeResponse(body: any, status = 200): HttpClientResponseInterface {
  return {
    getHeaders: () => ({}),
    getRawResponse: () => body,
    getStatusCode: () => status,
    toJSON: async () => body,
    toStream: () => undefined
  } as HttpClientResponseInterface
}

let calls: Array<{ url: string; config: any }>

function useFakeEngine() {
  calls = []
  const client: HttpClientInterface = {
    makeRequest: async (url, config) => {
      calls.push({ url, config })
      const operation = (config.requestData as any)?.operation
      return fakeResponse({ protocolVersion: 1, response: engineAnswer(operation) })
    }
  }
  initSDK(client)
}

const directDb = () => new RushDB('ENGINE-SECRET', { direct: true, engineUrl: 'http://engine:3000' })
const operations = () => calls.map((call) => call.config.requestData.operation)

// ── every method, in direct mode ─────────────────────────────────────────────

type Call = (db: RushDB) => Promise<unknown>

/** One representative call per SDK method. */
const EVERY_METHOD: Record<string, Call> = {
  'records.attach': (db) =>
    db.records.attach({ source: RECORD.id, target: RECORD.id, options: { type: 'LIKES' } }),
  'records.detach': (db) =>
    db.records.detach({ source: RECORD.id, target: RECORD.id, options: { typeOrTypes: 'LIKES' } }),
  'records.create': (db) => db.records.create({ label: 'Book', data: { title: 'Dune' } }),
  'records.createMany': (db) => db.records.createMany({ label: 'Book', data: [{ title: 'Dune' }] }),
  'records.importJson': (db) => db.records.importJson({ label: 'Book', data: [{ title: 'Dune' }] }),
  'records.importCsv': (db) => db.records.importCsv({ label: 'Book', data: 'title\nDune\n' }),
  'records.delete': (db) => db.records.delete({ labels: ['Book'], where: { title: 'Dune' } }),
  'records.deleteById': (db) => db.records.deleteById(RECORD.id),
  'records.export': (db) => db.records.export({ labels: ['Book'] }),
  'records.find': (db) => db.records.find({ labels: ['Book'] }),
  'records.vectorSearch': (db) =>
    db.records.vectorSearch({ index: 'book-vec', queryVector: [1, 0, 0], labels: ['Book'] }),
  'records.textSearch': (db) => db.records.textSearch({ query: 'dune', labels: ['Book'] }),
  'records.findById': (db) => db.records.findById(RECORD.id),
  'records.findOne': (db) => db.records.findOne({ labels: ['Book'] }),
  'records.findUniq': (db) => db.records.findUniq({ labels: ['Book'] }),
  'records.set': (db) => db.records.set({ target: RECORD.id, label: 'Book', data: { title: 'Dune' } }),
  'records.update': (db) => db.records.update({ target: RECORD.id, label: 'Book', data: { title: 'Dune' } }),
  'records.upsert': (db) =>
    db.records.upsert({ label: 'Book', data: { title: 'Dune' }, options: { mergeBy: ['title'] } }),
  'relationships.patterns.list': (db) => db.relationships.patterns.list(),
  'relationships.patterns.analyze': (db) => db.relationships.patterns.analyze(),
  'relationships.patterns.approve': (db) => db.relationships.patterns.approve('pattern-1'),
  'relationships.patterns.ignore': (db) => db.relationships.patterns.ignore('pattern-1'),
  'relationships.patterns.delete': (db) => db.relationships.patterns.delete('pattern-1'),
  'relationships.createMany': (db) =>
    db.relationships.createMany({
      source: { label: 'Book', key: 'id' },
      target: { label: 'Author', key: 'bookId' }
    }),
  'relationships.deleteMany': (db) =>
    db.relationships.deleteMany({
      source: { label: 'Book', key: 'id' },
      target: { label: 'Author', key: 'bookId' }
    }),
  'relationships.find': (db) => db.relationships.find({}),
  'properties.delete': (db) => db.properties.delete('p1'),
  'properties.find': (db) => db.properties.find({}),
  'properties.findById': (db) => db.properties.findById('p1'),
  'properties.values': (db) => db.properties.values('p1'),
  'labels.find': (db) => db.labels.find({}),
  'tx.begin': (db) => db.tx.begin(),
  'tx.commit': (db) => db.tx.commit('tx-1'),
  'tx.get': (db) => db.tx.get('tx-1'),
  'tx.rollback': (db) => db.tx.rollback('tx-1'),
  'settings.get': (db) => db.settings.get(),
  'query.raw': (db) => db.query.raw({ query: 'MATCH (n) RETURN count(n) AS n' }),
  'textIndexes.find': (db) => db.textIndexes.find(),
  'textIndexes.create': (db) => db.textIndexes.create({ label: 'Book', property: 'summary' }),
  'textIndexes.suggestName': (db) => db.textIndexes.suggestName({ label: 'Book', property: 'summary' }),
  'textIndexes.delete': (db) => db.textIndexes.delete('Book.title.text'),
  'ai.getSchema': (db) => db.ai.getSchema(),
  'ai.getSchemaMarkdown': (db) => db.ai.getSchemaMarkdown(),
  'ai.indexes.find': (db) => db.ai.indexes.find(),
  'ai.indexes.create': (db) =>
    db.ai.indexes.create({ label: 'Book', propertyName: 'summary', external: true, dimensions: 3 }),
  'ai.indexes.upsertVectors': (db) =>
    db.ai.indexes.upsertVectors('book-vec', { items: [{ recordId: RECORD.id, vector: [1, 0, 0] }] }),
  'ai.indexes.delete': (db) => db.ai.indexes.delete('book-vec'),
  'ai.indexes.stats': (db) => db.ai.indexes.stats('book-vec'),
  'ai.search': (db) => db.ai.search('books about deserts')
}

/** Methods direct mode answers without the engine (it has no operation for them). */
const ANSWERED_LOCALLY = ['tx.get']

/** The SDK's public methods, as `namespace.method` paths. */
function sdkMethods(db: RushDB): string[] {
  const out: string[] = []
  const walk = (value: any, path: string[]) => {
    for (const [key, child] of Object.entries(value)) {
      if (typeof child === 'function') out.push([...path, key].join('.'))
      else if (child && typeof child === 'object' && path.length < 2) walk(child, [...path, key])
    }
  }
  for (const namespace of [
    'records',
    'relationships',
    'properties',
    'labels',
    'tx',
    'settings',
    'query',
    'textIndexes',
    'ai'
  ]) {
    walk((db as any)[namespace], [namespace])
  }
  return out.sort()
}

describe('direct mode', () => {
  beforeEach(useFakeEngine)

  it('classifies every SDK method', () => {
    expect(Object.keys(EVERY_METHOD).sort()).toEqual(sdkMethods(directDb()))
  })

  it.each(Object.entries(EVERY_METHOD))(
    '%s talks to the engine only, or is refused as Cloud-only',
    async (method, call) => {
      const outcome = await call(directDb()).then(
        () => undefined,
        (error) => error
      )
      for (const { url } of calls) {
        expect(url).toBe('http://engine:3000/protocol/v1/execute')
      }
      if (method in CLOUD_ONLY_METHODS) {
        expect(outcome).toBeInstanceOf(CloudOnlyError)
        expect(outcome.method).toBe(method)
        expect(calls).toHaveLength(0)
      } else if (ANSWERED_LOCALLY.includes(method)) {
        expect(outcome).toBeUndefined()
      } else {
        expect(outcome).toBeUndefined()
        expect(calls.length).toBeGreaterThan(0)
      }
    }
  )

  it('refuses to start without an engine URL', () => {
    expect(() => new RushDB('ENGINE-SECRET', { direct: true })).toThrow(/engineUrl/)
  })

  it('sends the engine token and tenant scope', async () => {
    const db = new RushDB('ENGINE-SECRET', {
      direct: true,
      engineUrl: 'http://engine:3000',
      scope: 'tenant-1'
    })
    await db.records.find({ labels: ['Book'] })
    expect(calls[0].config.headers.Authorization).toBe('Bearer ENGINE-SECRET')
    expect(calls[0].config.headers['X-RushDB-Tenant']).toBe('tenant-1')
    expect(calls[0].config.requestData.context).toEqual({ scope: 'tenant-1' })
  })
})

// ── shapes and mappings ──────────────────────────────────────────────────────

describe('direct mode answers in the Cloud shapes', () => {
  beforeEach(useFakeEngine)

  it('records.create returns the created record', async () => {
    const created = await directDb().records.create({ label: 'Book', data: { title: 'Dune' } })
    expect(created.id).toBe(RECORD.id)
    expect(created.label).toBe('Book')
    expect(created.data.title).toBe('Dune')
    expect(operations()[0]).toMatchObject({
      kind: 'mutate',
      mutation: { kind: 'putRecord', mode: 'create', label: 'Book', properties: { title: 'Dune' } }
    })
  })

  it('records.find sends the whole query document', async () => {
    const found = await directDb().records.find({
      labels: ['Book'],
      where: { title: 'Dune' },
      orderBy: { __id: 'asc' },
      select: { n: { $count: '*' } },
      groupBy: ['n'],
      skip: 5,
      limit: 10
    } as any)
    expect(operations()[0].query.query).toEqual({
      labels: ['Book'],
      predicate: { title: 'Dune' },
      select: { n: { $count: '*' } },
      groupBy: ['n'],
      order: { id: 'asc' },
      offset: 5,
      limit: 10
    })
    expect(found.total).toBe(1)
  })

  it('a literal route wins over a parameter route', async () => {
    await directDb().relationships.find({ where: { type: 'WROTE' } } as any)
    expect(operations()[0].query?.kind).toBe('relationships')
  })

  it('records.findById with several ids searches by id', async () => {
    const found = await directDb().records.findById([RECORD.id, 'other'])
    expect(operations()[0].query.query.predicate).toEqual({ $id: { $in: [RECORD.id, 'other'] } })
    expect(found.data[0].id).toBe(RECORD.id)
  })

  it('labels.find counts records per label', async () => {
    const labels = await directDb().labels.find({})
    expect(labels.data).toEqual({ Book: 1 })
  })

  it('records.importCsv forwards only the CSV parse options the engine knows', async () => {
    await directDb().records.importCsv({
      label: 'Book',
      data: 'title\nDune\n',
      parseConfig: { delimiter: ';', comments: '#' } as any,
      options: { suggestTypes: true }
    })
    expect(operations()[0]).toEqual({
      kind: 'ingest',
      ingest: {
        kind: 'csv',
        label: 'Book',
        data: 'title\nDune\n',
        parseConfig: { delimiter: ';' },
        options: { suggestTypes: true },
        vectors: []
      }
    })
  })

  it('records.export returns the CSV text', async () => {
    const exported = await directDb().records.export({ labels: ['Book'] })
    expect(exported.data.fileContent).toBe('__id,__label,title\r\nr1,Book,Dune')
    expect(operations()[0].query.query).toMatchObject({ labels: ['Book'], offset: 0, limit: 100 })
  })

  it('a text vector search needs Cloud; a vector query runs on the engine', async () => {
    const db = directDb()
    await expect(
      db.records.vectorSearch({ propertyName: 'title', labels: ['Book'], query: 'deserts' })
    ).rejects.toBeInstanceOf(CloudOnlyError)
    expect(calls).toHaveLength(0)

    const found = await db.records.vectorSearch({
      propertyName: 'title',
      labels: ['Book'],
      queryVector: [1, 0, 0]
    })
    const vector = operations().find((operation) => operation.query?.kind === 'vector')
    expect(vector.query.query).toMatchObject({ index: 'book-vec', property: 'title', vector: [1, 0, 0] })
    expect(found.data[0].id).toBe(RECORD.id)
  })

  it('only external indexes can be created', async () => {
    const db = directDb()
    await expect(db.ai.indexes.create({ label: 'Book', propertyName: 'summary' })).rejects.toBeInstanceOf(
      CloudOnlyError
    )
    expect(calls).toHaveLength(0)

    await db.ai.indexes.create({ label: 'Book', propertyName: 'summary', external: true, dimensions: 3 })
    const created = operations().find((operation) => operation.index?.kind === 'createVector')
    expect(created.index.definition).toEqual({
      label: 'Book',
      property: 'summary',
      dimensions: 3,
      similarity: 'cosine',
      name: 'Book.summary.external.3.cosine'
    })
  })

  const stagedMutations = () =>
    operations()
      .filter((operation) => operation.transaction?.kind === 'stage')
      .map((operation) => operation.transaction.mutation)

  it('stages a record created inside a transaction', async () => {
    const db = directDb()
    const tx = await db.tx.begin()
    const created = await db.records.create(
      { label: 'Book', data: { title: 'Dune' }, options: { suggestTypes: true } },
      tx
    )
    expect(stagedMutations()[0]).toEqual({
      kind: 'createRecord',
      label: 'Book',
      id: created.id,
      properties: { title: 'Dune' },
      options: { suggestTypes: true }
    })
    expect(created.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(created.data.title).toBe('Dune')
    await db.tx.commit(tx)
  })

  it('stages updates, replaces, deletes and links by record id', async () => {
    const db = directDb()
    await db.records.update({ target: RECORD.id, label: 'Book', data: { title: 'Emma' } }, 'tx-1')
    await db.records.set({ target: RECORD.id, label: 'Novel', data: { title: 'Emma' } }, 'tx-1')
    await db.records.deleteById(RECORD.id, 'tx-1')
    await db.records.attach({ source: RECORD.id, target: ['t1', 't2'], options: { direction: 'in' } }, 'tx-1')
    const record = { id: RECORD.id }
    expect(stagedMutations()).toEqual([
      { kind: 'getRecord', record },
      { kind: 'updateRecord', record, properties: { title: 'Emma' }, replace: false },
      { kind: 'getRecord', record },
      { kind: 'getRecord', record },
      { kind: 'retypeRecord', record, fromLabel: 'Book', toLabel: 'Novel' },
      { kind: 'updateRecord', record, properties: { title: 'Emma' }, replace: true },
      { kind: 'getRecord', record },
      { kind: 'deleteRecord', record },
      {
        kind: 'createRelationship',
        relationType: '__RUSHDB__RELATION__DEFAULT__',
        source: { id: 't1' },
        target: record,
        properties: {}
      },
      {
        kind: 'createRelationship',
        relationType: '__RUSHDB__RELATION__DEFAULT__',
        source: { id: 't2' },
        target: record,
        properties: {}
      }
    ])
  })

  it('stages imports into a transaction', async () => {
    const db = directDb()
    await db.records.importJson({ label: 'Book', data: [{ title: 'Dune' }] }, 'tx-1')
    await db.records.importCsv({ label: 'Book', data: 'title\nDune\n' }, 'tx-1')
    expect(stagedMutations()).toEqual([
      {
        kind: 'ingest',
        ingest: { kind: 'documents', label: 'Book', documents: [{ title: 'Dune' }], options: {} }
      },
      {
        kind: 'ingest',
        ingest: {
          kind: 'csv',
          label: 'Book',
          data: 'title\nDune\n',
          parseConfig: {},
          options: {},
          vectors: []
        }
      }
    ])
  })

  it('refuses, before sending anything, a write it cannot stage', async () => {
    const db = directDb()
    await expect(
      db.records.delete({ labels: ['Book'], where: { title: 'Dune' } }, 'tx-1')
    ).rejects.toBeInstanceOf(DirectModeError)
    await expect(db.records.detach({ source: RECORD.id, target: 't1' }, 'tx-1')).rejects.toBeInstanceOf(
      DirectModeError
    )
    await expect(
      db.records.set(
        {
          target: RECORD.id,
          label: 'Book',
          data: { title: 'Emma' },
          vectors: [{ propertyName: 'title', vector: [1] }]
        },
        'tx-1'
      )
    ).rejects.toBeInstanceOf(DirectModeError)
    expect(calls).toHaveLength(0)
  })

  it('detaches every type both ways in one operation when neither is given', async () => {
    const db = directDb()
    await db.records.detach({ source: RECORD.id, target: ['t1'] })
    await db.records.detach({
      source: RECORD.id,
      target: ['t1'],
      options: { typeOrTypes: ['A', 'B'], direction: 'out' }
    })
    const commands = operations()
      .filter((operation) => operation.mutation?.kind === 'unlinkRecordsById')
      .map((operation) => operation.mutation.command)
    expect(commands).toEqual([
      { relationTypes: [], sourceIds: [RECORD.id], targetIds: ['t1'] },
      { relationTypes: ['A', 'B'], direction: 'out', sourceIds: [RECORD.id], targetIds: ['t1'] }
    ])
  })

  it('surfaces an engine refusal as an HTTP-style error', async () => {
    initSDK({
      makeRequest: async () =>
        fakeResponse({ protocolVersion: 1, error: { code: 'notFound', message: 'record not found' } }, 404)
    })
    await expect(directDb().records.findById(RECORD.id)).rejects.toMatchObject({
      status: 404,
      message: '404 record not found'
    })
  })
})

describe('DirectEngine over the Node HTTP client', () => {
  it('sends the envelope as the request body', async () => {
    let received = ''
    const server = createServer((req, res) => {
      req.setEncoding('utf8')
      req.on('data', (chunk) => (received += chunk))
      req.on('end', () => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ protocolVersion: 1, response: { kind: 'record', record: RECORD } }))
      })
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    const { port } = server.address() as AddressInfo
    try {
      const engine = new DirectEngine({
        engineUrl: `http://127.0.0.1:${port}`,
        token: 'local-token',
        httpClient: new NodeHttpClient()
      })
      await engine.execute({ kind: 'query', query: { kind: 'record', id: RECORD.id } })
      expect(JSON.parse(received).operation).toEqual({
        kind: 'query',
        query: { kind: 'record', id: RECORD.id }
      })
    } finally {
      server.close()
    }
  })
})
