/**
 * @interface ISpreadsheetApp Fake representation of SpreadsheetApp, as it's a global variable in a Google Apps Script context.
 */
export interface ISpreadsheetApp {
  getActiveSheet: () => any;
  getActiveRange: () => any;
}

/**
 * @const {ISpreadsheetApp} SpreadsheetApp Import this value to emulate a SpreadsheetApp global accessor in a GSheet script.
 */
export const SpreadsheetApp: ISpreadsheetApp = {
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

  getActiveRange: () => {
    return {
      getA1Notation: () => 'A1'
    };
  }
};