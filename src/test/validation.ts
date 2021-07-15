import assert from 'assert';
import * as Validation from '../lib/gsheet/validation';

describe('Validation', () => {
  describe('#contains()', () => {
    it('should return true', () => {
      assert.strictEqual(Validation.contains('test', 'This', 'is', 'a', 'test'), true);
      assert.strictEqual(Validation.contains('test', [ 'This', 'is', 'a', 'test' ]), true);
    });

    it('should return false', () => {
      assert.strictEqual(Validation.contains('test', 'A', 'B', 'C', 'Test'), false);
      assert.strictEqual(Validation.contains('test', [ 'A', 'B', 'C', 'TEST' ]), false);
    });
  })

  describe('#ifNotEmpty()', () => {
    const NOT_EMPTY = 'NOT EMPTY';
    const EMPTY = 'EMPTY';

    it('should not be empty', () => {
      assert.strictEqual(Validation.ifNotEmpty('A', NOT_EMPTY, EMPTY), NOT_EMPTY);
      assert.strictEqual(Validation.ifNotEmpty(true, NOT_EMPTY, EMPTY), NOT_EMPTY);
      assert.strictEqual(Validation.ifNotEmpty(false, NOT_EMPTY, EMPTY), NOT_EMPTY);
      assert.strictEqual(Validation.ifNotEmpty(1, NOT_EMPTY, EMPTY), NOT_EMPTY);
      assert.strictEqual(Validation.ifNotEmpty(0, NOT_EMPTY, EMPTY, false), NOT_EMPTY);
    });

    it('should be empty', () => {
      assert.strictEqual(Validation.ifNotEmpty('', NOT_EMPTY, EMPTY), EMPTY);
      assert.strictEqual(Validation.ifNotEmpty(null, NOT_EMPTY, EMPTY), EMPTY);
      assert.strictEqual(Validation.ifNotEmpty(undefined, NOT_EMPTY, EMPTY), EMPTY);
      assert.strictEqual(Validation.ifNotEmpty(0, NOT_EMPTY, EMPTY), EMPTY);
    });
  })

  describe('#isEmpty()', () => {
    it('should return true', () => {
      assert.strictEqual(Validation.isEmpty('A'), false);
      assert.strictEqual(Validation.isEmpty(1), false);
      assert.strictEqual(Validation.isEmpty(0), false);
    });

    it('should return false', () => {
      assert.strictEqual(Validation.isEmpty(''), true);
      assert.strictEqual(Validation.isEmpty(null), true);
      assert.strictEqual(Validation.isEmpty(undefined), true);
      assert.strictEqual(Validation.isEmpty(0, true), true);
    });
  })

  describe('#isValid()', () => {
    it('should return true', () => {
      assert.strictEqual(Validation.isValid('A'), true);
      assert.strictEqual(Validation.isValid(1), true);
      assert.strictEqual(Validation.isValid(0), true);
    });

    it('should return false', () => {
      assert.strictEqual(Validation.isValid(''), false);
      assert.strictEqual(Validation.isValid(null), false);
      assert.strictEqual(Validation.isValid(undefined), false);
      assert.strictEqual(Validation.isValid(0, true), false);
    });
  })
});