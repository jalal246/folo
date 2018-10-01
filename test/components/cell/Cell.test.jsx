import React, { createContext } from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { mount, shallow } from 'enzyme';

import { PureCell } from '../../../src/components/cell/Cell';
import withContext from '../../../src/components/withContext';

describe('Cell', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('render', () => {
    let wrapper;

    it('passes props to CellEngine as expected for defalut', () => {
      wrapper = shallow(<PureCell />);
      const {
        id,
        type,
        valueRef,
        initValue,
        isInput,
        groupName,
        nameRef,
        CellComponent,
        onChange,
        onBlur,
      } = wrapper.props();
      expect(id).to.match(/autoID/);
      expect(type).to.equal('text');
      expect(valueRef).to.equal('value');
      expect(initValue).to.equal('');
      expect(isInput).to.equal(true);
      expect(groupName).to.equal(null);
      expect(nameRef).to.match(/text_autoID/);
      expect(CellComponent).to.equal('input');
      expect(nameRef).to.match(/text_autoID/);
      expect(CellComponent).to.equal('input');
      expect(onChange()).to.be.a('undefined');
      expect(onBlur()).to.be.a('undefined');
    });

    it('passes props to CellEngine when setting custom prop for checkbox', () => {
      const checkbox = 'checkbox';
      const uniqueID = 'uniqueID';

      wrapper = shallow(<PureCell type={checkbox} id={uniqueID} />);

      const {
        id,
        type,
        valueRef,
        initValue,
        isInput,
        groupName,
        // nameRef, will be covered alone to test both cases
        CellComponent,
      } = wrapper.props();
      expect(id).to.be.equal(uniqueID);
      expect(type).to.equal(checkbox);
      expect(valueRef).to.equal('checked');
      expect(initValue).to.equal(false);
      expect(isInput).to.equal(false);
      expect(groupName).to.equal(null);
      expect(CellComponent).to.equal('input');
    });

    it('return type props to CellEngine when setting custom prop for list', () => {
      const list = 'list';

      wrapper = shallow(<PureCell type={list} />);

      const { type } = wrapper.props();
      expect(type).to.equal(list);
    });

    it('return expected nameRef when groupName:null', () => {
      const uniqueID = 'uniqueID';

      wrapper = shallow(<PureCell id={uniqueID} />);

      const { nameRef } = wrapper.props();
      expect(nameRef).to.be.equal(`text_${uniqueID}`);
    });

    it('return expected nameRef when groupName:value', () => {
      const uniqueID = 'uniqueID';
      const groupName = 'groupName';
      wrapper = shallow(<PureCell id={uniqueID} groupName={groupName} />);

      const { nameRef } = wrapper.props();
      expect(nameRef).to.be.equal(`${'text'}_${uniqueID}_${groupName}`);
    });

    it('passes valueKey as nameRef when provided', () => {
      const key = 'someKey';
      wrapper = shallow(<PureCell valueKey={key} />);

      const { nameRef } = wrapper.props();
      expect(nameRef).to.be.equal(key);
    });

    it('calls registerCellInfo with expected args', () => {
      const registerCellInfo = sinon.stub();

      const key = 'someKey';
      const value = 'test';

      wrapper = shallow(
        <PureCell valueKey={key} value={value} registerCellInfo={registerCellInfo} />,
      );
      expect(registerCellInfo).to.have.property('callCount', 1);

      expect(
        registerCellInfo.calledWith({
          nameRef: key,
          initValue: value,
          groupName: null,
        }),
      ).to.equal(true);
    });
  });

  describe('withContext', () => {
    const TestContext = createContext({
      prop1: 'extra1',
      prop2: 'extra2',
      prop3: 'extra3',
      prop4: 'extra4',
    });

    const { Consumer } = TestContext;

    const Cell = withContext({
      Component: PureCell,
      Consumer,
      contextProps: ['prop1', 'prop4'],
    });

    const wrapper = mount(shallow(<Cell />).get(0));

    // eslint-disable-next-line
    const { prop1, prop2, prop4, type } = wrapper.instance().props;

    it('returns component with required context', () => {
      expect(prop1).to.be.equal('extra1');
      expect(prop4).to.be.equal('extra4');
    });

    it('does not have all context props, just the required', () => {
      expect(prop2).to.be.equal(undefined);
    });

    it('has the orginal props', () => {
      expect(type).to.be.equal('text');
    });

    it('retruns all context props when contextProps is not defined', () => {
      const Cell2 = withContext({
        Component: PureCell,
        Consumer,
      });

      const wrapper2 = mount(shallow(<Cell2 />).get(0));

      // eslint-disable-next-line
      const { prop1: p1, prop2: p2, prop3: p3, prop4: p4 } = wrapper2.instance().props;
      expect(p1).to.be.equal('extra1');
      expect(p2).to.be.equal('extra2');
      expect(p3).to.be.equal('extra3');
      expect(p4).to.be.equal('extra4');
    });
  });
});
