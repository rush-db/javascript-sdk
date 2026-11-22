[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / IngestChunkFailure

# Type Alias: IngestChunkFailure

> **IngestChunkFailure** = `object`

Defined in: [api/types.ts:201](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L201)

Set as `error.ingest` when a chunk of a chunked import fails. Chunks
`0 … completedChunks - 1` committed (outside a transaction) or were staged
(inside one, where nothing commits until the transaction does); the failed
chunk and the ones after it were not written.

## Properties

### chunks

> **chunks**: `number`

Defined in: [api/types.ts:202](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L202)

***

### completedChunks

> **completedChunks**: `number`

Defined in: [api/types.ts:205](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L205)

***

### completedRecords

> **completedRecords**: `number`

Defined in: [api/types.ts:207](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L207)

Records the completed chunks reported (their `total`s).

***

### failedChunk

> **failedChunk**: `number`

Defined in: [api/types.ts:204](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L204)

0-based index of the chunk whose request failed.

***

### inTransaction

> **inTransaction**: `boolean`

Defined in: [api/types.ts:208](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L208)
