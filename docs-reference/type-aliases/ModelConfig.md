[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / ModelConfig

# Type Alias: ModelConfig

> **ModelConfig** = `object`

Defined in: [sdk/model.ts:30](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L30)

Configuration options for a Model instance.

## Properties

### validateTargetLabel?

> `optional` **validateTargetLabel?**: `boolean`

Defined in: [sdk/model.ts:36](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/model.ts#L36)

When true, `set` and `update` will verify the target record's label
matches this model's label before proceeding. Adds one extra DB read.

#### Default

```ts
false
```
