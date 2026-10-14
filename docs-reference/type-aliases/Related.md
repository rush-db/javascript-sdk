[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / Related

# Type Alias: Related\<M\>

> **Related**\<`M`\> = keyof `M` *extends* `never` ? [`AnyObject`](AnyObject.md) : \{ \[Key in keyof M\]?: \{ $alias?: string; $relation?: TraversalRelationOptions \| string \} & Where\<M\[Key\]\> \}

Defined in: [types/query.ts:42](https://github.com/rush-db/javascript-sdk/blob/main/src/types/query.ts#L42)

## Type Parameters

### M

`M` *extends* `Record`\<`string`, [`Model`](../classes/Model.md)\[`"schema"`\]\> = [`Models`](../interfaces/Models.md)
