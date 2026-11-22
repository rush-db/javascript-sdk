[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / SearchValuesParams

# Type Alias: SearchValuesParams

> **SearchValuesParams** = `object`

Defined in: [types/value.ts:142](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L142)

Parameters of `db.ai.searchValues`.

## Properties

### caseSensitive?

> `optional` **caseSensitive?**: `boolean`

Defined in: [types/value.ts:145](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L145)

***

### labels?

> `optional` **labels?**: `string`[]

Defined in: [types/value.ts:148](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L148)

Labels to search (all when omitted).

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types/value.ts:150](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L150)

Most matches (default 50, at most 1000).

***

### match?

> `optional` **match?**: [`ValueMatchMode`](ValueMatchMode.md)

Defined in: [types/value.ts:144](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L144)

***

### minSimilarity?

> `optional` **minSimilarity?**: `number`

Defined in: [types/value.ts:146](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L146)

***

### text

> **text**: `string`

Defined in: [types/value.ts:143](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L143)
