[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DEFAULT\_INGEST\_CHUNK\_SIZE

# Variable: DEFAULT\_INGEST\_CHUNK\_SIZE

> `const` **DEFAULT\_INGEST\_CHUNK\_SIZE**: `5000` = `5000`

Defined in: [common/constants.ts:47](https://github.com/rush-db/javascript-sdk/blob/main/src/common/constants.ts#L47)

Rows per request when `records.createMany` and `records.importCsv` split a
large write: about 5,000 flat rows per request loads fastest.
