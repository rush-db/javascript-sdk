[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreatePropertyIndexParams

# Type Alias: CreatePropertyIndexParams

> **CreatePropertyIndexParams** = `object`

Defined in: [api/types.ts:208](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L208)

## Properties

### label

> **label**: `string`

Defined in: [api/types.ts:209](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L209)

***

### name?

> `optional` **name?**: `string`

Defined in: [api/types.ts:214](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L214)

Defaults to `<label>.<property>.ordered` or `<label>.<property>.unique`, unique within the project.

***

### property

> **property**: `string`

Defined in: [api/types.ts:210](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L210)

***

### unique?

> `optional` **unique?**: `boolean`

Defined in: [api/types.ts:212](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L212)

Refuse a write that repeats a value under the label (RushDB 3.0.14 and later). Default `false`.
