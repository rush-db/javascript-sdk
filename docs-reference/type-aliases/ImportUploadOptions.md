[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportUploadOptions

# Type Alias: ImportUploadOptions

> **ImportUploadOptions** = `object`

Defined in: [api/ingest-types.ts:273](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L273)

## Properties

### onProgress?

> `optional` **onProgress?**: (`progress`) => `void`

Defined in: [api/ingest-types.ts:280](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L280)

#### Parameters

##### progress

[`ImportUploadProgress`](ImportUploadProgress.md)

#### Returns

`void`

***

### parallelism?

> `optional` **parallelism?**: `number`

Defined in: [api/ingest-types.ts:275](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L275)

Parts uploaded at once (`s3-multipart`). Default 4.

***

### retries?

> `optional` **retries?**: `number`

Defined in: [api/ingest-types.ts:277](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L277)

Attempts per part (or per direct upload) on a network error or 5xx/429. Default 3.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [api/ingest-types.ts:279](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L279)

Per-request timeout in ms. Default 10 minutes.
