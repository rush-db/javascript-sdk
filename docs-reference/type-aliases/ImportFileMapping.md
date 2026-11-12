[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportFileMapping

# Type Alias: ImportFileMapping

> **ImportFileMapping** = `object`

Defined in: [api/ingest-types.ts:120](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L120)

How one file maps to the graph.

## Properties

### delimiter?

> `optional` **delimiter?**: `string`

Defined in: [api/ingest-types.ts:129](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L129)

CSV only.

***

### hash?

> `optional` **hash?**: `string`[]

Defined in: [api/ingest-types.ts:125](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L125)

Columns kept as a keyed hash: personal data that should still join across sources, not readable.

***

### keyColumn?

> `optional` **keyColumn?**: `string`

Defined in: [api/ingest-types.ts:122](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L122)

Column whose value identifies a row across imports: re-importing the file upserts.

***

### rename?

> `optional` **rename?**: `Record`\<`string`, `string`\>

Defined in: [api/ingest-types.ts:126](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L126)

***

### skip?

> `optional` **skip?**: `string`[]

Defined in: [api/ingest-types.ts:123](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L123)

***

### types?

> `optional` **types?**: `Record`\<`string`, [`ImportColumnType`](ImportColumnType.md)\>

Defined in: [api/ingest-types.ts:127](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L127)
