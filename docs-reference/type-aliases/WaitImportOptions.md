[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / WaitImportOptions

# Type Alias: WaitImportOptions

> **WaitImportOptions** = `object`

Defined in: [api/ingest-types.ts:312](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L312)

## Properties

### intervalMs?

> `optional` **intervalMs?**: `number`

Defined in: [api/ingest-types.ts:314](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L314)

Poll interval in ms. Default 2000.

***

### onProgress?

> `optional` **onProgress?**: (`run`) => `void`

Defined in: [api/ingest-types.ts:317](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L317)

#### Parameters

##### run

[`ImportRun`](ImportRun.md)

#### Returns

`void`

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [api/ingest-types.ts:316](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L316)

Give up after this many ms (rejects). Default: no limit.
