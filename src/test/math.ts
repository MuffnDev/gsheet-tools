import assert from 'assert';
import * as Math2 from '../lib/gsheet/math';

describe('Dummy functions', () => {
  describe('#gcd()', () => {
    it ('should return 1', () => {
      assert.strictEqual(Math2.gcd(1, 2, 3), 1);
      assert.strictEqual(Math2.gcd([ 1, 2 ], 3), 1);
    })

    it ('should return 2', () => {
      assert.strictEqual(Math2.gcd(2, 4, 20, 200), 2);
      assert.strictEqual(Math2.gcd('2', 4), 2);
    })

    it ('should return 4', () => {
      assert.strictEqual(Math2.gcd('abc', 4), 4);
    })

    it ('should return 0 (invalid inputs)', () => {
      assert.strictEqual(Math2.gcd(null), 0);
      assert.strictEqual(Math2.gcd(undefined), 0);
      assert.strictEqual(Math2.gcd(''), 0);
      assert.strictEqual(Math2.gcd('abc'), 0);
    })
  })
});