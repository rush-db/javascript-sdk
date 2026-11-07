[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordCreationOptions

# Type Alias: DBRecordCreationOptions

> **DBRecordCreationOptions** = `object`

Defined in: [sdk/record.ts:124](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L124)

Options for creating database records.

## Properties

### capitalizeLabels?

> `optional` **capitalizeLabels?**: `boolean`

Defined in: [sdk/record.ts:128](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L128)

***

### convertNumericValuesToNumbers?

> `optional` **convertNumericValuesToNumbers?**: `boolean`

Defined in: [sdk/record.ts:127](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L127)

***

### merge?

> `optional` **merge?**: `boolean`

Defined in: [sdk/record.ts:143](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L143)

Shorthand for `mergeBy: []` + `mergeStrategy: 'append'`: match existing
records on all incoming keys and merge (upsert) instead of creating
duplicates on re-import.

***

### mergeBy?

> `optional` **mergeBy?**: `string`[]

Defined in: [sdk/record.ts:137](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L137)

***

### mergeStrategy?

> `optional` **mergeStrategy?**: `"append"` \| `"rewrite"`

Defined in: [sdk/record.ts:136](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L136)

***

### relationshipType?

> `optional` **relationshipType?**: `string`

Defined in: [sdk/record.ts:135](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L135)

***

### returnResult?

> `optional` **returnResult?**: `boolean`

Defined in: [sdk/record.ts:125](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L125)

***

### skipEmptyValues?

> `optional` **skipEmptyValues?**: `boolean`

Defined in: [sdk/record.ts:134](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L134)

When true, empty strings ('') and empty arrays ([]) are treated as unset and skipped
(no property is created). Zero (0) and false are real values and are never affected.
Defaults to false.

***

### suggestTypes?

> `optional` **suggestTypes?**: `boolean`

Defined in: [sdk/record.ts:126](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L126)
