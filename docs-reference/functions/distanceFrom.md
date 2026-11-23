[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / distanceFrom

# Function: distanceFrom()

> **distanceFrom**(`center`): [`DistanceOrder`](../type-aliases/DistanceOrder.md)

Defined in: [sdk/spatial.ts:62](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/spatial.ts#L62)

`{ $distance: center }`, for an `orderBy` value: nearest first. Records
without a point in the property sort last.

## Parameters

### center

[`PointValue`](../type-aliases/PointValue.md)

## Returns

[`DistanceOrder`](../type-aliases/DistanceOrder.md)
