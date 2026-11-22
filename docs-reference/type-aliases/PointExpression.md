[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PointExpression

# Type Alias: PointExpression

> **PointExpression** = [`PointValue`](PointValue.md) \| [`RequireAtLeastOne`](RequireAtLeastOne.md)\<`Record`\<`"$within"`, [`WithinRadius`](WithinRadius.md) \| [`WithinBox`](WithinBox.md)\> & `Record`\<`"$eq"` \| `"$ne"`, [`PointValue`](PointValue.md)\> & `Record`\<`"$exists"`, [`BooleanValue`](BooleanValue.md)\>\>

Defined in: [types/expressions.ts:55](https://github.com/rush-db/javascript-sdk/blob/main/src/types/expressions.ts#L55)

A filter on a point property (RushDB 3.0.14 and later). Points have no order: no `$gt`/`$lt`.
