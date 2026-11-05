[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / SearchValuesParams

# Type Alias: SearchValuesParams

> **SearchValuesParams** = `object`

Defined in: [types/value.ts:82](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L82)

Parameters of `db.ai.searchValues`.

## Properties

### caseSensitive?

> `optional` **caseSensitive?**: `boolean`

Defined in: [types/value.ts:85](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L85)

***

### labels?

> `optional` **labels?**: `string`[]

Defined in: [types/value.ts:88](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L88)

Labels to search (all when omitted).

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types/value.ts:90](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L90)

Most matches (default 50, at most 1000).

***

### match?

> `optional` **match?**: [`ValueMatchMode`](ValueMatchMode.md)

Defined in: [types/value.ts:84](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L84)

***

### minSimilarity?

> `optional` **minSimilarity?**: `number`

Defined in: [types/value.ts:86](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L86)

***

### text

> **text**: `string`

Defined in: [types/value.ts:83](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L83)
