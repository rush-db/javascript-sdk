[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / AgentStatus

# Type Alias: AgentStatus

> **AgentStatus** = `object`

Defined in: [api/ingest-types.ts:366](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L366)

What an on-prem agent (`rushdb-agent`) last reported.

## Properties

### hostname?

> `optional` **hostname?**: `string`

Defined in: [api/ingest-types.ts:368](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L368)

***

### lastError?

> `optional` **lastError?**: `string` \| `null`

Defined in: [api/ingest-types.ts:371](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L371)

***

### lastSeenAt?

> `optional` **lastSeenAt?**: `string`

Defined in: [api/ingest-types.ts:370](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L370)

***

### relations?

> `optional` **relations?**: `Record`\<`string`, `object`[]\>

Defined in: [api/ingest-types.ts:373](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L373)

Field relations the agent declared, by stream.

***

### sources?

> `optional` **sources?**: `object`[]

Defined in: [api/ingest-types.ts:369](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L369)

#### streams

> **streams**: `number`

#### type

> **type**: `string`

***

### version?

> `optional` **version?**: `string`

Defined in: [api/ingest-types.ts:367](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L367)
