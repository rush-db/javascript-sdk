[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordsArrayInstance

# Class: DBRecordsArrayInstance\<S, Q\>

Defined in: [sdk/record.ts:340](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L340)

Represents a collection of database records with additional methods for batch operations.
This class is typically returned from queries that match multiple records.

## Type Parameters

### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = [`Schema`](../type-aliases/Schema.md)

The schema type that defines the records' structure

### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

The search query type that was used to retrieve these records

## Constructors

### Constructor

> **new DBRecordsArrayInstance**\<`S`, `Q`\>(`data?`, `total?`, `searchQuery?`, `warnings?`): `DBRecordsArrayInstance`\<`S`, `Q`\>

Defined in: [sdk/record.ts:370](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L370)

Creates a new DBRecordsArrayInstance.
Typically, you don't create these directly but receive them from query results.

#### Parameters

##### data?

[`DBRecordInstance`](DBRecordInstance.md)\<`S`, `Q`\>[] = `[]`

The array of record instances

##### total?

`number` = `0`

The total number of records matching the query

##### searchQuery?

[`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

The search query that was used to retrieve these records

##### warnings?

`string`[]

#### Returns

`DBRecordsArrayInstance`\<`S`, `Q`\>

## Properties

### data

> **data**: [`DBRecordInstance`](DBRecordInstance.md)\<`S`, `Q`\>[]

Defined in: [sdk/record.ts:342](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L342)

The array of record instances

***

### fusion?

> `optional` **fusion?**: `"rrf"` \| `"dbsf"`

Defined in: [sdk/record.ts:360](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L360)

For a hybrid search: how its legs were combined.

***

### name?

> `optional` **name?**: `string`

Defined in: [sdk/record.ts:352](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L352)

For Smart search: a short title of the query.

***

### searchQuery?

> `optional` **searchQuery?**: [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Defined in: [sdk/record.ts:346](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L346)

The search query that was used to retrieve these records

***

### sql?

> `optional` **sql?**: `string`

Defined in: [sdk/record.ts:350](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L350)

For Smart search (`ai.search`): the SQL statement that produced this result.

***

### sqlPage?

> `optional` **sqlPage?**: `object`

Defined in: [sdk/record.ts:354](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L354)

For Smart search: the page of the statement's rows this result holds.

#### limit

> **limit**: `number`

#### skip

> **skip**: `number`

***

### textSearch?

> `optional` **textSearch?**: [`TextSearchReport`](../type-aliases/TextSearchReport.md)

Defined in: [sdk/record.ts:358](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L358)

For a keyword or hybrid search: how the engine ran its keyword leg.

***

### total

> **total**: `number`

Defined in: [sdk/record.ts:344](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L344)

The total number of records matching the query (may be more than the number in data)

***

### vectorSearch?

> `optional` **vectorSearch?**: [`VectorSearchReport`](../type-aliases/VectorSearchReport.md)

Defined in: [sdk/record.ts:356](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L356)

For a vector search: how the engine ran it.

***

### warnings?

> `optional` **warnings?**: `string`[]

Defined in: [sdk/record.ts:348](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L348)

Warnings returned by AI-assisted query generation, when applicable.

## Methods

### deleteAll()

> **deleteAll**(`transaction?`): `Promise`\<\{ `success`: `boolean`; \}\>

Defined in: [sdk/record.ts:388](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L388)

Deletes all records in this result set.

#### Parameters

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<\{ `success`: `boolean`; \}\>

Promise resolving to the delete result

***

### exportCsv()

> **exportCsv**(): `string`

Defined in: [sdk/record.ts:448](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L448)

Exports the records in this result set to a CSV string.

#### Returns

`string`

CSV string with headers derived from the first record's properties

***

### next()

> **next**(`options?`): `Promise`\<`DBRecordsArrayInstance`\<`S`, `Q`\>\>

Defined in: [sdk/record.ts:404](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L404)

Fetches the next page of results: of the original search query, or of the
SQL statement for a Smart search result.

#### Parameters

##### options?

If `preserveData` is true, appends new results to existing data; otherwise replaces.

###### preserveData?

`boolean`

#### Returns

`Promise`\<`DBRecordsArrayInstance`\<`S`, `Q`\>\>

Promise resolving to the next page as a new DBRecordsArrayInstance

***

### setProperties()

> **setProperties**(`patch`, `transaction?`): `Promise`\<`void`\>

Defined in: [sdk/record.ts:476](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L476)

Updates properties across all records in this result set.
Records are updated in batches of 100.

#### Parameters

##### patch

`Partial`\<[`InferSchemaTypesWrite`](../type-aliases/InferSchemaTypesWrite.md)\<`S`\>\>

The fields to update and their new values

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<`void`\>
