import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow, mount } from 'enzyme';

import { Cell } from '../../src/components/cell';

const required = {
  registerCellInfo() {},
  updateCellValue() {},
  values: {},
};

describe('Cell', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('render', () => {
    const wrapper = shallow(<Cell cn={required} />);

    it('returns input type text as default', () => {
      expect(wrapper.html()).to.equal('<input type="text" value=""/>');
    });

    it('returns select type when passes select as type', () => {
      const wrapperSelect = shallow(<Cell cn={required} type="select" />);

      expect(wrapperSelect.html()).to.equal('<select type="select"></select>');
    });

    it('set the value as state', () => {
      const init = 'init value';
      const wrapperInit = shallow(<Cell cn={required} value={init} />);

      expect(wrapperInit.state().localValue).to.equal(init);
    });
    it('passes value to state', () => {
      const spy = sinon.spy();
      const wr = shallow(<Cell cn={  registerCellInfo={() =>{}} />);

      const { registerCellInfo } = wr.instance().props.cn;

      console.log(registerCellInfo);
      // const wr = shallow(<Cell cn={required} />);
      //
      // // const spy = sinon.spy(wr.instance().props.cn, 'registerCellInfo');
      console.log(spy);
      //
      // expect(spy.calledOnce).to.equal(true);

      // console.log(wrapper.instance().props.cn.registerCellInfo);
      // expect(wrapper.instance().props.cn.registerCellInfo).to.equal('');
    });
  });
});
