import type { DBRecord } from '../sdk/record.js'
import type { Schema, SearchQuery, Where } from '../types/index.js'

export type ApiResponse<T, E = Record<string, any>> = {
  data: T
  success: boolean
  total?: number
} & E

/** An embedding index policy stored in RushDB. */
export type EmbeddingIndex = {
  id: string
  /**
   * Public index name, unique within the project, e.g.
   * `Book.description.text-embedding-3-small.1536.cosine`. Search and inline
   * vectors may address the index by it.
   */
  name: string
  projectId: string
  /** Record label this index is scoped to (e.g. "Book"). */
  label: string
  propertyName: string
  modelKey: string
  sourceType: 'managed' | 'external'
  similarityFunction: 'cosine' | 'euclidean'
  dimensions: number
  vectorPropertyName: string
  enabled: boolean
  /** 'pending' | 'indexing' | 'awaiting_vectors' | 'ready' | 'error' */
  status: string
  createdAt: string
  updatedAt: string
}

/** Parameters for creating a new embedding index. */
export type CreateEmbeddingIndexParams = {
  /**
   * Index name, unique within the project: 1–64 characters of letters,
   * digits, `.`, `_`, `:` or `-`. Defaults to
   * `<label>.<property>.<model>.<dimensions>.<similarity>`.
   */
  name?: string
  /** Record label to scope this index to (e.g. "Book", "Task"). */
  label: string
  propertyName: string
  sourceType?: 'managed' | 'external'
  /**
   * Shorthand for `sourceType: 'external'`.
   * When `true`, the index will be created with `sourceType: 'external'` regardless of the `sourceType` field.
   */
  external?: boolean
  similarityFunction?: 'cosine' | 'euclidean'
  dimensions?: number
}

/**
 * A single vector entry for inline vector upsert.
 * Provided alongside record data in create/upsert/set calls.
 */
export type VectorEntry = {
  /** Name of the property whose embedding index should be written to. */
  propertyName: string
  /** The embedding vector to store. Its length must match the index dimensions. */
  vector: number[]
  /**
   * Required when two indexes share the same `propertyName` and `dimensions` but differ in
   * `similarityFunction`. Omit when there is only one matching index.
   */
  similarityFunction?: 'cosine' | 'euclidean'
  /** The index to write to, by name (or id). Overrides selection by shape. */
  index?: string
}

export type UpsertEmbeddingVectorItem = {
  recordId: string
  vector: number[]
}

export type UpsertEmbeddingVectorsParams = {
  items: UpsertEmbeddingVectorItem[]
}

export type UpsertEmbeddingVectorsResult = {
  updated: number
  requested: number
}

/** Indexing statistics for an embedding index. */
export type EmbeddingIndexStats = {
  totalRecords: number
  indexedRecords: number
}

/** Parameters for vector search over an embedding index. */
export type VectorSearchParams = {
  /**
   * The index to search, by name (or id). When given, `propertyName` and
   * `labels` default to the index's own.
   */
  index?: string
  /** Name of the indexed property to search against. Required unless `index` is given. */
  propertyName?: string
  /** Free-text query that will be embedded and compared against indexed vectors. */
  query?: string
  /** External vector query. Use instead of query text for external indexes. */
  queryVector?: number[]
  /**
   * One or more record labels to scope the search.
   * The first label is used to resolve which embedding index to use.
   * Required unless `index` is given.
   */
  labels?: string[]
  sourceType?: 'managed' | 'external'
  similarityFunction?: 'cosine' | 'euclidean'
  dimensions?: number
  /**
   * Optional filter applied before cosine scoring.
   * Candidates are narrowed via MATCH/WHERE and then ranked by similarity.
   */
  where?: Record<string, unknown>
  /** Number of results to skip for pagination (default 0). */
  skip?: number
  /**
   * How the search ranks candidates. `auto` (default): the engine scores every
   * vector of a small index exactly and uses its ANN graph on a large one.
   * `exact` / `ann` force a path (`ann` needs a cosine index).
   */
  mode?: 'auto' | 'exact' | 'ann'
  /** ANN gather breadth when the search runs on the ANN graph. */
  ef?: number
  /**
   * Keep only results scoring at least this much. Scores depend on the
   * embedding model, so pick the threshold per model; a page may then hold
   * fewer than `limit` results.
   */
  scoreThreshold?: number
  /** Maximum number of results to return (default 20). */
  limit?: number
  /**
   * Adds a BM25 keyword leg, making it a hybrid search: the engine ranks both
   * legs among the same filtered records and fuses the two rankings. `query`
   * defaults to the semantic `query`; the text index defaults to the one ready
   * text index of the first label.
   */
  text?: Partial<Pick<TextSearchParams, 'query' | 'index' | 'property' | 'allTerms' | 'phrase'>> & {
    /** This leg's share of the fused score (≥ 0, default 1). */
    weight?: number
    /** Hits this leg ranks before fusion (1–10,000; default 4 × (skip + limit)). */
    prefetchLimit?: number
  }
  /** Hybrid only: the vector leg's share of the fused score (≥ 0, default 1). */
  weight?: number
  /** Hybrid only: hits the vector leg ranks before fusion (1–10,000). */
  prefetchLimit?: number
  /**
   * Hybrid only: how the legs combine. `rrf` (default) fuses ranks; `dbsf`
   * fuses each leg's scores normalized by its own distribution (mean ± 3σ).
   */
  fusion?: 'rrf' | 'dbsf'
  /** Hybrid only: the RRF smoothing constant (default 60). */
  rrfK?: number
}

/** A BM25 text index. */
export type TextIndex = {
  /** Index name, unique within the project. */
  name: string
  label: string
  /** The indexed property, or `*` for every string of the record. */
  property: string
  /** `eventual` (searches see changes shortly after they commit) or `immediate`. */
  consistency: 'eventual' | 'immediate'
  status: 'building' | 'ready' | 'dropping'
  /** Changes the index has not applied yet. */
  pending: number
}

export type CreateTextIndexParams = {
  label: string
  /** A property name, or `*` for every string of the record. */
  property: string
  /** Defaults to `<label>.<property>.text` (`all` for `*`), unique within the project. */
  name?: string
  consistency?: 'eventual' | 'immediate'
}

/** Parameters for keyword (BM25) search. */
export type TextSearchParams = {
  /** Keywords; `"a phrase"`, `-excluded` and `+required` follow the query syntax. */
  query: string
  /** The text index, by name; otherwise the one ready text index of the first label. */
  index?: string
  /** Narrows the choice of text index to one over this property. */
  property?: string
  labels?: string[]
  /** Filter applied before ranking. */
  where?: Record<string, unknown>
  skip?: number
  /** Maximum number of results (default 10). */
  limit?: number
  /** Every keyword must match (AND) instead of any (OR). */
  allTerms?: boolean
  /** Match the keywords as one phrase. */
  phrase?: boolean
}

/** How the engine ran a keyword search, or the keyword leg of a hybrid one. */
export type TextSearchReport = {
  /** Records matching the keywords among the filtered records. */
  matches: number
  /** Changes the index had not applied when the search ran. */
  pending: number
}

/**
 * A record returned by db.records.vectorSearch().
 * Identical to DBRecord but with __score guaranteed present — never optional.
 * __score is the cosine similarity between the query vector and this record's embedding (0–1,
 * higher = more similar). It is only injected by the semantic search path; regular
 * db.records.find() / db.records.search() results are plain DBRecord and never carry __score.
 */
export type VectorSearchResult<S extends Schema = Schema> = DBRecord<S> & {
  readonly __score: number
}

/** How the engine ran a vector search. */
export type VectorSearchReport = {
  /** The path that produced the results. */
  mode: 'exact' | 'ann'
  /** Gather breadth, for an ANN search. */
  ef?: number
  /**
   * Why a search that would use the ANN graph was answered exactly:
   * `metric`, `budget`, `lowConfidence`, or `annWarming` (the graph is being
   * built; later searches use it).
   */
  fallback?: 'metric' | 'budget' | 'lowConfidence' | 'annWarming'
  /** Vectors in the index. */
  pool: number
}

/** @deprecated Use VectorSearchParams. */
export type SemanticSearchParams = VectorSearchParams

/** @deprecated Use VectorSearchResult. */
export type SemanticSearchResult<S extends Schema = Schema> = VectorSearchResult<S>

export type SmartSearchOptions<S extends Schema = Schema> = {
  /**
   * Optional current dashboard/query-builder state. The server may use it as context
   * when converting the natural-language prompt into a SearchQuery.
   */
  currentQuery?: SearchQuery<S>
}

export type SmartSearchQueryResponse<S extends Schema = Schema> = {
  searchQuery: SearchQuery<S>
  warnings: string[]
}

export type RelationshipPatternStatus = 'suggested' | 'approved' | 'ignored' | 'error'
export type RelationshipPatternOrigin = 'llm' | 'manual'
export type RelationshipPatternDirection = 'in' | 'out'
export type RelationshipPatternMode = 'join_pattern' | 'retype_existing_relationship'

export type RelationshipPatternEndpoint = {
  label: string
  key?: string
  where?: Where
}

export type RelationshipPatternDto = {
  id: string
  status: RelationshipPatternStatus
  origin: RelationshipPatternOrigin
  source: RelationshipPatternEndpoint
  target: RelationshipPatternEndpoint
  direction: RelationshipPatternDirection
  type: string
  mode: RelationshipPatternMode
  confidence: number
  rationale?: string
  sampleMatchCount?: number
  lastAppliedAt?: string
  lastAnalyzedAt?: string
  lastError?: string
  createdAt: string
  updatedAt: string
}

export type RelationshipPattern = RelationshipPatternDto

export type RelationshipPatternListResponse = {
  patterns: RelationshipPatternDto[]
  relationships: Array<{
    label: string
    relationships: Array<{ label: string; type: string; direction: string }>
  }>
  analysis?: {
    status: string
    requestedAt?: string
    notBefore?: string
    lastRunAt?: string
    lastError?: string
  }
}

export type DeleteRelationshipPatternOptions = {
  deleteExisting?: boolean
}
