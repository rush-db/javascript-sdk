[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Connection

# Type Alias: Connection

> **Connection** = `object`

Defined in: [api/ingest-types.ts:418](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L418)

## Properties

### account

> **account**: `string` \| `null`

Defined in: [api/ingest-types.ts:430](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L430)

***

### activeRunId

> **activeRunId**: `string` \| `null`

Defined in: [api/ingest-types.ts:443](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L443)

***

### agent

> **agent**: [`AgentStatus`](AgentStatus.md) \| `null`

Defined in: [api/ingest-types.ts:445](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L445)

Agent connections: what the agent last reported.

***

### authType

> **authType**: `string` \| `null`

Defined in: [api/ingest-types.ts:429](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L429)

***

### config

> **config**: `Record`\<`string`, `unknown`\>

Defined in: [api/ingest-types.ts:428](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L428)

***

### connectorId

> **connectorId**: `string`

Defined in: [api/ingest-types.ts:421](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L421)

***

### connectorName

> **connectorName**: `string`

Defined in: [api/ingest-types.ts:423](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L423)

***

### createdAt

> **createdAt**: `string`

Defined in: [api/ingest-types.ts:449](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L449)

***

### customWebhookUrl

> **customWebhookUrl**: `string` \| `null`

Defined in: [api/ingest-types.ts:436](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L436)

Custom trigger/push URL without its token (the token is shown once when rotated).

***

### hasCredentials

> **hasCredentials**: `boolean`

Defined in: [api/ingest-types.ts:431](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L431)

***

### hasCustomWebhookToken

> **hasCustomWebhookToken**: `boolean`

Defined in: [api/ingest-types.ts:437](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L437)

***

### hasWebhookSecret

> **hasWebhookSecret**: `boolean`

Defined in: [api/ingest-types.ts:432](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L432)

***

### id

> **id**: `string`

Defined in: [api/ingest-types.ts:419](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L419)

***

### lastError

> **lastError**: `string` \| `null`

Defined in: [api/ingest-types.ts:442](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L442)

***

### lastRunAt

> **lastRunAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:439](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L439)

***

### lastSuccessAt

> **lastSuccessAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:440](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L440)

***

### lastWebhookAt

> **lastWebhookAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:441](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L441)

***

### logo?

> `optional` **logo?**: `string`

Defined in: [api/ingest-types.ts:447](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L447)

The connector's brand logo (`data:image/svg+xml`), when it has one.

***

### mode

> **mode**: [`ConnectionMode`](ConnectionMode.md)

Defined in: [api/ingest-types.ts:425](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L425)

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:420](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L420)

***

### nextRunAt

> **nextRunAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:427](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L427)

***

### scheduleMinutes

> **scheduleMinutes**: `number` \| `null`

Defined in: [api/ingest-types.ts:426](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L426)

***

### specId

> **specId**: `string` \| `null`

Defined in: [api/ingest-types.ts:422](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L422)

***

### status

> **status**: [`ConnectionStatus`](ConnectionStatus.md)

Defined in: [api/ingest-types.ts:424](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L424)

***

### streams

> **streams**: [`ConnectionStream`](ConnectionStream.md)[]

Defined in: [api/ingest-types.ts:448](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L448)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [api/ingest-types.ts:450](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L450)

***

### webhookSetup

> **webhookSetup**: `string` \| `null`

Defined in: [api/ingest-types.ts:438](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L438)

***

### webhookUrl

> **webhookUrl**: `string` \| `null`

Defined in: [api/ingest-types.ts:434](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L434)

Where the provider sends events (when the connector supports webhooks).
