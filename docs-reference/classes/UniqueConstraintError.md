[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / UniqueConstraintError

# Class: UniqueConstraintError

Defined in: [sdk/errors.ts:72](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L72)

A write refused by a unique index: another record of `label` already holds
the value in `property` (HTTP 409, code `conflict`). The value itself is
never sent back. RushDB 3.0.14 and later.

## Extends

- `Error`

## Constructors

### Constructor

> **new UniqueConstraintError**(`message`, `details`): `UniqueConstraintError`

Defined in: [sdk/errors.ts:83](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L83)

#### Parameters

##### message

`string`

##### details

###### label

`string`

###### property

`string`

###### recordId?

`string`

#### Returns

`UniqueConstraintError`

#### Overrides

`Error.constructor`

## Properties

### body?

> `optional` **body?**: `unknown`

Defined in: [sdk/errors.ts:77](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L77)

***

### code?

> `optional` **code?**: `string` = `'conflict'`

Defined in: [sdk/errors.ts:74](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L74)

***

### details?

> `optional` **details?**: `Record`\<`string`, `any`\>

Defined in: [sdk/errors.ts:76](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L76)

***

### label

> `readonly` **label**: `string`

Defined in: [sdk/errors.ts:78](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L78)

***

### property

> `readonly` **property**: `string`

Defined in: [sdk/errors.ts:79](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L79)

***

### recordId?

> `readonly` `optional` **recordId?**: `string`

Defined in: [sdk/errors.ts:81](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L81)

The record that holds the value (absent when the server names none).

***

### retryable?

> `optional` **retryable?**: `boolean`

Defined in: [sdk/errors.ts:75](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L75)

***

### status

> **status**: `number` = `409`

Defined in: [sdk/errors.ts:73](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L73)
