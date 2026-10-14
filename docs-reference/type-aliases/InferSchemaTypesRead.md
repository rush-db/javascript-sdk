[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / InferSchemaTypesRead

# Type Alias: InferSchemaTypesRead\<S\>

> **InferSchemaTypesRead**\<`S`\> = [`FlattenTypes`](FlattenTypes.md)\<`{ [Key in RequiredKeysRead<S>]: S[Key]["multiple"] extends true ? TypeMappingRead[S[Key]["type"]][] : TypeMappingRead[S[Key]["type"]] }` & `{ [Key in OptionalKeysRead<S>]?: S[Key]["multiple"] extends true ? TypeMappingRead[S[Key]["type"]][] : TypeMappingRead[S[Key]["type"]] }`\>

Defined in: [types/schema.ts:67](https://github.com/rush-db/javascript-sdk/blob/main/src/types/schema.ts#L67)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
