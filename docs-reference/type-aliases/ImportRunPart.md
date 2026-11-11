[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportRunPart

# Type Alias: ImportRunPart

> **ImportRunPart** = `object`

Defined in: [api/ingest-types.ts:32](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L32)

Progress of one file or one stream of a run.

## Properties

### bytes?

> `optional` **bytes?**: `number`

Defined in: [api/ingest-types.ts:40](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L40)

***

### deleted?

> `optional` **deleted?**: `number`

Defined in: [api/ingest-types.ts:38](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L38)

***

### error?

> `optional` **error?**: `string`

Defined in: [api/ingest-types.ts:43](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L43)

***

### errors?

> `optional` **errors?**: `number`

Defined in: [api/ingest-types.ts:42](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L42)

***

### label?

> `optional` **label?**: `string`

Defined in: [api/ingest-types.ts:33](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L33)

***

### links?

> `optional` **links?**: `number`

Defined in: [api/ingest-types.ts:39](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L39)

***

### records

> **records**: `number`

Defined in: [api/ingest-types.ts:37](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L37)

***

### status

> **status**: `"pending"` \| `"running"` \| `"done"` \| `"failed"` \| `"skipped"`

Defined in: [api/ingest-types.ts:36](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L36)

***

### title?

> `optional` **title?**: `string`

Defined in: [api/ingest-types.ts:35](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L35)

What the part is when it is not one label's records (a link step).

***

### totalBytes?

> `optional` **totalBytes?**: `number`

Defined in: [api/ingest-types.ts:41](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L41)
