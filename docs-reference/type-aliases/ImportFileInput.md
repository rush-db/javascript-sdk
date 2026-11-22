[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportFileInput

# Type Alias: ImportFileInput

> **ImportFileInput** = `object`

Defined in: [api/ingest-types.ts:185](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L185)

A file announced to `imports.create`: its name (the extension picks the parser) and exact size in bytes.

## Properties

### label?

> `optional` **label?**: `string`

Defined in: [api/ingest-types.ts:189](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L189)

Label of the file's records; defaults to one derived from the file name.

***

### name

> **name**: `string`

Defined in: [api/ingest-types.ts:186](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L186)

***

### size

> **size**: `number`

Defined in: [api/ingest-types.ts:187](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L187)
