[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / FlattenTypes

# Type Alias: FlattenTypes\<T\>

> **FlattenTypes**\<`T`\> = `T` *extends* `object` ? `{ [K in keyof T]: FlattenTypes<T[K]> }` : `T`

Defined in: [types/utils.ts:9](https://github.com/rush-db/javascript-sdk/blob/main/src/types/utils.ts#L9)

## Type Parameters

### T

`T`
