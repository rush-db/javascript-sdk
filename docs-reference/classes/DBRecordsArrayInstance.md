[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordsArrayInstance

# Class: DBRecordsArrayInstance\<S, Q\>

Defined in: [sdk/record.ts:345](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L345)

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

Defined in: [sdk/record.ts:375](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L375)

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

Defined in: [sdk/record.ts:347](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L347)

The array of record instances

***

### fusion?

> `optional` **fusion?**: `"rrf"` \| `"dbsf"`

Defined in: [sdk/record.ts:365](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L365)

For a hybrid search: how its legs were combined.

***

### name?

> `optional` **name?**: `string`

Defined in: [sdk/record.ts:357](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L357)

For Smart search: a short title of the query.

***

### searchQuery?

> `optional` **searchQuery?**: [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Defined in: [sdk/record.ts:351](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L351)

The search query that was used to retrieve these records

***

### sql?

> `optional` **sql?**: `string`

Defined in: [sdk/record.ts:355](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L355)

For Smart search (`ai.search`): the SQL statement that produced this result.

***

### sqlPage?

> `optional` **sqlPage?**: `object`

Defined in: [sdk/record.ts:359](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L359)

For Smart search: the page of the statement's rows this result holds.

#### limit

> **limit**: `number`

#### skip

> **skip**: `number`

***

### textSearch?

> `optional` **textSearch?**: [`TextSearchReport`](../type-aliases/TextSearchReport.md)

Defined in: [sdk/record.ts:363](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L363)

For a keyword or hybrid search: how the engine ran its keyword leg.

***

### total

> **total**: `number`

Defined in: [sdk/record.ts:349](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L349)

The total number of records matching the query (may be more than the number in data)

***

### vectorSearch?

> `optional` **vectorSearch?**: [`VectorSearchReport`](../type-aliases/VectorSearchReport.md)

Defined in: [sdk/record.ts:361](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L361)

For a vector search: how the engine ran it.

***

### warnings?

> `optional` **warnings?**: `string`[]

Defined in: [sdk/record.ts:353](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L353)

Warnings returned by AI-assisted query generation, when applicable.

## Methods

### deleteAll()

> **deleteAll**(`transaction?`): `Promise`\<\{ `success`: `boolean`; \}\>

Defined in: [sdk/record.ts:393](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L393)

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

Defined in: [sdk/record.ts:453](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L453)

Exports the records in this result set to a CSV string.

#### Returns

`string`

CSV string with headers derived from the first record's properties

***

### next()

> **next**(`options?`): `Promise`\<`DBRecordsArrayInstance`\<`S`, `Q`\>\>

Defined in: [sdk/record.ts:409](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L409)

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

Defined in: [sdk/record.ts:481](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L481)

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
