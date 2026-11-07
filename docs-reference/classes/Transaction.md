[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Transaction

# Class: Transaction

Defined in: [sdk/transaction.ts:15](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L15)

Represents a database transaction that groups multiple operations.
Transactions ensure that a series of operations are executed atomically,
meaning either all operations succeed or none of them are applied.

Use transactions when you need to perform multiple related operations
that should be treated as a single unit of work. For example, creating
related records, updating multiple records, or performing operations
that need to be rolled back if any part fails.

## Constructors

### Constructor

> **new Transaction**(`id`, `client?`): `Transaction`

Defined in: [sdk/transaction.ts:28](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L28)

Creates a new Transaction instance.
Typically, you should not create Transaction instances directly.
Instead, use the tx.begin() method from a RushDB instance.

#### Parameters

##### id

`string`

The transaction ID provided by the database

##### client?

[`RestAPI`](RestAPI.md)

The client that began the transaction; `commit()` and
  `rollback()` are sent through it. When omitted, the most recently created
  RushDB instance is used.

#### Returns

`Transaction`

## Properties

### id

> `readonly` **id**: `string`

Defined in: [sdk/transaction.ts:16](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L16)

## Methods

### commit()

> **commit**(): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/transaction.ts:49](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L49)

Commits (applies) all operations performed within this transaction.
This finalizes all changes made within the transaction.

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the commit operation

***

### rollback()

> **rollback**(): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/transaction.ts:39](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L39)

Rolls back (cancels) all operations performed within this transaction.
Use this when an error occurs or when you want to undo changes.

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the rollback operation
