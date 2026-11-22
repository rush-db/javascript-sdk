[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordsArrayInstance

# Class: DBRecordsArrayInstance\<S, Q\>

Defined in: [sdk/record.ts:360](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L360)

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

> **new DBRecordsArrayInstance**\<`S`, `Q`\>(`data?`, `total?`, `searchQuery?`, `warnings?`, `client?`): `DBRecordsArrayInstance`\<`S`, `Q`\>

Defined in: [sdk/record.ts:400](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L400)

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

Warnings returned by AI-assisted query generation

##### client?

[`RestAPI`](RestAPI.md)

The client the records were read through; batch methods and
  pagination are sent through it. When omitted, the most recently created
  RushDB instance is used.

#### Returns

`DBRecordsArrayInstance`\<`S`, `Q`\>

## Properties

### catalogWarnings?

> `optional` **catalogWarnings?**: [`CatalogWarning`](../type-aliases/CatalogWarning.md)[]

Defined in: [sdk/record.ts:374](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L374)

Labels, properties or compared texts in the query that no record holds,
with what the query most likely meant (the server's catalog check, RushDB
3.0.14 and later). Absent when nothing is missing.

***

### data

> **data**: [`DBRecordInstance`](DBRecordInstance.md)\<`S`, `Q`\>[]

Defined in: [sdk/record.ts:362](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L362)

The array of record instances

***

### fusion?

> `optional` **fusion?**: `"rrf"` \| `"dbsf"`

Defined in: [sdk/record.ts:386](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L386)

For a hybrid search: how its legs were combined.

***

### name?

> `optional` **name?**: `string`

Defined in: [sdk/record.ts:378](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L378)

For Smart search: a short title of the query.

***

### searchQuery?

> `optional` **searchQuery?**: [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Defined in: [sdk/record.ts:366](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L366)

The search query that was used to retrieve these records

***

### sql?

> `optional` **sql?**: `string`

Defined in: [sdk/record.ts:376](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L376)

For Smart search (`ai.search`): the SQL statement that produced this result.

***

### sqlPage?

> `optional` **sqlPage?**: `object`

Defined in: [sdk/record.ts:380](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L380)

For Smart search: the page of the statement's rows this result holds.

#### limit

> **limit**: `number`

#### skip

> **skip**: `number`

***

### textSearch?

> `optional` **textSearch?**: [`TextSearchReport`](../type-aliases/TextSearchReport.md)

Defined in: [sdk/record.ts:384](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L384)

For a keyword or hybrid search: how the engine ran its keyword leg.

***

### total

> **total**: `number`

Defined in: [sdk/record.ts:364](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L364)

The total number of records matching the query (may be more than the number in data)

***

### vectorSearch?

> `optional` **vectorSearch?**: [`VectorSearchReport`](../type-aliases/VectorSearchReport.md)

Defined in: [sdk/record.ts:382](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L382)

For a vector search: how the engine ran it.

***

### warnings?

> `optional` **warnings?**: `string`[]

Defined in: [sdk/record.ts:368](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L368)

Warnings returned by AI-assisted query generation, when applicable.

## Methods

### deleteAll()

> **deleteAll**(`transaction?`): `Promise`\<\{ `success`: `boolean`; \}\>

Defined in: [sdk/record.ts:420](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L420)

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

Defined in: [sdk/record.ts:480](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L480)

Exports the records in this result set to a CSV string.

#### Returns

`string`

CSV string with headers derived from the first record's properties

***

### next()

> **next**(`options?`): `Promise`\<`DBRecordsArrayInstance`\<`S`, `Q`\>\>

Defined in: [sdk/record.ts:436](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L436)

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

Defined in: [sdk/record.ts:508](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L508)

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
