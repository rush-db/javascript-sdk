[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ModelConfig

# Type Alias: ModelConfig

> **ModelConfig** = `object`

Defined in: [sdk/model.ts:31](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L31)

Configuration options for a Model instance.

## Properties

### client?

> `optional` **client?**: [`RestAPI`](../classes/RestAPI.md)

Defined in: [sdk/model.ts:44](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L44)

The client this model's operations are sent through. Set it when more than
one RushDB client lives in the process. When omitted, an operation given a
`Transaction` uses the client that began it; otherwise the most recently
created RushDB instance is used.

***

### validateTargetLabel?

> `optional` **validateTargetLabel?**: `boolean`

Defined in: [sdk/model.ts:37](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L37)

When true, `set` and `update` will verify the target record's label
matches this model's label before proceeding. Adds one extra DB read.

#### Default

```ts
false
```
