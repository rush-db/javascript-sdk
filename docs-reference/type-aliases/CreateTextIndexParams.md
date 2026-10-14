[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreateTextIndexParams

# Type Alias: CreateTextIndexParams

> **CreateTextIndexParams** = `object`

Defined in: [api/types.ts:178](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L178)

## Properties

### consistency?

> `optional` **consistency?**: `"eventual"` \| `"immediate"`

Defined in: [api/types.ts:184](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L184)

***

### label

> **label**: `string`

Defined in: [api/types.ts:179](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L179)

***

### name?

> `optional` **name?**: `string`

Defined in: [api/types.ts:183](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L183)

Defaults to `<label>.<property>.text` (`all` for `*`), unique within the project.

***

### property

> **property**: `string`

Defined in: [api/types.ts:181](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L181)

A property name, or `*` for every string of the record.
