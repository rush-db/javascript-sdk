[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Expr

# Type Alias: Expr

> **Expr** = `string` \| `number` \| `boolean` \| \{ `$ref`: `string`; \} \| \{ `$sum`: `Expr`; \} \| \{ `$avg`: `Expr`; `$precision?`: `number`; \} \| \{ `$count`: `"*"` \| `Expr`; \} \| \{ `$min`: `Expr`; \} \| \{ `$max`: `Expr`; \} \| \{ `$divide`: \[`Expr`, `Expr`\]; \} \| \{ `$multiply`: \[`Expr`, `Expr`\]; \} \| \{ `$add`: \[`Expr`, `Expr`\]; \} \| \{ `$subtract`: \[`Expr`, `Expr`\]; \} \| \{ `$collect`: [`CollectExpr`](CollectExpr.md); \} \| \{ `$timeBucket`: [`TimeBucketExpr`](TimeBucketExpr.md); \}

Defined in: [types/query.ts:250](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L250)
