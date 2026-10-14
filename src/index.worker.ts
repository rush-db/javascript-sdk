import { FetchHttpClient } from './network/FetchHttpClient.js'
import { HttpClient, HttpClientResponse } from './network/HttpClient.js'
import { initSDK, RushDB } from './sdk/index.js'
import {
  type ApiResponse,
  type CreateEmbeddingIndexParams,
  type CreateTextIndexParams,
  type DeleteRelationshipPatternOptions,
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
  type UpsertEmbeddingVectorItem,
  type UpsertEmbeddingVectorsParams,
  type UpsertEmbeddingVectorsResult,
  type TextIndex,
  type TextSearchParams,
  type TextSearchReport,
  type VectorSearchParams,
  type VectorSearchReport,
  type VectorSearchResult,
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
  type UpsertEmbeddingVectorItem,
  type UpsertEmbeddingVectorsParams,
  type UpsertEmbeddingVectorsResult,
  type TextIndex,
  type TextSearchParams,
  type TextSearchReport,
  type VectorSearchParams,
  type VectorSearchReport,
  type VectorSearchResult
}
export * from './types/index.js'
export * from './sdk/index.js'
export {
  CLOUD_ONLY_FORMS,
  CLOUD_ONLY_METHODS,
  isCloudOnlyMethod,
  type CloudOnlyMethod
} from './direct/capabilities.js'

export default RushDB
