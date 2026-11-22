---
'@rushdb/javascript-sdk': minor
---

Support RushDB 3.0.14. Every feature below needs a 3.0.14 server; a 3.0.13 server keeps working with everything else, since the SDK sends the new fields only when a call uses them.

- **New property types.** `date`, `localtime`, `localdatetime`, `duration` and `point` join `datetime` in `PropertyType`, the schema type maps, filters (`TemporalExpression`, `PointExpression`), relationship `types`, file-import column types and the exported `PROPERTY_TYPE_*` constants. Datetimes read back at the offset they were written with. `records.create`, `set`, `update` and `createMany` accept a GeoJSON point (or an array of them) as a property value. Direct-mode `ai.getSchema` and `ai.getSchemaMarkdown` show ranges for every ordered type, and an older engine's epoch-millisecond datetime bounds as ISO instants.
- **Spatial queries.** `where: { location: { $within: { center, meters } } }` or `{ $within: { box: [southWest, northEast] } }` with GeoJSON points, and `orderBy: { location: { $distance: point } }` for nearest first.
- **Catalog check.** `records.find` (aggregates included) and `properties.values` results carry the server's `warnings` as `catalogWarnings`: labels, properties or compared texts no record holds, with suggestions. `context: { check: 'warn' | 'strict' | 'off' }` on a search sets the check. A strict refusal throws `CatalogCheckError` with `warnings`.
- **Unique indexes.** The new `db.indexes.find()`, `db.indexes.create({ label, property, unique?, name? })` and `db.indexes.delete(name)` manage ordered and unique indexes. A write a unique index refuses throws `UniqueConstraintError` with `label`, `property` and `recordId`. Every request error now also keeps the server's `details`.
- **Ingest chunking.** `records.createMany`, `records.importCsv` and `records.importJson` (top-level arrays) send large writes in chunks: 5,000 rows per request, or 10,000 nested documents. A CSV chunk repeats the header row. Set the size with `chunkSize` per call, or with `options.ingestChunkSize` and `options.nestedIngestChunkSize`; `0` turns chunking off. **Behaviour change:** a write larger than one chunk is no longer one atomic request. Each chunk commits on its own unless you pass a transaction.
- **Reading your own writes.** `records.textSearch` and hybrid `records.vectorSearch` take `waitForPending` to repeat the search while the eventual text index reports `pending` changes. The README describes this and the `consistency: 'immediate'` alternative.

**Breaking for TypeScript (minor release):** `PropertyType` and `PropertyValuesData['min' | 'max']` (now `number | string`) are wider, so an exhaustive `switch` over property types needs the new cases.
