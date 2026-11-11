[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ConnectionStream

# Type Alias: ConnectionStream

> **ConnectionStream** = `object`

Defined in: [api/ingest-types.ts:390](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L390)

## Properties

### cursor

> **cursor**: `string` \| `number` \| `null`

Defined in: [api/ingest-types.ts:404](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L404)

Incremental position, e.g. the last modified time seen.

***

### deleteMode

> **deleteMode**: [`ConnectionDeleteMode`](ConnectionDeleteMode.md)

Defined in: [api/ingest-types.ts:394](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L394)

***

### description?

> `optional` **description?**: `string`

Defined in: [api/ingest-types.ts:405](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L405)

***

### enabled

> **enabled**: `boolean`

Defined in: [api/ingest-types.ts:392](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L392)

***

### label

> **label**: `string`

Defined in: [api/ingest-types.ts:393](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L393)

***

### lastSyncedAt

> **lastSyncedAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:402](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L402)

***

### optional?

> `optional` **optional?**: `boolean`

Defined in: [api/ingest-types.ts:406](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L406)

***

### policy

> **policy**: [`FieldPolicy`](FieldPolicy.md)

Defined in: [api/ingest-types.ts:396](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L396)

The field doctrine every batch of this stream passes through.

***

### records

> **records**: `number`

Defined in: [api/ingest-types.ts:401](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L401)

***

### reviewed

> **reviewed**: `boolean`

Defined in: [api/ingest-types.ts:398](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L398)

An allowlist a person confirmed.

***

### stream

> **stream**: `string`

Defined in: [api/ingest-types.ts:391](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L391)

***

### unreviewed

> **unreviewed**: `string`[]

Defined in: [api/ingest-types.ts:400](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L400)

Fields seen since the review and held back until someone reviews them.
