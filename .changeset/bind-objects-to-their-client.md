---
'@rushdb/javascript-sdk': patch
---

Bind transactions, records and models to the client that owns them. `tx.commit()` and `tx.rollback()`, the methods of a record instance or result set (`update`, `set`, `attach`, `detach`, `delete`, `deleteAll`, `setProperties`, `next`) and Model operations used to go through the most recently created `RushDB` client, so with two clients in one process (Cloud and a standalone engine, or two engines or tenants) they reached the wrong backend. They now go through the client that began the transaction or read the record. A Model takes its client from the new `client` option (`new Model(label, schema, { client: db })`), else from the transaction it is given; without either, it still uses the most recently created client, so single-client code is unchanged. `Transaction`, `DBRecordInstance` and `DBRecordsArrayInstance` accept the owning client as a new optional last constructor argument.

Types: `similarityFunction` accepts `'dot'` (new exported `SimilarityFunction = 'cosine' | 'dot' | 'euclidean'`) on embedding index creation, `EmbeddingIndex`, inline vector entries and `vectorSearch`. A standalone engine supports all three; RushDB Cloud accepts `cosine` and `euclidean`.
