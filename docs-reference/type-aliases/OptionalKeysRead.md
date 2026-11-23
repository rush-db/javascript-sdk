[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / OptionalKeysRead

# Type Alias: OptionalKeysRead\<S\>

> **OptionalKeysRead**\<`S`\> = `{ [Key in keyof S]: S[Key]["required"] extends false ? Key : never }`\[keyof `S`\]

Defined in: [types/schema.ts:69](https://github.com/rush-db/javascript-sdk/blob/main/src/types/schema.ts#L69)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
