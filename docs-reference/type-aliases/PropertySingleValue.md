[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertySingleValue

# Type Alias: PropertySingleValue\<TType\>

> **PropertySingleValue**\<`TType`\> = `TType` *extends* *typeof* `PROPERTY_TYPE_DATETIME` ? [`DatetimeValue`](DatetimeValue.md) : `TType` *extends* *typeof* `PROPERTY_TYPE_NUMBER` ? [`NumberValue`](NumberValue.md) : `TType` *extends* *typeof* `PROPERTY_TYPE_STRING` ? [`StringValue`](StringValue.md) : `TType` *extends* *typeof* `PROPERTY_TYPE_BOOLEAN` ? [`BooleanValue`](BooleanValue.md) : [`StringValue`](StringValue.md)

Defined in: [types/value.ts:63](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L63)

## Type Parameters

### TType

`TType` *extends* [`PropertyType`](PropertyType.md) = [`PropertyType`](PropertyType.md)
