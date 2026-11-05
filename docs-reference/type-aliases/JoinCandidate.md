[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / JoinCandidate

# Type Alias: JoinCandidate

> **JoinCandidate** = `object`

Defined in: [types/value.ts:136](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L136)

A reference suggested by `db.ai.getJoinCandidates`, with its evidence.

## Properties

### confidence

> **confidence**: `number`

Defined in: [types/value.ts:142](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L142)

***

### evidence

> **evidence**: `object`

Defined in: [types/value.ts:143](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L143)

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

Defined in: [types/value.ts:152](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L152)

***

### reasons

> **reasons**: `string`[]

Defined in: [types/value.ts:140](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L140)

`name`, `chain` and/or `values`: the rules that proposed it.

***

### relationshipType

> **relationshipType**: `string`

Defined in: [types/value.ts:141](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L141)

***

### source

> **source**: `object`

Defined in: [types/value.ts:137](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L137)

#### label

> **label**: `string`

#### property

> **property**: `string`

***

### target

> **target**: `object`

Defined in: [types/value.ts:138](https://github.com/rush-db/javascript-sdk/blob/main/src/types/value.ts#L138)

#### label

> **label**: `string`

#### property

> **property**: `string`
