---
'@rushdb/javascript-sdk': minor
---

Direct mode (a standalone engine) and RushDB Cloud are one SDK with one code path.

- In direct mode every method is answered from the engine: records (including `find` with
  `orderBy`, `select` and `groupBy`, `upsert`, `set`, `findOne`/`findUniq`, `findById` of several
  ids), relationships, labels, properties, JSON and CSV import, CSV export, text indexes and keyword
  search, external vector indexes, vector and hybrid search with a `queryVector`, raw openCypher, the
  schema and transactions. Nothing is ever sent to RushDB Cloud: before, a method without direct
  support sent the engine token to `api.rushdb.com`.
- The Cloud-only features (managed embeddings, `ai.search`, `relationships.patterns.*`,
  `settings.get`) throw `CloudOnlyError` before sending anything. `CLOUD_ONLY_METHODS`,
  `CLOUD_ONLY_FORMS` and `isCloudOnlyMethod` list them.
- In a transaction, direct mode stages record creates, `update`, `set`, `deleteById`, `attach`,
  `importJson` and `importCsv` (records are named by id; the engine resolves them inside the
  transaction). Writes the engine cannot stage (bulk deletes, `detach`, upserts and merge imports,
  inline vectors) throw `DirectModeError` instead of running outside the transaction; the engine
  refuses a merge import or inline vectors in a staged import.
- `records.detach` without `typeOrTypes` removes relationships of every type, and without
  `direction` removes them both ways, as RushDB 2.x on Neo4j did. `records.attach` and
  `relationships.createMany` without a type create `__RUSHDB__RELATION__DEFAULT__` relationships,
  as before, instead of `RELATED_TO`.
- `direct: true` without `engineUrl` throws instead of falling back to RushDB Cloud. New `scope`
  option for a multitenant engine; the unused `engineToken` option is gone.
- Fixed: direct mode never sent the request body, so every call failed against a real engine.
- Fixed in both modes: `records.findById([...ids])` posted to the create endpoint; it now searches
  by id.
- The package declares `exports`: under Node, `import` gets an ES module build (`dist/index.node.mjs`)
  whose default export is the `RushDB` class; before, an ESM `import RushDB from` received the
  CommonJS module object.
