[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / RecordProps

# Type Alias: RecordProps\<S\>

> **RecordProps**\<`S`\> = `S` *extends* `S` ? [`InferSchemaTypesRead`](InferSchemaTypesRead.md)\<`S`\> : `{ [K in keyof S]?: S[K] }`

Defined in: [sdk/record.ts:40](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L40)

Properties defined by the user's schema.

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
