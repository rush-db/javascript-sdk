[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / withinRadius

# Function: withinRadius()

> **withinRadius**(`center`, `meters`): `object`

Defined in: [sdk/spatial.ts:45](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/spatial.ts#L45)

`{ $within: { center, meters } }`, for a `where` value: points within
`meters` of `center` (haversine meters for WGS-84 points, plane units for
Cartesian ones).

## Parameters

### center

[`PointValue`](../type-aliases/PointValue.md)

### meters

`number`

## Returns

`object`

### $within

> **$within**: [`WithinRadius`](../type-aliases/WithinRadius.md)
