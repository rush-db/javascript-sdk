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

Defined in: [sdk/record.ts:364](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L364)

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

Defined in: [sdk/record.ts:354](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L354)

For a hybrid search: how its legs were combined.

***

### searchQuery?

> `optional` **searchQuery?**: [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Defined in: [sdk/record.ts:346](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L346)

The search query that was used to retrieve these records

***

### textSearch?

> `optional` **textSearch?**: [`TextSearchReport`](../type-aliases/TextSearchReport.md)

Defined in: [sdk/record.ts:352](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L352)

For a keyword or hybrid search: how the engine ran its keyword leg.

***

### total

> **total**: `number`

Defined in: [sdk/record.ts:344](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L344)

The total number of records matching the query (may be more than the number in data)

***

### vectorSearch?

> `optional` **vectorSearch?**: [`VectorSearchReport`](../type-aliases/VectorSearchReport.md)

Defined in: [sdk/record.ts:350](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L350)

For a vector search: how the engine ran it.

***

### warnings?

> `optional` **warnings?**: `string`[]

Defined in: [sdk/record.ts:348](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L348)

Warnings returned by AI-assisted query generation, when applicable.

## Methods

### deleteAll()

> **deleteAll**(`transaction?`): `Promise`\<\{ `success`: `boolean`; \}\>

Defined in: [sdk/record.ts:382](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L382)

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

Defined in: [sdk/record.ts:427](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L427)

Exports the records in this result set to a CSV string.

#### Returns

`string`

CSV string with headers derived from the first record's properties

***

### next()

> **next**(`options?`): `Promise`\<`DBRecordsArrayInstance`\<`S`, `Q`\>\>

Defined in: [sdk/record.ts:397](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L397)

Fetches the next page of results based on the original search query.

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

Defined in: [sdk/record.ts:455](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L455)

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
