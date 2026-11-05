[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertyValuesSearch

# Type Alias: PropertyValuesSearch

> **PropertyValuesSearch** = `object`

Defined in: [types/value.ts:69](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L69)

Value-search options for `db.properties.values`.

## Properties

### domainOnMiss?

> `optional` **domainOnMiss?**: `number`

Defined in: [types/value.ts:76](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L76)

With no match, list every value of a property holding at most this many.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [types/value.ts:74](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L74)

Most values returned, by record count (default 100 with `query`).

***

### match?

> `optional` **match?**: [`ValueMatchMode`](ValueMatchMode.md)

Defined in: [types/value.ts:72](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L72)

***

### minSimilarity?

> `optional` **minSimilarity?**: `number`

Defined in: [types/value.ts:78](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L78)

`similar` only: least similarity, 0 to 1 (default 0.6).

***

### query?

> `optional` **query?**: `string`

Defined in: [types/value.ts:71](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L71)

Keep the values whose text matches.
