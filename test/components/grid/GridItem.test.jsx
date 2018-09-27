import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import { PureGridItem } from '../../../src/components/grid/GridItem';

const CENTER = 'center';
const FLEX_START = 'flex-start';
const ROW = 'row';
const COLUMN = 'column';
const DISPLAY_FLEX = 'flex';

describe('GridItem', () => {
  afterEach(() => {
    sinon.restore();
  });
  const DEFAULT_ROW = '0';
  const autoPositionCell = sinon.stub().returns(DEFAULT_ROW);

  describe('style', () => {
    it('returns default style', () => {
      const wrapper = shallow(
        <PureGridItem autoPositionCell={autoPositionCell}>
          <div />
        </PureGridItem>,
      );

      expect(wrapper.prop('style')).to.deep.equal({
        display: DISPLAY_FLEX,
        flexDirection: ROW,
        gridRow: DEFAULT_ROW,
      });
    });

    it('returns flexDirection column when it is isHorizontal = false', () => {
      const wrapper = shallow(
        <PureGridItem autoPositionCell={autoPositionCell} isHorizontal={false}>
          <div />
        </PureGridItem>,
      );

      expect(wrapper.prop('style')).to.deep.equal({
        display: DISPLAY_FLEX,
        flexDirection: COLUMN,
        gridRow: DEFAULT_ROW,
      });
    });

    it('overrides styles', () => {
      const wrapper = shallow(
        <PureGridItem
          autoPositionCell={autoPositionCell}
          style={{
            flexDirection: COLUMN,
          }}
        >
          <div />
        </PureGridItem>,
      );

      expect(wrapper.prop('style')).to.deep.equal({
        display: DISPLAY_FLEX,
        flexDirection: COLUMN,
        gridRow: DEFAULT_ROW,
      });
    });

    describe('gridRow', () => {
      it('returns gridRow with toRow', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} toRow={6}>
            <div />
          </PureGridItem>,
        );

        expect(wrapper.prop('style')).to.deep.equal({
          display: DISPLAY_FLEX,
          flexDirection: ROW,
          gridRow: '0 / 6',
        });
      });

      it('returns gridRow with toRow =0', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} toRow={0}>
            <div />
          </PureGridItem>,
        );

        expect(wrapper.prop('style')).to.deep.equal({
          display: DISPLAY_FLEX,
          flexDirection: ROW,
          gridRow: '0 / 0',
        });
      });
    });
    describe('gridColumn', () => {
      it('returns column position with justifyContent, when col is provided', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} col={10}>
            <div />
          </PureGridItem>,
        );

        expect(wrapper.prop('style')).to.deep.equal({
          display: DISPLAY_FLEX,
          flexDirection: ROW,
          gridRow: DEFAULT_ROW,
          justifyContent: FLEX_START,
          gridColumn: '10',
        });
      });

      it('returns column position with justifyContent, when toCol is provided', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} toCol={10}>
            <div />
          </PureGridItem>,
        );

        expect(wrapper.prop('style')).to.deep.equal({
          display: DISPLAY_FLEX,
          flexDirection: ROW,
          gridRow: DEFAULT_ROW,
          justifyContent: FLEX_START,
          gridColumn: '0 / 10',
        });
      });
    });
    describe('isCenter', () => {
      it('returns center justifyContent with expected gridColumn', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} isCenter>
            <div />
          </PureGridItem>,
        );

        expect(wrapper.prop('style')).to.deep.equal({
          display: DISPLAY_FLEX,
          flexDirection: ROW,
          gridRow: DEFAULT_ROW,
          justifyContent: CENTER,
          gridColumn: '1 / -1',
        });
      });
    });
  });
});
