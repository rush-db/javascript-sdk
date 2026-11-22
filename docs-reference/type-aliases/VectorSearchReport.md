[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / VectorSearchReport

# Type Alias: VectorSearchReport

> **VectorSearchReport** = `object`

Defined in: [api/types.ts:267](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L267)

How the engine ran a vector search.

## Properties

### ef?

> `optional` **ef?**: `number`

Defined in: [api/types.ts:271](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L271)

Gather breadth, for an ANN search.

***

### fallback?

> `optional` **fallback?**: `"metric"` \| `"budget"` \| `"lowConfidence"` \| `"annWarming"`

Defined in: [api/types.ts:277](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L277)

Why a search that would use the ANN graph was answered exactly:
`metric`, `budget`, `lowConfidence`, or `annWarming` (the graph is being
built; later searches use it).

***

### mode

> **mode**: `"exact"` \| `"ann"`

Defined in: [api/types.ts:269](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L269)

The path that produced the results.

***

### pool

> **pool**: `number`

Defined in: [api/types.ts:279](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L279)

Vectors in the index.
