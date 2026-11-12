[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / FieldPolicy

# Type Alias: FieldPolicy

> **FieldPolicy** = `object`

Defined in: [api/ingest-types.ts:322](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L322)

Which fields of a stream reach the graph. `auto` keeps every field except
what is excluded or hashed; `allowlist` keeps only reviewed fields
(`include`, `hash`), and new fields wait in `unreviewed`.

## Properties

### exclude?

> `optional` **exclude?**: `string`[]

Defined in: [api/ingest-types.ts:325](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L325)

***

### hash?

> `optional` **hash?**: `string`[]

Defined in: [api/ingest-types.ts:327](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L327)

Kept as a keyed hash: joinable with the same value hashed elsewhere in the project, not readable.

***

### include?

> `optional` **include?**: `string`[]

Defined in: [api/ingest-types.ts:324](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L324)

***

### mode

> **mode**: `"auto"` \| `"allowlist"`

Defined in: [api/ingest-types.ts:323](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L323)

***

### reviewedAt?

> `optional` **reviewedAt?**: `string`

Defined in: [api/ingest-types.ts:328](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L328)

***

### reviewedBy?

> `optional` **reviewedBy?**: `string`

Defined in: [api/ingest-types.ts:329](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L329)
