[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / SchemaSummaryLabel

# Type Alias: SchemaSummaryLabel

> **SchemaSummaryLabel** = `object`

Defined in: [types/value.ts:178](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L178)

One label of `db.ai.getSchemaSummary`.

## Properties

### name

> **name**: `string`

Defined in: [types/value.ts:179](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L179)

***

### properties

> **properties**: `object`[]

Defined in: [types/value.ts:181](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L181)

#### distinctCount?

> `optional` **distinctCount?**: `number`

#### isArray?

> `optional` **isArray?**: `boolean`

#### max?

> `optional` **max?**: [`PropertyValue`](PropertyValue.md)

#### min?

> `optional` **min?**: [`PropertyValue`](PropertyValue.md)

#### name

> **name**: `string`

#### recordsCount

> **recordsCount**: `number`

#### type

> **type**: `string`

#### values?

> `optional` **values?**: [`PropertyValue`](PropertyValue.md)[]

Every value, by record count, when the property holds few.

***

### recordsCount

> **recordsCount**: `number`

Defined in: [types/value.ts:180](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L180)

***

### relationships?

> `optional` **relationships?**: `object`[]

Defined in: [types/value.ts:192](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L192)

#### count

> **count**: `number`

#### direction

> **direction**: `"in"` \| `"out"`

#### label

> **label**: `string`

#### type

> **type**: `string`
