[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / AgentStatus

# Type Alias: AgentStatus

> **AgentStatus** = `object`

Defined in: [api/ingest-types.ts:375](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L375)

What an on-prem agent (`rushdb-agent`) last reported.

## Properties

### hostname?

> `optional` **hostname?**: `string`

Defined in: [api/ingest-types.ts:377](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L377)

***

### lastError?

> `optional` **lastError?**: `string` \| `null`

Defined in: [api/ingest-types.ts:380](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L380)

***

### lastSeenAt?

> `optional` **lastSeenAt?**: `string`

Defined in: [api/ingest-types.ts:379](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L379)

***

### relations?

> `optional` **relations?**: `Record`\<`string`, `object`[]\>

Defined in: [api/ingest-types.ts:382](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L382)

Field relations the agent declared, by stream.

***

### sources?

> `optional` **sources?**: `object`[]

Defined in: [api/ingest-types.ts:378](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L378)

#### streams

> **streams**: `number`

#### type

> **type**: `string`

***

### version?

> `optional` **version?**: `string`

Defined in: [api/ingest-types.ts:376](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L376)
