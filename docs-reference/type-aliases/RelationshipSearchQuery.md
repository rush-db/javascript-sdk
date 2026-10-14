[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / RelationshipSearchQuery

# Type Alias: RelationshipSearchQuery\<S\>

> **RelationshipSearchQuery**\<`S`\> = [`PaginationClause`](PaginationClause.md) & [`OrderClause`](OrderClause.md)\<`any`\> & `object`

Defined in: [types/query.ts:305](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L305)

## Type Declaration

### source?

> `optional` **source?**: [`RelationshipEndpointQuery`](RelationshipEndpointQuery.md)

### target?

> `optional` **target?**: [`RelationshipEndpointQuery`](RelationshipEndpointQuery.md)

### where?

> `optional` **where?**: [`Where`](Where.md)\<`S`\> & `object`

Relationship-edge predicates. `type` maps to the relationship type and every other
field maps to a user-defined property stored on the relationship.

#### Type Declaration

##### direction?

> `optional` **direction?**: `"in"` \| `"out"`

##### type?

> `optional` **type?**: `any`

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = `any`
