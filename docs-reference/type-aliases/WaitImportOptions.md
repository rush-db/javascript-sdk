[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / WaitImportOptions

# Type Alias: WaitImportOptions

> **WaitImportOptions** = `object`

Defined in: [api/ingest-types.ts:303](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L303)

## Properties

### intervalMs?

> `optional` **intervalMs?**: `number`

Defined in: [api/ingest-types.ts:305](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L305)

Poll interval in ms. Default 2000.

***

### onProgress?

> `optional` **onProgress?**: (`run`) => `void`

Defined in: [api/ingest-types.ts:308](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L308)

#### Parameters

##### run

[`ImportRun`](ImportRun.md)

#### Returns

`void`

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [api/ingest-types.ts:307](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L307)

Give up after this many ms (rejects). Default: no limit.
