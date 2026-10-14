[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CLOUD\_ONLY\_FORMS

# Variable: CLOUD\_ONLY\_FORMS

> `const` **CLOUD\_ONLY\_FORMS**: `object`

Defined in: [direct/capabilities.ts:22](https://github.com/rush-db/javascript-sdk/blob/main/src/direct/capabilities.ts#L22)

Methods available in direct mode in one form only; the other form needs
RushDB Cloud.

## Type Declaration

#### ai.indexes.create

> `readonly` **ai.indexes.create**: `` "a managed index is filled by the managed embedding model; in direct mode create an external index (`external: true`) and supply vectors" `` = `` 'a managed index is filled by the managed embedding model; in direct mode create an external index (`external: true`) and supply vectors' ``

#### records.vectorSearch

> `readonly` **records.vectorSearch**: `` "a text `query` is embedded with the managed embedding model; in direct mode pass `queryVector`" `` = `` 'a text `query` is embedded with the managed embedding model; in direct mode pass `queryVector`' ``
