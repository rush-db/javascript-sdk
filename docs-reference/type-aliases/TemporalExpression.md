[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / TemporalExpression

# Type Alias: TemporalExpression

> **TemporalExpression** = [`StringValue`](StringValue.md) \| [`RequireAtLeastOne`](RequireAtLeastOne.md)\<`Record`\<`"$eq"` \| `"$gt"` \| `"$gte"` \| `"$lt"` \| `"$lte"` \| `"$ne"`, [`DatetimeObject`](DatetimeObject.md) \| [`StringValue`](StringValue.md)\> & `Record`\<`"$in"` \| `"$nin"`, ([`DatetimeObject`](DatetimeObject.md) \| [`StringValue`](StringValue.md))[]\> & `Record`\<`"$exists"`, [`BooleanValue`](BooleanValue.md)\>\>

Defined in: [types/expressions.ts:36](https://github.com/rush-db/javascript-sdk/blob/main/src/types/expressions.ts#L36)

A filter on a date, local time, local date-time or duration property:
ISO 8601 text compared in the property's own type.
