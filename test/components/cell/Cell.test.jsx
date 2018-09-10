import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { PureCell } from '../../../src/components/cell/Cell';

describe('Cell', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
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

    // it('return expected function', () => {
    //   wrapper = shallow(<PureCell />);
    //
    //   const { onChange } = wrapper.props();
    //   console.log(onChange.toString());
    //   expect(onChange.toString()).to.be.equal('onChange() {}');
    // });

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
});
