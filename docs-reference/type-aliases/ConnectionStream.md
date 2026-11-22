[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ConnectionStream

# Type Alias: ConnectionStream

> **ConnectionStream** = `object`

Defined in: [api/ingest-types.ts:399](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L399)

## Properties

### cursor

> **cursor**: `string` \| `number` \| `null`

Defined in: [api/ingest-types.ts:413](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L413)

Incremental position, e.g. the last modified time seen.

***

### deleteMode

> **deleteMode**: [`ConnectionDeleteMode`](ConnectionDeleteMode.md)

Defined in: [api/ingest-types.ts:403](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L403)

***

### description?

> `optional` **description?**: `string`

Defined in: [api/ingest-types.ts:414](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L414)

***

### enabled

> **enabled**: `boolean`

Defined in: [api/ingest-types.ts:401](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L401)

***

### label

> **label**: `string`

Defined in: [api/ingest-types.ts:402](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L402)

***

### lastSyncedAt

> **lastSyncedAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:411](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L411)

***

### optional?

> `optional` **optional?**: `boolean`

Defined in: [api/ingest-types.ts:415](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L415)

***

### policy

> **policy**: [`FieldPolicy`](FieldPolicy.md)

Defined in: [api/ingest-types.ts:405](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L405)

The field doctrine every batch of this stream passes through.

***

### records

> **records**: `number`

Defined in: [api/ingest-types.ts:410](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L410)

***

### reviewed

> **reviewed**: `boolean`

Defined in: [api/ingest-types.ts:407](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L407)

An allowlist a person confirmed.

***

### stream

> **stream**: `string`

Defined in: [api/ingest-types.ts:400](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L400)

***

### unreviewed

> **unreviewed**: `string`[]

Defined in: [api/ingest-types.ts:409](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L409)

Fields seen since the review and held back until someone reviews them.
