[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / RECOMMENDED\_INGEST\_CHUNK\_SIZE

# Variable: RECOMMENDED\_INGEST\_CHUNK\_SIZE

> `const` **RECOMMENDED\_INGEST\_CHUNK\_SIZE**: `5000` = `5000`

Defined in: [common/constants.ts:48](https://github.com/rush-db/javascript-sdk/blob/main/src/common/constants.ts#L48)

The recommended `chunkSize` for large flat writes (`records.createMany`,
`records.importCsv`): about 5,000 rows per request loads fastest. Writes are
split only when a chunk size is set.
