[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / FieldProfile

# Type Alias: FieldProfile

> **FieldProfile** = `object`

Defined in: [api/ingest-types.ts:342](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L342)

One field of a stream as sampled for the field review.

## Properties

### coverage

> **coverage**: `number`

Defined in: [api/ingest-types.ts:346](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L346)

Share of sampled records that have a value.

***

### example?

> `optional` **example?**: `string`

Defined in: [api/ingest-types.ts:349](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L349)

A masked example (never a raw value of a field that looks like personal data).

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:343](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L343)

***

### pii?

> `optional` **pii?**: [`PiiFinding`](PiiFinding.md)

Defined in: [api/ingest-types.ts:347](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L347)

***

### suggestion

> **suggestion**: `"include"` \| `"exclude"` \| `"hash"`

Defined in: [api/ingest-types.ts:351](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L351)

What the doctrine would do with it now.

***

### type

> **type**: [`ImportColumnType`](ImportColumnType.md) \| `"array"` \| `"null"`

Defined in: [api/ingest-types.ts:344](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L344)
