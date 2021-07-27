# GSheet Tools - Miscellaneous

## Functions you can use in spreadsheet

### `getData(sheetId, ...ranges)`

```
=exec("getData";"";"A1")
=exec("getData";"";"A1:C5")
=exec("getData";"";"'Sheet Name'!A1:C5")
=exec("getData";"";"A1";"B1:C2";"Sheet!A1:C5";"'Another Sheet'!A1:C5")
=exec("getData";"478HbvgiiOpfb627DtetW_CbiveqhM_KbLMfQNzr1liY";"Sheet!A1:C5")
```

Gets data as a 2D array from anywhere in the current sheet, in the current spreadsheet or even in another spreadsheet. This method is meant to be an "universal" way of getting data from a spreadsheet, even if it's not one of your own.

Note that **this method won't be able to query external spreadsheets (even your own) until you authorized the addon to do so**. Authorizations are asked when you add the library to your app. Remove the GSheet Tools library, and then re-add it to your project in order to trigger the authorization popup.

- `sheetId: string|null`: The eventual sheet ID to open. This parameter should only be used if you want to get data from another GSheet file. If you pass an empty string or any other invalid value, this function will get data from the active spreadsheet file. The id of a spreadsheet can be found in its URL: https://docs.google.com/spreadsheets/[SHEET_ID]/...
- `ranges: ...string`: The range or list of ranges of the data you want to get, using A1 notation (eg. `"A1"`, `"A1:C5"`, `"Sheet!A1"`, `"'Example Sheet'!A1:C5"`, ...).

Returns a 2D array that contains all the queried data.

### `getLabelledValue(label, labels, values)`

```txt
=exec("getLabelledValue";"Banana";A1:A5;B1:B5)
```

Gets the value bound to the given label. In order to make it work correctly, the labels range and the values range must have the same length.

- `label: string`: The label of the value you want to get.
- `labels: string[]`: The range of all labels.
- `values: any[]`: The range of all values.

Returns the value bound to the given label.

![Usage of getLabelledValue()](./images/miscellaneous/get-labelled-value.png)

---

[< Back to summary](./README.md)