import assert from 'assert';
import * as Text from '../lib/gsheet/text';

describe('Text', () => {
  describe('#parseA1Notation()', () => {
    it('should return output object', () => {
      const tests = {
        'A1': { col1: 'A', row1: 1, coord1: 'A1', range: 'A1' },
        'A1:C5': { col1: 'A', row1: 1, col2: 'C', row2: 5, coord1: 'A1', range: 'A1:C5', coord2: 'C5' },
        'Example!A1': { sheet: 'Example', col1: 'A', row1: 1, coord1: 'A1', range: 'A1' },
        'Example!A1:C5': { sheet: 'Example', col1: 'A', row1: 1, col2: 'C', row2: 5, coord1: 'A1', range: 'A1:C5', coord2: 'C5' },
        "'Example Sheet'!A1": { sheet: 'Example Sheet', col1: 'A', row1: 1, coord1: 'A1', range: 'A1' },
        "'Example Sheet'!A1:C5": { sheet: 'Example Sheet', col1: 'A', row1: 1, col2: 'C', row2: 5, coord1: 'A1', range: 'A1:C5', coord2: 'C5' }
      }

      Object.keys(tests).forEach(k => {
        assert.strictEqual(JSON.stringify(Text.parseA1Notation(k)), JSON.stringify((tests as any)[k]));
      });
    });

    it('should return null', () => {
      assert.strictEqual(Text.parseA1Notation(null), null);
      assert.strictEqual(Text.parseA1Notation(undefined), null);
      assert.strictEqual(Text.parseA1Notation(''), null);
      assert.strictEqual(Text.parseA1Notation('Anything but a range'), null);
    });
  })
});