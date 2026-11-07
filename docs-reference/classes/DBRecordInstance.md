[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordInstance

# Class: DBRecordInstance\<S, Q\>

Defined in: [sdk/record.ts:146](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L146)

## Type Parameters

### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = [`Schema`](../type-aliases/Schema.md)

### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

## Constructors

### Constructor

> **new DBRecordInstance**\<`S`, `Q`\>(`data?`): `DBRecordInstance`\<`S`, `Q`\>

Defined in: [sdk/record.ts:155](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L155)

Creates a new DBRecordInstance.
Typically, you don't create these directly but receive them from query results.

#### Parameters

##### data?

[`DBRecordInferred`](../type-aliases/DBRecordInferred.md)\<`S`, `Q`\> = `...`

The raw record data

#### Returns

`DBRecordInstance`\<`S`, `Q`\>

## Properties

### data

> **data**: [`DBRecordInferred`](../type-aliases/DBRecordInferred.md)\<`S`, `Q`\>

Defined in: [sdk/record.ts:147](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L147)

## Accessors

### date

#### Get Signature

> **get** **date**(): `Date`

Defined in: [sdk/record.ts:210](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L210)

The creation date of this record, derived from its ID.

##### Throws

Error if the ID is missing or invalid

##### Returns

`Date`

***

### exists

#### Get Signature

> **get** **exists**(): `boolean`

Defined in: [sdk/record.ts:163](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L163)

Checks if this record instance exists.
A record is considered to exist if it has a valid ID and label.

##### Returns

`boolean`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [sdk/record.ts:171](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L171)

The unique ID of this record.

##### Throws

Error if the ID is missing or invalid

##### Returns

`string`

***

### label

#### Get Signature

> **get** **label**(): `string`

Defined in: [sdk/record.ts:184](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L184)

The label (type) of this record.

##### Throws

Error if the label is missing or invalid

##### Returns

`string`

***

### proptypes

#### Get Signature

> **get** **proptypes**(): [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["type"\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["type"\] \}\>\> \| `undefined`

Defined in: [sdk/record.ts:197](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L197)

The property types of this record.

##### Throws

Error if the property types are missing or invalid

##### Returns

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["type"\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["type"\] \}\>\> \| `undefined`

***

### score

#### Get Signature

> **get** **score**(): `number` \| `undefined`

Defined in: [sdk/record.ts:240](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L240)

The similarity score from the most recent vector search.
Only present on records returned by `records.vectorSearch()`.
Returns `undefined` for records from regular `find`/`search` queries.
Equivalent to `data.__score`.

##### Returns

`number` \| `undefined`

***

### timestamp

#### Get Signature

> **get** **timestamp**(): `number`

Defined in: [sdk/record.ts:224](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L224)

The creation timestamp of this record, derived from its ID.

##### Throws

Error if the ID is missing or invalid

##### Returns

`number`

## Methods

### attach()

> **attach**(`target`, `options?`, `transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/record.ts:310](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L310)

Creates a relationship between this record and another record or records.

#### Parameters

##### target

[`RelationTarget`](../type-aliases/RelationTarget.md)

The target record(s) to create a relationship with

##### options?

[`RelationOptions`](../type-aliases/RelationOptions.md)

Optional relationship options

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the attach operation

#### Throws

Error if the record data is undefined

***

### delete()

> **delete**(`transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/record.ts:251](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L251)

Deletes this record from the database.

#### Parameters

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the delete operation

#### Throws

Error if the record data is undefined

***

### detach()

> **detach**(`target`, `options?`, `transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/record.ts:328](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L328)

Removes a relationship between this record and another record or records.

#### Parameters

##### target

[`RelationTarget`](../type-aliases/RelationTarget.md)

The target record(s) to remove the relationship from

##### options?

[`RelationDetachOptions`](../type-aliases/RelationDetachOptions.md)

Optional detach options

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the detach operation

#### Throws

Error if the record data is undefined

***

### set()

> **set**\<`S`\>(`data`, `transaction?`): `Promise`\<`DBRecordInstance`\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Defined in: [sdk/record.ts:289](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L289)

Sets all fields of this record to the provided values.
This replaces all existing field values.

#### Type Parameters

##### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = [`Schema`](../type-aliases/Schema.md)

#### Parameters

##### data

[`PropertyDraft`](../type-aliases/PropertyDraft.md)[] \| [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \}\>

The new field values

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<`DBRecordInstance`\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the updated record

#### Throws

Error if the record data is undefined

***

### update()

> **update**\<`S`\>(`data`, `transaction?`): `Promise`\<`DBRecordInstance`\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Defined in: [sdk/record.ts:268](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L268)

Updates specific fields of this record.

#### Type Parameters

##### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = [`Schema`](../type-aliases/Schema.md)

#### Parameters

##### data

[`PropertyDraft`](../type-aliases/PropertyDraft.md)[] \| `Partial`\<[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[S\[Key\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["multiple"\] extends true ? TypeMappingWrite\[(...)\[(...)\]\["type"\]\]\[\] : TypeMappingWrite\[S\[Key\]\["type"\]\] \}\>\>

The fields to update and their new values

##### transaction?

`string` \| [`Transaction`](Transaction.md)

Optional transaction or transaction ID

#### Returns

`Promise`\<`DBRecordInstance`\<`S`, [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>\>\>

Promise resolving to the updated record

#### Throws

Error if the record data is undefined
