[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CycleExpression

# Type Alias: CycleExpression

> **CycleExpression** = [`RelationOptions`](RelationOptions.md) & `object`

Defined in: [types/query.ts:38](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L38)

Record-level cycle predicate: matches records sitting on a closed path
(cycle/ring) back to themselves over the described edges. The value is the
traversal spec itself — `hops` is mandatory (`min` ≥ 2, defaults to 2);
intermediate node labels are unconstrained. A cycle has no separate endpoint
to filter or alias.

## Type Declaration

### hops

> **hops**: [`TraversalHops`](TraversalHops.md)
