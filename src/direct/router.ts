import type { MakeRequestConfig } from '../network/HttpClient.js'

import { CLOUD_ONLY_FORMS, CLOUD_ONLY_METHODS } from './capabilities.js'
import type { DirectEngine } from './engine.js'
import { buildSchema, buildSchemaMarkdown } from './schema.js'
import { CloudOnlyError, DirectModeError } from '../sdk/errors.js'

/**
 * Direct mode answers the SDK's REST calls itself, with protocol operations
 * against a standalone engine, so every SDK method keeps one code path and
 * returns the same shapes in both modes. Each route mirrors what RushDB Cloud
 * does for it; a Cloud-only route throws `CloudOnlyError` before anything is
 * sent. No request ever goes to RushDB Cloud.
 */

type Body = Record<string, any>
type ApiResponse = { success: true; data: any; total?: number; meta?: Record<string, any> }

type Request = {
  body: Body
  params: string[]
  query: URLSearchParams
  txId?: string
  engine: DirectEngine
}

type Route = {
  method: string
  pattern: RegExp
  handle: (request: Request) => Promise<ApiResponse>
}

const ok = (data: any, extra: Partial<Omit<ApiResponse, 'success' | 'data'>> = {}): ApiResponse => ({
  success: true,
  data,
  ...extra
})

/** An error as a RushDB Cloud response error surfaces in the SDK. */
const httpError = (status: number, message: string) => {
  const error = new Error(`${status} ${message}`) as Error & { status: number; body?: unknown }
  error.status = status
  error.body = { statusCode: status, message }
  return error
}

const cloudOnly = (method: keyof typeof CLOUD_ONLY_METHODS) => async (): Promise<ApiResponse> => {
  throw new CloudOnlyError(method, CLOUD_ONLY_METHODS[method])
}

const notInTransaction = (txId: string | undefined, what: string) => {
  if (txId) {
    throw new DirectModeError(
      `${what} inside a transaction is not supported in direct mode: the engine stages record creates, updates, deletes, links and imports. Run it outside the transaction.`
    )
  }
}

/** The relationship type a link gets when the caller names none. */
const DEFAULT_RELATION_TYPE = '__RUSHDB__RELATION__DEFAULT__'

const stage = (engine: DirectEngine, txId: string, mutation: Body) =>
  engine.execute({ kind: 'transaction', transaction: { kind: 'stage', transactionId: txId, mutation } })

/** A record as the transaction sees it, in the SDK's shape. */
const stagedRecord = async (engine: DirectEngine, txId: string, id: string) => {
  const { record } = await stage(engine, txId, { kind: 'getRecord', record: { id } })
  return { ...(record?.properties ?? {}), __id: id, __label: record?.__label, __proptypes: {} }
}

const refuseVectorsInTransaction = (txId: string | undefined, vectors: unknown) => {
  if (txId && Array.isArray(vectors) && vectors.length > 0) {
    notInTransaction(txId, 'A write with inline vectors')
  }
}

// ── shapes ──────────────────────────────────────────────────────────────────

/** An engine record (`{ id, label, properties, propertyTypes, score }`) in the SDK's shape. */
export const toSdkRecord = (record: Body | undefined): Body | undefined => {
  if (!record) {
    return record
  }
  const out: Body = { ...(record.properties ?? {}) }
  out.__id = record.id
  out.__label = record.label
  out.__proptypes = record.propertyTypes ?? {}
  if (record.score !== undefined) {
    out.__score = record.score
  }
  return out
}

const toSdkRecords = (records: Body[] | undefined) => (records ?? []).map((record) => toSdkRecord(record))

/** A request's flat data: `data`, or property drafts (`[{ name, value }]`) as an object. */
const recordProperties = (body: Body): Body => {
  if (body.data && typeof body.data === 'object' && !Array.isArray(body.data)) {
    return body.data
  }
  if (Array.isArray(body.properties)) {
    return Object.fromEntries(body.properties.map((property: Body) => [property.name, property.value]))
  }
  if (body.properties && typeof body.properties === 'object') {
    return body.properties
  }
  return {}
}

const protocolOrder = (orderBy: unknown): unknown => {
  if (
    orderBy === undefined ||
    orderBy === null ||
    (typeof orderBy === 'object' && !Array.isArray(orderBy) && Object.keys(orderBy).length === 0)
  ) {
    return 'desc'
  }
  if (typeof orderBy !== 'object' || Array.isArray(orderBy)) {
    return orderBy
  }
  return Object.fromEntries(
    Object.entries(orderBy).map(([field, direction]) => [field === '__id' ? 'id' : field, direction])
  )
}

/** A SearchQuery as the engine's query document. */
const queryDocument = (search: Body = {}): Body => {
  const pagination = search.pagination ?? {}
  const document: Body = {
    labels: search.labels ?? [],
    predicate: search.where ?? {},
    select: search.select,
    order: protocolOrder(search.orderBy),
    offset: search.skip ?? pagination.skip ?? 0,
    limit: search.limit ?? pagination.limit
  }
  if (Array.isArray(search.groupBy) && search.groupBy.length > 0) {
    document.groupBy = search.groupBy
  }
  return document
}

const isEmptyObject = (value: unknown) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && !Array.isArray(value) && Object.keys(value as Body).length === 0)

// ── engine reads ────────────────────────────────────────────────────────────

const getRecord = async (engine: DirectEngine, id: string) =>
  (await engine.execute({ kind: 'query', query: { kind: 'record', id } })).record

const searchRecords = async (engine: DirectEngine, search: Body) => {
  const result = await engine.execute({
    kind: 'query',
    query: { kind: 'records', query: queryDocument(search) }
  })
  if (result.kind === 'rows') {
    return { data: result.rows ?? [], total: result.total ?? 0 }
  }
  return { data: toSdkRecords(result.records), total: result.total ?? 0 }
}

const vectorIndexes = async (engine: DirectEngine): Promise<Body[]> =>
  (await engine.execute({ kind: 'describe', describe: { kind: 'vectorIndexes' } })).indexes ?? []

const declaredIndexes = async (engine: DirectEngine): Promise<Body[]> =>
  (await engine.execute({ kind: 'describe', describe: { kind: 'indexes' } })).indexes ?? []

/** An engine vector index in the SDK's `EmbeddingIndex` shape (always external in direct mode). */
const toEmbeddingIndex = (index: Body) => {
  const dimensions = Number(index.dimensions ?? 0)
  return {
    id: index.name,
    name: index.name,
    label: index.label,
    propertyName: index.property,
    vectorPropertyName: `_emb_external_${index.similarity}_${dimensions}`,
    similarityFunction: index.similarity,
    dimensions,
    sourceType: 'external',
    status: index.status
  }
}

const toTextIndex = (index: Body) => ({
  name: index.name,
  label: index.label,
  property: index.property,
  consistency: index.consistency ?? 'eventual',
  status: index.state,
  pending: index.pending ?? 0
})

const textIndexes = async (engine: DirectEngine) =>
  (await declaredIndexes(engine)).filter((index) => index.kind === 'text').map(toTextIndex)

// ── names ───────────────────────────────────────────────────────────────────

const INDEX_NAME_MAX_LENGTH = 64

const nameWith = (parts: string[]) =>
  parts
    .join('.')
    .slice(0, INDEX_NAME_MAX_LENGTH)
    .replace(/[.:-]+$/, '')

const namePart = (value: string) => value.replace(/[^A-Za-z0-9_-]/g, '-')

/** `base`, or the first free `base-2`, `base-3`, … */
const firstFree = (base: string, taken: Set<string>) => {
  if (!taken.has(base)) {
    return base
  }
  for (let n = 2; ; n++) {
    const suffix = `-${n}`
    const name = base.slice(0, INDEX_NAME_MAX_LENGTH - suffix.length) + suffix
    if (!taken.has(name)) {
      return name
    }
  }
}

const defaultTextIndexName = ({ label, property }: { label: string; property: string }) =>
  nameWith([namePart(label), property === '*' ? 'all' : namePart(property), 'text'])

const defaultVectorIndexName = (body: Body, dimensions: number, similarity: string) =>
  nameWith([
    namePart(body.label),
    namePart(body.propertyName),
    'external',
    String(dimensions),
    similarity
  ]).replace(/^emb__/, 'emb_')

// ── vectors ─────────────────────────────────────────────────────────────────

/**
 * Names the index of each inline vector entry (`{ propertyName, vector,
 * similarityFunction?, index? }`): a named index is used as is; otherwise the
 * one vector index of the record's label and property with the vector's
 * dimensions (and similarity, when given).
 */
const nameInlineVectors = async (
  engine: DirectEngine,
  entries: Body[] | undefined,
  label: string | undefined,
  known?: Body[]
): Promise<Body[]> => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return []
  }
  const indexes = known ?? (await vectorIndexes(engine))
  return entries.map((entry) => {
    if (typeof entry?.index === 'string') {
      return entry
    }
    if (!label) {
      throw httpError(422, 'inline vectors require a record label to select their index')
    }
    const dimensions = Array.isArray(entry.vector) ? entry.vector.length : undefined
    const matches = indexes.filter(
      (index) =>
        index.label === label &&
        index.property === entry.propertyName &&
        (entry.similarityFunction === undefined || index.similarity === entry.similarityFunction) &&
        (dimensions === undefined || Number(index.dimensions) === dimensions)
    )
    if (matches.length !== 1) {
      throw httpError(
        matches.length === 0 ? 404 : 422,
        matches.length === 0 ?
          `No vector index matches label "${label}", property "${entry.propertyName}"`
        : `${matches.length} vector indexes match label "${label}", property "${entry.propertyName}"; name one with \`index\``
      )
    }
    return { ...entry, index: matches[0].name }
  })
}

/** Names every top-level document's `$vectors` (see `nameInlineVectors`). */
const nameDocumentVectors = async (engine: DirectEngine, data: unknown, label: string | undefined) => {
  const documents = Array.isArray(data) ? data : [data]
  const carries = (document: any) => Array.isArray(document?.$vectors) && document.$vectors.length > 0
  if (!documents.some(carries)) {
    return data
  }
  const indexes = await vectorIndexes(engine)
  const named = await Promise.all(
    documents.map(async (document: any) =>
      carries(document) ?
        { ...document, $vectors: await nameInlineVectors(engine, document.$vectors, label, indexes) }
      : document
    )
  )
  return Array.isArray(data) ? named : named[0]
}

// ── records ─────────────────────────────────────────────────────────────────

/** A time-ordered UUID (v7), for a record created inside a transaction. */
const uuidv7 = () => {
  const bytes = new Uint8Array(16)
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  const now = Date.now()
  for (let i = 0; i < 6; i++) {
    bytes[i] = Math.floor(now / 2 ** (8 * (5 - i))) & 0xff
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x70
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

const createRecord = async ({ body, engine, txId }: Request) => {
  const upsert = Boolean(body.options?.mergeStrategy) || Array.isArray(body.options?.mergeBy)
  const properties = recordProperties(body)
  if (txId) {
    if (upsert) {
      notInTransaction(txId, 'An upsert')
    }
    refuseVectorsInTransaction(txId, body.vectors)
    const id = uuidv7()
    await stage(engine, txId, {
      kind: 'createRecord',
      label: body.label,
      id,
      properties,
      options: body.options ?? {}
    })
    return ok(await stagedRecord(engine, txId, id))
  }
  const options = upsert ? { ...body.options, mergeBy: body.options?.mergeBy ?? [] } : (body.options ?? {})
  const result = await engine.execute({
    kind: 'mutate',
    mutation: {
      kind: 'putRecord',
      mode: 'create',
      label: body.label,
      properties,
      vectors: await nameInlineVectors(engine, body.vectors, body.label),
      options
    }
  })
  return ok(toSdkRecord(result.record))
}

const putRecord =
  (mode: 'merge' | 'replace') =>
  async ({ body, params: [id], engine, txId }: Request) => {
    const requestedLabel = typeof body.label === 'string' && body.label ? body.label : undefined
    if (txId) {
      refuseVectorsInTransaction(txId, body.vectors)
      if (requestedLabel) {
        const current = await stagedRecord(engine, txId, id)
        if (current.__label && current.__label !== requestedLabel) {
          await stage(engine, txId, {
            kind: 'retypeRecord',
            record: { id },
            fromLabel: current.__label,
            toLabel: requestedLabel
          })
        }
      }
      await stage(engine, txId, {
        kind: 'updateRecord',
        record: { id },
        properties: recordProperties(body),
        replace: mode === 'replace'
      })
      return ok(await stagedRecord(engine, txId, id))
    }
    let label = requestedLabel
    if (requestedLabel || body.vectors?.length) {
      const current = await getRecord(engine, id)
      if (requestedLabel && current?.label && current.label !== requestedLabel) {
        await engine.execute({
          kind: 'mutate',
          mutation: { kind: 'retypeRecord', id, fromLabel: current.label, toLabel: requestedLabel }
        })
      }
      label = requestedLabel ?? current?.label
    }
    const result = await engine.execute({
      kind: 'mutate',
      mutation: {
        kind: 'putRecord',
        mode,
        id,
        properties: recordProperties(body),
        vectors: await nameInlineVectors(engine, body.vectors, label),
        options: body.options ?? {}
      }
    })
    return ok(toSdkRecord(result.record))
  }

/** A search from a record matches the records directly related to it. */
const searchFrom = async (engine: DirectEngine, id: string | undefined, search: Body) => {
  if (!id) {
    return search
  }
  let label: string
  try {
    label = (await getRecord(engine, id))?.label
  } catch (error: any) {
    if (error?.status === 404) {
      return undefined
    }
    throw error
  }
  const related = { [label]: { $id: id } }
  const where = search.where
  return { ...search, where: isEmptyObject(where) ? related : { $and: [where, related] } }
}

const findRecords = async ({ body, params: [id], engine }: Request) => {
  const search = await searchFrom(engine, id, body)
  if (!search) {
    return ok([], { total: 0 })
  }
  const { data, total } = await searchRecords(engine, search)
  return ok(data, { total })
}

/** Run an import, or stage it into the transaction (then it reports counts, not records). */
const ingest = (engine: DirectEngine, txId: string | undefined, ingest: Body) =>
  txId ? stage(engine, txId, { kind: 'ingest', ingest }) : engine.execute({ kind: 'ingest', ingest })

const importResult = (result: Body, returnResult: boolean | undefined) =>
  returnResult && result.records?.length ?
    ok(toSdkRecords(result.records))
  : ok({ message: 'Records have been successfully imported', count: Number(result.count ?? 0) })

const CSV_PARSE_CONFIG_KEYS = [
  'delimiter',
  'header',
  'skipEmptyLines',
  'dynamicTyping',
  'quoteChar',
  'escapeChar',
  'newline'
]

// ── relationships ───────────────────────────────────────────────────────────

const relationshipCommand = (body: Body) => ({
  relationType: body.type ?? DEFAULT_RELATION_TYPE,
  direction: String(body.direction ?? '').toLowerCase() === 'in' ? 'in' : 'out',
  allowCartesian: body.manyToMany ?? false,
  properties: body.properties ?? {},
  source: { label: body.source?.label, property: body.source?.key, predicate: body.source?.where ?? {} },
  target: { label: body.target?.label, property: body.target?.key, predicate: body.target?.where ?? {} }
})

const asArray = (value: unknown) => (Array.isArray(value) ? value : [value])

// ── properties ──────────────────────────────────────────────────────────────

/** `describe.properties` is per label; the Properties API is per definition. */
const mergeProperties = (descriptions: Body[]): Body[] => {
  const byId = new Map<string, Body>()
  for (const description of descriptions) {
    const current = byId.get(description.id)
    if (current) {
      current.recordsCount += Number(description.recordsCount ?? 0)
      current.isArray ||= description.isArray === true
      continue
    }
    byId.set(description.id, {
      id: description.id,
      name: description.name,
      type: description.type,
      recordsCount: Number(description.recordsCount ?? 0),
      isArray: description.isArray === true
    })
  }
  return Array.from(byId.values(), ({ isArray, ...property }) => ({
    ...property,
    metadata: JSON.stringify({ cardinality: isArray ? 'OrderedMany' : 'Single', nullability: 'Nullable' })
  }))
}

const properties = async (engine: DirectEngine, search: Body = {}) => {
  const result = await engine.execute({
    kind: 'describe',
    describe: {
      kind: 'properties',
      query: queryDocument(search),
      ...(isEmptyObject(search.where) ? { detail: 'catalog' } : {})
    }
  })
  return mergeProperties(result.properties ?? [])
}

const findProperty = async (engine: DirectEngine, id: string): Promise<Body | undefined> => {
  const property = (await properties(engine)).find((p) => p.name === id || p.id === id)
  return property && { ...property, id: property.id ?? property.name }
}

// ── search ──────────────────────────────────────────────────────────────────

/** The text leg of a search: the named index, or the one ready text index of the first label. */
const textLeg = async (engine: DirectEngine, text: Body, labels: string[]) => {
  if (typeof text.query !== 'string' || text.query.trim() === '') {
    throw httpError(422, 'text.query is required')
  }
  const indexes = await textIndexes(engine)
  let index: Body | undefined
  if (text.index !== undefined) {
    index = indexes.find((candidate) => candidate.name === text.index)
    if (!index) {
      throw httpError(404, `No text index named "${text.index}"`)
    }
  } else {
    const label = labels[0]
    if (!label) {
      throw httpError(422, 'Name a text index with `index`, or give `labels`')
    }
    const candidates = indexes.filter(
      (candidate) =>
        candidate.label === label &&
        candidate.status === 'ready' &&
        (text.property === undefined || candidate.property === text.property)
    )
    if (candidates.length === 0) {
      throw httpError(404, `No ready text index on label "${label}"`)
    }
    if (candidates.length > 1) {
      throw httpError(
        422,
        `Label "${label}" has several text indexes (${candidates.map((c) => c.name).join(', ')}); name one with \`index\``
      )
    }
    index = candidates[0]
  }
  return {
    index: index.name,
    label: index.label,
    query: text.query,
    allTerms: text.allTerms ?? false,
    phrase: text.phrase ?? false
  }
}

const vectorSearch = async ({ body, engine }: Request) => {
  const queryVector: number[] = body.queryVector ?? []
  if (queryVector.length === 0) {
    throw new CloudOnlyError('records.vectorSearch', CLOUD_ONLY_FORMS['records.vectorSearch'])
  }
  const indexes = await vectorIndexes(engine)
  let index: Body | undefined
  if (typeof body.index === 'string') {
    index = indexes.find((candidate) => candidate.name === body.index)
    if (!index) {
      throw httpError(404, `No vector index named "${body.index}"`)
    }
  } else {
    const label = (body.labels ?? [])[0]
    const matches = indexes.filter(
      (candidate) =>
        candidate.label === label &&
        candidate.property === body.propertyName &&
        (body.similarityFunction === undefined || candidate.similarity === body.similarityFunction) &&
        Number(candidate.dimensions) === (body.dimensions ?? queryVector.length)
    )
    if (matches.length !== 1) {
      throw httpError(
        matches.length === 0 ? 404 : 422,
        matches.length === 0 ?
          `No vector index matches label "${label}", property "${body.propertyName}"`
        : `${matches.length} vector indexes match label "${label}", property "${body.propertyName}"; name one with \`index\``
      )
    }
    index = matches[0]
  }
  const labels = body.labels?.length ? body.labels : [index.label]
  const vectorLeg = {
    property: index.property,
    vector: queryVector,
    similarity: index.similarity ?? 'cosine',
    index: index.name,
    mode: body.mode,
    ef: body.ef,
    scoreThreshold: body.scoreThreshold
  }
  const textLegSpec =
    body.text ?
      await textLeg(engine, { ...body.text, query: body.text.query ?? body.query }, labels)
    : undefined
  const query =
    textLegSpec ?
      {
        kind: 'hybrid',
        query: {
          labels,
          predicate: body.where ?? {},
          vector: { ...vectorLeg, weight: body.weight, prefetchLimit: body.prefetchLimit },
          text: {
            index: textLegSpec.index,
            query: textLegSpec.query,
            allTerms: textLegSpec.allTerms,
            phrase: textLegSpec.phrase,
            weight: body.text.weight,
            prefetchLimit: body.text.prefetchLimit
          },
          fusion: body.fusion,
          rrfK: body.rrfK,
          offset: body.skip ?? 0,
          limit: body.limit ?? 10
        }
      }
    : {
        kind: 'vector',
        query: {
          ...vectorLeg,
          labels,
          predicate: body.where ?? {},
          offset: body.skip ?? 0,
          limit: body.limit ?? 10
        }
      }
  const result = await engine.execute({ kind: 'query', query })
  const data = toSdkRecords(result.records)
  return ok(data, {
    total: data.length,
    meta: { vectorSearch: result.vectorSearch, textSearch: result.textSearch, fusion: result.fusion }
  })
}

// ── routes ──────────────────────────────────────────────────────────────────

const ID = '([^/]+)'

const routes: Route[] = [
  // records
  {
    method: 'GET',
    pattern: new RegExp(`^/records/${ID}$`),
    handle: async ({ params: [id], engine }) => ok(toSdkRecord(await getRecord(engine, id)))
  },
  { method: 'POST', pattern: /^\/records$/, handle: createRecord },
  { method: 'PATCH', pattern: new RegExp(`^/records/${ID}$`), handle: putRecord('merge') },
  { method: 'PUT', pattern: new RegExp(`^/records/${ID}$`), handle: putRecord('replace') },
  {
    method: 'DELETE',
    pattern: new RegExp(`^/records/${ID}$`),
    handle: async ({ params: [id], engine, txId }) => {
      if (txId) {
        await stage(engine, txId, { kind: 'deleteRecord', record: { id } })
      } else {
        await engine.execute({ kind: 'mutate', mutation: { kind: 'deleteRecord', id } })
      }
      return ok({ message: 'Record deleted' })
    }
  },
  {
    method: 'POST',
    pattern: /^\/records\/delete$/,
    handle: async ({ body, engine, txId }) => {
      notInTransaction(txId, 'records.delete')
      const result = await engine.execute({
        kind: 'mutate',
        mutation: { kind: 'deleteRecords', query: queryDocument(body) }
      })
      return ok({ message: `${result.affected ?? 0} records deleted` })
    }
  },
  { method: 'POST', pattern: /^\/records\/search$/, handle: findRecords },
  { method: 'POST', pattern: new RegExp(`^/records/${ID}/search$`), handle: findRecords },
  {
    method: 'POST',
    pattern: /^\/records\/import\/json$/,
    handle: async ({ body, engine, txId }) => {
      const result = await ingest(engine, txId, {
        kind: 'documents',
        label: body.label,
        documents: await nameDocumentVectors(engine, body.data, body.label),
        options: body.options ?? {}
      })
      return importResult(result, body.options?.returnResult)
    }
  },
  {
    method: 'POST',
    pattern: /^\/records\/import\/csv$/,
    handle: async ({ body, engine, txId }) => {
      const known = body.vectors?.length ? await vectorIndexes(engine) : []
      const vectors = await Promise.all(
        (body.vectors ?? []).map((entries: Body[]) => nameInlineVectors(engine, entries, body.label, known))
      )
      const parseConfig = Object.fromEntries(
        Object.entries(body.parseConfig ?? {}).filter(([key]) => CSV_PARSE_CONFIG_KEYS.includes(key))
      )
      const result = await ingest(engine, txId, {
        kind: 'csv',
        label: body.label,
        data: body.data ?? '',
        parseConfig,
        options: body.options ?? {},
        vectors
      })
      if (Number(result.count ?? 0) === 0) {
        return ok(true)
      }
      return importResult(result, body.options?.returnResult)
    }
  },
  {
    method: 'POST',
    pattern: /^\/records\/export\/csv$/,
    handle: async ({ body, engine }) => {
      const result = await engine.execute({
        kind: 'query',
        query: {
          kind: 'exportCsv',
          query: queryDocument({
            labels: body.labels,
            where: body.where,
            orderBy: body.orderBy,
            skip: typeof body.skip === 'number' ? body.skip : 0,
            limit: typeof body.limit === 'number' ? body.limit : 100
          })
        }
      })
      return ok({ fileContent: result.content, dateTime: new Date().toISOString() })
    }
  },

  // relationships
  {
    method: 'POST',
    pattern: new RegExp(`^/relationships/${ID}$`),
    handle: async ({ body, params: [id], engine, txId }) => {
      const relationType = body.type ?? DEFAULT_RELATION_TYPE
      const inbound = String(body.direction ?? '').toLowerCase() === 'in'
      if (txId) {
        for (const targetId of asArray(body.targetIds)) {
          await stage(engine, txId, {
            kind: 'createRelationship',
            relationType,
            source: { id: inbound ? targetId : id },
            target: { id: inbound ? id : targetId },
            properties: body.properties ?? {}
          })
        }
      } else {
        await engine.execute({
          kind: 'mutate',
          mutation: {
            kind: 'linkRecordsById',
            command: {
              relationType,
              direction: inbound ? 'in' : 'out',
              sourceIds: [id],
              targetIds: asArray(body.targetIds),
              properties: body.properties ?? {}
            }
          }
        })
      }
      return ok({ message: `Relations to Record ${id} have been successfully created` })
    }
  },
  {
    method: 'PUT',
    pattern: new RegExp(`^/relationships/${ID}$`),
    handle: async ({ body, params: [id], engine, txId }) => {
      notInTransaction(txId, 'records.detach')
      // No type removes every type, and no direction removes both ways.
      const direction = String(body.direction ?? '').toLowerCase()
      await engine.execute({
        kind: 'mutate',
        mutation: {
          kind: 'unlinkRecordsById',
          command: {
            relationTypes: asArray(body.typeOrTypes).filter(Boolean),
            ...(direction === 'in' || direction === 'out' ? { direction } : {}),
            sourceIds: [id],
            targetIds: asArray(body.targetIds)
          }
        }
      })
      return ok({ message: `Relations to Record ${id} have been successfully deleted` })
    }
  },
  {
    method: 'POST',
    pattern: /^\/relationships\/create-many$/,
    handle: async ({ body, engine, txId }) => {
      notInTransaction(txId, 'relationships.createMany')
      await engine.execute({
        kind: 'mutate',
        mutation: { kind: 'linkRecords', command: relationshipCommand(body) }
      })
      return ok({ message: 'Relations have been successfully created' })
    }
  },
  {
    method: 'POST',
    pattern: /^\/relationships\/delete-many$/,
    handle: async ({ body, engine, txId }) => {
      notInTransaction(txId, 'relationships.deleteMany')
      await engine.execute({
        kind: 'mutate',
        mutation: { kind: 'unlinkRecords', command: relationshipCommand(body) }
      })
      return ok({ message: 'Relations have been successfully deleted' })
    }
  },
  {
    method: 'POST',
    pattern: /^\/relationships\/search$/,
    handle: async ({ body, engine }) => {
      const result = await engine.execute({
        kind: 'query',
        query: {
          kind: 'relationships',
          query: {
            sourceLabels: body.source?.labels ?? [],
            targetLabels: body.target?.labels ?? [],
            relationType: body.where?.type,
            predicate: Object.fromEntries(Object.entries(body.where ?? {}).filter(([key]) => key !== 'type')),
            sourcePredicate: isEmptyObject(body.source?.where) ? undefined : body.source.where,
            targetPredicate: isEmptyObject(body.target?.where) ? undefined : body.target.where,
            offset: body.skip ?? 0,
            limit: body.limit
          }
        }
      })
      return ok(result.relationships ?? [], { total: result.total ?? 0 })
    }
  },
  { method: 'GET', pattern: /^\/relationships\/patterns$/, handle: cloudOnly('relationships.patterns.list') },
  {
    method: 'POST',
    pattern: /^\/relationships\/patterns\/analyze$/,
    handle: cloudOnly('relationships.patterns.analyze')
  },
  {
    method: 'POST',
    pattern: new RegExp(`^/relationships/patterns/${ID}/approve$`),
    handle: cloudOnly('relationships.patterns.approve')
  },
  {
    method: 'POST',
    pattern: new RegExp(`^/relationships/patterns/${ID}/ignore$`),
    handle: cloudOnly('relationships.patterns.ignore')
  },
  {
    method: 'DELETE',
    pattern: new RegExp(`^/relationships/patterns/${ID}$`),
    handle: cloudOnly('relationships.patterns.delete')
  },

  // properties and labels
  {
    method: 'POST',
    pattern: /^\/properties\/search$/,
    handle: async ({ body, engine }) =>
      ok(await properties(engine, { labels: body.labels ?? [], where: body.where ?? {} }))
  },
  {
    method: 'GET',
    pattern: new RegExp(`^/properties/${ID}$`),
    handle: async ({ params: [id], engine }) => {
      const property = await findProperty(engine, id)
      if (!property) {
        throw httpError(404, `property \`${id}\` does not exist`)
      }
      return ok(property)
    }
  },
  {
    method: 'DELETE',
    pattern: new RegExp(`^/properties/${ID}$`),
    handle: async ({ params: [id], engine, txId }) => {
      notInTransaction(txId, 'properties.delete')
      const property = await findProperty(engine, id)
      if (!property) {
        throw httpError(404, `property \`${id}\` does not exist`)
      }
      await engine.execute({ kind: 'mutate', mutation: { kind: 'deleteProperty', name: property.name } })
      return ok({ message: `Property (${id}) has been successfully deleted.` })
    }
  },
  {
    method: 'POST',
    pattern: new RegExp(`^/properties/${ID}/values$`),
    handle: async ({ body, params: [id], engine }) => {
      const result = await engine.execute({
        kind: 'query',
        query: {
          kind: 'propertyValues',
          property: id,
          query: queryDocument({ labels: body.labels ?? [], where: body.where ?? {} })
        }
      })
      return ok({ values: result.values ?? [] })
    }
  },
  {
    method: 'POST',
    pattern: /^\/labels\/search$/,
    handle: async ({ body, engine }) => {
      const result = await engine.execute({
        kind: 'describe',
        describe: { kind: 'labels', query: queryDocument(body) }
      })
      const counts: Record<string, number> = {}
      for (const label of result.labels ?? []) {
        counts[label] = (await searchRecords(engine, { ...body, labels: [label], skip: 0, limit: 1 })).total
      }
      return ok(counts)
    }
  },

  // transactions
  {
    method: 'POST',
    pattern: /^\/tx$/,
    handle: async ({ body, engine }) => {
      const result = await engine.execute({
        kind: 'transaction',
        transaction: { kind: 'begin', ttlMs: body.ttl, autocommit: body.autocommit ?? false }
      })
      return ok({ id: result.transactionId })
    }
  },
  { method: 'GET', pattern: new RegExp(`^/tx/${ID}$`), handle: async ({ params: [id] }) => ok({ id }) },
  {
    method: 'POST',
    pattern: new RegExp(`^/tx/${ID}/commit$`),
    handle: async ({ params: [id], engine }) => {
      const result = await engine.execute({
        kind: 'transaction',
        transaction: { kind: 'commit', transactionId: id }
      })
      if (result.status !== 'committed') {
        throw httpError(409, `Transaction commit failed: ${result.reason ?? result.status}`)
      }
      return ok({ message: `Transaction (${id}) has been successfully committed.` })
    }
  },
  {
    method: 'POST',
    pattern: new RegExp(`^/tx/${ID}/rollback$`),
    handle: async ({ params: [id], engine }) => {
      await engine.execute({ kind: 'transaction', transaction: { kind: 'rollback', transactionId: id } })
      return ok({ message: `Transaction (${id}) has been rolled back.` })
    }
  },

  // raw statements
  {
    method: 'POST',
    pattern: /^\/query\/raw$/,
    handle: async ({ body, engine, txId }) => {
      notInTransaction(txId, 'query.raw')
      const result = await engine.execute({
        kind: 'query',
        query: {
          kind: 'statement',
          language: 'cypher',
          statement: body.query,
          parameters: body.params ?? null
        }
      })
      return ok({ records: result.rows ?? [] })
    }
  },

  // text indexes and keyword search
  { method: 'GET', pattern: /^\/text-indexes$/, handle: async ({ engine }) => ok(await textIndexes(engine)) },
  {
    method: 'POST',
    pattern: /^\/text-indexes$/,
    handle: async ({ body, engine }) => {
      const taken = new Set((await declaredIndexes(engine)).map((index) => String(index.name)))
      if (body.name !== undefined && taken.has(body.name)) {
        throw httpError(409, `An index named "${body.name}" already exists`)
      }
      const result = await engine.execute({
        kind: 'index',
        index: {
          kind: 'create',
          definition: {
            name: body.name ?? firstFree(defaultTextIndexName(body as any), taken),
            label: body.label,
            property: body.property,
            kind: 'text',
            consistency: body.consistency ?? 'eventual'
          }
        }
      })
      return ok(toTextIndex(result.index))
    }
  },
  {
    method: 'POST',
    pattern: /^\/text-indexes\/name-suggestion$/,
    handle: async ({ body, engine }) => {
      const taken = new Set((await declaredIndexes(engine)).map((index) => String(index.name)))
      return ok({ name: firstFree(defaultTextIndexName(body as any), taken) })
    }
  },
  {
    method: 'DELETE',
    pattern: new RegExp(`^/text-indexes/${ID}$`),
    handle: async ({ params: [encoded], engine }) => {
      const name = decodeURIComponent(encoded)
      if (!(await textIndexes(engine)).some((index) => index.name === name)) {
        throw httpError(404, `No text index named "${name}"`)
      }
      await engine.execute({ kind: 'index', index: { kind: 'drop', name } })
      return ok({ deleted: true })
    }
  },
  {
    method: 'POST',
    pattern: /^\/search\/text$/,
    handle: async ({ body, engine }) => {
      if (typeof body.query !== 'string' || body.query.trim() === '') {
        throw httpError(422, 'query is required')
      }
      const leg = await textLeg(engine, body, body.labels ?? [])
      const result = await engine.execute({
        kind: 'query',
        query: {
          kind: 'hybrid',
          query: {
            labels: body.labels?.length ? body.labels : [leg.label],
            predicate: body.where ?? {},
            text: { index: leg.index, query: leg.query, allTerms: leg.allTerms, phrase: leg.phrase },
            offset: body.skip ?? 0,
            limit: body.limit ?? 10
          }
        }
      })
      const data = toSdkRecords(result.records)
      return ok(data, {
        total: result.textSearch?.matches ?? data.length,
        meta: { textSearch: result.textSearch }
      })
    }
  },

  // schema, vector indexes and vector search
  {
    method: 'POST',
    pattern: /^\/ai\/schema$/,
    handle: async ({ body, engine }) => ok(await buildSchema(engine, body.labels, toEmbeddingIndex))
  },
  {
    method: 'POST',
    pattern: /^\/ai\/schema\/md$/,
    handle: async ({ body, engine }) =>
      ok(buildSchemaMarkdown(await buildSchema(engine, body.labels, toEmbeddingIndex)))
  },
  { method: 'POST', pattern: /^\/ai\/search-query$/, handle: cloudOnly('ai.search') },
  { method: 'POST', pattern: /^\/ai\/search$/, handle: vectorSearch },
  {
    method: 'GET',
    pattern: /^\/ai\/indexes$/,
    handle: async ({ engine }) => ok((await vectorIndexes(engine)).map(toEmbeddingIndex))
  },
  {
    method: 'POST',
    pattern: /^\/ai\/indexes$/,
    handle: async ({ body, engine }) => {
      if (body.sourceType !== 'external') {
        throw new CloudOnlyError('ai.indexes.create', CLOUD_ONLY_FORMS['ai.indexes.create'])
      }
      const dimensions = Number(body.dimensions)
      if (!Number.isInteger(dimensions) || dimensions < 1 || dimensions > 4096) {
        throw httpError(422, 'dimensions must be an integer between 1 and 4096')
      }
      const similarity = body.similarityFunction ?? 'cosine'
      const existing = await vectorIndexes(engine)
      const duplicate = existing.find(
        (index) =>
          index.label === body.label &&
          index.property === body.propertyName &&
          index.similarity === similarity &&
          Number(index.dimensions) === dimensions
      )
      if (duplicate) {
        throw httpError(
          409,
          `An embedding index for label "${body.label}", property "${body.propertyName}", sourceType "external", similarityFunction "${similarity}", and dimensions ${dimensions} already exists ("${duplicate.name}")`
        )
      }
      const taken = new Set(existing.map((index) => String(index.name)))
      if (body.name !== undefined && taken.has(body.name)) {
        throw httpError(409, `An embedding index named "${body.name}" already exists`)
      }
      const result = await engine.execute({
        kind: 'index',
        index: {
          kind: 'createVector',
          definition: {
            label: body.label,
            property: body.propertyName,
            dimensions,
            similarity,
            name: body.name ?? firstFree(defaultVectorIndexName(body, dimensions, similarity), taken)
          }
        }
      })
      return ok(toEmbeddingIndex(result.index))
    }
  },
  {
    method: 'DELETE',
    pattern: new RegExp(`^/ai/indexes/${ID}$`),
    handle: async ({ params: [name], engine }) => {
      await engine.execute({ kind: 'index', index: { kind: 'dropVector', name: decodeURIComponent(name) } })
      return ok({ deleted: true, queued: false })
    }
  },
  {
    method: 'GET',
    pattern: new RegExp(`^/ai/indexes/${ID}/stats$`),
    handle: async ({ params: [name], engine }) => {
      const result = await engine.execute({
        kind: 'describe',
        describe: { kind: 'vectorIndex', name: decodeURIComponent(name) }
      })
      return ok({ ...result.stats, index: toEmbeddingIndex(result.stats?.index ?? {}) })
    }
  },
  {
    method: 'POST',
    pattern: new RegExp(`^/ai/indexes/${ID}/vectors/upsert$`),
    handle: async ({ body, params: [name], engine }) => {
      const result = await engine.execute({
        kind: 'index',
        index: { kind: 'upsertVectors', name: decodeURIComponent(name), items: body.items ?? [] }
      })
      return ok({ updated: result.updated, requested: result.requested })
    }
  },

  // platform settings
  { method: 'GET', pattern: /^\/sdk\/settings$/, handle: cloudOnly('settings.get') }
]

/** The routes direct mode answers, as `METHOD pattern` (for tests and docs). */
export const DIRECT_ROUTES = routes.map((route) => `${route.method} ${route.pattern.source}`)

/**
 * A fetcher with `createFetcher`'s signature that answers from a standalone
 * engine instead of sending the request to RushDB Cloud.
 */
export const createDirectFetcher =
  (engine: DirectEngine) =>
  async <Data extends Record<string, any> = Record<string, any>>(
    input: URL | string,
    { method = 'GET', headers, requestData }: MakeRequestConfig<any>
  ): Promise<Data> => {
    const url = new URL(String(input), 'http://direct')
    // A literal path (`/relationships/search`) wins over a parameter
    // (`/relationships/:id`).
    const route = routes
      .filter((candidate) => candidate.method === method && candidate.pattern.test(url.pathname))
      .sort((a, b) => a.pattern.source.split('(').length - b.pattern.source.split('(').length)[0]
    if (!route) {
      throw new DirectModeError(`${method} ${url.pathname} has no direct-mode mapping`)
    }
    const params = (route.pattern.exec(url.pathname) ?? []).slice(1)
    const txId = (headers as Record<string, string> | undefined)?.['x-transaction-id']
    return (await route.handle({
      body: (requestData as Body) ?? {},
      params,
      query: url.searchParams,
      txId,
      engine
    })) as unknown as Data
  }
