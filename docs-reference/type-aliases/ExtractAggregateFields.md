[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ExtractAggregateFields

# Type Alias: ExtractAggregateFields\<A\>

> **ExtractAggregateFields**\<`A`\> = `{ [K in keyof A]: InferAggregateType<A[K]> }`

Defined in: [types/query.ts:189](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L189)

## Type Parameters

### A

`A` *extends* `Record`\<`string`, [`AggregateFn`](AggregateFn.md)\>
