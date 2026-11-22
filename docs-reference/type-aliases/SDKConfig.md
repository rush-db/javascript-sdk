[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / SDKConfig

# Type Alias: SDKConfig

> **SDKConfig** = `object` & `ApiConnectionConfig`

Defined in: [sdk/types.ts:27](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/types.ts#L27)

## Type Declaration

### direct?

> `optional` **direct?**: `boolean`

Direct mode: talk to a standalone RushDB engine (`rushdb`) instead of
RushDB Cloud. Requires `engineUrl`; the token is the engine token. The
methods listed in `CLOUD_ONLY_METHODS` throw `CloudOnlyError`, and no
request is ever sent to RushDB Cloud.

### engineUrl?

> `optional` **engineUrl?**: `string`

Standalone engine base URL when `direct` is enabled (e.g. `http://127.0.0.1:3000`).

### httpClient?

> `optional` **httpClient?**: `HttpClientInterface`

### logger?

> `optional` **logger?**: [`Logger`](Logger.md)

### options?

> `optional` **options?**: `object`

#### options.allowForceDelete?

> `optional` **allowForceDelete?**: `boolean`

##### Description

Defaults to `false`.
Allows using the `delete()` method without a specified criteria,
which results in deleting all Records in the project.

#### options.ingestChunkSize?

> `optional` **ingestChunkSize?**: `number`

Flat rows per request when `records.createMany`, `records.importCsv` and
`records.importJson` (with flat rows) split a large write. Defaults to
5,000, where ingest loads fastest; `0` sends every write in one request.

#### options.nestedIngestChunkSize?

> `optional` **nestedIngestChunkSize?**: `number`

Documents per request when `records.importJson` splits a large array of
nested documents. Defaults to 10,000; `0` sends one request.

### scope?

> `optional` **scope?**: `string`

Tenant on a multitenant engine (`rushdb serve --multitenant`), sent as
`X-RushDB-Tenant`. Omit for a single-tenant engine.

### timeout?

> `optional` **timeout?**: `number`
