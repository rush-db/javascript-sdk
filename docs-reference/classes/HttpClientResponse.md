[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / HttpClientResponse

# Class: HttpClientResponse\<T\>

Defined in: [network/HttpClient.ts:86](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L86)

## Type Parameters

### T

`T` = `unknown`

## Implements

- `HttpClientResponseInterface`

## Constructors

### Constructor

> **new HttpClientResponse**\<`T`\>(`response`): `HttpClientResponse`\<`T`\>

Defined in: [network/HttpClient.ts:89](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L89)

#### Parameters

##### response

`T`

#### Returns

`HttpClientResponse`\<`T`\>

## Properties

### \_res

> **\_res**: `T`

Defined in: [network/HttpClient.ts:87](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L87)

## Methods

### getHeaders()

> **getHeaders**(): `ResponseHeaders`

Defined in: [network/HttpClient.ts:97](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L97)

#### Returns

`ResponseHeaders`

#### Implementation of

`HttpClientResponseInterface.getHeaders`

***

### getRawResponse()

> **getRawResponse**(): `unknown`

Defined in: [network/HttpClient.ts:101](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L101)

#### Returns

`unknown`

#### Implementation of

`HttpClientResponseInterface.getRawResponse`

***

### getStatusCode()

> **getStatusCode**(): `number`

Defined in: [network/HttpClient.ts:93](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L93)

#### Returns

`number`

#### Implementation of

`HttpClientResponseInterface.getStatusCode`

***

### toJSON()

> **toJSON**(): `any`

Defined in: [network/HttpClient.ts:109](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L109)

#### Returns

`any`

#### Implementation of

`HttpClientResponseInterface.toJSON`

***

### toStream()

> **toStream**(`streamCompleteCallback`): `unknown`

Defined in: [network/HttpClient.ts:105](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L105)

#### Parameters

##### streamCompleteCallback

() => `void`

#### Returns

`unknown`

#### Implementation of

`HttpClientResponseInterface.toStream`
