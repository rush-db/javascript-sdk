[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / TextSearchParams

# Type Alias: TextSearchParams

> **TextSearchParams** = `object`

Defined in: [api/types.ts:194](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L194)

Parameters for keyword (BM25) search.

## Properties

### allTerms?

> `optional` **allTerms?**: `boolean`

Defined in: [api/types.ts:208](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L208)

Every keyword must match (AND) instead of any (OR).

***

### index?

> `optional` **index?**: `string`

Defined in: [api/types.ts:198](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L198)

The text index, by name; otherwise the one ready text index of the first label.

***

### labels?

> `optional` **labels?**: `string`[]

Defined in: [api/types.ts:201](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L201)

***

### limit?

> `optional` **limit?**: `number`

Defined in: [api/types.ts:206](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L206)

Maximum number of results (default 10).

***

### phrase?

> `optional` **phrase?**: `boolean`

Defined in: [api/types.ts:210](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L210)

Match the keywords as one phrase.

***

### property?

> `optional` **property?**: `string`

Defined in: [api/types.ts:200](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L200)

Narrows the choice of text index to one over this property.

***

### query

> **query**: `string`

Defined in: [api/types.ts:196](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L196)

Keywords; `"a phrase"`, `-excluded` and `+required` follow the query syntax.

***

### skip?

> `optional` **skip?**: `number`

Defined in: [api/types.ts:204](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L204)

***

### where?

> `optional` **where?**: `Record`\<`string`, `unknown`\>

Defined in: [api/types.ts:203](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L203)

Filter applied before ranking.
