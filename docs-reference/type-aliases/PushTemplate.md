[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PushTemplate

# Type Alias: PushTemplate

> **PushTemplate** = `object`

Defined in: [api/ingest-types.ts:386](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L386)

How Zapier, Make or n8n push records into a webhook (push) connection.

## Properties

### description

> **description**: `string`

Defined in: [api/ingest-types.ts:389](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L389)

***

### docsUrl?

> `optional` **docsUrl?**: `string`

Defined in: [api/ingest-types.ts:390](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L390)

***

### id

> **id**: `string`

Defined in: [api/ingest-types.ts:387](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L387)

***

### logo?

> `optional` **logo?**: `string`

Defined in: [api/ingest-types.ts:396](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L396)

The tool's brand logo (`data:image/svg+xml`).

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:388](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L388)

***

### samplePayload

> **samplePayload**: `Record`\<`string`, `unknown`\>

Defined in: [api/ingest-types.ts:394](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L394)

A body the tool can send as is.

***

### steps

> **steps**: `string`[]

Defined in: [api/ingest-types.ts:392](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L392)

Steps to follow in the tool, in order. `{{pushUrl}}` stands for the connection's push URL.
