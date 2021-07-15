const DEFAULT_SEED = 'This is the default seed for predictable random number generation.';

/**
 * Helpers for using seeded random generator.
 * The methods of this class are not meant to be used in the spreadsheet.
 */
this.RandomHelpers = class RandomHelpers {

  /**
   * Gets the string to use as a seed for the active sheet and cell.
   * @param {any} [seed=null] The seed to use. If null given, uses the default seed.
   * @return {string} Returns the seed string for the active cell. You can use this value with Math.seedrandom(). Note that seedA1Rnd() will do this for you.
   */
  static getSeedA1String(seed = null) {
    if (!isValid(seed)) {
      seed = DEFAULT_SEED;
    }
    return seed + SpreadsheetApp.getActiveSheet().getName() + SpreadsheetApp.getActiveRange().getA1Notation();
  }

  /**
   * Gets the predictable random number generator method based on the given seed. Note that this RNG will be "reseeded" when you use this method.
   * @param {any} [seed=null] The seed to use. If null given, uses the default seed.
   * @return {function} Returns the RNG as a function.
   */
  static seedRNG(seed = null) {
    return new Math.seedrandom(isValid(seed) ? seed : DEFAULT_SEED);
  }

  /**
   * Gets the predictable random number generator method, based on the given seed and the active cell. Note that this RNG will be "reseeded" when you use this method.
   * @param {any} [seed=null] The seed to use. If null given, uses the default seed.
   * @return {function} Returns the RNG as a function.
   */
  static seedA1RNG(seed = null) {
    return new Math.seedrandom(RandomHelpers.getSeedA1String(seed));
  }

}

/**
 * Gets a random decimal number, between a minimum (inclusive) and a maximum (inclusive).
 * @param {number} [min=0] The minimum number (inclusive).
 * @param {number} [max=1] The maximum number (inclusive).
 * @param {any} [seed=null] (facultative) The seed to use for the random number generator. Using a seed ensures that the result won't change even if the spreadsheet is reloaded or updated.
 * @return Returns the random number.
 * @customfunction
 */
function random(min = 0, max = 1, seed = null) {
  const randomVal = !isValid(seed) ? Math.random() : RandomHelpers.seedA1RNG(seed)();
  return randomVal * (max - min) + min;
}

/**
 * Gets a random integer, between a minimum (inclusive) and a maximum (inclusive).
 * @param {number} [min=0] The minimum number (inclusive).
 * @param {number} [max=100] The maximum number (inclusive).
 * @param {any} [seed=null] (facultative) The seed to use for the random number generator. Using a seed ensures that the result won't change even if the spreadsheet is reloaded or updated.
 * @return Returns the random integer.
 * @customfunction
 */
function randomInt(min = 0, max = 100, seed = null) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomVal = !isValid(seed) ? Math.random() : RandomHelpers.seedA1RNG(seed)();
  return Math.floor(randomVal * (max - min + 1)) + min;
}