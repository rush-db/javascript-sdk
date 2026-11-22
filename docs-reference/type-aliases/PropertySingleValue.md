[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / PropertySingleValue

# Type Alias: PropertySingleValue\<TType\>

> **PropertySingleValue**\<`TType`\> = `TType` *extends* *typeof* [`PROPERTY_TYPE_DATETIME`](../variables/PROPERTY_TYPE_DATETIME.md) ? [`DatetimeValue`](DatetimeValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_DATE`](../variables/PROPERTY_TYPE_DATE.md) ? [`DateValue`](DateValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_LOCALTIME`](../variables/PROPERTY_TYPE_LOCALTIME.md) ? [`LocalTimeValue`](LocalTimeValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_LOCALDATETIME`](../variables/PROPERTY_TYPE_LOCALDATETIME.md) ? [`LocalDateTimeValue`](LocalDateTimeValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_DURATION`](../variables/PROPERTY_TYPE_DURATION.md) ? [`DurationValue`](DurationValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_POINT`](../variables/PROPERTY_TYPE_POINT.md) ? [`PointValue`](PointValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_NUMBER`](../variables/PROPERTY_TYPE_NUMBER.md) ? [`NumberValue`](NumberValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_STRING`](../variables/PROPERTY_TYPE_STRING.md) ? [`StringValue`](StringValue.md) : `TType` *extends* *typeof* [`PROPERTY_TYPE_BOOLEAN`](../variables/PROPERTY_TYPE_BOOLEAN.md) ? [`BooleanValue`](BooleanValue.md) : [`StringValue`](StringValue.md)

Defined in: [types/value.ts:219](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L219)

## Type Parameters

### TType

`TType` *extends* [`PropertyType`](PropertyType.md) = [`PropertyType`](PropertyType.md)
