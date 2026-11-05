---
'@rushdb/javascript-sdk': minor
---

Smart search now runs on SQL. `ai.search(prompt, { skip, limit })` asks RushDB Cloud for one read-only SQL statement over the project's schema (`POST /ai/sql-search`), runs it (`POST /records/sql-search`), and returns the records with the statement as `result.sql`, a short title as `result.name` and any generation warnings as `result.warnings`. Rows that select a record's `__id` come back as full records; aggregates come back as plain rows. `result.next()` pages through the statement. The new `ai.runSql(sql, { skip, limit })` runs a statement directly, e.g. a saved one.

Breaking: the result no longer carries `searchQuery`, `SmartSearchOptions.currentQuery` and the `transaction` option are gone, and `SmartSearchQueryResponse` is replaced by `SmartSearchSqlResponse`. RushDB Cloud answers the old endpoint with 410 Gone, so earlier SDK versions' `ai.search` fails with that error. Both methods are RushDB Cloud only.
