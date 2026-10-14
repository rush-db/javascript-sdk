[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / CloudOnlyError

# Class: CloudOnlyError

Defined in: [sdk/errors.ts:35](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L35)

A RushDB Cloud feature was called on a client in direct mode (a standalone
engine). Thrown before any request is sent.

## Extends

- `Error`

## Constructors

### Constructor

> **new CloudOnlyError**(`method`, `reason`): `CloudOnlyError`

Defined in: [sdk/errors.ts:38](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L38)

#### Parameters

##### method

`string`

The SDK method, e.g. `ai.search`.

##### reason

`string`

What the method needs from RushDB Cloud.

#### Returns

`CloudOnlyError`

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: `"CLOUD_ONLY"` = `'CLOUD_ONLY'`

Defined in: [sdk/errors.ts:36](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L36)

***

### method

> `readonly` **method**: `string`

Defined in: [sdk/errors.ts:40](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L40)

The SDK method, e.g. `ai.search`.

***

### reason

> `readonly` **reason**: `string`

Defined in: [sdk/errors.ts:42](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L42)

What the method needs from RushDB Cloud.
