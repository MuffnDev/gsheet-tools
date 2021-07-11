# GSheet Tools - Validation

## Functions you can use in spreadsheet

### `isValid(value = null, exclude0 = false)`

```txt
=exec("isValid";"test")
```

Checks if the given value contains something. Note that this method checks for a single value, you can't use it to validate a whole range.

- `value: any = null` (facultative): The value you want to check
- `exclude0: boolean = false` (facultative): By default, 0 is considered as a valid value. If this parameter is set to `true`, 0 is treated as not valid.

Returns `true` if the input value is valid, otherwise `false`.

---

[< Back to main page](./README.md)