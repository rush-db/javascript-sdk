[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / TextSearchParams

# Type Alias: TextSearchParams

> **TextSearchParams** = `object`

Defined in: [api/types.ts:188](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L188)

Parameters for keyword (BM25) search.

## Properties

### allTerms?

> `optional` **allTerms?**: `boolean`

Defined in: [api/types.ts:202](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L202)

Every keyword must match (AND) instead of any (OR).

***

### index?

> `optional` **index?**: `string`

Defined in: [api/types.ts:192](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L192)

The text index, by name; otherwise the one ready text index of the first label.

***

### labels?

> `optional` **labels?**: `string`[]

Defined in: [api/types.ts:195](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L195)

***

### limit?

> `optional` **limit?**: `number`

Defined in: [api/types.ts:200](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L200)

Maximum number of results (default 10).

***

### phrase?

> `optional` **phrase?**: `boolean`

Defined in: [api/types.ts:204](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L204)

Match the keywords as one phrase.

***

### property?

> `optional` **property?**: `string`

Defined in: [api/types.ts:194](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L194)

Narrows the choice of text index to one over this property.

***

### query

> **query**: `string`

Defined in: [api/types.ts:190](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L190)

Keywords; `"a phrase"`, `-excluded` and `+required` follow the query syntax.

***

### skip?

> `optional` **skip?**: `number`

Defined in: [api/types.ts:198](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L198)

***

### where?

> `optional` **where?**: `Record`\<`string`, `unknown`\>

Defined in: [api/types.ts:197](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L197)

Filter applied before ranking.
