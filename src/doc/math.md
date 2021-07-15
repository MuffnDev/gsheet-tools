# GSheet Tools - Maths

## Functions you can use in spreadsheet

### `gcd(...numbers)`

```txt
=exec("gcd";4;8)
=exec("gcd";A1:C5)
=exec("gcd";A1:A5;C1:C5)
```

Gets the GCD (Greatest Common Denominator) between the given numbers. The code of this method is [greatly inspired from *30 Seconds of Code*](https://www.30secondsofcode.org/js/s/gcd).

Note that this method already exists in the built-in library (`GCD()`), but you can use this method into your own custom functions.

- `numbers: number|numbers[]`: The numbers to process.

Returns the GCD (Greatest Common Denominator) between the given numbers.

---

[< Back to summary](./README.md)