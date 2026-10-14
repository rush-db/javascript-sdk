[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DirectModeError

# Class: DirectModeError

Defined in: [sdk/errors.ts:57](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L57)

A call that a standalone engine supports, made in a form direct mode cannot
carry out: a write inside a transaction that the engine cannot stage (bulk
deletes, detach, imports, upserts, inline vectors). The engine stages record
creates, updates, deletes and links. Thrown before any request is sent, so
nothing runs half-way.

## Extends

- `Error`

## Constructors

### Constructor

> **new DirectModeError**(`message`): `DirectModeError`

Defined in: [sdk/errors.ts:60](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L60)

#### Parameters

##### message

`string`

#### Returns

`DirectModeError`

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: `"DIRECT_MODE_UNSUPPORTED"` = `'DIRECT_MODE_UNSUPPORTED'`

Defined in: [sdk/errors.ts:58](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/errors.ts#L58)
