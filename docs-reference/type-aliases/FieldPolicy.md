[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / FieldPolicy

# Type Alias: FieldPolicy

> **FieldPolicy** = `object`

Defined in: [api/ingest-types.ts:331](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L331)

Which fields of a stream reach the graph. `auto` keeps every field except
what is excluded or hashed; `allowlist` keeps only reviewed fields
(`include`, `hash`), and new fields wait in `unreviewed`.

## Properties

### exclude?

> `optional` **exclude?**: `string`[]

Defined in: [api/ingest-types.ts:334](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L334)

***

### hash?

> `optional` **hash?**: `string`[]

Defined in: [api/ingest-types.ts:336](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L336)

Kept as a keyed hash: joinable with the same value hashed elsewhere in the project, not readable.

***

### include?

> `optional` **include?**: `string`[]

Defined in: [api/ingest-types.ts:333](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L333)

***

### mode

> **mode**: `"auto"` \| `"allowlist"`

Defined in: [api/ingest-types.ts:332](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L332)

***

### reviewedAt?

> `optional` **reviewedAt?**: `string`

Defined in: [api/ingest-types.ts:337](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L337)

***

### reviewedBy?

> `optional` **reviewedBy?**: `string`

Defined in: [api/ingest-types.ts:338](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L338)
