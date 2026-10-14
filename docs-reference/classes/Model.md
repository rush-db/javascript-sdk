[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Model

# Class: Model\<S\>

Defined in: [sdk/model.ts:59](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L59)

Represents a model in the RushDB database.
A model defines the structure and behavior of a specific type of record in the database.
It provides methods for CRUD operations and relationship management.

## Type Parameters

### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = `any`

The schema type that defines the structure of the model's records

## Constructors

### Constructor

> **new Model**\<`S`\>(`modelName`, `schema`, `config?`): `Model`\<`S`\>

Defined in: [sdk/model.ts:71](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L71)

Creates a new Model instance.

#### Parameters

##### modelName

`string`

The name/label of the model in the database

##### schema

`S`

The schema definition that describes the model's structure

##### config?

[`ModelConfig`](../type-aliases/ModelConfig.md)

Optional model configuration

#### Returns

`Model`\<`S`\>

## Properties

### draft

> `readonly` **draft**: [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingRead\[S\[Key\]\["type"\]\]\[\] : TypeMappingRead\[S\[Key\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["multiple"\] extends true ? TypeMappingRead\[S\[Key\]\["type"\]\]\[\] : TypeMappingRead\[S\[Key\]\["type"\]\] \}\>\>

Defined in: [sdk/model.ts:84](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L84)

#### Description

Type helper for a draft version of the schema.
Represents a flat object containing only the record's own properties
(defined by the schema), excluding system fields such as `__id`, `__label`,
and `__proptypes`. This type does not yet have a representation on the
database side.

***

### label

> `readonly` **label**: `string`

Defined in: [sdk/model.ts:60](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L60)

***

### record

> `readonly` **record**: [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<`DBRecordInternalProps`\<`S`\> & [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`RecordProps`](../type-aliases/RecordProps.md)\<`S`\>\>\>

Defined in: [sdk/model.ts:99](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L99)

#### Description

Type helper for a fully defined record with database representation.
Similar to the draft, but includes all fields that come with the record's
database-side representation, such as `__id`, `__label`, and `__proptypes`.

***

### recordInstance

> `readonly` **recordInstance**: [`DBRecordInstance`](DBRecordInstance.md)\<`S`\>

Defined in: [sdk/model.ts:106](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L106)

#### Description

Type helper for a single record instance.
Extends the record by providing additional methods to operate on this specific
record, such as saving, updating, or deleting it.

***

### recordsArrayInstance

> `readonly` **recordsArrayInstance**: [`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`\>

Defined in: [sdk/model.ts:113](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L113)

#### Description

Type helper for an array of record instances.
Similar to a single record instance but supports batch or bulk operations,
allowing efficient management of multiple records simultaneously.

***

### schema

> `readonly` **schema**: `S`

Defined in: [sdk/model.ts:61](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L61)

***

### searchQuery

> `readonly` **searchQuery**: [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

Defined in: [sdk/model.ts:92](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L92)

#### Description

Type helper for a SearchQuery of the schema.
Represents a structured query input that enables filtering,
sorting, pagination, and aggregation of records based on schema-defined fields.
Useful for composing reusable, type-safe search expressions.

## Methods

### attach()

> **attach**(`params`, `transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/model.ts:300](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L300)

Attaches a relationship between records.

#### Parameters

##### params

Object containing source, target, and relationship options

###### options?

[`RelationOptions`](../type-aliases/RelationOptions.md)

###### source

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

###### target

[`RelationTarget`](../type-aliases/RelationTarget.md)

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the attach operation

***

### create()

> **create**(`record`, `transaction?`, `options?`): `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\> \| `null`\>

Defined in: [sdk/model.ts:238](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L238)

Creates a new record in the database.

#### Parameters

##### record

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \}\>

The record data to create

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

##### options?

[`CreateOptions`](../type-aliases/CreateOptions.md)

#### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\> \| `null`\>

Promise resolving to the created record

#### Throws

UniquenessError if the record violates uniqueness constraints

***

### createMany()

> **createMany**(`records`, `transaction?`): `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Defined in: [sdk/model.ts:456](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L456)

Creates multiple records in a single operation.

#### Parameters

##### records

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \}\>[]

Array of records to create

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the created records

#### Throws

UniquenessError if any record violates uniqueness constraints

***

### delete()

> **delete**(`searchQuery`, `transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/model.ts:522](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L522)

Deletes records that match the given search criteria.

#### Parameters

##### searchQuery

`Omit`\<[`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>, `"labels"`\>

Search criteria for records to delete

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the delete operation

#### Throws

EmptyTargetError if no search criteria are provided

***

### deleteById()

> **deleteById**(`idOrIds`, `transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/model.ts:539](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L539)

Deletes one or more records by their IDs.

#### Parameters

##### idOrIds

[`MaybeArray`](../type-aliases/MaybeArray.md)\<`string`\>

Single ID or array of IDs to delete

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the delete operation

***

### detach()

> **detach**(`params`, `transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/model.ts:323](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L323)

Detaches a relationship between records.

#### Parameters

##### params

Object containing source, target, and detach options

###### options?

[`RelationDetachOptions`](../type-aliases/RelationDetachOptions.md)

###### source

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

###### target

[`RelationTarget`](../type-aliases/RelationTarget.md)

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the detach operation

***

### find()

> **find**\<`Q`\>(`searchQuery?`, `transaction?`): `Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, `Q`\>\>

Defined in: [sdk/model.ts:162](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L162)

Finds records that match the given search criteria.

#### Type Parameters

##### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

#### Parameters

##### searchQuery?

`Q` & `object`

Optional search criteria

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`DBRecordsArrayInstance`](DBRecordsArrayInstance.md)\<`S`, `Q`\>\>

Promise resolving to matching records

***

### findById()

> **findById**(`id`, `transaction?`): `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Defined in: [sdk/model.ts:202](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L202)

Finds a record by its ID.

#### Parameters

##### id

`string`

The ID of the record to find

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the matching record or null if not found

***

### findOne()

> **findOne**\<`Q`\>(`searchQuery?`, `transaction?`): `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Defined in: [sdk/model.ts:178](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L178)

Finds a single record that matches the given search criteria.

#### Type Parameters

##### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

#### Parameters

##### searchQuery?

`Q` & `object`

Optional search criteria

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the matching record or null if not found

***

### findUniq()

> **findUniq**\<`Q`\>(`searchQuery?`, `transaction?`): `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, `Q`\>\>

Defined in: [sdk/model.ts:213](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L213)

Finds a unique record that matches the given search criteria.

#### Type Parameters

##### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

#### Parameters

##### searchQuery?

`Q` & `object`

Optional search criteria

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, `Q`\>\>

Promise resolving to the unique matching record or null if not found

***

### getLabel()

> **getLabel**(): `string`

Defined in: [sdk/model.ts:120](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L120)

Retrieves the model's label.

#### Returns

`string`

The label/name of the model

***

### set()

> **set**(`target`, `record`, `transaction?`): `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Defined in: [sdk/model.ts:428](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L428)

Sets all fields of a record to the provided values.

#### Parameters

##### target

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

The target record to modify

##### record

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \}\>

The new values to set

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the modified record

***

### toDBRecordInstance()

> **toDBRecordInstance**(`record`): `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<[`Schema`](../type-aliases/Schema.md), [`SearchQuery`](../type-aliases/SearchQuery.md)\<[`Schema`](../type-aliases/Schema.md)\>\>\>

Defined in: [sdk/model.ts:146](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L146)

Converts a database record to a record instance (DBRecordInstance) with additional methods.

#### Parameters

##### record

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<`DBRecordInternalProps`\<`S`\> & [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`RecordProps`](../type-aliases/RecordProps.md)\<`S`\>\>\>

The database record to convert

#### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<[`Schema`](../type-aliases/Schema.md), [`SearchQuery`](../type-aliases/SearchQuery.md)\<[`Schema`](../type-aliases/Schema.md)\>\>\>

A record instance with additional methods

#### Throws

Error if no RushDB instance was provided during initialization

***

### update()

> **update**(`target`, `record`, `transaction?`): `Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Defined in: [sdk/model.ts:440](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L440)

Updates specified fields of a record.

#### Parameters

##### target

[`DBRecordTarget`](../type-aliases/DBRecordTarget.md)

The target record to modify

##### record

`Partial`\<[`InferSchemaTypesWrite`](../type-aliases/InferSchemaTypesWrite.md)\<`S`\>\>

The fields to update and their new values

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`DBRecordInstance`](DBRecordInstance.md)\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the modified record
