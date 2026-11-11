[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportFilesOptions

# Type Alias: ImportFilesOptions

> **ImportFilesOptions** = `Omit`\<[`ImportUploadOptions`](ImportUploadOptions.md), `"onProgress"`\> & `object`

Defined in: [api/ingest-types.ts:293](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L293)

## Type Declaration

### links?

> `optional` **links?**: [`ImportFilesLink`](ImportFilesLink.md)[]

### mappings?

> `optional` **mappings?**: `Record`\<`string`, [`ImportFileMapping`](ImportFileMapping.md)\>

Mappings by file name or position, in addition to `mapping` on each file.

### name?

> `optional` **name?**: `string`

### onProgress?

> `optional` **onProgress?**: (`progress`) => `void`

#### Parameters

##### progress

[`ImportFilesProgress`](ImportFilesProgress.md)

#### Returns

`void`

### wait?

> `optional` **wait?**: `boolean` \| [`WaitImportOptions`](WaitImportOptions.md)

Wait for the run to finish (default `false`: return once it is started).
