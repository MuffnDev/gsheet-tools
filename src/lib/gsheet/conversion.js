/**
 * Converts the input value into a boolean.
 * Values considered true (case-insensitive): true, "y", "yes", "true", "1", 1.
 * @param {any} [value=null] The value to convert. If the value is a method, it will try to convert the returned value of that method as a boolean.
 * @return {any} Returns the converted value.
 * @customfunction
 */
function asBoolean(value = null) {
  if (typeof value === 'boolean') {
    return value;
  }
  else if (typeof value === 'string') {
    value = value.toLowerCase();
    return (value === 'y' || value === 'yes' || value === 'true' || value === '1');
  }
  else if (typeof value === 'number') {
    return value === 1;
  }
  else if (typeof value === 'function') {
    try {
      return asBoolean(value());
    }
    catch {
      return false;
    }
  }
  return false;
}

/**
 * Converts the input value into another, depending if it's true or false.
 * Values considered true (case-insensitive): true, "y", "yes", "true", "1", 1.
 * @param {any} [value=null] The value to convert. If the value is a method, it will try to convert the returned value of that method as a boolean.
 * @param {any} [trueValue=1] The output value if the input is true.
 * @param {any} [falseValue=0] The output value if the input is false.
 * @return {any} Returns the converted value.
 * @customfunction
 */
function fromBoolean(value = null, trueValue = 1, falseValue = 0) {
  value = asBoolean(value);
  return value ? trueValue : falseValue;
}