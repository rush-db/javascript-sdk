export const ISO_8601_FULL =
  /^(?:\d{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:\d{2}(?:[02468][048]|[13579][26])-02-29))Schema(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])?(?:\.([0-9]{1,9}))?([zZ]?|([\+-])(((([0][0-9])|([1][0-3])):?(([03][0])|([14][5])))|14:00)?)$/

export const DEFAULT_TIMEOUT = 80000

export const PROPERTY_TYPE_STRING = 'string' as const
export const PROPERTY_TYPE_DATETIME = 'datetime' as const
export const PROPERTY_TYPE_BOOLEAN = 'boolean' as const
export const PROPERTY_TYPE_NUMBER = 'number' as const
/** A calendar date, `2024-05-01` (RushDB 3.0.14 and later). */
export const PROPERTY_TYPE_DATE = 'date' as const
/** A time of day without a zone, `10:30:00` (RushDB 3.0.14 and later). */
export const PROPERTY_TYPE_LOCALTIME = 'localtime' as const
/** A date and time without a zone, `2024-05-01T10:30:00` (RushDB 3.0.14 and later). */
export const PROPERTY_TYPE_LOCALDATETIME = 'localdatetime' as const
/** An ISO 8601 duration, `P1DT2H` (RushDB 3.0.14 and later). */
export const PROPERTY_TYPE_DURATION = 'duration' as const
/** A GeoJSON point (RushDB 3.0.14 and later). */
export const PROPERTY_TYPE_POINT = 'point' as const

export const PROPERTY_TYPES = [
  PROPERTY_TYPE_STRING,
  PROPERTY_TYPE_DATETIME,
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_NUMBER,
  PROPERTY_TYPE_DATE,
  PROPERTY_TYPE_LOCALTIME,
  PROPERTY_TYPE_LOCALDATETIME,
  PROPERTY_TYPE_DURATION,
  PROPERTY_TYPE_POINT
]

/** Property types whose values are ordered, so ranges, `$min`/`$max` and sorting apply. */
export const ORDERED_PROPERTY_TYPES: ReadonlyArray<string> = [
  PROPERTY_TYPE_NUMBER,
  PROPERTY_TYPE_DATETIME,
  PROPERTY_TYPE_DATE,
  PROPERTY_TYPE_LOCALTIME,
  PROPERTY_TYPE_LOCALDATETIME,
  PROPERTY_TYPE_DURATION
]

/**
 * Rows per request when `records.createMany` and `records.importCsv` split a
 * large write: about 5,000 flat rows per request loads fastest.
 */
export const DEFAULT_INGEST_CHUNK_SIZE = 5000
/** Documents per request when `records.importJson` splits a large array of nested documents. */
export const DEFAULT_NESTED_INGEST_CHUNK_SIZE = 10000
