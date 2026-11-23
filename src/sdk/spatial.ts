import type { WithinBox, WithinRadius } from '../types/expressions.js'
import type { DistanceOrder } from '../types/query.js'
import type { PointValue } from '../types/value.js'

// Builders for point values and spatial queries (RushDB 3.0.14 and later), so
// GeoJSON and `$within`/`$distance` objects need not be written by hand.

/** A coordinate reference system a point can name. */
export type PointCrs = NonNullable<PointValue['crs']>

export type PointOptions = { crs?: PointCrs }

/**
 * A GeoJSON point, longitude first (`x, y[, z]` with a Cartesian `crs`).
 *
 * @example point(13.405, 52.52)
 * @example point(13.405, 52.52, 34)
 * @example point(3, 4, { crs: 'cartesian' })
 */
export function point(longitude: number, latitude: number, options?: PointOptions): PointValue
export function point(longitude: number, latitude: number, height?: number, options?: PointOptions): PointValue
export function point(
  longitude: number,
  latitude: number,
  heightOrOptions?: number | PointOptions,
  options?: PointOptions
): PointValue {
  const height = typeof heightOrOptions === 'number' ? heightOrOptions : undefined
  const crs = (typeof heightOrOptions === 'object' ? heightOrOptions : options)?.crs
  const value: PointValue = {
    type: 'Point',
    coordinates: height === undefined ? [longitude, latitude] : [longitude, latitude, height]
  }
  if (crs !== undefined) {
    value.crs = crs
  }
  return value
}

/**
 * `{ $within: { center, meters } }`, for a `where` value: points within
 * `meters` of `center` (haversine meters for WGS-84 points, plane units for
 * Cartesian ones).
 */
export function withinRadius(center: PointValue, meters: number): { $within: WithinRadius } {
  return { $within: { center, meters } }
}

/**
 * `{ $within: { box: [southWest, northEast] } }`, for a `where` value: points
 * inside the box, edges included. A WGS-84 box whose south-west longitude is
 * east of its north-east longitude crosses the antimeridian.
 */
export function withinBox(southWest: PointValue, northEast: PointValue): { $within: WithinBox } {
  return { $within: { box: [southWest, northEast] } }
}

/**
 * `{ $distance: center }`, for an `orderBy` value: nearest first. Records
 * without a point in the property sort last.
 */
export function distanceFrom(center: PointValue): DistanceOrder {
  return { $distance: center }
}
