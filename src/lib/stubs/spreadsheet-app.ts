/**
 * @interface ISpreadsheetApp Fake representation of SpreadsheetApp, as it's a global variable in a Google Apps Script context.
 */
export interface ISpreadsheetApp {
  getActiveSheet: () => any;
  getActiveSpreadsheet: () => any;
  getActiveRange: () => any;
  openById: (sheetId: string) => any;
}

/**
 * @const {ISpreadsheetApp} SpreadsheetApp Import this value to emulate a SpreadsheetApp global accessor in a GSheet script.
 */
export const SpreadsheetApp: ISpreadsheetApp = {
  openById: (sheetId: string) => { },

  getActiveSheet: () => {
    return {
      getName: () => 'SpreadsheetExample',
      getActiveCell: () => {
        return {
          getA1Notation: () => 'A1'
        };
      }
    };
  },

  getActiveSpreadsheet: () => { },

  getActiveRange: () => {
    return {
      getA1Notation: () => 'A1'
    };
  }
};