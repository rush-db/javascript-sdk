[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Connection

# Type Alias: Connection

> **Connection** = `object`

Defined in: [api/ingest-types.ts:409](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L409)

## Properties

### account

> **account**: `string` \| `null`

Defined in: [api/ingest-types.ts:421](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L421)

***

### activeRunId

> **activeRunId**: `string` \| `null`

Defined in: [api/ingest-types.ts:434](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L434)

***

### agent

> **agent**: [`AgentStatus`](AgentStatus.md) \| `null`

Defined in: [api/ingest-types.ts:436](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L436)

Agent connections: what the agent last reported.

***

### authType

> **authType**: `string` \| `null`

Defined in: [api/ingest-types.ts:420](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L420)

***

### config

> **config**: `Record`\<`string`, `unknown`\>

Defined in: [api/ingest-types.ts:419](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L419)

***

### connectorId

> **connectorId**: `string`

Defined in: [api/ingest-types.ts:412](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L412)

***

### connectorName

> **connectorName**: `string`

Defined in: [api/ingest-types.ts:414](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L414)

***

### createdAt

> **createdAt**: `string`

Defined in: [api/ingest-types.ts:440](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L440)

***

### customWebhookUrl

> **customWebhookUrl**: `string` \| `null`

Defined in: [api/ingest-types.ts:427](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L427)

Custom trigger/push URL without its token (the token is shown once when rotated).

***

### hasCredentials

> **hasCredentials**: `boolean`

Defined in: [api/ingest-types.ts:422](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L422)

***

### hasCustomWebhookToken

> **hasCustomWebhookToken**: `boolean`

Defined in: [api/ingest-types.ts:428](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L428)

***

### hasWebhookSecret

> **hasWebhookSecret**: `boolean`

Defined in: [api/ingest-types.ts:423](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L423)

***

### id

> **id**: `string`

Defined in: [api/ingest-types.ts:410](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L410)

***

### lastError

> **lastError**: `string` \| `null`

Defined in: [api/ingest-types.ts:433](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L433)

***

### lastRunAt

> **lastRunAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:430](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L430)

***

### lastSuccessAt

> **lastSuccessAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:431](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L431)

***

### lastWebhookAt

> **lastWebhookAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:432](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L432)

***

### logo?

> `optional` **logo?**: `string`

Defined in: [api/ingest-types.ts:438](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L438)

The connector's brand logo (`data:image/svg+xml`), when it has one.

***

### mode

> **mode**: [`ConnectionMode`](ConnectionMode.md)

Defined in: [api/ingest-types.ts:416](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L416)

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:411](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L411)

***

### nextRunAt

> **nextRunAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:418](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L418)

***

### scheduleMinutes

> **scheduleMinutes**: `number` \| `null`

Defined in: [api/ingest-types.ts:417](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L417)

***

### specId

> **specId**: `string` \| `null`

Defined in: [api/ingest-types.ts:413](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L413)

***

### status

> **status**: [`ConnectionStatus`](ConnectionStatus.md)

Defined in: [api/ingest-types.ts:415](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L415)

***

### streams

> **streams**: [`ConnectionStream`](ConnectionStream.md)[]

Defined in: [api/ingest-types.ts:439](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L439)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [api/ingest-types.ts:441](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L441)

***

### webhookSetup

> **webhookSetup**: `string` \| `null`

Defined in: [api/ingest-types.ts:429](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L429)

***

### webhookUrl

> **webhookUrl**: `string` \| `null`

Defined in: [api/ingest-types.ts:425](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L425)

Where the provider sends events (when the connector supports webhooks).
