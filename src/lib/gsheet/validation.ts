import { flatten } from "./arrays";
import { asBoolean } from "./conversion";

/**
 * Checks if the given cell or range contains one of the possible values. Note that this method will search for an exact match, not a substring.
 * In the case of a range given as target, this function will return true at the first occurence of the possible values.
 * @param {any|any[]} target The target cell or range where you want to search the occurences of the possible values.
 * @param {...any} possibleValues The list of all possible values.
 * @returns {boolean} Returns true if an occurence of one of the possible values is found in the given target(s), otherwise false.
 * @customfunction
 */
export function contains(target: any|any[], ...possibleValues: any[]): boolean {
  if (!isValid(target)) {
    return false;
  }

  target = flatten(target);
  possibleValues = flatten(possibleValues);
  
  for (const v of possibleValues) {
    // Skip if the current possible value is not valid
    if (!isValid(v)) {
      continue;
    }

    for (const t of target) {
      if (t === v) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Sets this cell value depending if the target one is empty or not.
 * @param {any} cell The cell to check.
 * @param {any} valueIfNotEmpty The value to set in this cell if the target cell is not empty.
 * @param {any} [valueIfEmpty=null] (facultative) The value to set in this cell if the target cell is empty.
 * @param {boolean} [emptyIf0=true] (facultative) By default, a cell that contains 0 is considered empty. Set this option to false if you want 0 to be considered as a valid value.
 * @return {any} Returns the given value depending on the state of the target cell.
 * @customfunction
 */
export function ifNotEmpty(cell: any, valueIfNotEmpty: any, valueIfEmpty: any = null, emptyIf0 = true): any {
  emptyIf0 = asBoolean(emptyIf0);
  if (cell === null || cell === undefined || cell === '' || (emptyIf0 && cell === 0)) {
    return valueIfEmpty;
  }
  return valueIfNotEmpty;
}

/**
 * Inverse of isValid(), just for convenience in a spreadsheet context.
 * Checks if the given value contains something. Note that this method checks for a single value, you can't use it to validate a whole range.
 * @param {any} [value=null] The value you want to check.
 * @param {boolean} [exclude0=false] By default, 0 is considered as an empty value. If this parameter is set to true, 0 is treated as not empty.
 * @return {boolean} Returns true if the input value is empty, otherwise false.
 * @customfunction
 */
export function isEmpty(value: any = null, exclude0 = false): boolean {
  return !isValid(value, exclude0);
}

/**
 * Checks if the given value contains something. Note that this method checks for a single value, you can't use it to validate a whole range.
 * @param {any} [value=null] The value you want to check.
 * @param {boolean} [exclude0=false] By default, 0 is considered as a valid value. If this parameter is set to true, 0 is treated as not valid.
 * @return {boolean} Returns true if the input value is valid, otherwise false.
 * @customfunction
 */
export function isValid(value: any = null, exclude0 = false): boolean {
  exclude0 = asBoolean(exclude0);
  return value !== undefined && value !== null && value !== '' && (!exclude0 || value !== 0);
}