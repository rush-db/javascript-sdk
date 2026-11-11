[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreateConnectionParams

# Type Alias: CreateConnectionParams

> **CreateConnectionParams** = `ConnectionFields` & `object`

Defined in: [api/ingest-types.ts:507](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L507)

## Type Declaration

### connectorId

> **connectorId**: `string`

A built-in connector id (see `catalog()`), `custom` (with `specId`), `webhook` (push) or `agent` (on-prem agent).

### specId?

> `optional` **specId?**: `string`
