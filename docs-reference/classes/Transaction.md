[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Transaction

# Class: Transaction

Defined in: [sdk/transaction.ts:13](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L13)

Represents a database transaction that groups multiple operations.
Transactions ensure that a series of operations are executed atomically,
meaning either all operations succeed or none of them are applied.

Use transactions when you need to perform multiple related operations
that should be treated as a single unit of work. For example, creating
related records, updating multiple records, or performing operations
that need to be rolled back if any part fails.

## Constructors

### Constructor

> **new Transaction**(`id`): `Transaction`

Defined in: [sdk/transaction.ts:23](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L23)

Creates a new Transaction instance.
Typically, you should not create Transaction instances directly.
Instead, use the tx.begin() method from a RushDB instance.

#### Parameters

##### id

`string`

The transaction ID provided by the database

#### Returns

`Transaction`

## Properties

### id

> `readonly` **id**: `string`

Defined in: [sdk/transaction.ts:14](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L14)

## Methods

### commit()

> **commit**(): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/transaction.ts:44](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L44)

Commits (applies) all operations performed within this transaction.
This finalizes all changes made within the transaction.

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the commit operation

***

### rollback()

> **rollback**(): `Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Defined in: [sdk/transaction.ts:33](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/transaction.ts#L33)

Rolls back (cancels) all operations performed within this transaction.
Use this when an error occurs or when you want to undo changes.

#### Returns

`Promise`\<[`ApiResponse`](../type-aliases/ApiResponse.md)\<\{ `message`: `string`; \}\>\>

Promise resolving to the result of the rollback operation
