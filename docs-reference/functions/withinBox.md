[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / withinBox

# Function: withinBox()

> **withinBox**(`southWest`, `northEast`): `object`

Defined in: [sdk/spatial.ts:54](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/spatial.ts#L54)

`{ $within: { box: [southWest, northEast] } }`, for a `where` value: points
inside the box, edges included. A WGS-84 box whose south-west longitude is
east of its north-east longitude crosses the antimeridian.

## Parameters

### southWest

[`PointValue`](../type-aliases/PointValue.md)

### northEast

[`PointValue`](../type-aliases/PointValue.md)

## Returns

`object`

### $within

> **$within**: [`WithinBox`](../type-aliases/WithinBox.md)
