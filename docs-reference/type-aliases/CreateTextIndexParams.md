[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreateTextIndexParams

# Type Alias: CreateTextIndexParams

> **CreateTextIndexParams** = `object`

Defined in: [api/types.ts:184](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L184)

## Properties

### consistency?

> `optional` **consistency?**: `"eventual"` \| `"immediate"`

Defined in: [api/types.ts:190](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L190)

***

### label

> **label**: `string`

Defined in: [api/types.ts:185](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L185)

***

### name?

> `optional` **name?**: `string`

Defined in: [api/types.ts:189](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L189)

Defaults to `<label>.<property>.text` (`all` for `*`), unique within the project.

***

### property

> **property**: `string`

Defined in: [api/types.ts:187](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L187)

A property name, or `*` for every string of the record.
