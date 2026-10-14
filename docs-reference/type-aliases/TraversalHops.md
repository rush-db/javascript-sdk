[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / TraversalHops

# Type Alias: TraversalHops

> **TraversalHops** = `number` \| \{ `max?`: `number`; `min?`: `number`; \}

Defined in: [types/query.ts:21](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L21)

Variable-length traversal depth for `$relation.hops` and `$cycle.hops`.
A number matches exactly that many hops; `{ min?, max? }` matches a range
(`min` defaults to 1, or 2 for `$cycle`). Omitting `max` means up to 10
hops (the engine default); RushDB Cloud also caps `max` per deployment.
