# GSheet Tools - Text

## Functions you can use in spreadsheet

### `function slug(text)`

```txt
=exec("slug";"I'd like quotes to be removed!")
=exec("slug";A1)
```

Converts a text into a URL-friendly slug. This can be useful to deal with data with quotes, which can cause issues with GSheet. You can also create unique yet readable ids, so you can use the spreadsheet as a content manager for a website.

- `text: string`: The input text to "slugify".

Returns the processed text.

![Usage example of slug functions](./images/text/slug.png)

### `slugAll(...ranges)`

```txt
=exec("slug";"I'd like quotes to be removed!";"And voilà!")
=exec("slug";A1)
=exec("slug";A1:A5;BA:B5)
```

Converts the data in the given range into slugs, as a 1D array.

- `ranges: any[]`: The cell or ranges of values to convert into slugs.

Returns a 1D array with the processed data.

![Usage example of slug functions](./images/text/slug.png)

### `slugAllUnique(...ranges)`

```txt
=exec("slugAll";"I'd like quotes to be removed!";"And voilà!";"And voilà!")
=exec("slugAll";A1)
=exec("slugAll";A1:A5;BA:B5)
```

Converts the data in the given range into unique slugs, as a 1D array. If several values ha the same slug, this function adds a *-X* suffix to it, where *X* is the number of occurencies.

- `ranges: any[]`: The cell or range of values to convert into unique slugs.

Returns a 1D array with the processed data.

![Usage example of slug functions](./images/text/slug.png)

---

[< Back to summary](./README.md)