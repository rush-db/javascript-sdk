---
'@rushdb/javascript-sdk': minor
---

Catalog lookups for agents, in Cloud and direct mode (join suggestions in Cloud only): `ai.searchValues` finds a stored value across every property (with the label, property and record count; `match: 'similar'` finds near spellings), `ai.getSchemaSummary` returns every label with its properties, distinct counts, ranges and few values in one read, `ai.resolveNames` suggests labels and properties spelled like a name, and `ai.getJoinCandidates` (RushDB Cloud only) suggests references between properties with their evidence. `properties.values` applies its `query` as a value search (`match`, `limit`, `domainOnMiss`, `minSimilarity`) and returns `counts`. Needs a RushDB engine and platform with these catalog reads.
