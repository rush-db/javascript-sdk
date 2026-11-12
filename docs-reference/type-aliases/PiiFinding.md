[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PiiFinding

# Type Alias: PiiFinding

> **PiiFinding** = `object`

Defined in: [api/ingest-types.ts:106](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L106)

Why a field or column looks like personal data.

## Properties

### confidence

> **confidence**: `number`

Defined in: [api/ingest-types.ts:111](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L111)

0–1.

***

### kind

> **kind**: [`PiiKind`](PiiKind.md)

Defined in: [api/ingest-types.ts:107](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L107)

***

### reason

> **reason**: `string`

Defined in: [api/ingest-types.ts:112](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L112)

***

### source

> **source**: `"name"` \| `"value"`

Defined in: [api/ingest-types.ts:109](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L109)

Where the suspicion comes from: the field name, or values that match a pattern.
