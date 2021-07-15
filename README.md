# GSheet Tools, tools for Google Spreadsheet

There's two ways of using a Spreadsheet:

- doing normal things as Spreadsheets are designed for, such as accounting, keeping a history of transactions, register products or use it as a database in some way, ...
- and doing fancy things that you might not have think of: task management, game design or a run of a game, simulating values like rolling a die or drawing a card, ...

Whatever the task you use Spreadsheets for, you might encounter limits with built-in functions. And here comes a big deal: the only way to extend the functions library is to create custom scripts

To do so in Google Spreadsheets, you have to use *Google Apps Scripts*, which allow you to create custom scripts using JavaScript. But you may not be a developer, and if you are, you may want not to reinvent the wheel. So here we are: this library is meant to make your life easier!

**This library adds functions to the build-in ones, provides helper function to create your own ones, and also provides custom interfaces to create new kind of controls like multi-selection dropdown, and more!**

[=> See the demo GSheet file](https://docs.google.com/spreadsheets/d/1zDmaj13WSpqipvsp2zQifvE1kYUMerEtlKzeSdK1a04/edit?usp=sharing)

[=> Go to the Documentation Summary](./src/doc/summary)

## Getting Started

### How to add the library to your Google Spreadsheet file

1. Create a new Google Sheet file from GSheets or your GDrive (click on the *New* button, or right-click anywhere on the page)

![Create a new GSheet](./src/doc/images/getting-started/new-gsheet.png)

2. In the *Tools* menu, click on *Scripts Editor*

![Open the scripts editor](./src/doc/images/getting-started/scripts-editor.png)

Note that this is the editor that allow you to write your custom scripts.

3. Click on the *+* icon next to the *Library* menu

![Open the "Add Library" popup](./src/doc/images/getting-started/open-add-library-popup.png)

4. Write the ID of the GSheetTools file in the text field, click on *Search*, select the latest version, then click on *Add*

```txt
1rgc12nfdbRyxsOKrzqVQxWwrj3f_1o6N4eRN6UBqf4yh4l8Zy59tdc_3
```

![Open the "Add Library" popup](./src/doc/images/getting-started/add-library.png)

Note that you can select a specific version, and edit it later. There's a "special" version though, `HEAD`, which is the "development" version. This version will constantly be synced with the version we're currently writing. This means you'll be constantly up to date, but keep in mind that the changes we do might alterate your document and cause errors (temporarily, don't worry) directly. We recommend you to **select the latest version** when you add the library for the first time, and **only check for an update when you want to use a function that is not in the version you're currently using**.

Also note that you can rename the `GSheetTools` reference before adding the library. Writing a shorter name makes it easier to use, but in this whole documentation, we assume that you kept the original name.

### Use GSheet Tools functions

Unfortunately, since the script is used as a library, you can't call its methods directly: this is meant to be used only into your own custom methods.

The problem here is that you'll be forced to copy the methods, with the same name, the appropriate number of parameters, and the same comments if you want the proper documentation.

But the goal here is to make your life easier, so **instead of writing copies of the methods, we suggest you to create one that will call all the others**.

Open the script editor, and write the following code:

```js
/**
 * Executes the named function from Muffin Dev's GSheet Tools library. You can pass an infinity of parameters to this method, as the function to call needs.
 * @param {string} functionName The name of the method to call from GSheet Tools library.
 * @param {...any} ...params The arguments to pass to the named method.
 * @customfunction
 */
function exec(functionName, ...params) {
  if(GSheetTools[functionName] === undefined) {
    throw new Error('The named method doesn\'t exist!');
  }
  return GSheetTools[functionName](...params);
}
```

Now, you can call the GSheet Tools methods directly by their names. The example of this documentation will show you the line to write in your spreadsheet cells to use this `exec()` method.

## Main features

- Random number generation and seeding
- Ranges and arrays operations
- Doing statistics with labels instead of "just" numeric values
- Text manipulation and formatting

## Documentation & API

[=> Go to the Documentation summary](./src/doc/summary)

## Support & Contact

Create a new issue on GitHub or contact us at contact@muffindev.com for any issue report, feature request or feedback you want to send! :)

## Support the project!

Did you find this content useful? The project is open source, but if you want to support my work, please consider buying me a coffee!

[![Buy Me A Coffee!](https://drive.google.com/uc?id=1YtIhCd6oDnTfzlwInnWXOhJ3oBTQk_Cr)](https://www.buymeacoffee.com/muffindev)