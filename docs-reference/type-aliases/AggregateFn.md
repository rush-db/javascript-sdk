[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / AggregateFn

# ~~Type Alias: AggregateFn\<S\>~~

> **AggregateFn**\<`S`\> = \{ `alias?`: `string`; `field`: `string`; `fn`: `"avg"`; `precision?`: `number`; \} \| [`AggregateCountFn`](AggregateCountFn.md) \| \{ `alias?`: `string`; `field`: `string`; `fn`: `"max"`; \} \| \{ `alias?`: `string`; `field`: `string`; `fn`: `"min"`; \} \| \{ `alias?`: `string`; `field`: `string`; `fn`: `"sum"`; \} \| \{ `alias?`: `string`; `field`: `string`; `fn`: `"vector.similarity.cosine"` \| `"vector.similarity.euclidean"`; `query`: `number`[]; \} \| [`AggregateTimeBucketFn`](AggregateTimeBucketFn.md) \| [`AggregateCollectFn`](AggregateCollectFn.md)

Defined in: [types/query.ts:155](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L155)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)

## Deprecated

The aggregate clause is deprecated. Use select/groupBy for all metrics/analytics. Only use aggregate for vector similarity until select supports it.
