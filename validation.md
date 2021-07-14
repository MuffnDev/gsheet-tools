# GSheet Tools - Validation

## Functions you can use in spreadsheet

### `contains(target, ...possibleValues)`

```txt
=exec("contains";A1;B1)
=exec("contains";A1:A5;B1:B5)
=exec("contains";A1:A5;B1:B5;C1:C5)
```

Checks if the given cell or range contains one of the possible values. Note that this method will search for an exact match, not a substring.

In the case of a range given as target, this function will return `true` at the first occurence of the possible values.

- `target: any|any[]`: The target cell or range where you want to search the occurences of the possible values.
- `...possibleValues: any|any[]`: The list of all possible values.

Returns `true` if an occurence of one of the possible values is found in the given target(s), otherwise `false`.

### `isValid(value = null, exclude0 = false)`

```txt
=exec("isValid";"test")
```

Checks if the given value contains something. Note that this method checks for a single value, you can't use it to validate a whole range.

- `value: any = null` (facultative): The value you want to check
- `exclude0: boolean = false` (facultative): By default, 0 is considered as a valid value. If this parameter is set to `true`, 0 is treated as not valid.

Returns `true` if the input value is valid, otherwise `false`.

### `ifNotEmpty(cell, valueIfNotEmpty, valueIfEmpty = null, emptyIf0 = true)`

```txt
=exec("ifNotEmpty";A1;"A1 is not empty")
=exec("ifNotEmpty";A1;"A1 is not empty";"A1 is empty")
=exec("ifNotEmpty";A1;"A1 is not empty";"A1 is empty";"no")
```

Sets this cell value depending if the target one is empty or not.

- `cell: any`: The cell to check.
- `valueIfNotEmpty: any`: The value to set in this cell if the target cell is not empty.
- `valueIfEmpty: any = null` (facultative): The value to set in this cell if the target cell is empty.
- `emptyIf0: boolean = true` (facultative): By default, if the target cell contains 0, it's considered empty. Set this option to `false` if you want 0 to be considered as a valid value.

Returns a given value depending on the state of the target cell.

#### Example to avoid division by 0

As an example, you have one cell that contain a value, and another that contain a divider. If that divider is 0, then you'll divide by 0, which is not possible. In that case, GSheet will display the error `#DIV/0!` in the cell of the operation. You can use this `ifNotEmpty()` function to avoid this:

![Usage of `ifNotEmpty()` to avoid divisions by 0](./images/validation/if-not-empty.png)

---

[< Back to main page](./README.md)