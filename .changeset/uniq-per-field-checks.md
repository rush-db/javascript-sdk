---
"@rushdb/javascript-sdk": patch
---

Fix multiple `uniq: true` fields not guaranteeing uniqueness: `create`, `set` and `update` used to validate with a single combined query that only matched records sharing all values at once. Each uniq field is now checked with its own request, so a conflict on any one field is caught.
