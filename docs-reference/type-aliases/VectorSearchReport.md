[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / VectorSearchReport

# Type Alias: VectorSearchReport

> **VectorSearchReport** = `object`

Defined in: [api/types.ts:233](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L233)

How the engine ran a vector search.

## Properties

### ef?

> `optional` **ef?**: `number`

Defined in: [api/types.ts:237](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L237)

Gather breadth, for an ANN search.

***

### fallback?

> `optional` **fallback?**: `"metric"` \| `"budget"` \| `"lowConfidence"` \| `"annWarming"`

Defined in: [api/types.ts:243](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L243)

Why a search that would use the ANN graph was answered exactly:
`metric`, `budget`, `lowConfidence`, or `annWarming` (the graph is being
built; later searches use it).

***

### mode

> **mode**: `"exact"` \| `"ann"`

Defined in: [api/types.ts:235](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L235)

The path that produced the results.

***

### pool

> **pool**: `number`

Defined in: [api/types.ts:245](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L245)

Vectors in the index.
