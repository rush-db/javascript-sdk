[**@rushdb/javascript-sdk**](../README.md)

***

[@rushdb/javascript-sdk](../README.md) / point

# Function: point()

## Call Signature

> **point**(`longitude`, `latitude`, `options?`): [`PointValue`](../type-aliases/PointValue.md)

Defined in: [sdk/spatial.ts:20](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/spatial.ts#L20)

A GeoJSON point, longitude first (`x, y[, z]` with a Cartesian `crs`).

### Parameters

#### longitude

`number`

#### latitude

`number`

#### options?

[`PointOptions`](../type-aliases/PointOptions.md)

### Returns

[`PointValue`](../type-aliases/PointValue.md)

### Examples

```ts
point(13.405, 52.52)
```

```ts
point(13.405, 52.52, 34)
```

```ts
point(3, 4, { crs: 'cartesian' })
```

## Call Signature

> **point**(`longitude`, `latitude`, `height?`, `options?`): [`PointValue`](../type-aliases/PointValue.md)

Defined in: [sdk/spatial.ts:21](https://github.com/rush-db/javascript-sdk/blob/main/src/sdk/spatial.ts#L21)

A GeoJSON point, longitude first (`x, y[, z]` with a Cartesian `crs`).

### Parameters

#### longitude

`number`

#### latitude

`number`

#### height?

`number`

#### options?

[`PointOptions`](../type-aliases/PointOptions.md)

### Returns

[`PointValue`](../type-aliases/PointValue.md)

### Examples

```ts
point(13.405, 52.52)
```

```ts
point(13.405, 52.52, 34)
```

```ts
point(3, 4, { crs: 'cartesian' })
```
