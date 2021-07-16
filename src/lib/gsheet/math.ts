import { forEach } from './arrays';

/**
 * Gets the GCD (Greatest Common Denominator) between the given numbers.
 * Source: https://www.30secondsofcode.org/js/s/gcd
 * @param {...any} numbers The numbers to process.
 * @returns {number} Returns the GCD (Greatest Common Denominator) between the given numbers.
 * @customfunction
 */
export function gcd(...numbers: any[]): number {
  numbers = forEach(n => {
    return typeof n !== 'number' ? parseInt(n, 10) || null : n;
  }, ...numbers);
  numbers = numbers.filter(i => i !== null);

  if (numbers.length === 0) {
    return 0;
  }

  const _gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y)); // The GCD method for only 2 numbers
  return [...numbers].reduce((a, b) => _gcd(a, b)); // Apply the process to the whole array
}