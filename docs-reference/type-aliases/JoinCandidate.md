[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / JoinCandidate

# Type Alias: JoinCandidate

> **JoinCandidate** = `object`

Defined in: [types/value.ts:196](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L196)

A reference suggested by `db.ai.getJoinCandidates`, with its evidence.

## Properties

### confidence

> **confidence**: `number`

Defined in: [types/value.ts:202](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L202)

***

### evidence

> **evidence**: `object`

Defined in: [types/value.ts:203](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L203)

#### coverage?

> `optional` **coverage?**: `number`

#### matchedDistinct?

> `optional` **matchedDistinct?**: `number`

#### matchedRecords?

> `optional` **matchedRecords?**: `number`

#### notCompared?

> `optional` **notCompared?**: `string`

#### sourceDistinct?

> `optional` **sourceDistinct?**: `number`

#### targetDistinct?

> `optional` **targetDistinct?**: `number`

#### targetUniqueness?

> `optional` **targetUniqueness?**: `number`

***

### rationale

> **rationale**: `string`

Defined in: [types/value.ts:212](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L212)

***

### reasons

> **reasons**: `string`[]

Defined in: [types/value.ts:200](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L200)

`name`, `chain` and/or `values`: the rules that proposed it.

***

### relationshipType

> **relationshipType**: `string`

Defined in: [types/value.ts:201](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L201)

***

### source

> **source**: `object`

Defined in: [types/value.ts:197](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L197)

#### label

> **label**: `string`

#### property

> **property**: `string`

***

### target

> **target**: `object`

Defined in: [types/value.ts:198](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L198)

#### label

> **label**: `string`

#### property

> **property**: `string`
