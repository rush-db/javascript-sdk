[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / SearchContextClause

# Type Alias: SearchContextClause

> **SearchContextClause** = `object`

Defined in: [types/query.ts:309](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L309)

Request options of a search. `check` picks how the server checks the
labels, properties and compared texts against the data (RushDB 3.0.14 and
later): `warn` (the server's default) runs the query and reports misses in
`catalogWarnings`, `strict` refuses a query with a miss (`CatalogCheckError`),
`off` skips the check. Leave it unset for servers before 3.0.14.

## Properties

### context?

> `optional` **context?**: `object`

Defined in: [types/query.ts:310](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L310)

#### check?

> `optional` **check?**: [`CatalogCheckMode`](CatalogCheckMode.md)
