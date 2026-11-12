[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PushTemplate

# Type Alias: PushTemplate

> **PushTemplate** = `object`

Defined in: [api/ingest-types.ts:377](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L377)

How Zapier, Make or n8n push records into a webhook (push) connection.

## Properties

### description

> **description**: `string`

Defined in: [api/ingest-types.ts:380](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L380)

***

### docsUrl?

> `optional` **docsUrl?**: `string`

Defined in: [api/ingest-types.ts:381](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L381)

***

### id

> **id**: `string`

Defined in: [api/ingest-types.ts:378](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L378)

***

### logo?

> `optional` **logo?**: `string`

Defined in: [api/ingest-types.ts:387](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L387)

The tool's brand logo (`data:image/svg+xml`).

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:379](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L379)

***

### samplePayload

> **samplePayload**: `Record`\<`string`, `unknown`\>

Defined in: [api/ingest-types.ts:385](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L385)

A body the tool can send as is.

***

### steps

> **steps**: `string`[]

Defined in: [api/ingest-types.ts:383](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L383)

Steps to follow in the tool, in order. `{{pushUrl}}` stands for the connection's push URL.
