import { SpreadsheetApp } from "../stubs/spreadsheet-app";
import { flatten } from "./arrays";
import { isValid } from "./validation";

/**
 * Gets data as Range (a 2D array) from anywhere in the current sheet, in the current spreadsheet or even in another spreadsheet. This
 * method is meant to be an "universal" way of getting data from a spreadsheet.
 * Note that this method won't be able to query external spreadsheets (even your own) until you authorized the addon to do so.
 * Authorizations are asked when you add the library to your app. Remove the GSheet Tools library, and then re-add it to your project in
 * order to trigger the authorization popup.
 * @param {string|null} sheetId The eventual sheet ID to open. This parameter should only be used if you want to get data from another
 * GSheet file. If it's not defined, this function will get data from the active spreadsheet file. The id of a spreadsheet can be found in
 * its URL: https://docs.google.com/spreadsheets/[SHEET_ID]/...
 * @param {...string} ranges The range or list of ranges of the data you want to get, using A1 notation (eg. "A1", "A1:C5", "Sheet!A1",
 * "'Example Sheet'!A1:C5", ...).
 * @return {Range} Returns a 2D array that contains all the queried data.
 */
export function getData(sheetId: string|null, ...ranges: string[]) {
  let sheet: any = null;

  // Select the sheet to open, depending if the sheetId param is valid
  if (!isValid(sheetId) || sheetId === SpreadsheetApp.getActiveSheet().getId()) {
    sheet = SpreadsheetApp.getActiveSheet();
  }
  else {
    sheet = SpreadsheetApp.openById(sheetId);
  }

  let data: any[] = [];
  for (const r of ranges) {
    data = data.concat(SpreadsheetApp.getActiveSpreadsheet().getRange(r).getValues());
  }
  return data;
}

/**
 * Gets the value bound to the given label. In order to make it work correctly, the labels range and the values range must have the same length.
 * @param {any} label The label of the value you want to get.
 * @param {any[]} labels The range of all labels.
 * @param {any[]} values The range of all values.
 * @returns {any} Returns the value bound to the given label.
 * @customfunction
 */
export function getLabelledValue(label: any, labels: any[], values: any[]): any {
  labels = flatten(labels);
  values = flatten(values);

  const length = Math.min(labels.length, values.length);
  for(let i = 0; i < length; i++) {
    if (labels[i] === label) {
      return values[i];
    }
  }
  return '';
}