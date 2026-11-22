[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertyIndex

# Type Alias: PropertyIndex

> **PropertyIndex** = `object`

Defined in: [api/types.ts:196](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L196)

An ordered or unique property index (`db.indexes`).

## Properties

### kind

> **kind**: `"ordered"` \| `"unique"`

Defined in: [api/types.ts:202](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L202)

***

### label

> **label**: `string`

Defined in: [api/types.ts:199](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L199)

***

### name

> **name**: `string`

Defined in: [api/types.ts:198](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L198)

Index name, unique within the project.

***

### property

> **property**: `string`

Defined in: [api/types.ts:201](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L201)

The indexed property, stored normalized (`unitPrice` is listed as `unitprice`).

***

### status

> **status**: `"building"` \| `"ready"` \| `"dropping"`

Defined in: [api/types.ts:205](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L205)

***

### unique

> **unique**: `boolean`

Defined in: [api/types.ts:204](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L204)

Whether the index refuses a second record of the label with the same value.
