[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / TextSearchParams

# Type Alias: TextSearchParams

> **TextSearchParams** = `object`

Defined in: [api/types.ts:234](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L234)

Parameters for keyword (BM25) search.

## Properties

### allTerms?

> `optional` **allTerms?**: `boolean`

Defined in: [api/types.ts:248](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L248)

Every keyword must match (AND) instead of any (OR).

***

### index?

> `optional` **index?**: `string`

Defined in: [api/types.ts:238](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L238)

The text index, by name; otherwise the one ready text index of the first label.

***

### labels?

> `optional` **labels?**: `string`[]

Defined in: [api/types.ts:241](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L241)

***

### limit?

> `optional` **limit?**: `number`

Defined in: [api/types.ts:246](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L246)

Maximum number of results (default 10).

***

### phrase?

> `optional` **phrase?**: `boolean`

Defined in: [api/types.ts:250](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L250)

Match the keywords as one phrase.

***

### property?

> `optional` **property?**: `string`

Defined in: [api/types.ts:240](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L240)

Narrows the choice of text index to one over this property.

***

### query

> **query**: `string`

Defined in: [api/types.ts:236](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L236)

Keywords; `"a phrase"`, `-excluded` and `+required` follow the query syntax.

***

### skip?

> `optional` **skip?**: `number`

Defined in: [api/types.ts:244](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L244)

***

### waitForPending?

> `optional` **waitForPending?**: [`WaitForPending`](WaitForPending.md)

Defined in: [api/types.ts:257](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L257)

Read your own writes from an `eventual` text index: repeat the search
while the index reports `pending` changes, until none are left or the
timeout passes (then the last result is returned as is). `true` waits up
to 2 seconds. Not sent to the server. An `immediate` index never needs it.

***

### where?

> `optional` **where?**: `Record`\<`string`, `unknown`\>

Defined in: [api/types.ts:243](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L243)

Filter applied before ranking.
