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
import type { MaybeArray } from './utils.js'

// DATETIME
export type DatetimeObject = {
  $day?: number
  $hour?: number
  $microsecond?: number
  $millisecond?: number
  $minute?: number
  $month?: number
  $nanosecond?: number
  $second?: number
  $year: number
}
export type DatetimeValue = DatetimeObject | string

/** A calendar date as ISO 8601 text, `2024-05-01`. */
export type DateValue = string
/** A time of day without a zone, `10:30:00` or `10:30:00.5`. */
export type LocalTimeValue = string
/** A date and time without a zone, `2024-05-01T10:30:00`. */
export type LocalDateTimeValue = string
/** An ISO 8601 duration, `P1DT2H`; months, days and seconds are kept apart. */
export type DurationValue = string

/**
 * A GeoJSON point, longitude first. Without `crs` it is a WGS-84 position
 * (`[lon, lat]` or `[lon, lat, height]`); `crs: 'cartesian'` or
 * `'cartesian-3d'` places it in a plane.
 */
export type PointValue = {
  type: 'Point'
  coordinates: [number, number] | [number, number, number]
  crs?: 'wgs-84' | 'wgs-84-3d' | 'cartesian' | 'cartesian-3d' | 'EPSG:4326' | 'EPSG:4979' | 'EPSG:7203' | 'EPSG:9157'
}

// BOOLEAN
export type BooleanValue = boolean

// NULL — `null` is an input value meaning "unset the field".
export type NullValue = null

// NUMBER
export type NumberValue = number

// STRING
export type StringValue = string

export type PropertyType =
  | typeof PROPERTY_TYPE_BOOLEAN
  | typeof PROPERTY_TYPE_DATETIME
  | typeof PROPERTY_TYPE_NUMBER
  | typeof PROPERTY_TYPE_STRING
  | typeof PROPERTY_TYPE_DATE
  | typeof PROPERTY_TYPE_LOCALTIME
  | typeof PROPERTY_TYPE_LOCALDATETIME
  | typeof PROPERTY_TYPE_DURATION
  | typeof PROPERTY_TYPE_POINT

type WithId<T> = T & { id: string }
type WithValue<T> = T & { value: PropertyValue }

export type Property = WithId<{
  metadata?: string
  name: string
  type: PropertyType
  recordsCount?: number
}>

export type PropertyWithValue = WithValue<Property>

export type PropertyValuesData = {
  /** A number, or ISO 8601 text for temporal and duration properties. */
  max?: number | string
  min?: number | string
  values: Array<PropertyValue>
  /** Record counts aligned with `values` (a searched or `limit`ed read). */
  counts?: Array<number>
  /** Distinct values matching the search, before `limit`. */
  distinctCount?: number
  /** The search matched nothing and `values` lists the whole (small) domain (`domainOnMiss`). */
  searchMissed?: boolean
  /** Names or texts in the request no record holds, with suggestions (RushDB 3.0.14 and later). */
  catalogWarnings?: Array<CatalogWarning>
}

/** What `context.check` does with a label, property or text no record holds. */
export type CatalogCheckMode = 'warn' | 'strict' | 'off'

/** A likely meant spelling, label or property for a {@link CatalogWarning}. */
export type CatalogSuggestion = {
  /** `spelling`, `storedIn` or `contains`. */
  reason: string
  label?: string
  property?: string
  value?: PropertyValue
}

/**
 * The catalog check's finding for a query: a label (`unknownLabel`), a
 * property (`unknownProperty`) or a compared text (`unknownValue`) that no
 * record holds, with what the query most likely meant.
 */
export type CatalogWarning = {
  kind: 'unknownLabel' | 'unknownProperty' | 'unknownValue' | (string & {})
  label?: string
  labels?: Array<string>
  property?: string
  value?: PropertyValue
  /** Omitted when there is nothing to suggest. */
  suggestions?: Array<CatalogSuggestion>
}

/** How a value search matches stored values. `similar` finds near spellings. */
export type ValueMatchMode = 'contains' | 'prefix' | 'exact' | 'similar'

/** Value-search options for `db.properties.values`. */
export type PropertyValuesSearch = {
  /** Keep the values whose text matches. */
  query?: string
  match?: ValueMatchMode
  /** Most values returned, by record count (default 100 with `query`). */
  limit?: number
  /** With no match, list every value of a property holding at most this many. */
  domainOnMiss?: number
  /** `similar` only: least similarity, 0 to 1 (default 0.6). */
  minSimilarity?: number
}

/** Parameters of `db.ai.searchValues`. */
export type SearchValuesParams = {
  text: string
  match?: ValueMatchMode
  caseSensitive?: boolean
  minSimilarity?: number
  /** Labels to search (all when omitted). */
  labels?: Array<string>
  /** Most matches (default 50, at most 1000). */
  limit?: number
}

/** A stored value matching `db.ai.searchValues`, with where it is held. */
export type ValueMatch = {
  label: string
  property: string
  value: PropertyValue
  count: number
}

export type ValueMatchesData = {
  matches: Array<ValueMatch>
  /** Matches before `limit`. */
  total: number
  /** Properties that could not be searched within the request limits, as `label.property`. */
  skipped?: Array<string>
}

/** A label or property spelled like a requested name (`db.ai.resolveNames`). */
export type NameSuggestion = {
  label: string
  property?: string
  /** Spelling similarity, 0 to 1. */
  score: number
}

/** One label of `db.ai.getSchemaSummary`. */
export type SchemaSummaryLabel = {
  name: string
  recordsCount: number
  properties: Array<{
    name: string
    type: string
    recordsCount: number
    isArray?: boolean
    distinctCount?: number
    min?: PropertyValue
    max?: PropertyValue
    /** Every value, by record count, when the property holds few. */
    values?: Array<PropertyValue>
  }>
  relationships?: Array<{ type: string; label: string; direction: 'in' | 'out'; count: number }>
}

/** A reference suggested by `db.ai.getJoinCandidates`, with its evidence. */
export type JoinCandidate = {
  source: { label: string; property: string }
  target: { label: string; property: string }
  /** `name`, `chain` and/or `values`: the rules that proposed it. */
  reasons: Array<string>
  relationshipType: string
  confidence: number
  evidence: {
    sourceDistinct?: number
    targetDistinct?: number
    matchedDistinct?: number
    matchedRecords?: number
    coverage?: number
    targetUniqueness?: number
    notCompared?: string
  }
  rationale: string
}

export type PropertyDraft = Omit<PropertyWithValue, 'id'> & {
  valueSeparator?: string
}

export type PropertySingleValue<TType extends PropertyType = PropertyType> =
  TType extends typeof PROPERTY_TYPE_DATETIME ? DatetimeValue
  : TType extends typeof PROPERTY_TYPE_DATE ? DateValue
  : TType extends typeof PROPERTY_TYPE_LOCALTIME ? LocalTimeValue
  : TType extends typeof PROPERTY_TYPE_LOCALDATETIME ? LocalDateTimeValue
  : TType extends typeof PROPERTY_TYPE_DURATION ? DurationValue
  : TType extends typeof PROPERTY_TYPE_POINT ? PointValue
  : TType extends typeof PROPERTY_TYPE_NUMBER ? NumberValue
  : TType extends typeof PROPERTY_TYPE_STRING ? StringValue
  : TType extends typeof PROPERTY_TYPE_BOOLEAN ? BooleanValue
  : StringValue

export type PropertyValue<TType extends PropertyType = PropertyType> = MaybeArray<PropertySingleValue<TType>>
