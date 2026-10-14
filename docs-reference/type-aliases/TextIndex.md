[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / TextIndex

# Type Alias: TextIndex

> **TextIndex** = `object`

Defined in: [api/types.ts:165](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L165)

A BM25 text index.

## Properties

### consistency

> **consistency**: `"eventual"` \| `"immediate"`

Defined in: [api/types.ts:172](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L172)

`eventual` (searches see changes shortly after they commit) or `immediate`.

***

### label

> **label**: `string`

Defined in: [api/types.ts:168](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L168)

***

### name

> **name**: `string`

Defined in: [api/types.ts:167](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L167)

Index name, unique within the project.

***

### pending

> **pending**: `number`

Defined in: [api/types.ts:175](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L175)

Changes the index has not applied yet.

***

### property

> **property**: `string`

Defined in: [api/types.ts:170](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L170)

The indexed property, or `*` for every string of the record.

***

### status

> **status**: `"building"` \| `"ready"` \| `"dropping"`

Defined in: [api/types.ts:173](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L173)
