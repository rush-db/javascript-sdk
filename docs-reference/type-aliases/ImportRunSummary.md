[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportRunSummary

# Type Alias: ImportRunSummary

> **ImportRunSummary** = `object`

Defined in: [api/ingest-types.ts:49](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L49)

What a run found after it finished.

## Properties

### awaitingEmbeddings?

> `optional` **awaitingEmbeddings?**: `number`

Defined in: [api/ingest-types.ts:54](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L54)

Records of embedding-indexed labels that still await vectors.

***

### durationMs?

> `optional` **durationMs?**: `number`

Defined in: [api/ingest-types.ts:55](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L55)

***

### labels

> **labels**: `string`[]

Defined in: [api/ingest-types.ts:50](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L50)

***

### suggestions?

> `optional` **suggestions?**: `number`

Defined in: [api/ingest-types.ts:52](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L52)

Relationship suggestions pending review in the project after the run.
