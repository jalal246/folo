import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Grid from '../../../src/components/grid/Grid';

const DEFAULT_DISPLAY = 'grid';
const DEFAULT_JUSTIFY_ITEMS = 'stretch';
const DEFAULT_ALIGNH_ITEMS = 'stretch';
const DEFAULT_GAP = '1em';

describe('Grid', () => {
  describe('style', () => {
    it('returns default grid style as expected', () => {
      const wrapper = shallow(
        <Grid>
          <div />
        </Grid>,
      );

      expect(wrapper.prop('style')).to.deep.equal({
        display: DEFAULT_DISPLAY,
        justifyItems: DEFAULT_JUSTIFY_ITEMS,
        alignItems: DEFAULT_ALIGNH_ITEMS,
        gap: DEFAULT_GAP,
      });
    });

    it('returns override style', () => {
      const DISPLAY_ENLINE = 'inline-grid';

      const wrapper = shallow(
        <Grid
          style={{
            display: DISPLAY_ENLINE,
          }}
        >
          <div />
        </Grid>,
      );
      expect(wrapper.prop('style')).to.deep.equal({
        display: DISPLAY_ENLINE,
        justifyItems: DEFAULT_JUSTIFY_ITEMS,
        alignItems: DEFAULT_ALIGNH_ITEMS,
        gap: DEFAULT_GAP,
      });
    });

    describe('templates', () => {
      it('returns gridTemplateColumns when passing col', () => {
        const wrapper = shallow(
          <Grid col={2}>
            <div />
          </Grid>,
        );
        expect(wrapper.prop('style')).to.deep.equal({
          display: DEFAULT_DISPLAY,
          justifyItems: DEFAULT_JUSTIFY_ITEMS,
          alignItems: DEFAULT_ALIGNH_ITEMS,
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: DEFAULT_GAP,
        });
      });

      it('returns gridTemplateColumns when passing colMinWidth', () => {
        const wrapper = shallow(
          <Grid colMinWidth="2px">
            <div />
          </Grid>,
        );
        expect(wrapper.prop('style')).to.deep.equal({
          display: DEFAULT_DISPLAY,
          justifyItems: DEFAULT_JUSTIFY_ITEMS,
          alignItems: DEFAULT_ALIGNH_ITEMS,
          gridTemplateColumns: 'repeat(auto-fit, minmax(2px, 1fr)',
          gap: DEFAULT_GAP,
        });
      });

      it('returns gridTemplateRows when passing row', () => {
        const wrapper = shallow(
          <Grid row={5}>
            <div />
          </Grid>,
        );
        expect(wrapper.prop('style')).to.deep.equal({
          display: DEFAULT_DISPLAY,
          justifyItems: DEFAULT_JUSTIFY_ITEMS,
          alignItems: DEFAULT_ALIGNH_ITEMS,
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: DEFAULT_GAP,
        });
      });
    });
  });
});
