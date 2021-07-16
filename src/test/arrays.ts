import assert from 'assert';
import * as Arrays from '../lib/gsheet/arrays';

describe('Arrays', () => {
  describe('#flatten()', () => {
    it('should return 1D array', () => {
      const tests = [
        { data: 'ABC', expected: [ 'ABC' ] },
        { data: [ 'A', 'B', 'C' ], expected: [ 'A', 'B', 'C' ] },
        { data: [
          [ 'A1', 'B1', 'C1' ],
          [ 'A2', 'B2', 'C2' ],
          [ 'A3', 'B3', 'C3' ]
        ], expected: ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3' ] },
        { data: null, expected: [ null ] },
        { data: undefined, expected: [ undefined ] },
        { data: '', expected: [ '' ] },
        { data: true, expected: [ true ] },
      ];

      for (const t of tests) {
        assert.strictEqual(JSON.stringify(Arrays.flatten(t.data)), JSON.stringify(t.expected));
      }
    });
  })

  describe('#forEach()', () => {
    it('should return 1D array with transformed data', () => {
      const tests = [
        { data: 'ABC', expected: [ 'ABC-' ] },
        { data: [ 'A', 'B', 'C' ], expected: [ 'A-', 'B-', 'C-' ] },
        { data: [
          [ 'A1', 'B1', 'C1' ],
          [ 'A2', 'B2', 'C2' ],
          [ 'A3', 'B3', 'C3' ]
        ], expected: ['A1-', 'B1-', 'C1-', 'A2-', 'B2-', 'C2-', 'A3-', 'B3-', 'C3-' ] },
        { data: null, expected: [ 'null-' ] },
        { data: undefined, expected: [ 'undefined-' ] },
        { data: '', expected: [ '-' ] },
        { data: true, expected: [ 'true-' ] },
      ];

      for (const t of tests) {
        assert.strictEqual(JSON.stringify(Arrays.forEach(item => item + '-', t.data)), JSON.stringify(t.expected));
      }
    });
  });
});