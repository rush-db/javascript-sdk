[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CatalogCheckError

# Class: CatalogCheckError

Defined in: [sdk/errors.ts:100](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L100)

A query refused by `context: { check: 'strict' }`: it names a label,
property or text that no record holds. `warnings` says which, with what the
query most likely meant. RushDB 3.0.14 and later.

## Extends

- `Error`

## Constructors

### Constructor

> **new CatalogCheckError**(`message`, `warnings`): `CatalogCheckError`

Defined in: [sdk/errors.ts:108](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L108)

#### Parameters

##### message

`string`

##### warnings

[`CatalogWarning`](../type-aliases/CatalogWarning.md)[]

#### Returns

`CatalogCheckError`

#### Overrides

`Error.constructor`

## Properties

### body?

> `optional` **body?**: `unknown`

Defined in: [sdk/errors.ts:105](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L105)

***

### code?

> `optional` **code?**: `string` = `'invalid_request'`

Defined in: [sdk/errors.ts:102](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L102)

***

### details?

> `optional` **details?**: `Record`\<`string`, `any`\>

Defined in: [sdk/errors.ts:104](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L104)

***

### retryable?

> `optional` **retryable?**: `boolean`

Defined in: [sdk/errors.ts:103](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L103)

***

### status

> **status**: `number` = `400`

Defined in: [sdk/errors.ts:101](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L101)

***

### warnings

> `readonly` **warnings**: [`CatalogWarning`](../type-aliases/CatalogWarning.md)[]

Defined in: [sdk/errors.ts:106](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L106)
