[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / VectorSearchReport

# Type Alias: VectorSearchReport

> **VectorSearchReport** = `object`

Defined in: [api/types.ts:283](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L283)

How the engine ran a vector search.

## Properties

### ef?

> `optional` **ef?**: `number`

Defined in: [api/types.ts:287](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L287)

Gather breadth, for an ANN search.

***

### fallback?

> `optional` **fallback?**: `"metric"` \| `"budget"` \| `"lowConfidence"` \| `"annWarming"`

Defined in: [api/types.ts:293](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L293)

Why a search that would use the ANN graph was answered exactly:
`metric`, `budget`, `lowConfidence`, or `annWarming` (the graph is being
built; later searches use it).

***

### mode

> **mode**: `"exact"` \| `"ann"`

Defined in: [api/types.ts:285](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L285)

The path that produced the results.

***

### pool

> **pool**: `number`

Defined in: [api/types.ts:295](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L295)

Vectors in the index.
