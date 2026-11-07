[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordCreationOptions

# Type Alias: DBRecordCreationOptions

> **DBRecordCreationOptions** = `object`

Defined in: [sdk/record.ts:125](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L125)

Options for creating database records.

## Properties

### capitalizeLabels?

> `optional` **capitalizeLabels?**: `boolean`

Defined in: [sdk/record.ts:129](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L129)

***

### convertNumericValuesToNumbers?

> `optional` **convertNumericValuesToNumbers?**: `boolean`

Defined in: [sdk/record.ts:128](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L128)

***

### merge?

> `optional` **merge?**: `boolean`

Defined in: [sdk/record.ts:144](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L144)

Shorthand for `mergeBy: []` + `mergeStrategy: 'append'`: match existing
records on all incoming keys and merge (upsert) instead of creating
duplicates on re-import.

***

### mergeBy?

> `optional` **mergeBy?**: `string`[]

Defined in: [sdk/record.ts:138](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L138)

***

### mergeStrategy?

> `optional` **mergeStrategy?**: `"append"` \| `"rewrite"`

Defined in: [sdk/record.ts:137](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L137)

***

### relationshipType?

> `optional` **relationshipType?**: `string`

Defined in: [sdk/record.ts:136](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L136)

***

### returnResult?

> `optional` **returnResult?**: `boolean`

Defined in: [sdk/record.ts:126](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L126)

***

### skipEmptyValues?

> `optional` **skipEmptyValues?**: `boolean`

Defined in: [sdk/record.ts:135](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L135)

When true, empty strings ('') and empty arrays ([]) are treated as unset and skipped
(no property is created). Zero (0) and false are real values and are never affected.
Defaults to false.

***

### suggestTypes?

> `optional` **suggestTypes?**: `boolean`

Defined in: [sdk/record.ts:127](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L127)
