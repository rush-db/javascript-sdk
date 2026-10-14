[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / RequiredKeysWrite

# Type Alias: RequiredKeysWrite\<S\>

> **RequiredKeysWrite**\<`S`\> = `{ [Key in keyof S]: S[Key]["required"] extends false ? never : S[Key]["default"] extends SchemaDefaultValue ? never : Key }`\[keyof `S`\]

Defined in: [types/schema.ts:34](https://github.com/rush-db/javascript-sdk/blob/main/src/types/schema.ts#L34)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
