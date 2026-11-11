[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CatalogConnector

# Type Alias: CatalogConnector

> **CatalogConnector** = `object`

Defined in: [api/ingest-types.ts:454](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L454)

## Properties

### auth

> **auth**: `string`[]

Defined in: [api/ingest-types.ts:461](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L461)

***

### beta

> **beta**: `boolean`

Defined in: [api/ingest-types.ts:466](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L466)

***

### category

> **category**: `string`

Defined in: [api/ingest-types.ts:458](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L458)

e.g. `crm`, `billing`, `support`, `project-management`, `knowledge`, `spreadsheet`.

***

### config?

> `optional` **config?**: `Record`\<`string`, [`ConnectorConfigField`](ConnectorConfigField.md)\>

Defined in: [api/ingest-types.ts:463](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L463)

***

### custom?

> `optional` **custom?**: `object`

Defined in: [api/ingest-types.ts:470](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L470)

A workspace's own connector.

#### origin

> **origin**: `string`

#### specId

> **specId**: `string`

#### status

> **status**: `string`

#### version

> **version**: `number`

***

### description

> **description**: `string`

Defined in: [api/ingest-types.ts:459](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L459)

***

### docsUrl?

> `optional` **docsUrl?**: `string`

Defined in: [api/ingest-types.ts:460](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L460)

***

### id

> **id**: `string`

Defined in: [api/ingest-types.ts:455](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L455)

***

### incremental

> **incremental**: `boolean`

Defined in: [api/ingest-types.ts:465](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L465)

***

### logo?

> `optional` **logo?**: `string`

Defined in: [api/ingest-types.ts:472](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L472)

The brand logo (`data:image/svg+xml`).

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:456](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L456)

***

### oauthAvailable

> **oauthAvailable**: `boolean`

Defined in: [api/ingest-types.ts:468](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L468)

RushDB (or this server) has an OAuth app for it, so "Connect with …" works.

***

### streams

> **streams**: `object`[]

Defined in: [api/ingest-types.ts:462](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L462)

#### description?

> `optional` **description?**: `string`

#### label

> **label**: `string`

#### name

> **name**: `string`

#### optional?

> `optional` **optional?**: `boolean`

***

### webhooks

> **webhooks**: `boolean`

Defined in: [api/ingest-types.ts:464](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L464)
