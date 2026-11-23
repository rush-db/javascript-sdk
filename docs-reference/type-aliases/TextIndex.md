[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / TextIndex

# Type Alias: TextIndex

> **TextIndex** = `object`

Defined in: [api/types.ts:173](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L173)

A BM25 text index.

## Properties

### consistency

> **consistency**: `"eventual"` \| `"immediate"`

Defined in: [api/types.ts:180](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L180)

`eventual` (searches see changes shortly after they commit) or `immediate`.

***

### label

> **label**: `string`

Defined in: [api/types.ts:176](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L176)

***

### name

> **name**: `string`

Defined in: [api/types.ts:175](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L175)

Index name, unique within the project.

***

### pending

> **pending**: `number`

Defined in: [api/types.ts:183](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L183)

Changes the index has not applied yet.

***

### property

> **property**: `string`

Defined in: [api/types.ts:178](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L178)

The indexed property, or `*` for every string of the record.

***

### status

> **status**: `"building"` \| `"ready"` \| `"dropping"`

Defined in: [api/types.ts:181](https://github.com/rush-db/javascript-sdk/blob/main/src/api/types.ts#L181)
