import type {
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_DATETIME,
  PROPERTY_TYPE_NUMBER,
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
  max?: number
  min?: number
  values: Array<PropertyValue>
  /** Record counts aligned with `values` (a searched or `limit`ed read). */
  counts?: Array<number>
  /** Distinct values matching the search, before `limit`. */
  distinctCount?: number
  /** The search matched nothing and `values` lists the whole (small) domain (`domainOnMiss`). */
  searchMissed?: boolean
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
  : TType extends typeof PROPERTY_TYPE_NUMBER ? NumberValue
  : TType extends typeof PROPERTY_TYPE_STRING ? StringValue
  : TType extends typeof PROPERTY_TYPE_BOOLEAN ? BooleanValue
  : StringValue

export type PropertyValue<TType extends PropertyType = PropertyType> = MaybeArray<PropertySingleValue<TType>>
