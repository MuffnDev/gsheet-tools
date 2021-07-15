import assert from 'assert';
import * as Dummy from '../lib';

describe('Dummy functions', () => {
  describe('#return0()', () => {
    it('should return 0', () => {
      assert.strictEqual(Dummy.return0(), 0);
    })
  })
  
  describe('#returnParam()', () => {
    it('should return 1', () => {
      assert.strictEqual(Dummy.returnParam(1), 1);
    })
    
    it('should return "ok"', () => {
      assert.strictEqual(Dummy.returnParam('ok'), 'ok');
    })
    
    it('should return undefined', () => {
      assert.strictEqual(Dummy.returnParam(undefined), undefined);
    })
  })
});