[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / FieldProfile

# Type Alias: FieldProfile

> **FieldProfile** = `object`

Defined in: [api/ingest-types.ts:333](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L333)

One field of a stream as sampled for the field review.

## Properties

### coverage

> **coverage**: `number`

Defined in: [api/ingest-types.ts:337](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L337)

Share of sampled records that have a value.

***

### example?

> `optional` **example?**: `string`

Defined in: [api/ingest-types.ts:340](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L340)

A masked example (never a raw value of a field that looks like personal data).

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:334](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L334)

***

### pii?

> `optional` **pii?**: [`PiiFinding`](PiiFinding.md)

Defined in: [api/ingest-types.ts:338](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L338)

***

### suggestion

> **suggestion**: `"include"` \| `"exclude"` \| `"hash"`

Defined in: [api/ingest-types.ts:342](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L342)

What the doctrine would do with it now.

***

### type

> **type**: `"string"` \| `"number"` \| `"boolean"` \| `"datetime"` \| `"array"` \| `"null"`

Defined in: [api/ingest-types.ts:335](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L335)
