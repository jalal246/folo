import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';

import { PureGridItem } from '../../../src/components/grid/GridItem';

const CENTER = 'center';
const ROW = 'row';
const COLUMN = 'column';
const DISPLAY_FLEX = 'flex';
const SPACE_BETWEEN = 'space-between';
const STRETCH = 'stretch';

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

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: '0',
        gridColumn: '0',
        justifyContent: SPACE_BETWEEN,
      };

      expect(wrapper.prop('style')).to.deep.equal(expected);
    });

    it('returns flexDirection column when it is isHorizontal = false', () => {
      const wrapper = shallow(
        <PureGridItem autoPositionCell={autoPositionCell} isHorizontal={false}>
          <div />
        </PureGridItem>,
      );

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: STRETCH,
        flexDirection: COLUMN,
        gridRow: '0',
        gridColumn: '0',
        justifyContent: SPACE_BETWEEN,
      };

      expect(wrapper.prop('style')).to.deep.equal(expected);
    });

    it('overrides styles', () => {
      const wrapper = shallow(
        <PureGridItem
          autoPositionCell={autoPositionCell}
          style={{
            flexDirection: COLUMN,
            alignItems: STRETCH,
          }}
        >
          <div />
        </PureGridItem>,
      );

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: STRETCH,
        flexDirection: COLUMN,
        gridRow: '0',
        gridColumn: '0',
        justifyContent: SPACE_BETWEEN,
      };

      expect(wrapper.prop('style')).to.deep.equal(expected);
    });

    it('returns center', () => {
      const wrapper = shallow(
        <PureGridItem autoPositionCell={autoPositionCell} isCenter>
          <div />
        </PureGridItem>,
      );

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: '0',
        gridColumn: '0',
        justifyContent: CENTER,
      };

      expect(wrapper.prop('style')).to.deep.equal(expected);
    });

    describe('gridRow', () => {
      it('returns gridRow with toRow and alignItems center', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} toRow={6}>
            <div />
          </PureGridItem>,
        );

        const expected = {
          display: DISPLAY_FLEX,
          alignItems: CENTER,
          flexDirection: ROW,
          gridRow: '0 / 6',
          gridColumn: '0',
          justifyContent: SPACE_BETWEEN,
        };

        expect(wrapper.prop('style')).to.deep.equal(expected);
      });

      it('returns gridRow with toRow =0', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} toRow={0}>
            <div />
          </PureGridItem>,
        );
        const expected = {
          display: DISPLAY_FLEX,
          alignItems: CENTER,
          flexDirection: ROW,
          gridRow: '0 / 0',
          gridColumn: '0',
          justifyContent: SPACE_BETWEEN,
        };

        expect(wrapper.prop('style')).to.deep.equal(expected);
      });
    });

    describe('gridColumn', () => {
      it('returns column position with when col is provided', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} col={10}>
            <div />
          </PureGridItem>,
        );

        const expected = {
          display: DISPLAY_FLEX,
          alignItems: CENTER,
          flexDirection: ROW,
          gridRow: '0',
          gridColumn: '10',
          justifyContent: SPACE_BETWEEN,
        };

        expect(wrapper.prop('style')).to.deep.equal(expected);
      });

      it('returns column position with justifyContent, when toCol is provided', () => {
        const wrapper = shallow(
          <PureGridItem autoPositionCell={autoPositionCell} toCol={10}>
            <div />
          </PureGridItem>,
        );

        const expected = {
          display: DISPLAY_FLEX,
          alignItems: CENTER,
          flexDirection: ROW,
          gridRow: '0',
          gridColumn: '0 / 10',
          justifyContent: SPACE_BETWEEN,
        };

        expect(wrapper.prop('style')).to.deep.equal(expected);
      });
    });
  });
});
