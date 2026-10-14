[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordInferred

# Type Alias: DBRecordInferred\<S, Q\>

> **DBRecordInferred**\<`S`, `Q`\> = `Q` *extends* `object` ? [`DBRecord`](DBRecord.md)\<`S`\> & [`ExtractAggregateFields`](ExtractAggregateFields.md)\<`Sel`\> : `Q` *extends* `object` ? [`DBRecord`](DBRecord.md)\<`S`\> & [`ExtractAggregateFields`](ExtractAggregateFields.md)\<`A`\> : [`DBRecord`](DBRecord.md)\<`S`\>

Defined in: [sdk/record.ts:50](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L50)

DBRecord with possible computed metric fields based on a search query.
Uses select/groupBy as canonical. The legacy aggregate clause is deprecated and only present for vector similarity until select supports it.

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md)

### Q

`Q` *extends* [`SearchQuery`](SearchQuery.md)\<`S`\>
