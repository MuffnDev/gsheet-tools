import assert from 'assert';
import * as Conversion from '../lib/gsheet/conversion';

describe('Conversion', () => {
  describe('#asBoolean()', () => {
    it('should return true', () => {
      assert.strictEqual(Conversion.asBoolean(1), true);
      assert.strictEqual(Conversion.asBoolean('1'), true);
      assert.strictEqual(Conversion.asBoolean('y'), true);
      assert.strictEqual(Conversion.asBoolean('yes'), true);
      assert.strictEqual(Conversion.asBoolean('true'), true);
      assert.strictEqual(Conversion.asBoolean('TrUe'), true);
      assert.strictEqual(Conversion.asBoolean(true), true);
    })
    
    it('should return false', () => {
      assert.strictEqual(Conversion.asBoolean(0), false);
      assert.strictEqual(Conversion.asBoolean('0'), false);
      assert.strictEqual(Conversion.asBoolean('somethingElse'), false);
      assert.strictEqual(Conversion.asBoolean(null), false);
      assert.strictEqual(Conversion.asBoolean(undefined), false);
      assert.strictEqual(Conversion.asBoolean({ test: 'test' }), false);
      assert.strictEqual(Conversion.asBoolean([ true ]), false);
      assert.strictEqual(Conversion.asBoolean(''), false);
    })
  })

  describe('#fromBoolean()', () => {
    it('should return "yeah"', () => {
      assert.strictEqual(Conversion.fromBoolean(1, 'yeah', 'nope'), 'yeah');
      assert.strictEqual(Conversion.fromBoolean('yes', 'yeah', 'nope'), 'yeah');
      assert.strictEqual(Conversion.fromBoolean(true, 'yeah', 'nope'), 'yeah');
    })

    it('should return "nope"', () => {
      assert.strictEqual(Conversion.fromBoolean('somethingElse', 'yeah', 'nope'), 'nope');
      assert.strictEqual(Conversion.fromBoolean(null, 'yeah', 'nope'), 'nope');
      assert.strictEqual(Conversion.fromBoolean(undefined, 'yeah', 'nope'), 'nope');
      assert.strictEqual(Conversion.fromBoolean('', 'yeah', 'nope'), 'nope');
    })
  });
});