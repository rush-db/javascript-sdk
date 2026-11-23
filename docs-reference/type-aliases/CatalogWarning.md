[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CatalogWarning

# Type Alias: CatalogWarning

> **CatalogWarning** = `object`

Defined in: [types/value.ts:115](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L115)

The catalog check's finding for a query: a label (`unknownLabel`), a
property (`unknownProperty`) or a compared text (`unknownValue`) that no
record holds, with what the query most likely meant.

## Properties

### kind

> **kind**: `"unknownLabel"` \| `"unknownProperty"` \| `"unknownValue"` \| `string` & `object`

Defined in: [types/value.ts:116](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L116)

***

### label?

> `optional` **label?**: `string`

Defined in: [types/value.ts:117](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L117)

***

### labels?

> `optional` **labels?**: `string`[]

Defined in: [types/value.ts:118](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L118)

***

### property?

> `optional` **property?**: `string`

Defined in: [types/value.ts:119](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L119)

***

### suggestions?

> `optional` **suggestions?**: [`CatalogSuggestion`](CatalogSuggestion.md)[]

Defined in: [types/value.ts:122](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L122)

Omitted when there is nothing to suggest.

***

### value?

> `optional` **value?**: [`PropertyValue`](PropertyValue.md)

Defined in: [types/value.ts:120](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L120)
