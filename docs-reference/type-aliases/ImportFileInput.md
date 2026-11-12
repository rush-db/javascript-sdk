[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportFileInput

# Type Alias: ImportFileInput

> **ImportFileInput** = `object`

Defined in: [api/ingest-types.ts:176](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L176)

A file announced to `imports.create`: its name (the extension picks the parser) and exact size in bytes.

## Properties

### label?

> `optional` **label?**: `string`

Defined in: [api/ingest-types.ts:180](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L180)

Label of the file's records; defaults to one derived from the file name.

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:177](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L177)

***

### size

> **size**: `number`

Defined in: [api/ingest-types.ts:178](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L178)
