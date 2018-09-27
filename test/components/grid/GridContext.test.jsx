import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { GridProvider } from '../../../src/components/grid/context';

describe('GridContext', () => {
  describe('returns expected instance and functions', () => {
    const wrapper = shallow(<GridProvider />);
    const {
      // eslint-disable-next-line
      cellPositions,
      biggestRowItem,
    } = wrapper.instance();

    const {
      value: { autoPositionCell },
    } = wrapper.props();

    it('returns defalut as expected', () => {
      expect(autoPositionCell).to.be.a('function');
      expect(biggestRowItem).to.equal(0);
    });

    const row1 = {
      key: 'uniqueKey1',
      row: 10,
      toRow: 0,
    };
    const expectedRow1 = 10;
    const expectedBiggestRow1 = 10;

    // no row
    const row2 = {
      key: 'uniqueKey2',
      row: null,
      toRow: 0,
    };
    const expectedRow2 = 10 + 1;
    const expectedBiggestRow2 = expectedRow2;

    // same value
    const row3 = {
      key: 'uniqueKey2',
      row: 11,
      toRow: 0,
    };
    const expectedRow3 = expectedRow2;
    const expectedBiggestRow3 = expectedBiggestRow2;

    // same value
    const row4 = {
      key: 'uniqueKey4',
      row: 2,
      toRow: 0,
    };
    const expectedRow4 = 2;
    const expectedBiggestRow4 = expectedBiggestRow3;

    // same value
    const row5 = {
      key: 'uniqueKey5',
      row: null,
      toRow: 20,
    };
    const expectedBiggestRow5 = 20;
    const expectedRow5 = expectedBiggestRow5;

    // same value
    const row6 = {
      key: 'uniqueKey6',
      row: null,
      toRow: 8,
    };
    const expectedBiggestRow6 = expectedBiggestRow5 + 1;
    const expectedRow6 = expectedBiggestRow6;

    it('returns correct instance whith defined row', () => {
      const autoRow = autoPositionCell(row1);

      expect(autoRow).to.equal(expectedRow1);
      expect(wrapper.instance().biggestRowItem).to.equal(expectedBiggestRow1);
    });

    it('detects row number as prev row + 1', () => {
      const autoRow = autoPositionCell(row2);

      expect(autoRow).to.equal(expectedRow2);
      expect(wrapper.instance().biggestRowItem).to.equal(expectedBiggestRow2);
    });

    it('does nothing when passing the same value for the same key', () => {
      const autoRow = autoPositionCell(row3);

      expect(autoRow).to.equal(expectedRow3);
      expect(wrapper.instance().biggestRowItem).to.equal(expectedBiggestRow3);
    });

    it('assgin biggestRowItem correctly with defined row', () => {
      const autoRow = autoPositionCell(row4);

      expect(autoRow).to.equal(expectedRow4);
      expect(wrapper.instance().biggestRowItem).to.equal(expectedBiggestRow4);
    });
    describe('assgin non defined row to biggest when toRow defined', () => {
      it('takes toRow value because it is the highest', () => {
        const autoRow = autoPositionCell(row5);

        expect(autoRow).to.equal(expectedRow5);
        expect(wrapper.instance().biggestRowItem).to.equal(expectedBiggestRow5);
      });

      it('takes the prev highest + 1 because toRow is not the highest>', () => {
        const autoRow = autoPositionCell(row6);
        expect(autoRow).to.equal(expectedRow6);
        expect(wrapper.instance().biggestRowItem).to.equal(expectedBiggestRow6);
      });
    });
  });
});
