[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreatePropertyIndexParams

# Type Alias: CreatePropertyIndexParams

> **CreatePropertyIndexParams** = `object`

Defined in: [api/types.ts:224](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L224)

## Properties

### label

> **label**: `string`

Defined in: [api/types.ts:225](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L225)

***

### name?

> `optional` **name?**: `string`

Defined in: [api/types.ts:230](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L230)

Defaults to `<label>.<property>.ordered` or `<label>.<property>.unique`, unique within the project.

***

### property

> **property**: `string`

Defined in: [api/types.ts:226](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L226)

***

### unique?

> `optional` **unique?**: `boolean`

Defined in: [api/types.ts:228](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L228)

Refuse a write that repeats a value under the label (RushDB 3.0.14 and later). Default `false`.
