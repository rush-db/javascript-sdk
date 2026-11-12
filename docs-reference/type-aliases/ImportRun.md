[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportRun

# Type Alias: ImportRun

> **ImportRun** = `object`

Defined in: [api/ingest-types.ts:61](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L61)

## Properties

### connectionId

> **connectionId**: `string` \| `null`

Defined in: [api/ingest-types.ts:67](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L67)

***

### createdAt

> **createdAt**: `string`

Defined in: [api/ingest-types.ts:80](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L80)

***

### error

> **error**: `string` \| `null`

Defined in: [api/ingest-types.ts:76](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L76)

***

### errorCount

> **errorCount**: `number`

Defined in: [api/ingest-types.ts:71](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L71)

***

### errorSample

> **errorSample**: [`ImportRunError`](ImportRunError.md)[]

Defined in: [api/ingest-types.ts:74](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L74)

***

### files?

> `optional` **files?**: [`ImportFile`](ImportFile.md)[]

Defined in: [api/ingest-types.ts:82](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L82)

***

### finishedAt

> **finishedAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:79](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L79)

***

### id

> **id**: `string`

Defined in: [api/ingest-types.ts:62](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L62)

***

### kind

> **kind**: [`ImportRunKind`](ImportRunKind.md)

Defined in: [api/ingest-types.ts:63](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L63)

***

### linksCreated

> **linksCreated**: `number`

Defined in: [api/ingest-types.ts:70](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L70)

***

### name

> **name**: `string` \| `null`

Defined in: [api/ingest-types.ts:66](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L66)

***

### options?

> `optional` **options?**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [api/ingest-types.ts:83](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L83)

***

### progress

> **progress**: `Record`\<`string`, [`ImportRunPart`](ImportRunPart.md)\>

Defined in: [api/ingest-types.ts:73](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L73)

Per file (file imports) or per stream (syncs).

***

### recordsDeleted

> **recordsDeleted**: `number`

Defined in: [api/ingest-types.ts:69](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L69)

***

### recordsWritten

> **recordsWritten**: `number`

Defined in: [api/ingest-types.ts:68](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L68)

***

### startedAt

> **startedAt**: `string` \| `null`

Defined in: [api/ingest-types.ts:78](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L78)

***

### startedBy

> **startedBy**: [`ImportRunActor`](ImportRunActor.md) \| `null`

Defined in: [api/ingest-types.ts:77](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L77)

***

### status

> **status**: [`ImportRunStatus`](ImportRunStatus.md)

Defined in: [api/ingest-types.ts:65](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L65)

***

### summary

> **summary**: [`ImportRunSummary`](ImportRunSummary.md) \| `null`

Defined in: [api/ingest-types.ts:75](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L75)

***

### trigger

> **trigger**: [`ImportRunTrigger`](ImportRunTrigger.md)

Defined in: [api/ingest-types.ts:64](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L64)

***

### updatedAt

> **updatedAt**: `string`

Defined in: [api/ingest-types.ts:81](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L81)
