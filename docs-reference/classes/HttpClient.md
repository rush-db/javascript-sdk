[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / HttpClient

# Class: HttpClient

Defined in: [network/HttpClient.ts:26](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L26)

## Implements

- `HttpClientInterface`

## Constructors

### Constructor

> **new HttpClient**(): `HttpClient`

#### Returns

`HttpClient`

## Properties

### CONNECTION\_CLOSED\_ERROR\_CODES

> `static` **CONNECTION\_CLOSED\_ERROR\_CODES**: `string`[]

Defined in: [network/HttpClient.ts:27](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L27)

***

### TIMEOUT\_ERROR\_CODE

> `static` **TIMEOUT\_ERROR\_CODE**: `string`

Defined in: [network/HttpClient.ts:28](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L28)

## Methods

### makeRequest()

> **makeRequest**(`url`, `__namedParameters`): `Promise`\<`HttpClientResponseInterface`\>

Defined in: [network/HttpClient.ts:30](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L30)

#### Parameters

##### url

`string`

##### \_\_namedParameters

`MakeRequestConfig`

#### Returns

`Promise`\<`HttpClientResponseInterface`\>

#### Implementation of

`HttpClientInterface.makeRequest`

***

### makeTimeoutError()

> `static` **makeTimeoutError**(): `TimeoutError`

Defined in: [network/HttpClient.ts:37](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L37)

#### Returns

`TimeoutError`
