[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ConnectionStreamSettings

# Type Alias: ConnectionStreamSettings

> **ConnectionStreamSettings** = `object`

Defined in: [api/ingest-types.ts:481](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L481)

## Properties

### deleteMode?

> `optional` **deleteMode?**: [`ConnectionDeleteMode`](ConnectionDeleteMode.md)

Defined in: [api/ingest-types.ts:485](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L485)

***

### enabled?

> `optional` **enabled?**: `boolean`

Defined in: [api/ingest-types.ts:483](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L483)

***

### label?

> `optional` **label?**: `string`

Defined in: [api/ingest-types.ts:484](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L484)

***

### policy?

> `optional` **policy?**: `Pick`\<[`FieldPolicy`](FieldPolicy.md), `"mode"` \| `"include"` \| `"exclude"` \| `"hash"`\>

Defined in: [api/ingest-types.ts:487](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L487)

The stream's field doctrine (see `connections.fields` / `reviewFields`).

***

### stream

> **stream**: `string`

Defined in: [api/ingest-types.ts:482](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L482)
