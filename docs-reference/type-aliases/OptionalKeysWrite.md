[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / OptionalKeysWrite

# Type Alias: OptionalKeysWrite\<S\>

> **OptionalKeysWrite**\<`S`\> = `{ [Key in keyof S]: S[Key]["required"] extends false ? Key : S[Key]["default"] extends SchemaDefaultValue ? Key : never }`\[keyof `S`\]

Defined in: [types/schema.ts:28](https://github.com/rush-db/javascript-sdk/blob/main/src/types/schema.ts#L28)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
