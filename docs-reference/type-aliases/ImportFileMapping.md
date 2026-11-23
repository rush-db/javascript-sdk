[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportFileMapping

# Type Alias: ImportFileMapping

> **ImportFileMapping** = `object`

Defined in: [api/ingest-types.ts:129](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L129)

How one file maps to the graph.

## Properties

### delimiter?

> `optional` **delimiter?**: `string`

Defined in: [api/ingest-types.ts:138](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L138)

CSV only.

***

### hash?

> `optional` **hash?**: `string`[]

Defined in: [api/ingest-types.ts:134](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L134)

Columns kept as a keyed hash: personal data that should still join across sources, not readable.

***

### keyColumn?

> `optional` **keyColumn?**: `string`

Defined in: [api/ingest-types.ts:131](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L131)

Column whose value identifies a row across imports: re-importing the file upserts.

***

### rename?

> `optional` **rename?**: `Record`\<`string`, `string`\>

Defined in: [api/ingest-types.ts:135](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L135)

***

### skip?

> `optional` **skip?**: `string`[]

Defined in: [api/ingest-types.ts:132](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L132)

***

### types?

> `optional` **types?**: `Record`\<`string`, [`ImportColumnType`](ImportColumnType.md)\>

Defined in: [api/ingest-types.ts:136](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L136)
