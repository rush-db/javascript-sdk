[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportUploadData

# Type Alias: ImportUploadData

> **ImportUploadData** = `Blob` \| `ArrayBuffer` \| `ArrayBufferView` \| `ReadableStream`\<`Uint8Array`\> \| `AsyncIterable`\<`Uint8Array` \| `string`\>

Defined in: [api/ingest-types.ts:250](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L250)

File contents for an upload. `Blob`/`File`, `Uint8Array` (a Node `Buffer`
is one), `ArrayBuffer` and web `ReadableStream`s work in every runtime; any
async iterable of bytes, such as a Node `Readable` (`fs.createReadStream`),
works too. File paths are not accepted: open the file yourself.
