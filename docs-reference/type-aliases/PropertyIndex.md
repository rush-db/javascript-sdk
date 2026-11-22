[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertyIndex

# Type Alias: PropertyIndex

> **PropertyIndex** = `object`

Defined in: [api/types.ts:212](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L212)

An ordered or unique property index (`db.indexes`).

## Properties

### kind

> **kind**: `"ordered"` \| `"unique"`

Defined in: [api/types.ts:218](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L218)

***

### label

> **label**: `string`

Defined in: [api/types.ts:215](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L215)

***

### name

> **name**: `string`

Defined in: [api/types.ts:214](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L214)

Index name, unique within the project.

***

### property

> **property**: `string`

Defined in: [api/types.ts:217](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L217)

The indexed property, stored normalized (`unitPrice` is listed as `unitprice`).

***

### status

> **status**: `"building"` \| `"ready"` \| `"dropping"`

Defined in: [api/types.ts:221](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L221)

***

### unique

> **unique**: `boolean`

Defined in: [api/types.ts:220](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L220)

Whether the index refuses a second record of the label with the same value.
