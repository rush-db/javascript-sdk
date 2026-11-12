[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportColumnProfile

# Type Alias: ImportColumnProfile

> **ImportColumnProfile** = `object`

Defined in: [api/ingest-types.ts:204](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L204)

## Properties

### distinct

> **distinct**: `number`

Defined in: [api/ingest-types.ts:209](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L209)

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:205](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L205)

***

### nulls

> **nulls**: `number`

Defined in: [api/ingest-types.ts:208](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L208)

***

### pii?

> `optional` **pii?**: [`PiiFinding`](PiiFinding.md)

Defined in: [api/ingest-types.ts:213](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L213)

Looks like personal data (by name or sampled values); its samples are masked then.

***

### samples

> **samples**: `unknown`[]

Defined in: [api/ingest-types.ts:207](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L207)

***

### suggestion

> **suggestion**: `"include"` \| `"skip"` \| `"hash"`

Defined in: [api/ingest-types.ts:215](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L215)

What to do with the column by default: personal data that joins (email, phone) is hashed, other personal data skipped.

***

### type

> **type**: [`ImportColumnType`](ImportColumnType.md)

Defined in: [api/ingest-types.ts:206](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L206)

***

### unique

> **unique**: `boolean`

Defined in: [api/ingest-types.ts:211](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L211)

Every sampled non-empty value is different.
