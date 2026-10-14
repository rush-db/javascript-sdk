[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / InferSchemaTypesWrite

# Type Alias: InferSchemaTypesWrite\<S\>

> **InferSchemaTypesWrite**\<`S`\> = [`FlattenTypes`](FlattenTypes.md)\<`{ [Key in RequiredKeysWrite<S>]: S[Key]["multiple"] extends true ? TypeMappingWrite[S[Key]["type"]][] : TypeMappingWrite[S[Key]["type"]] }` & `{ [Key in OptionalKeysWrite<S>]?: S[Key]["multiple"] extends true ? TypeMappingWrite[S[Key]["type"]][] : TypeMappingWrite[S[Key]["type"]] }`\>

Defined in: [types/schema.ts:40](https://github.com/rush-db/javascript-sdk/blob/main/src/types/schema.ts#L40)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
