[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / RequiredKeysRead

# Type Alias: RequiredKeysRead\<S\>

> **RequiredKeysRead**\<`S`\> = `{ [Key in keyof S]: S[Key]["required"] extends false ? never : Key }`\[keyof `S`\]

Defined in: [types/schema.ts:73](https://github.com/rush-db/javascript-sdk/blob/main/src/types/schema.ts#L73)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
