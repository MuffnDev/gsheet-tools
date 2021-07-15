/**
 * Groups the given cells into a single column.
 * Note that this method already exists in the built-in library, but you can use this version for your own custom methods.
 * @param {any,Range,Range[]} [...ranges] The cell, range or list of ranges to agregate.
 * @return {any[]} Returns all the values as a 1D array.
 * @customfunction
 */
function flatten(...ranges) {
  const output = [];
  for (const item of ranges) {
    if (Array.isArray(item)) {
      output = output.concat(flatten(item));
    }
    else {
      output.push(item);
    }
  }
  return output;
}

/**
 * Executes the given function on every value of the given ranges. This function also regroup all found values in an array.
 * @param {function(value: any): void|any} callback The function to execute for each value. If this function returns a value, it replaces the value to put in the output array. If this function doesn't return a value, the output array will be the same as if you used flatten().
 * @param {any|Range|Range[]} [...ranges] The cell, range or list of range to process.
 * @return Returns an array that contains all the found values, or the return values of the given function.
 */
function forEach(callback, ...ranges) {
  const output = [];

  function addOutput(input) {
    const val = callback(input);
    if (val !== undefined) { input = val; }
    output.push(input);
  }

  for (const item of ranges) {
    if (Array.isArray(item)) {
      output = output.concat(forEach(callback, ...item));
    }
    else {
      output.push(addOutput(item));
    }
  }

  return output;
}