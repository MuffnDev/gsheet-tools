/**
 * Gets the GCD (Greatest Common Denominator) between the given numbers.
 * Source: https://www.30secondsofcode.org/js/s/gcd
 * @param {number|numbers[]} [...number] The numbers to process.
 * @returns {number} Returns the GCD (Greatest Common Denominator) between the given numbers.
 * @customfunction
 */
function gcd(...numbers) {
  numbers = flatten(numbers);
  numbers = numbers.filter(item => typeof item === 'number');
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y)); // The GCD method for only 2 numbers
  return [...numbers].reduce((a, b) => _gcd(a, b)); // Apply the process to the whole array
}