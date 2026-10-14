[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreateEmbeddingIndexParams

# Type Alias: CreateEmbeddingIndexParams

> **CreateEmbeddingIndexParams** = `object`

Defined in: [api/types.ts:36](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L36)

Parameters for creating a new embedding index.

## Properties

### dimensions?

> `optional` **dimensions?**: `number`

Defined in: [api/types.ts:53](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L53)

***

### external?

> `optional` **external?**: `boolean`

Defined in: [api/types.ts:51](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L51)

Shorthand for `sourceType: 'external'`.
When `true`, the index will be created with `sourceType: 'external'` regardless of the `sourceType` field.

***

### label

> **label**: `string`

Defined in: [api/types.ts:44](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L44)

Record label to scope this index to (e.g. "Book", "Task").

***

### name?

> `optional` **name?**: `string`

Defined in: [api/types.ts:42](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L42)

Index name, unique within the project: 1–64 characters of letters,
digits, `.`, `_`, `:` or `-`. Defaults to
`<label>.<property>.<model>.<dimensions>.<similarity>`.

***

### propertyName

> **propertyName**: `string`

Defined in: [api/types.ts:45](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L45)

***

### similarityFunction?

> `optional` **similarityFunction?**: `"cosine"` \| `"euclidean"`

Defined in: [api/types.ts:52](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L52)

***

### sourceType?

> `optional` **sourceType?**: `"managed"` \| `"external"`

Defined in: [api/types.ts:46](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L46)
