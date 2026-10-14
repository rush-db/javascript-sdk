[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / VectorSearchResult

# Type Alias: VectorSearchResult\<S\>

> **VectorSearchResult**\<`S`\> = [`DBRecord`](DBRecord.md)\<`S`\> & `object`

Defined in: [api/types.ts:222](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L222)

A record returned by db.records.vectorSearch().
Identical to DBRecord but with __score guaranteed present — never optional.
__score is the cosine similarity between the query vector and this record's embedding (0–1,
higher = more similar). It is only injected by the semantic search path; regular
db.records.find() / db.records.search() results are plain DBRecord and never carry __score.

## Type Declaration

### \_\_score

> `readonly` **\_\_score**: `number`

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
