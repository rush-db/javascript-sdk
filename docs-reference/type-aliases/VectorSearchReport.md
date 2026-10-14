[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / VectorSearchReport

# Type Alias: VectorSearchReport

> **VectorSearchReport** = `object`

Defined in: [api/types.ts:227](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L227)

How the engine ran a vector search.

## Properties

### ef?

> `optional` **ef?**: `number`

Defined in: [api/types.ts:231](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L231)

Gather breadth, for an ANN search.

***

### fallback?

> `optional` **fallback?**: `"metric"` \| `"budget"` \| `"lowConfidence"` \| `"annWarming"`

Defined in: [api/types.ts:237](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L237)

Why a search that would use the ANN graph was answered exactly:
`metric`, `budget`, `lowConfidence`, or `annWarming` (the graph is being
built; later searches use it).

***

### mode

> **mode**: `"exact"` \| `"ann"`

Defined in: [api/types.ts:229](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L229)

The path that produced the results.

***

### pool

> **pool**: `number`

Defined in: [api/types.ts:239](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L239)

Vectors in the index.
