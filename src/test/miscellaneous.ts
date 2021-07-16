import assert from 'assert';
import * as Misc from '../lib/gsheet/miscellaneous';

describe('Miscellaneous', () => {
  describe('#getLabelledValue()', () => {
    const labels = [ 'Apple', 'Banana', 'Lemon',  'Orange', 'Strawberry'  ];
    const values = [ 4,       3,        1,        2,        5             ];

    it('should return 4', () => {
      assert.strictEqual(Misc.getLabelledValue('Apple', labels, values), 4);
    });

    it('should return 1', () => {
      assert.strictEqual(Misc.getLabelledValue('Lemon', labels, values), 1);
    });
  })
});