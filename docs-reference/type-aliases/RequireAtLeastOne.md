[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / RequireAtLeastOne

# Type Alias: RequireAtLeastOne\<T\>

> **RequireAtLeastOne**\<`T`\> = `{ [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>> }`\[keyof `T`\]

Defined in: [types/utils.ts:3](https://github.com/rush-db/javascript-sdk/blob/main/src/types/utils.ts#L3)

## Type Parameters

### T

`T`
