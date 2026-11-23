[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CatalogConnector

# Type Alias: CatalogConnector

> **CatalogConnector** = `object`

Defined in: [api/ingest-types.ts:463](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L463)

## Properties

### auth

> **auth**: `string`[]

Defined in: [api/ingest-types.ts:470](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L470)

***

### beta

> **beta**: `boolean`

Defined in: [api/ingest-types.ts:475](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L475)

***

### category

> **category**: `string`

Defined in: [api/ingest-types.ts:467](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L467)

e.g. `crm`, `billing`, `support`, `project-management`, `knowledge`, `spreadsheet`.

***

### config?

> `optional` **config?**: `Record`\<`string`, [`ConnectorConfigField`](ConnectorConfigField.md)\>

Defined in: [api/ingest-types.ts:472](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L472)

***

### custom?

> `optional` **custom?**: `object`

Defined in: [api/ingest-types.ts:479](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L479)

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

Defined in: [api/ingest-types.ts:468](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L468)

***

### docsUrl?

> `optional` **docsUrl?**: `string`

Defined in: [api/ingest-types.ts:469](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L469)

***

### id

> **id**: `string`

Defined in: [api/ingest-types.ts:464](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L464)

***

### incremental

> **incremental**: `boolean`

Defined in: [api/ingest-types.ts:474](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L474)

***

### logo?

> `optional` **logo?**: `string`

Defined in: [api/ingest-types.ts:481](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L481)

The brand logo (`data:image/svg+xml`).

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:465](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L465)

***

### oauthAvailable

> **oauthAvailable**: `boolean`

Defined in: [api/ingest-types.ts:477](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L477)

RushDB (or this server) has an OAuth app for it, so "Connect with …" works.

***

### streams

> **streams**: `object`[]

Defined in: [api/ingest-types.ts:471](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L471)

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

Defined in: [api/ingest-types.ts:473](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L473)
