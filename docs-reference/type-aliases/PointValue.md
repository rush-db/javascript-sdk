[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PointValue

# Type Alias: PointValue

> **PointValue** = `object`

Defined in: [types/value.ts:42](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L42)

A GeoJSON point, longitude first. Without `crs` it is a WGS-84 position
(`[lon, lat]` or `[lon, lat, height]`); `crs: 'cartesian'` or
`'cartesian-3d'` places it in a plane.

## Properties

### coordinates

> **coordinates**: \[`number`, `number`\] \| \[`number`, `number`, `number`\]

Defined in: [types/value.ts:44](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L44)

***

### crs?

> `optional` **crs?**: `"wgs-84"` \| `"wgs-84-3d"` \| `"cartesian"` \| `"cartesian-3d"` \| `"EPSG:4326"` \| `"EPSG:4979"` \| `"EPSG:7203"` \| `"EPSG:9157"`

Defined in: [types/value.ts:45](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L45)

***

### type

> **type**: `"Point"`

Defined in: [types/value.ts:43](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L43)
