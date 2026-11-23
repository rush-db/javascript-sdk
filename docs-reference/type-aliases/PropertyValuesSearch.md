[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertyValuesSearch

# Type Alias: PropertyValuesSearch

> **PropertyValuesSearch** = `object`

Defined in: [types/value.ts:129](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L129)

Value-search options for `db.properties.values`.

## Properties

### domainOnMiss?

> `optional` **domainOnMiss?**: `number`

Defined in: [types/value.ts:136](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L136)

With no match, list every value of a property holding at most this many.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types/value.ts:134](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L134)

Most values returned, by record count (default 100 with `query`).

***

### match?

> `optional` **match?**: [`ValueMatchMode`](ValueMatchMode.md)

Defined in: [types/value.ts:132](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L132)

***

### minSimilarity?

> `optional` **minSimilarity?**: `number`

Defined in: [types/value.ts:138](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L138)

`similar` only: least similarity, 0 to 1 (default 0.6).

***

### query?

> `optional` **query?**: `string`

Defined in: [types/value.ts:131](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L131)

Keep the values whose text matches.
