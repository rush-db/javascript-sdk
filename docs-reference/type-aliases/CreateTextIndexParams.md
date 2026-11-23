[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreateTextIndexParams

# Type Alias: CreateTextIndexParams

> **CreateTextIndexParams** = `object`

Defined in: [api/types.ts:186](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L186)

## Properties

### consistency?

> `optional` **consistency?**: `"eventual"` \| `"immediate"`

Defined in: [api/types.ts:192](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L192)

***

### label

> **label**: `string`

Defined in: [api/types.ts:187](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L187)

***

### name?

> `optional` **name?**: `string`

Defined in: [api/types.ts:191](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L191)

Defaults to `<label>.<property>.text` (`all` for `*`), unique within the project.

***

### property

> **property**: `string`

Defined in: [api/types.ts:189](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L189)

A property name, or `*` for every string of the record.
