[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / RushDB

# Class: RushDB

Defined in: [sdk/sdk.ts:15](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/sdk.ts#L15)

## Extends

- [`RestAPI`](RestAPI.md)

## Constructors

### Constructor

> **new RushDB**(`token?`, `config?`): `RushDB`

Defined in: [sdk/sdk.ts:24](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/sdk.ts#L24)

#### Parameters

##### token?

`string`

##### config?

[`SDKConfig`](../type-aliases/SDKConfig.md)

#### Returns

`RushDB`

#### Overrides

[`RestAPI`](RestAPI.md).[`constructor`](RestAPI.md#constructor)

## Properties

### ai

> **ai**: `object`

Defined in: [api/api.ts:1497](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1497)

#### getSchema

> **getSchema**: (`params?`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`unknown`[]\>\>

Returns the full graph schema as structured JSON.
Each item contains the label name, record count, properties with value ranges/samples,
and cross-label relationships with direction.
Properties may include a `vectorIndexes` array when one or more embedding indexes
exist for that property — a non-empty array means the property is queryable with
`db.records.vectorSearch()`. Each entry exposes: id, name, sourceType, similarityFunction,
dimensions, status, and modelKey.
Use property `id` fields to pass to db.properties.values() for deeper drill-down.

##### Parameters

###### params?

Optional filter. `labels` scopes to specific labels only.
                `force: true` bypasses the 1-hour schema cache and triggers a full recalculation.

###### force?

`boolean`

###### labels?

`string`[]

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`unknown`[]\>\>

#### getSchemaMarkdown

> **getSchemaMarkdown**: (`params?`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`string`\>\>

Returns the full graph schema as compact Markdown tables.
Token-efficient — intended for direct LLM consumption.
Includes: labels with counts, properties with types and value ranges/samples,
cross-label relationship map, and a "Semantic Search" column per property that shows
`sourceType similarityFunction dimensionsd [status]` (e.g. `managed cosine 1536d [ready]`)
for indexed properties, or `—` when no embedding index exists.

##### Parameters

###### params?

Optional filter. `labels` scopes to specific labels only.
                `force: true` bypasses the 1-hour schema cache and triggers a full recalculation.

###### force?

`boolean`

###### labels?

`string`[]

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`string`\>\>

#### indexes

> **indexes**: `object`

Embedding Index management methods.

##### indexes.create

> **create**: (`params`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`EmbeddingIndex`](../type-aliases/EmbeddingIndex.md)\>\>

Creates a new embedding index policy for a string property.

###### Parameters

###### params

[`CreateEmbeddingIndexParams`](../type-aliases/CreateEmbeddingIndexParams.md)

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`EmbeddingIndex`](../type-aliases/EmbeddingIndex.md)\>\>

###### Remarks

In direct mode (a standalone engine) only external indexes (`external: true`) can be
created; a managed index is filled by RushDB Cloud's embedding model, so it throws `CloudOnlyError`.

##### indexes.delete

> **delete**: (`id`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `deleted`: `boolean`; \}\>\>

Deletes an embedding index policy by ID.

###### Parameters

###### id

`string`

The ID of the embedding index to delete

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `deleted`: `boolean`; \}\>\>

##### indexes.find

> **find**: () => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`EmbeddingIndex`](../type-aliases/EmbeddingIndex.md)[]\>\>

Lists all embedding index policies configured for the current project.

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`EmbeddingIndex`](../type-aliases/EmbeddingIndex.md)[]\>\>

##### indexes.stats

> **stats**: (`id`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`EmbeddingIndexStats`](../type-aliases/EmbeddingIndexStats.md)\>\>

Returns indexing statistics for an embedding index.

###### Parameters

###### id

`string`

The ID of the embedding index

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`EmbeddingIndexStats`](../type-aliases/EmbeddingIndexStats.md)\>\>

##### indexes.upsertVectors

> **upsertVectors**: (`id`, `params`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`UpsertEmbeddingVectorsResult`](../type-aliases/UpsertEmbeddingVectorsResult.md)\>\>

Upserts external vectors for a specific embedding index.

###### Parameters

###### id

`string`

The target embedding index ID

###### params

[`UpsertEmbeddingVectorsParams`](../type-aliases/UpsertEmbeddingVectorsParams.md)

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`UpsertEmbeddingVectorsResult`](../type-aliases/UpsertEmbeddingVectorsResult.md)\>\>

#### search

> **search**: \<`S`\>(`prompt`, `options?`) => `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Performs AI-assisted smart search from natural language.

RushDB converts the prompt into a SearchQuery using the project schema, executes it,
and returns matching records with the generated SearchQuery attached to the result.

Use `db.records.vectorSearch({ ... })` for direct vector similarity over embedding indexes.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### prompt

`string`

Natural-language search request to convert into a SearchQuery and execute

###### options?

`SmartSearchOptions`\<`S`\> & `object`

Optional smart-search context and transaction

##### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

##### Remarks

**RushDB Cloud only.** In direct mode this throws `CloudOnlyError` without sending a request.

#### Inherited from

[`RestAPI`](RestAPI.md).[`ai`](RestAPI.md#ai)

***

### direct

> **direct**: `DirectEngine` \| `undefined`

Defined in: [api/api.ts:85](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L85)

Direct engine transport (standalone `rushdb`) when `direct` mode is set.
In direct mode every request is answered from the engine; nothing is sent
to RushDB Cloud.

#### Inherited from

[`RestAPI`](RestAPI.md).[`direct`](RestAPI.md#direct)

***

### fetcher

> **fetcher**: \<`Data`\>(`input`, `__namedParameters`) => `Promise`\<`Data`\>

Defined in: [api/api.ts:77](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L77)

#### Type Parameters

##### Data

`Data` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

#### Parameters

##### input

`string` \| `URL`

##### \_\_namedParameters

`MakeRequestConfig`\<`Data`\>

#### Returns

`Promise`\<`Data`\>

#### Inherited from

[`RestAPI`](RestAPI.md).[`fetcher`](RestAPI.md#fetcher)

***

### labels

> **labels**: `object`

Defined in: [api/api.ts:1289](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1289)

API methods for managing labels in the database

#### find

> **find**: \<`S`\>(`searchQuery`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`Record`\<`string`, `number`\>\>\>

Searches for labels based on the provided query

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### searchQuery

[`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Query parameters to filter labels

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`Record`\<`string`, `number`\>\>\>

Promise with the API response containing a record of label names and their counts

#### Inherited from

[`RestAPI`](RestAPI.md).[`labels`](RestAPI.md#labels)

***

### logger

> **logger**: [`Logger`](../type-aliases/Logger.md) \| `undefined`

Defined in: [api/api.ts:79](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L79)

#### Inherited from

[`RestAPI`](RestAPI.md).[`logger`](RestAPI.md#logger)

***

### options

> **options**: \{ `allowForceDelete?`: `boolean`; \} \| `undefined`

Defined in: [api/api.ts:78](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L78)

#### Union Members

##### Type Literal

\{ `allowForceDelete?`: `boolean`; \}

##### allowForceDelete?

> `optional` **allowForceDelete?**: `boolean`

###### Description

Defaults to `false`.
Allows using the `delete()` method without a specified criteria,
which results in deleting all Records in the project.

***

`undefined`

#### Inherited from

[`RestAPI`](RestAPI.md).[`options`](RestAPI.md#options)

***

### properties

> **properties**: `object`

Defined in: [api/api.ts:1187](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1187)

API methods for managing properties in the database

#### delete

> **delete**: (`id`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Property`](../type-aliases/Property.md)\>\>

Deletes a property by its ID

##### Parameters

###### id

`string`

The unique identifier of the property to delete

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Property`](../type-aliases/Property.md)\>\>

Promise with the API response containing the deleted property

#### find

> **find**: \<`S`\>(`searchQuery`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Property`](../type-aliases/Property.md)[]\>\>

Searches for properties based on the provided query

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### searchQuery

[`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Query parameters to filter properties

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Property`](../type-aliases/Property.md)[]\>\>

Promise with the API response containing an array of matching properties

#### findById

> **findById**: (`id`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Property`](../type-aliases/Property.md)\>\>

Retrieves a specific property by its ID

##### Parameters

###### id

`string`

The unique identifier of the property to retrieve

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Property`](../type-aliases/Property.md)\>\>

Promise with the API response containing the requested property

#### values

> **values**: (`id`, `searchQuery?`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`object` & `object` & [`PropertyValuesData`](../type-aliases/PropertyValuesData.md)\>\>

Retrieves values for a specific property

##### Parameters

###### id

`string`

The unique identifier of the property

###### searchQuery?

[`SearchQueryLabelsClause`](../type-aliases/SearchQueryLabelsClause.md) & [`PaginationClause`](../type-aliases/PaginationClause.md) & [`OrderClause`](../type-aliases/OrderClause.md)\<`any`\> & [`WhereClause`](../type-aliases/WhereClause.md)\<`any`\> & [`SelectClause`](../type-aliases/SelectClause.md) & [`AggregateClause`](../type-aliases/AggregateClause.md) & [`GroupByClause`](../type-aliases/GroupByClause.md) & `object`

Query parameters to filter properties

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`object` & `object` & [`PropertyValuesData`](../type-aliases/PropertyValuesData.md)\>\>

Promise with the API response containing the property and its values

#### Inherited from

[`RestAPI`](RestAPI.md).[`properties`](RestAPI.md#properties)

***

### query

> **query**: `object`

Defined in: [api/api.ts:1427](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1427)

#### raw

> **raw**: \<`T`\>(`param0`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`T`\>\>

Executes an openCypher statement against the project's data and
returns `{ records }`, one object per row. The engine must run with the
`cypher` language enabled (the bundled deploy templates enable it).

##### Type Parameters

###### T

`T` *extends* `unknown` = `any`

##### Parameters

###### param0

Object containing the query and optional params

###### params?

[`FlatObject`](../type-aliases/FlatObject.md)

Optional parameters to pass to the query

###### query

`string`

Query string to execute

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction id or Transaction instance to run the query in

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<`T`\>\>

ApiResponse<any> - Raw result returned by the server (wrapped in ApiResponse)

#### Inherited from

[`RestAPI`](RestAPI.md).[`query`](RestAPI.md#query)

***

### records

> **records**: `object`

Defined in: [api/api.ts:167](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L167)

API methods for managing database records

#### attach

> **attach**: (`source`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Attaches a relation between records

##### Parameters

###### source

The source record to create relation from

###### options?

[`RelationOptions`](../type-aliases/RelationOptions.md)

###### source

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

###### target

[`RelationTarget`](../type-aliases/RelationTarget.md)

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise with the API response

#### create

> **create**: \<`S`\>(`label`, `transaction?`) => `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Creates a new record in the database

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### label

The label/type of the record

###### data

[`PropertyDraft`](../type-aliases/PropertyDraft.md)[] \| [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[(...)\[(...)\]\]\[\] : TypeMappingWrite\[(...)\[(...)\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: (...)\[(...)\]\["multiple"\] extends true ? (...)\[(...)\]\[\] : TypeMappingWrite\[(...)\[(...)\]\] \}\>

###### label

`string`

###### options?

`Omit`\<[`DBRecordCreationOptions`](../type-aliases/DBRecordCreationOptions.md), `"returnResult"` \| `"capitalizeLabels"` \| `"relationshipType"`\>

###### vectors?

`VectorEntry`[]

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the created DBRecordInstance

##### Throws

Error if data is not a flat object and createMany should be used instead

##### Remarks

In direct mode a record created inside a transaction is staged into it, with an id
generated by the SDK. An upsert or inline vectors inside a transaction throw `DirectModeError`.

#### createMany

> **createMany**: \<`S`\>(`data`, `transaction?`) => `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Creates multiple flat records in a single operation.
Use this only for CSV-like flat rows (no nested objects/arrays).
For nested/complex JSON, use `records.importJson`.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### data

Object containing label, options and data array (of flat objects)

###### data

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[(...)\[(...)\]\]\[\] : TypeMappingWrite\[(...)\[(...)\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: (...)\[(...)\]\["multiple"\] extends true ? (...)\[(...)\]\[\] : TypeMappingWrite\[(...)\[(...)\]\] \}\>[]

Array of flat record data to create

###### label

`string`

The label/type for all records

###### options?

[`DBRecordCreationOptions`](../type-aliases/DBRecordCreationOptions.md)

Optional write configuration

###### vectors?

`VectorEntry`[] \| `VectorEntry`[][]

Per-row inline vectors for external embedding indexes.
Accepts either:
- `VectorEntry[][]` — outer array indexed per record, inner array per vector property on that record.
  `vectors[i]` is applied to `data[i]`. Its length must not exceed `data.length`.
- `VectorEntry[]` — a flat list applied to the first record (single-record batches).
  Auto-wrapped into `[[entry1, entry2, …]]` so callers don't need the double nesting.

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to DBRecordsArrayInstance containing created records

##### Throws

Error if any record is not flat. Use `records.importJson` for nested JSON.

#### delete

> **delete**: \<`S`\>(`searchQuery`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Deletes records matching the search query

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### searchQuery

[`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Query to identify records to delete

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise with the API response

##### Throws

EmptyTargetError if query is empty and force delete is not allowed

#### deleteById

> **deleteById**: (`idOrIds`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Deletes record(s) by ID

##### Parameters

###### idOrIds

[`MaybeArray`](../type-aliases/MaybeArray.md)\<`string`\>

Single ID or array of IDs to delete

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise with the API response

#### detach

> **detach**: (`source`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Detaches (removes) a relation between records

##### Parameters

###### source

The source record to remove relation from

###### options?

[`RelationDetachOptions`](../type-aliases/RelationDetachOptions.md)

###### source

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

###### target

[`RelationTarget`](../type-aliases/RelationTarget.md)

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise with the API response

#### export

> **export**: \<`S`\>(`searchQuery`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `dateTime`: `string`; `fileContent`: `string`; \}\>\>

Exports records matching the search query to CSV format

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### searchQuery

[`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Query to identify records to export

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `dateTime`: `string`; `fileContent`: `string`; \}\>\>

Promise with the API response containing CSV data

#### find

> **find**: \<`S`, `Q`\>(`searchQueryWithEntryPoint`, `transaction?`) => `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, `Q`\>\>

Searches for records matching the query criteria

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

###### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

##### Parameters

###### searchQueryWithEntryPoint

`Q` & `object`

Search query with optional entry point ID

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, `Q`\>\>

Promise resolving to DBRecordsArrayInstance containing matched records

#### findById

> **findById**: \<`S`, `Arg`, `Result`\>(`idOrIds`, `transaction?`) => `Promise`\<`Result`\>

Retrieves record(s) by ID

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = [`Schema`](../type-aliases/Schema.md)

###### Arg

`Arg` *extends* [`MaybeArray`](../type-aliases/MaybeArray.md)\<`string`\> = [`MaybeArray`](../type-aliases/MaybeArray.md)\<`string`\>

###### Result

`Result` = `Arg` *extends* `string`[] ? [`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\> : [`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>

##### Parameters

###### idOrIds

`Arg`

Single ID or array of IDs to retrieve

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<`Result`\>

Promise resolving to DBRecordInstance or DBRecordsArrayInstance depending on input

#### findOne

> **findOne**: \<`S`, `Q`\>(`searchQuery`, `transaction?`) => `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Finds a single record matching the search query

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

###### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

##### Parameters

###### searchQuery

`Q`

Query to identify the record

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to DBRecordInstance

#### findUniq

> **findUniq**: \<`S`, `Q`\>(`searchQuery`, `transaction?`) => `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, `Q`\>\>

Finds a unique record matching the search query

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

###### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

##### Parameters

###### searchQuery

`Q`

Query to identify the record

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, `Q`\>\>

Promise resolving to DBRecordInstance

##### Throws

NonUniqueResultError if multiple records match the query

#### importCsv

> **importCsv**: \<`S`\>(`params`, `transaction?`) => `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Imports records from CSV data.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### params

CSV import configuration

###### data

`string`

Raw CSV string

###### label

`string`

Label applied to imported records

###### options?

[`DBRecordCreationOptions`](../type-aliases/DBRecordCreationOptions.md)

Import options (type inference etc.)

###### parentId?

`string`

Optional parent record id for hierarchical imports

###### parseConfig?

\{ `delimiter?`: `string`; `dynamicTyping?`: `boolean`; `escapeChar?`: `string`; `header?`: `boolean`; `newline?`: `string`; `quoteChar?`: `string`; `skipEmptyLines?`: `boolean` \| `"greedy"`; \}

CSV parsing configuration (subset allowed by server)

###### parseConfig.delimiter?

`string`

###### parseConfig.dynamicTyping?

`boolean`

###### parseConfig.escapeChar?

`string`

###### parseConfig.header?

`boolean`

###### parseConfig.newline?

`string`

###### parseConfig.quoteChar?

`string`

###### parseConfig.skipEmptyLines?

`boolean` \| `"greedy"`

###### vectors?

`VectorEntry`[][]

Per-row inline vectors for external embedding indexes.
`vectors[i]` is applied to CSV row `i` (0-based, after header).
Its length must not exceed the number of data rows — validated server-side.

###### transaction?

`string` \| [`Transaction`](Transaction.md)

##### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

#### importJson

> **importJson**: \<`S`\>(`params`, `transaction?`) => `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Import nested or complex JSON payloads.
Works in two modes:
 - With `label` provided
 - Without `label`: expects a container object whose top-level values are objects or arrays.

Throws if `label` is missing and the input is a top-level array or object record.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### params

###### data

`any`

###### label?

`string`

###### options?

[`DBRecordCreationOptions`](../type-aliases/DBRecordCreationOptions.md)

###### transaction?

`string` \| [`Transaction`](Transaction.md)

##### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

##### Example

```ts
// with label
await db.records.importJson({ label: 'ITEM', data: [{...}, {...}] })
// without label
await db.records.importJson({ data: { ITEM: [{...}, {...}], USER: [{...}] } })
```

#### set

> **set**: \<`S`\>(`target`, `transaction?`) => `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Sets (overwrites) record data

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### target

The record to update

###### data

[`PropertyDraft`](../type-aliases/PropertyDraft.md)[] \| [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[(...)\[(...)\]\]\[\] : TypeMappingWrite\[(...)\[(...)\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: (...)\[(...)\]\["multiple"\] extends true ? (...)\[(...)\]\[\] : TypeMappingWrite\[(...)\[(...)\]\] \}\>

###### label

`string`

###### options?

`Omit`\<[`DBRecordCreationOptions`](../type-aliases/DBRecordCreationOptions.md), `"returnResult"` \| `"capitalizeLabels"` \| `"relationshipType"`\>

###### target

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

###### vectors?

`VectorEntry`[]

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to updated DBRecordInstance

##### Throws

Error if data is not a flat object

#### textSearch

> **textSearch**: \<`S`\>(`params`, `transaction?`) => `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Keyword (BM25) search over a text index: the records matching `query`,
best first (`__score`), among those `labels` and `where` select.
`total` counts every match, not just the page.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### params

[`TextSearchParams`](../type-aliases/TextSearchParams.md)

Keywords, the index (or the label whose one text index to use) and filters

###### transaction?

`string` \| [`Transaction`](Transaction.md)

##### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

#### update

> **update**: \<`S`\>(`target`, `transaction?`) => `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Updates record data (partial update)

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### target

The record to update

###### data

[`PropertyDraft`](../type-aliases/PropertyDraft.md)[] \| `Partial`\<[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: (...)\[(...)\]\["multiple"\] extends true ? (...)\[(...)\]\[\] : TypeMappingWrite\[(...)\[(...)\]\] \} & \{ \[Key in string \| number \| symbol\]?: (...)\[(...)\] extends true ? (...)\[\] : (...)\[(...)\] \}\>\>

###### label

`string`

###### options?

`Omit`\<[`DBRecordCreationOptions`](../type-aliases/DBRecordCreationOptions.md), `"returnResult"` \| `"capitalizeLabels"` \| `"relationshipType"`\>

###### target

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to updated DBRecordInstance

##### Throws

Error if data is not a flat object

#### upsert

> **upsert**: \<`S`\>(`label`, `transaction?`) => `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Upserts a record: attempts to find an existing record matching mergeBy property values (and optional label)
If found: mergeStrategy determines behavior.
 - 'rewrite': replaces all existing own properties with incoming (like set)
 - 'append': updates/adds provided properties, keeps others
If not found: creates a new record.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### label

The label/type of the record

###### data

[`PropertyDraft`](../type-aliases/PropertyDraft.md)[] \| [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[(...)\[(...)\]\]\[\] : TypeMappingWrite\[(...)\[(...)\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: (...)\[(...)\]\["multiple"\] extends true ? (...)\[(...)\]\[\] : TypeMappingWrite\[(...)\[(...)\]\] \}\>

###### label?

`string`

###### options?

`Omit`\<[`DBRecordCreationOptions`](../type-aliases/DBRecordCreationOptions.md), `"returnResult"` \| `"capitalizeLabels"` \| `"relationshipType"`\> & `object`

###### vectors?

`VectorEntry`[]

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

#### vectorSearch

> **vectorSearch**: \<`S`\>(`params`, `transaction?`) => `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Performs vector similarity search over records whose `propertyName` has an embedding index.

RushDB narrows candidates by `labels` and optional `where` filters first, then ranks them by
similarity. Pass either `query` for managed indexes or `queryVector` for external/custom vectors.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### params

[`VectorSearchParams`](../type-aliases/VectorSearchParams.md)

Vector search parameters including the indexed property, labels, and query input

###### transaction?

`string` \| [`Transaction`](Transaction.md)

##### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

##### Remarks

In direct mode (a standalone engine) only `queryVector` works: a text `query` is embedded
with RushDB Cloud's managed model, so it throws `CloudOnlyError` without sending a request.

#### Inherited from

[`RestAPI`](RestAPI.md).[`records`](RestAPI.md#records)

***

### relationships

> **relationships**: `object`

Defined in: [api/api.ts:1008](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1008)

API methods for managing relations between records

#### createMany

> **createMany**: (`data`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Creates many relationships by matching source and target records by keys

##### Parameters

###### data

Configuration of source/target match and relation details

###### direction?

[`RelationDirection`](../type-aliases/RelationDirection.md)

###### manyToMany?

`boolean`

###### properties?

`Record`\<`string`, `unknown`\>

###### source

\{ `key?`: `string`; `label`: `string`; `where?`: [`Where`](../type-aliases/Where.md); \}

###### source.key?

`string`

###### source.label

`string`

###### source.where?

[`Where`](../type-aliases/Where.md)

###### target

\{ `key?`: `string`; `label`: `string`; `where?`: [`Where`](../type-aliases/Where.md); \}

###### target.key?

`string`

###### target.label

`string`

###### target.where?

[`Where`](../type-aliases/Where.md)

###### type?

`string`

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise with the API response message

#### deleteMany

> **deleteMany**: (`data`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Deletes many relationships by matching source and target records by keys or by manyToMany filter

##### Parameters

###### data

###### direction?

[`RelationDirection`](../type-aliases/RelationDirection.md)

###### manyToMany?

`boolean`

###### source

\{ `key?`: `string`; `label`: `string`; `where?`: [`Where`](../type-aliases/Where.md); \}

###### source.key?

`string`

###### source.label

`string`

###### source.where?

[`Where`](../type-aliases/Where.md)

###### target

\{ `key?`: `string`; `label`: `string`; `where?`: [`Where`](../type-aliases/Where.md); \}

###### target.key?

`string`

###### target.label

`string`

###### target.where?

[`Where`](../type-aliases/Where.md)

###### type?

`string`

###### transaction?

`string` \| [`Transaction`](Transaction.md)

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

#### find

> **find**: \<`S`\>(`searchQuery`, `transaction?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Relation`](../type-aliases/Relation.md)[]\>\>

Searches for relations matching the query criteria.
Pagination (`limit`/`skip`) is part of the search query body, same as records search.

##### Type Parameters

###### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

##### Parameters

###### searchQuery?

[`RelationshipSearchQuery`](../type-aliases/RelationshipSearchQuery.md)\<`S`\> = `{}`

Query to identify relations

###### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction for atomic operations

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`Relation`](../type-aliases/Relation.md)[]\>\>

Promise with the API response containing matched relations

#### patterns

> **patterns**: `object`

Reviews and manages relationship patterns inferred from the current project schema.

##### patterns.analyze

> **analyze**: () => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `queued`: `true`; \}\>\>

Queues schema analysis to generate relationship pattern suggestions.

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `queued`: `true`; \}\>\>

###### Remarks

**RushDB Cloud only.** In direct mode this throws `CloudOnlyError` without sending a request.

##### patterns.approve

> **approve**: (`id`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`RelationshipPatternDto`](../type-aliases/RelationshipPatternDto.md) \| `undefined`\>\>

Approves and applies a suggested relationship pattern.

###### Parameters

###### id

`string`

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`RelationshipPatternDto`](../type-aliases/RelationshipPatternDto.md) \| `undefined`\>\>

###### Remarks

**RushDB Cloud only.** In direct mode this throws `CloudOnlyError` without sending a request.

##### patterns.delete

> **delete**: (`id`, `options?`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `deleted`: `true`; \}\>\>

Deletes a saved relationship pattern.
Pass deleteExisting to also remove relationships materialized by the pattern.

###### Parameters

###### id

`string`

###### options?

[`DeleteRelationshipPatternOptions`](../type-aliases/DeleteRelationshipPatternOptions.md)

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `deleted`: `true`; \}\>\>

###### Remarks

**RushDB Cloud only.** In direct mode this throws `CloudOnlyError` without sending a request.

##### patterns.ignore

> **ignore**: (`id`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`RelationshipPatternDto`](../type-aliases/RelationshipPatternDto.md) \| `undefined`\>\>

Ignores a suggested relationship pattern without applying it.

###### Parameters

###### id

`string`

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`RelationshipPatternDto`](../type-aliases/RelationshipPatternDto.md) \| `undefined`\>\>

###### Remarks

**RushDB Cloud only.** In direct mode this throws `CloudOnlyError` without sending a request.

##### patterns.list

> **list**: () => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`RelationshipPatternListResponse`](../type-aliases/RelationshipPatternListResponse.md)\>\>

Lists inferred relationship patterns, schema relationships, and analysis status.

###### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`RelationshipPatternListResponse`](../type-aliases/RelationshipPatternListResponse.md)\>\>

###### Remarks

**RushDB Cloud only.** In direct mode this throws `CloudOnlyError` without sending a request.

#### Inherited from

[`RestAPI`](RestAPI.md).[`relationships`](RestAPI.md#relationships)

***

### settings

> **settings**: `object`

Defined in: [api/api.ts:1407](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1407)

#### get

> **get**: () => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `selfHosted`: `boolean`; \} \| `undefined`\>\>

The project's settings.

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `selfHosted`: `boolean`; \} \| `undefined`\>\>

##### Remarks

**RushDB Cloud only.** In direct mode this throws `CloudOnlyError` without sending a request.

#### Inherited from

[`RestAPI`](RestAPI.md).[`settings`](RestAPI.md#settings)

***

### textIndexes

> **textIndexes**: `object`

Defined in: [api/api.ts:1468](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1468)

BM25 text indexes, searched with `db.records.textSearch()` or as the
keyword leg of a hybrid `db.records.vectorSearch({ text })`.

#### create

> **create**: (`params`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`TextIndex`](../type-aliases/TextIndex.md)\>\>

Declares a text index over one property of a label, or every string of
it (`property: '*'`). It is built online; its `status` turns `ready`.

##### Parameters

###### params

[`CreateTextIndexParams`](../type-aliases/CreateTextIndexParams.md)

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`TextIndex`](../type-aliases/TextIndex.md)\>\>

#### delete

> **delete**: (`name`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `deleted`: `boolean`; \}\>\>

Drops a text index by name.

##### Parameters

###### name

`string`

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `deleted`: `boolean`; \}\>\>

#### find

> **find**: () => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`TextIndex`](../type-aliases/TextIndex.md)[]\>\>

Lists the project's text indexes.

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<[`TextIndex`](../type-aliases/TextIndex.md)[]\>\>

#### suggestName

> **suggestName**: (`params`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `name`: `string`; \}\>\>

The name a new text index would get by default, unique in the project.

##### Parameters

###### params

`Pick`\<[`CreateTextIndexParams`](../type-aliases/CreateTextIndexParams.md), `"label"` \| `"property"`\>

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `name`: `string`; \}\>\>

#### Inherited from

[`RestAPI`](RestAPI.md).[`textIndexes`](RestAPI.md#textindexes)

***

### tx

> **tx**: `object`

Defined in: [api/api.ts:1318](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L1318)

API methods for managing database transactions

#### begin

> **begin**: (`config?`) => `Promise`\<[`Transaction`](Transaction.md)\>

Begins a new database transaction

##### Parameters

###### config?

`Partial`\<\{ `autocommit`: `boolean`; `ttl`: `number`; \}\>

Optional configuration object for the transaction

##### Returns

`Promise`\<[`Transaction`](Transaction.md)\>

A new Transaction instance that can be used for subsequent operations

##### Throws

If the transaction cannot be started

#### commit

> **commit**: (`tx`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Commits a transaction, making its changes permanent

##### Parameters

###### tx

`string` \| [`Transaction`](Transaction.md)

The ID of the transaction or Transaction instance to commit

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

An ApiResponse indicating success or failure of the commit

##### Throws

If the transaction cannot be committed or doesn't exist

#### get

> **get**: (`tx`) => `Promise`\<[`Transaction`](Transaction.md)\>

Retrieves an existing transaction by its ID

##### Parameters

###### tx

`string` \| [`Transaction`](Transaction.md)

The ID of the transaction or Transaction instance to retrieve

##### Returns

`Promise`\<[`Transaction`](Transaction.md)\>

A Transaction instance representing the retrieved transaction

##### Throws

If the transaction doesn't exist or cannot be retrieved

#### rollback

> **rollback**: (`tx`) => `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Rolls back a transaction, undoing all changes made within it

##### Parameters

###### tx

`string` \| [`Transaction`](Transaction.md)

The ID of the transaction or Transaction instance to roll back

##### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

An ApiResponse indicating success or failure of the rollback

##### Throws

If the transaction cannot be rolled back or doesn't exist

#### Inherited from

[`RestAPI`](RestAPI.md).[`tx`](RestAPI.md#tx)

***

### instance

> `static` **instance**: `RushDB` \| `null` = `null`

Defined in: [sdk/sdk.ts:16](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/sdk.ts#L16)

***

### state

> `static` **state**: [`State`](../type-aliases/State.md)

Defined in: [sdk/sdk.ts:18](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/sdk.ts#L18)

## Methods

### \_extractTargetIds()

> **\_extractTargetIds**(`target`, `operation`): `string`[]

Defined in: [api/api.ts:122](https://github.com/rush-db/javascript-sdk/blob/main/src/api/api.ts#L122)

#### Parameters

##### target

[`RelationTarget`](../type-aliases/RelationTarget.md)

##### operation

`string`

#### Returns

`string`[]

#### Inherited from

[`RestAPI`](RestAPI.md).[`_extractTargetIds`](RestAPI.md#_extracttargetids)

***

### toDBRecordInstance()

> **toDBRecordInstance**\<`S`\>(`record`): [`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>

Defined in: [sdk/sdk.ts:64](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/sdk.ts#L64)

#### Type Parameters

##### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = [`Schema`](../type-aliases/Schema.md)

#### Parameters

##### record

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<`DBRecordInternalProps`\<`S`\> & [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`RecordProps`](../type-aliases/RecordProps.md)\<`S`\>\>\>

#### Returns

[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>

***

### getInstance()

> `static` **getInstance**(): `RushDB`

Defined in: [sdk/sdk.ts:47](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/sdk.ts#L47)

Synchronous getInstance that returns instance or null

#### Returns

`RushDB`

***

### isInitialized()

> `static` **isInitialized**(): `boolean`

Defined in: [sdk/sdk.ts:60](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/sdk.ts#L60)

Check if the SDK is initialized

#### Returns

`boolean`
