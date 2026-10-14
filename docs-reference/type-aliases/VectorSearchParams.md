[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / VectorSearchParams

# Type Alias: VectorSearchParams

> **VectorSearchParams** = `object`

Defined in: [api/types.ts:95](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L95)

Parameters for vector search over an embedding index.

## Properties

### dimensions?

> `optional` **dimensions?**: `number`

Defined in: [api/types.ts:115](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L115)

***

### ef?

> `optional` **ef?**: `number`

Defined in: [api/types.ts:130](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L130)

ANN gather breadth when the search runs on the ANN graph.

***

### fusion?

> `optional` **fusion?**: `"rrf"` \| `"dbsf"`

Defined in: [api/types.ts:159](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L159)

Hybrid only: how the legs combine. `rrf` (default) fuses ranks; `dbsf`
fuses each leg's scores normalized by its own distribution (mean ± 3σ).

***

### index?

> `optional` **index?**: `string`

Defined in: [api/types.ts:100](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L100)

The index to search, by name (or id). When given, `propertyName` and
`labels` default to the index's own.

***

### labels?

> `optional` **labels?**: `string`[]

Defined in: [api/types.ts:112](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L112)

One or more record labels to scope the search.
The first label is used to resolve which embedding index to use.
Required unless `index` is given.

***

### limit?

> `optional` **limit?**: `number`

Defined in: [api/types.ts:138](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L138)

Maximum number of results to return (default 20).

***

### mode?

> `optional` **mode?**: `"auto"` \| `"exact"` \| `"ann"`

Defined in: [api/types.ts:128](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L128)

How the search ranks candidates. `auto` (default): the engine scores every
vector of a small index exactly and uses its ANN graph on a large one.
`exact` / `ann` force a path (`ann` needs a cosine index).

***

### prefetchLimit?

> `optional` **prefetchLimit?**: `number`

Defined in: [api/types.ts:154](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L154)

Hybrid only: hits the vector leg ranks before fusion (1–10,000).

***

### propertyName?

> `optional` **propertyName?**: `string`

Defined in: [api/types.ts:102](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L102)

Name of the indexed property to search against. Required unless `index` is given.

***

### query?

> `optional` **query?**: `string`

Defined in: [api/types.ts:104](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L104)

Free-text query that will be embedded and compared against indexed vectors.

***

### queryVector?

> `optional` **queryVector?**: `number`[]

Defined in: [api/types.ts:106](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L106)

External vector query. Use instead of query text for external indexes.

***

### rrfK?

> `optional` **rrfK?**: `number`

Defined in: [api/types.ts:161](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L161)

Hybrid only: the RRF smoothing constant (default 60).

***

### scoreThreshold?

> `optional` **scoreThreshold?**: `number`

Defined in: [api/types.ts:136](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L136)

Keep only results scoring at least this much. Scores depend on the
embedding model, so pick the threshold per model; a page may then hold
fewer than `limit` results.

***

### similarityFunction?

> `optional` **similarityFunction?**: `"cosine"` \| `"euclidean"`

Defined in: [api/types.ts:114](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L114)

***

### skip?

> `optional` **skip?**: `number`

Defined in: [api/types.ts:122](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L122)

Number of results to skip for pagination (default 0).

***

### sourceType?

> `optional` **sourceType?**: `"managed"` \| `"external"`

Defined in: [api/types.ts:113](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L113)

***

### text?

> `optional` **text?**: `Partial`\<`Pick`\<[`TextSearchParams`](TextSearchParams.md), `"query"` \| `"index"` \| `"property"` \| `"allTerms"` \| `"phrase"`\>\> & `object`

Defined in: [api/types.ts:145](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L145)

Adds a BM25 keyword leg, making it a hybrid search: the engine ranks both
legs among the same filtered records and fuses the two rankings. `query`
defaults to the semantic `query`; the text index defaults to the one ready
text index of the first label.

#### Type Declaration

##### prefetchLimit?

> `optional` **prefetchLimit?**: `number`

Hits this leg ranks before fusion (1–10,000; default 4 × (skip + limit)).

##### weight?

> `optional` **weight?**: `number`

This leg's share of the fused score (≥ 0, default 1).

***

### weight?

> `optional` **weight?**: `number`

Defined in: [api/types.ts:152](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L152)

Hybrid only: the vector leg's share of the fused score (≥ 0, default 1).

***

### where?

> `optional` **where?**: `Record`\<`string`, `unknown`\>

Defined in: [api/types.ts:120](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L120)

Optional filter applied before cosine scoring.
Candidates are narrowed via MATCH/WHERE and then ranked by similarity.
