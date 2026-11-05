[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertyValuesData

# Type Alias: PropertyValuesData

> **PropertyValuesData** = `object`

Defined in: [types/value.ts:53](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L53)

## Properties

### counts?

> `optional` **counts?**: `number`[]

Defined in: [types/value.ts:58](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L58)

Record counts aligned with `values` (a searched or `limit`ed read).

***

### distinctCount?

> `optional` **distinctCount?**: `number`

Defined in: [types/value.ts:60](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L60)

Distinct values matching the search, before `limit`.

***

### max?

> `optional` **max?**: `number`

Defined in: [types/value.ts:54](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L54)

***

### min?

> `optional` **min?**: `number`

Defined in: [types/value.ts:55](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L55)

***

### searchMissed?

> `optional` **searchMissed?**: `boolean`

Defined in: [types/value.ts:62](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L62)

The search matched nothing and `values` lists the whole (small) domain (`domainOnMiss`).

***

### values

> **values**: [`PropertyValue`](PropertyValue.md)[]

Defined in: [types/value.ts:56](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L56)
