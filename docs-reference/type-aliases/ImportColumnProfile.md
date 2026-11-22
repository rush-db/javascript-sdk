[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportColumnProfile

# Type Alias: ImportColumnProfile

> **ImportColumnProfile** = `object`

Defined in: [api/ingest-types.ts:213](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L213)

## Properties

### distinct

> **distinct**: `number`

Defined in: [api/ingest-types.ts:218](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L218)

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:214](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L214)

***

### nulls

> **nulls**: `number`

Defined in: [api/ingest-types.ts:217](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L217)

***

### pii?

> `optional` **pii?**: [`PiiFinding`](PiiFinding.md)

Defined in: [api/ingest-types.ts:222](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L222)

Looks like personal data (by name or sampled values); its samples are masked then.

***

### samples

> **samples**: `unknown`[]

Defined in: [api/ingest-types.ts:216](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L216)

***

### suggestion

> **suggestion**: `"include"` \| `"skip"` \| `"hash"`

Defined in: [api/ingest-types.ts:224](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L224)

What to do with the column by default: personal data that joins (email, phone) is hashed, other personal data skipped.

***

### type

> **type**: [`ImportColumnType`](ImportColumnType.md)

Defined in: [api/ingest-types.ts:215](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L215)

***

### unique

> **unique**: `boolean`

Defined in: [api/ingest-types.ts:220](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L220)

Every sampled non-empty value is different.
