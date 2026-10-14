[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / HttpClientResponse

# Class: HttpClientResponse\<T\>

Defined in: [network/HttpClient.ts:77](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L77)

## Type Parameters

### T

`T` = `unknown`

## Implements

- `HttpClientResponseInterface`

## Constructors

### Constructor

> **new HttpClientResponse**\<`T`\>(`response`): `HttpClientResponse`\<`T`\>

Defined in: [network/HttpClient.ts:80](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L80)

#### Parameters

##### response

`T`

#### Returns

`HttpClientResponse`\<`T`\>

## Properties

### \_res

> **\_res**: `T`

Defined in: [network/HttpClient.ts:78](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L78)

## Methods

### getHeaders()

> **getHeaders**(): `ResponseHeaders`

Defined in: [network/HttpClient.ts:88](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L88)

#### Returns

`ResponseHeaders`

#### Implementation of

`HttpClientResponseInterface.getHeaders`

***

### getRawResponse()

> **getRawResponse**(): `unknown`

Defined in: [network/HttpClient.ts:92](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L92)

#### Returns

`unknown`

#### Implementation of

`HttpClientResponseInterface.getRawResponse`

***

### getStatusCode()

> **getStatusCode**(): `number`

Defined in: [network/HttpClient.ts:84](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L84)

#### Returns

`number`

#### Implementation of

`HttpClientResponseInterface.getStatusCode`

***

### toJSON()

> **toJSON**(): `any`

Defined in: [network/HttpClient.ts:100](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L100)

#### Returns

`any`

#### Implementation of

`HttpClientResponseInterface.toJSON`

***

### toStream()

> **toStream**(`streamCompleteCallback`): `unknown`

Defined in: [network/HttpClient.ts:96](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L96)

#### Parameters

##### streamCompleteCallback

() => `void`

#### Returns

`unknown`

#### Implementation of

`HttpClientResponseInterface.toStream`
