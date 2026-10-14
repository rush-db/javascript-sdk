[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CreateOptions

# Type Alias: CreateOptions

> **CreateOptions** = `object`

Defined in: [sdk/model.ts:42](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L42)

Options for the `create` method.

## Properties

### onConflict?

> `optional` **onConflict?**: `"throw"` \| `"upsert"` \| `"skip"`

Defined in: [sdk/model.ts:49](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L49)

Behavior when a uniqueness conflict is detected.
- `'throw'` (default) — throws `UniquenessError`
- `'upsert'` — updates the conflicting record instead
- `'skip'` — returns `null` without throwing
