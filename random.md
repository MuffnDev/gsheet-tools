# GSheet Tools - Random

The random functions provided by Muffin Dev's GSheet Tools library can be seeded, which is nnormally not possible in vanilla JavaScript.

"Seeding" a random number generator allow you to get predictable results based on a seed, which can be a number or a text. Seeds are also based on sheets names and cells *A1 notation*. And this ensures that if the document is modified or reloaded, the results will be the same on every device in the cells you use the seeded random values.

When using seeding, we recommend you to have a cell somewhere that contains the seed value, so you can pass the cell position as seed value. Than, you have to change the seed in only one cell to update the values of every other cells in your spreadsheet that uses the seeded random number generation!

To get this result, we use the [`seedrandom.js` script, originally written by David Bau](http://davidbau.com/encode/seedrandom.js). That script is included in this library, and the functions you can see below are just overlays to make the original methods easily usable in GSheet.

## Functions you can use in spreadsheet

### `random(min = 0, max = 1, seed = null)`

```txt
=exec("random")
=exec("random";1;10)
=exec("random";1;10;4321)
```

Gets a random decimal number, between a minimum (inclusive) and a maximum (inclusive).

- `min: number = 0` (facultative): The minimum number (inclusive).
- `max: number = 1` (facultative): The maximum number (inclusive).
- `seed: any = null` (facultative): The seed to use for the random number generator. Using a seed ensures that the result won't change even if the spreadsheet is reloaded or updated.

Returns the random number.

### `randomInt(min = 0, max = 100, seed = null)`

```txt
=exec("randomInt")
=exec("randomInt";1;10)
=exec("randomInt";1;10;4321)
```

Gets a random integer, between a minimum (inclusive) and a maximum (inclusive).

- `min: number = 0` (facultative): The minimum number (inclusive).
- `max: number = 100` (facultative): The maximum number (inclusive).
- `seed: any = null` (facultative): The seed to use for the random number generator. Using a seed ensures that the result won't change even if the spreadsheet is reloaded or updated.

Returns the random integer.

## Methods to use only for your own custom functions

### `RandomHelpers.getSeedA1String(seed = null)`

Gets the string to use as a seed for the active sheet and cell.

- `seed: any = null` (facultative): The seed to use. If null given, uses a default seed text.

Returns the seed string for the active cell. You can use this value with `Math.seedrandom()`. Note that `seedA1Rnd()` will do this for you.

### `RandomHelpers.seedRNG(seed = null)`

Gets the predictable random number generator method based on the given seed. Note that this RNG will be "reseeded" when you use this method.

- `seed: any = null` (facultative): The seed to use. If null given, uses a default seed text.

Returns the RNG as a function.

#### `seedRNG()` Usage example

```js
const rng = RandomHelpers.seedRNG('custom seed');
const randomNumber = rng(); // This value is always 0.5510932294
```

### `RandomHelpers.seedA1RNG(seed = null)`

Gets the predictable random number generator method, based on the given seed and the active cell. Note that this RNG will be "reseeded" when you use this method.

- `seed: any = null` (facultative): The seed to use. If null given, uses a default seed text.

Returns the RNG as a function.

#### `seedA1RNG()` Usage example

```js
const rng = RandomHelpers.seedA1RNG('custom seed');
const randomNumber = rng(); // This value will always be the same if you use it in tha A1 cell of a sheet with a same name
```

---

[< Back to main page](./README.md)