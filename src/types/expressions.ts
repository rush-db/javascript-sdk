import type {
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_DATE,
  PROPERTY_TYPE_DATETIME,
  PROPERTY_TYPE_DURATION,
  PROPERTY_TYPE_LOCALDATETIME,
  PROPERTY_TYPE_LOCALTIME,
  PROPERTY_TYPE_NUMBER,
  PROPERTY_TYPE_POINT,
  PROPERTY_TYPE_STRING
} from '../common/constants.js'
import type { MaybeArray, RequireAtLeastOne } from './utils.js'
import type {
  BooleanValue,
  DatetimeObject,
  DatetimeValue,
  NullValue,
  NumberValue,
  PointValue,
  PropertyType,
  StringValue
} from './value.js'

export type DatetimeExpression =
  | DatetimeValue
  | RequireAtLeastOne<
      Record<'$eq' | '$gt' | '$gte' | '$lt' | '$lte' | '$ne', DatetimeObject | DatetimeValue> &
        Record<'$in' | '$nin', Array<DatetimeObject | DatetimeValue>> &
        Record<'$exists', BooleanValue>
    >

/**
 * A filter on a date, local time, local date-time or duration property:
 * ISO 8601 text compared in the property's own type.
 */
export type TemporalExpression =
  | StringValue
  | RequireAtLeastOne<
      Record<'$eq' | '$gt' | '$gte' | '$lt' | '$lte' | '$ne', DatetimeObject | StringValue> &
        Record<'$in' | '$nin', Array<DatetimeObject | StringValue>> &
        Record<'$exists', BooleanValue>
    >

/** Points at most `meters` from `center` (haversine meters for WGS-84, plane units for Cartesian). */
export type WithinRadius = { center: PointValue; meters: number }

/**
 * Points inside a box from its south-west to its north-east corner, edges
 * included. A WGS-84 box whose south-west longitude is east of its north-east
 * one crosses the antimeridian.
 */
export type WithinBox = { box: [PointValue, PointValue] }

/** A filter on a point property (RushDB 3.0.14 and later). Points have no order: no `$gt`/`$lt`. */
export type PointExpression =
  | PointValue
  | RequireAtLeastOne<
      Record<'$within', WithinRadius | WithinBox> &
        Record<'$eq' | '$ne', PointValue> &
        Record<'$exists', BooleanValue>
    >

export type BooleanExpression =
  | BooleanValue
  | RequireAtLeastOne<Record<'$eq' | '$ne', BooleanValue> & Record<'$exists', BooleanValue>>

export type NullExpression =
  | NullValue
  | RequireAtLeastOne<Record<'$eq' | '$ne', NullValue> & Record<'$exists', BooleanValue>>

export type NumberExpression =
  | NumberValue
  | RequireAtLeastOne<
      Record<'$eq' | '$gt' | '$gte' | '$lt' | '$lte' | '$ne', NumberValue> &
        Record<'$in' | '$nin', Array<NumberValue>> &
        Record<'$exists', BooleanValue>
    >

export type StringExpression =
  | StringValue
  | RequireAtLeastOne<
      Record<'$contains' | '$endsWith' | '$eq' | '$ne' | '$startsWith', StringValue> &
        Record<'$in' | '$nin', Array<StringValue>> &
        Record<'$exists', BooleanValue>
    >

export type TypeExpression = {
  $type: PropertyType
}

export type PropertyExpression =
  | BooleanExpression
  | DatetimeExpression
  | NullExpression
  | NumberExpression
  | StringExpression
  | TemporalExpression
  | PointExpression
  | TypeExpression

export type PropertyExpressionByType = {
  [PROPERTY_TYPE_BOOLEAN]: BooleanExpression | TypeExpression
  [PROPERTY_TYPE_DATETIME]: DatetimeExpression | TypeExpression
  [PROPERTY_TYPE_NUMBER]: NumberExpression | TypeExpression
  [PROPERTY_TYPE_STRING]: StringExpression | TypeExpression
  [PROPERTY_TYPE_DATE]: TemporalExpression | TypeExpression
  [PROPERTY_TYPE_LOCALTIME]: TemporalExpression | TypeExpression
  [PROPERTY_TYPE_LOCALDATETIME]: TemporalExpression | TypeExpression
  [PROPERTY_TYPE_DURATION]: TemporalExpression | TypeExpression
  [PROPERTY_TYPE_POINT]: PointExpression | TypeExpression
}

// Logical Expressions
export type LogicalGrouping<T> = Partial<{
  $and: MaybeArray<T>
  $nor: MaybeArray<T>
  $not: MaybeArray<T>
  $or: MaybeArray<T>
  $xor: MaybeArray<T>
}>
