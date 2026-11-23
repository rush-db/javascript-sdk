import { FetchHttpClient } from './network/FetchHttpClient.js'
import { HttpClient, HttpClientResponse } from './network/HttpClient.js'
import { initSDK, RushDB } from './sdk/index.js'
import {
  type ApiResponse,
  type CreateEmbeddingIndexParams,
  type CreateTextIndexParams,
  type CreatePropertyIndexParams,
  type DeleteRelationshipPatternOptions,
  type IngestChunkFailure,
  type EmbeddingIndex,
  type EmbeddingIndexStats,
  type RelationshipPattern,
  type RelationshipPatternDirection,
  type RelationshipPatternDto,
  type RelationshipPatternEndpoint,
  type RelationshipPatternListResponse,
  type RelationshipPatternMode,
  type RelationshipPatternOrigin,
  type RelationshipPatternStatus,
  type SemanticSearchParams,
  type SemanticSearchResult,
  type SimilarityFunction,
  type UpsertEmbeddingVectorItem,
  type UpsertEmbeddingVectorsParams,
  type UpsertEmbeddingVectorsResult,
  type PropertyIndex,
  type TextIndex,
  type TextSearchParams,
  type TextSearchReport,
  type VectorSearchParams,
  type VectorSearchReport,
  type VectorSearchResult,
  type WaitForPending,
  RestAPI
} from './api/index.js'

initSDK(new FetchHttpClient())

export {
  RushDB,
  HttpClient,
  HttpClientResponse,
  RestAPI,
  type ApiResponse,
  type EmbeddingIndex,
  type CreateEmbeddingIndexParams,
  type CreateTextIndexParams,
  type CreatePropertyIndexParams,
  type DeleteRelationshipPatternOptions,
  type EmbeddingIndexStats,
  type RelationshipPattern,
  type RelationshipPatternDirection,
  type RelationshipPatternDto,
  type RelationshipPatternEndpoint,
  type RelationshipPatternListResponse,
  type RelationshipPatternMode,
  type RelationshipPatternOrigin,
  type RelationshipPatternStatus,
  type SemanticSearchParams,
  type SemanticSearchResult,
  type SimilarityFunction,
  type UpsertEmbeddingVectorItem,
  type UpsertEmbeddingVectorsParams,
  type UpsertEmbeddingVectorsResult,
  type PropertyIndex,
  type TextIndex,
  type TextSearchParams,
  type TextSearchReport,
  type VectorSearchParams,
  type VectorSearchReport,
  type VectorSearchResult,
  type WaitForPending,
  type IngestChunkFailure
}
export * from './types/index.js'
export * from './api/ingest-types.js'
export type { ImportsApi } from './api/imports.js'
export type { ConnectionsApi } from './api/connections.js'
export * from './sdk/index.js'
export {
  CLOUD_ONLY_FORMS,
  CLOUD_ONLY_METHODS,
  isCloudOnlyMethod,
  type CloudOnlyMethod
} from './direct/capabilities.js'

export {
  PROPERTY_TYPES,
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_DATE,
  PROPERTY_TYPE_DATETIME,
  PROPERTY_TYPE_DURATION,
  PROPERTY_TYPE_LOCALDATETIME,
  PROPERTY_TYPE_LOCALTIME,
  PROPERTY_TYPE_NUMBER,
  PROPERTY_TYPE_POINT,
  PROPERTY_TYPE_STRING,
  ORDERED_PROPERTY_TYPES,
  RECOMMENDED_INGEST_CHUNK_SIZE,
  RECOMMENDED_NESTED_INGEST_CHUNK_SIZE
} from './common/constants.js'

export default RushDB
