[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ExtractSelectFields

# Type Alias: ExtractSelectFields\<S\>

> **ExtractSelectFields**\<`S`\> = `{ [K in keyof S]: InferExprType<S[K]> }`

Defined in: [types/query.ts:287](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L287)

## Type Parameters

### S

`S` *extends* [`SelectExprMap`](SelectExprMap.md)
