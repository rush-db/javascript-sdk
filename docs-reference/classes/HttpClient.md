[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / HttpClient

# Class: HttpClient

Defined in: [network/HttpClient.ts:35](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L35)

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

Defined in: [network/HttpClient.ts:36](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L36)

***

### TIMEOUT\_ERROR\_CODE

> `static` **TIMEOUT\_ERROR\_CODE**: `string`

Defined in: [network/HttpClient.ts:37](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L37)

## Methods

### makeRequest()

> **makeRequest**(`url`, `__namedParameters`): `Promise`\<`HttpClientResponseInterface`\>

Defined in: [network/HttpClient.ts:39](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L39)

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

Defined in: [network/HttpClient.ts:46](https://github.com/rush-db/javascript-sdk/blob/main/src/network/HttpClient.ts#L46)

#### Returns

`TimeoutError`
