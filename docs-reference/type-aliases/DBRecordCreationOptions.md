[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordCreationOptions

# Type Alias: DBRecordCreationOptions

> **DBRecordCreationOptions** = `object`

Defined in: [sdk/record.ts:135](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L135)

Options for creating database records.

## Properties

### capitalizeLabels?

> `optional` **capitalizeLabels?**: `boolean`

Defined in: [sdk/record.ts:139](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L139)

***

### convertNumericValuesToNumbers?

> `optional` **convertNumericValuesToNumbers?**: `boolean`

Defined in: [sdk/record.ts:138](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L138)

***

### merge?

> `optional` **merge?**: `boolean`

Defined in: [sdk/record.ts:154](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L154)

Shorthand for `mergeBy: []` + `mergeStrategy: 'append'`: match existing
records on all incoming keys and merge (upsert) instead of creating
duplicates on re-import.

***

### mergeBy?

> `optional` **mergeBy?**: `string`[]

Defined in: [sdk/record.ts:148](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L148)

***

### mergeStrategy?

> `optional` **mergeStrategy?**: `"append"` \| `"rewrite"`

Defined in: [sdk/record.ts:147](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L147)

***

### relationshipType?

> `optional` **relationshipType?**: `string`

Defined in: [sdk/record.ts:146](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L146)

***

### returnResult?

> `optional` **returnResult?**: `boolean`

Defined in: [sdk/record.ts:136](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L136)

***

### skipEmptyValues?

> `optional` **skipEmptyValues?**: `boolean`

Defined in: [sdk/record.ts:145](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L145)

When true, empty strings ('') and empty arrays ([]) are treated as unset and skipped
(no property is created). Zero (0) and false are real values and are never affected.
Defaults to false.

***

### suggestTypes?

> `optional` **suggestTypes?**: `boolean`

Defined in: [sdk/record.ts:137](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L137)
