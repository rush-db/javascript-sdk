---
'@rushdb/javascript-sdk': minor
---

Add `db.relationships.update()` to change the properties of existing relationships

- **What it does:** updates the relationships of one `type` from `source` to each `target` (or the reverse with `direction: 'in'`).
  - `set` writes values; `null` stores an explicit null.
  - `unset` removes properties.
  - `types` gives a `set` value's type where JSON can't: `{ since: 'datetime' }` stores an ISO string as a datetime.
  - Pairs without such a relationship are skipped. The response's `updated` counts the relationships changed.
- **`Relation.propertyTypes`:** relationships read back with the type of each typed property; datetime values come back as ISO strings.
- **Direct mode** maps it to the engine's `updateRelationshipsById` mutation.
- **Not available inside a transaction.**
- **Requires** RushDB 3.0.4 or newer (the platform's `PATCH /api/v1/relationships/:entityId`, or the engine directly).
