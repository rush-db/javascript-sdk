[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / EmbeddingIndex

# Type Alias: EmbeddingIndex

> **EmbeddingIndex** = `object`

Defined in: [api/types.ts:11](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L11)

An embedding index policy stored in RushDB.

## Properties

### createdAt

> **createdAt**: `string`

Defined in: [api/types.ts:31](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L31)

***

### dimensions

> **dimensions**: `number`

Defined in: [api/types.ts:26](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L26)

***

### enabled

> **enabled**: `boolean`

Defined in: [api/types.ts:28](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L28)

***

### id

> **id**: `string`

Defined in: [api/types.ts:12](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L12)

***

### label

> **label**: `string`

Defined in: [api/types.ts:21](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L21)

Record label this index is scoped to (e.g. "Book").

***

### modelKey

> **modelKey**: `string`

Defined in: [api/types.ts:23](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L23)

***

### name

> **name**: `string`

Defined in: [api/types.ts:18](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L18)

Public index name, unique within the project, e.g.
`Book.description.text-embedding-3-small.1536.cosine`. Search and inline
vectors may address the index by it.

***

### projectId

> **projectId**: `string`

Defined in: [api/types.ts:19](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L19)

***

### propertyName

> **propertyName**: `string`

Defined in: [api/types.ts:22](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L22)

***

### similarityFunction

> **similarityFunction**: `"cosine"` \| `"euclidean"`

Defined in: [api/types.ts:25](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L25)

***

### sourceType

> **sourceType**: `"managed"` \| `"external"`

Defined in: [api/types.ts:24](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L24)

***

### status

> **status**: `string`

Defined in: [api/types.ts:30](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L30)

'pending' | 'indexing' | 'awaiting_vectors' | 'ready' | 'error'

***

### updatedAt

> **updatedAt**: `string`

Defined in: [api/types.ts:32](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L32)

***

### vectorPropertyName

> **vectorPropertyName**: `string`

Defined in: [api/types.ts:27](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L27)
