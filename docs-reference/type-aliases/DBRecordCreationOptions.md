[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordCreationOptions

# Type Alias: DBRecordCreationOptions

> **DBRecordCreationOptions** = `object`

Defined in: [sdk/record.ts:119](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L119)

Options for creating database records.

## Properties

### capitalizeLabels?

> `optional` **capitalizeLabels?**: `boolean`

Defined in: [sdk/record.ts:123](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L123)

***

### convertNumericValuesToNumbers?

> `optional` **convertNumericValuesToNumbers?**: `boolean`

Defined in: [sdk/record.ts:122](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L122)

***

### merge?

> `optional` **merge?**: `boolean`

Defined in: [sdk/record.ts:138](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L138)

Shorthand for `mergeBy: []` + `mergeStrategy: 'append'`: match existing
records on all incoming keys and merge (upsert) instead of creating
duplicates on re-import.

***

### mergeBy?

> `optional` **mergeBy?**: `string`[]

Defined in: [sdk/record.ts:132](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L132)

***

### mergeStrategy?

> `optional` **mergeStrategy?**: `"append"` \| `"rewrite"`

Defined in: [sdk/record.ts:131](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L131)

***

### relationshipType?

> `optional` **relationshipType?**: `string`

Defined in: [sdk/record.ts:130](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L130)

***

### returnResult?

> `optional` **returnResult?**: `boolean`

Defined in: [sdk/record.ts:120](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L120)

***

### skipEmptyValues?

> `optional` **skipEmptyValues?**: `boolean`

Defined in: [sdk/record.ts:129](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L129)

When true, empty strings ('') and empty arrays ([]) are treated as unset and skipped
(no property is created). Zero (0) and false are real values and are never affected.
Defaults to false.

***

### suggestTypes?

> `optional` **suggestTypes?**: `boolean`

Defined in: [sdk/record.ts:121](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L121)
