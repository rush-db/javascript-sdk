[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ImportRunKind

# Type Alias: ImportRunKind

> **ImportRunKind** = `"file"` \| `"sync"`

Defined in: [api/ingest-types.ts:11](https://github.com/rush-db/javascript-sdk/blob/main/src/api/ingest-types.ts#L11)

Background file imports and SaaS connections (RushDB Cloud).

Both write through import runs: an import run is created for every file
import and every connection sync, and continues on the server without the
client. Poll it with `db.imports.get(id)` or `db.imports.wait(id)`.
