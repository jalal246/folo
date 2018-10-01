import { expect } from 'chai';
import { keyGenerator } from '../src/utils';

describe('uitls', () => {
  describe('keyGenerator', () => {
    it('returns default keyword', () => {
      expect(keyGenerator()).to.match(/folio/);
    });
    it('returns custom keyword', () => {
      expect(keyGenerator('test')).to.match(/test/);
    });
  });
});
