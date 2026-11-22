[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ConnectionStreamSettings

# Type Alias: ConnectionStreamSettings

> **ConnectionStreamSettings** = `object`

Defined in: [api/ingest-types.ts:490](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L490)

## Properties

### deleteMode?

> `optional` **deleteMode?**: [`ConnectionDeleteMode`](ConnectionDeleteMode.md)

Defined in: [api/ingest-types.ts:494](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L494)

***

### enabled?

> `optional` **enabled?**: `boolean`

Defined in: [api/ingest-types.ts:492](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L492)

***

### label?

> `optional` **label?**: `string`

Defined in: [api/ingest-types.ts:493](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L493)

***

### policy?

> `optional` **policy?**: `Pick`\<[`FieldPolicy`](FieldPolicy.md), `"mode"` \| `"include"` \| `"exclude"` \| `"hash"`\>

Defined in: [api/ingest-types.ts:496](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L496)

The stream's field doctrine (see `connections.fields` / `reviewFields`).

***

### stream

> **stream**: `string`

Defined in: [api/ingest-types.ts:491](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L491)
