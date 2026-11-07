[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / SimilarityFunction

# Type Alias: SimilarityFunction

> **SimilarityFunction** = `"cosine"` \| `"dot"` \| `"euclidean"`

Defined in: [api/types.ts:14](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L14)

How an embedding index scores vectors. A standalone engine (direct mode)
supports all three; RushDB Cloud accepts `cosine` and `euclidean`.
