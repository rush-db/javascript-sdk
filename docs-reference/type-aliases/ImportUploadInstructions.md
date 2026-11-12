[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportUploadInstructions

# Type Alias: ImportUploadInstructions

> **ImportUploadInstructions** = \{ `expiresAt`: `string`; `mode`: `"s3-multipart"`; `parts`: `object`[]; `partSize`: `number`; \} \| \{ `method`: `"PUT"`; `mode`: `"direct"`; `path`: `string`; \}

Defined in: [api/ingest-types.ts:158](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L158)

How the client uploads one file.

## Union Members

### Type Literal

\{ `expiresAt`: `string`; `mode`: `"s3-multipart"`; `parts`: `object`[]; `partSize`: `number`; \}

#### expiresAt

> **expiresAt**: `string`

#### mode

> **mode**: `"s3-multipart"`

#### parts

> **parts**: `object`[]

Presigned PUT URL per part.

#### partSize

> **partSize**: `number`

***

### Type Literal

\{ `method`: `"PUT"`; `mode`: `"direct"`; `path`: `string`; \}

#### method

> **method**: `"PUT"`

#### mode

> **mode**: `"direct"`

Through the API: `PUT` the raw bytes to `path` with the usual auth header.

#### path

> **path**: `string`
