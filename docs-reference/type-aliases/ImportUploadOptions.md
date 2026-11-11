[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportUploadOptions

# Type Alias: ImportUploadOptions

> **ImportUploadOptions** = `object`

Defined in: [api/ingest-types.ts:264](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L264)

## Properties

### onProgress?

> `optional` **onProgress?**: (`progress`) => `void`

Defined in: [api/ingest-types.ts:271](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L271)

#### Parameters

##### progress

[`ImportUploadProgress`](ImportUploadProgress.md)

#### Returns

`void`

***

### parallelism?

> `optional` **parallelism?**: `number`

Defined in: [api/ingest-types.ts:266](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L266)

Parts uploaded at once (`s3-multipart`). Default 4.

***

### retries?

> `optional` **retries?**: `number`

Defined in: [api/ingest-types.ts:268](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L268)

Attempts per part (or per direct upload) on a network error or 5xx/429. Default 3.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [api/ingest-types.ts:270](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L270)

Per-request timeout in ms. Default 10 minutes.
