[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / DBRecord

# Type Alias: DBRecord\<S\>

> **DBRecord**\<`S`\> = [`FlattenTypes`](FlattenTypes.md)\<`DBRecordInternalProps`\<`S`\> & [`FlattenTypes`](FlattenTypes.md)\<[`RecordProps`](RecordProps.md)\<`S`\>\>\>

Defined in: [sdk/record.ts:60](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/record.ts#L60)

Represents a database record with both system fields and user-defined fields.
This is the raw data structure returned from database queries.

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
