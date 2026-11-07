[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / EmbeddingIndex

# Type Alias: EmbeddingIndex

> **EmbeddingIndex** = `object`

Defined in: [api/types.ts:17](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L17)

An embedding index policy stored in RushDB.

## Properties

### createdAt

> **createdAt**: `string`

Defined in: [api/types.ts:37](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L37)

***

### dimensions

> **dimensions**: `number`

Defined in: [api/types.ts:32](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L32)

***

### enabled

> **enabled**: `boolean`

Defined in: [api/types.ts:34](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L34)

***

### id

> **id**: `string`

Defined in: [api/types.ts:18](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L18)

***

### label

> **label**: `string`

Defined in: [api/types.ts:27](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L27)

Record label this index is scoped to (e.g. "Book").

***

### modelKey

> **modelKey**: `string`

Defined in: [api/types.ts:29](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L29)

***

### name

> **name**: `string`

Defined in: [api/types.ts:24](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L24)

Public index name, unique within the project, e.g.
`Book.description.text-embedding-3-small.1536.cosine`. Search and inline
vectors may address the index by it.

***

### projectId

> **projectId**: `string`

Defined in: [api/types.ts:25](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L25)

***

### propertyName

> **propertyName**: `string`

Defined in: [api/types.ts:28](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L28)

***

### similarityFunction

> **similarityFunction**: [`SimilarityFunction`](SimilarityFunction.md)

Defined in: [api/types.ts:31](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L31)

***

### sourceType

> **sourceType**: `"managed"` \| `"external"`

Defined in: [api/types.ts:30](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L30)

***

### status

> **status**: `string`

Defined in: [api/types.ts:36](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L36)

'pending' | 'indexing' | 'awaiting_vectors' | 'ready' | 'error'

***

### updatedAt

> **updatedAt**: `string`

Defined in: [api/types.ts:38](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L38)

***

### vectorPropertyName

> **vectorPropertyName**: `string`

Defined in: [api/types.ts:33](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L33)
