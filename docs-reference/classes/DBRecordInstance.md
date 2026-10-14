[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecordInstance

# Class: DBRecordInstance\<S, Q\>

Defined in: [sdk/record.ts:141](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L141)

## Type Parameters

### S

`S` *extends* [`Schema`](../type-aliases/Schema.md) = [`Schema`](../type-aliases/Schema.md)

### Q

`Q` *extends* [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\> = [`SearchQuery`](../type-aliases/SearchQuery.md)\<`S`\>

## Constructors

### Constructor

> **new DBRecordInstance**\<`S`, `Q`\>(`data?`): `DBRecordInstance`\<`S`, `Q`\>

Defined in: [sdk/record.ts:150](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L150)

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

Defined in: [sdk/record.ts:142](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L142)

## Accessors

### date

#### Get Signature

> **get** **date**(): `Date`

Defined in: [sdk/record.ts:205](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L205)

The creation date of this record, derived from its ID.

##### Throws

Error if the ID is missing or invalid

##### Returns

`Date`

***

### exists

#### Get Signature

> **get** **exists**(): `boolean`

Defined in: [sdk/record.ts:158](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L158)

Checks if this record instance exists.
A record is considered to exist if it has a valid ID and label.

##### Returns

`boolean`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [sdk/record.ts:166](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L166)

The unique ID of this record.

##### Throws

Error if the ID is missing or invalid

##### Returns

`string`

***

### label

#### Get Signature

> **get** **label**(): `string`

Defined in: [sdk/record.ts:179](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L179)

The label (type) of this record.

##### Throws

Error if the label is missing or invalid

##### Returns

`string`

***

### proptypes

#### Get Signature

> **get** **proptypes**(): [`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["type"\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["type"\] \}\>\> \| `undefined`

Defined in: [sdk/record.ts:192](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L192)

The property types of this record.

##### Throws

Error if the property types are missing or invalid

##### Returns

[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<[`FlattenTypes`](../type-aliases/FlattenTypes.md)\<\{ \[Key in string \| number \| symbol\]: S\[Key\]\["type"\] \} & \{ \[Key in string \| number \| symbol\]?: S\[Key\]\["type"\] \}\>\> \| `undefined`

***

### score

#### Get Signature

> **get** **score**(): `number` \| `undefined`

Defined in: [sdk/record.ts:235](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L235)

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

Defined in: [sdk/record.ts:219](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L219)

The creation timestamp of this record, derived from its ID.

##### Throws

Error if the ID is missing or invalid

##### Returns

`number`

## Methods

### attach()

> **attach**(`target`, `options?`, `transaction?`): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/record.ts:305](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L305)

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

Defined in: [sdk/record.ts:246](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L246)

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

Defined in: [sdk/record.ts:323](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L323)

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

Defined in: [sdk/record.ts:284](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L284)

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

Defined in: [sdk/record.ts:263](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L263)

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
