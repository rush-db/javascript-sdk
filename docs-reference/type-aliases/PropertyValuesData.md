[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertyValuesData

# Type Alias: PropertyValuesData

> **PropertyValuesData** = `object`

Defined in: [types/value.ts:83](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L83)

## Properties

### catalogWarnings?

> `optional` **catalogWarnings?**: [`CatalogWarning`](CatalogWarning.md)[]

Defined in: [types/value.ts:95](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L95)

Names or texts in the request no record holds, with suggestions (RushDB 3.0.14 and later).

***

### counts?

> `optional` **counts?**: `number`[]

Defined in: [types/value.ts:89](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L89)

Record counts aligned with `values` (a searched or `limit`ed read).

***

### distinctCount?

> `optional` **distinctCount?**: `number`

Defined in: [types/value.ts:91](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L91)

Distinct values matching the search, before `limit`.

***

### max?

> `optional` **max?**: `number` \| `string`

Defined in: [types/value.ts:85](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L85)

A number, or ISO 8601 text for temporal and duration properties.

***

### min?

> `optional` **min?**: `number` \| `string`

Defined in: [types/value.ts:86](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L86)

***

### searchMissed?

> `optional` **searchMissed?**: `boolean`

Defined in: [types/value.ts:93](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L93)

The search matched nothing and `values` lists the whole (small) domain (`domainOnMiss`).

***

### values

> **values**: [`PropertyValue`](PropertyValue.md)[]

Defined in: [types/value.ts:87](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L87)
