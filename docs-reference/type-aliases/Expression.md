[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Expression

# Type Alias: Expression\<S\>

> **Expression**\<`S`\> = [`IdExpression`](IdExpression.md) \| `S` *extends* [`Schema`](Schema.md) ? `{ [Key in keyof S]?: MaybeLogicalExpression<PropertyExpressionByType[S[Key]["type"]]> }` : \{ \[Key in keyof S\]?: S\[Key\] extends MaybeArray\<number\> ? MaybeLogicalExpression\<NumberExpression\> : S\[Key\] extends MaybeArray\<boolean\> ? MaybeLogicalExpression\<BooleanExpression\> : S\[Key\] extends MaybeArray\<string\> ? MaybeLogicalExpression\<DatetimeExpression\> \| MaybeLogicalExpression\<StringExpression\> : S\[Key\] extends MaybeArray\<null\> ? MaybeLogicalExpression\<NullExpression\> : S\[Key\] extends MaybeArray\<PointValue\> ? MaybeLogicalExpression\<PointExpression\> : LogicalExpression \| Partial\<(...)\> \}

Defined in: [types/query.ts:91](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L91)

## Type Parameters

### S

`S` *extends* [`Schema`](Schema.md) = [`Schema`](Schema.md)
