[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreateEmbeddingIndexParams

# Type Alias: CreateEmbeddingIndexParams

> **CreateEmbeddingIndexParams** = `object`

Defined in: [api/types.ts:42](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L42)

Parameters for creating a new embedding index.

## Properties

### dimensions?

> `optional` **dimensions?**: `number`

Defined in: [api/types.ts:59](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L59)

***

### external?

> `optional` **external?**: `boolean`

Defined in: [api/types.ts:57](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L57)

Shorthand for `sourceType: 'external'`.
When `true`, the index will be created with `sourceType: 'external'` regardless of the `sourceType` field.

***

### label

> **label**: `string`

Defined in: [api/types.ts:50](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L50)

Record label to scope this index to (e.g. "Book", "Task").

***

### name?

> `optional` **name?**: `string`

Defined in: [api/types.ts:48](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L48)

Index name, unique within the project: 1–64 characters of letters,
digits, `.`, `_`, `:` or `-`. Defaults to
`<label>.<property>.<model>.<dimensions>.<similarity>`.

***

### propertyName

> **propertyName**: `string`

Defined in: [api/types.ts:51](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L51)

***

### similarityFunction?

> `optional` **similarityFunction?**: [`SimilarityFunction`](SimilarityFunction.md)

Defined in: [api/types.ts:58](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L58)

***

### sourceType?

> `optional` **sourceType?**: `"managed"` \| `"external"`

Defined in: [api/types.ts:52](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L52)
