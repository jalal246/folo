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
      } = wrapper.props();
      expect(id).to.match(/autoID/);
      expect(type).to.equal('text');
      expect(valueRef).to.equal('value');
      expect(initValue).to.equal('');
      expect(isInput).to.equal(true);
      expect(groupName).to.equal(null);
      expect(nameRef).to.match(/text_autoID/);
      expect(CellComponent).to.equal('input');
    });

    it('passes props to CellEngine when setting custom prop', () => {
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
        nameRef,
        CellComponent,
      } = wrapper.props();
      expect(id).to.be.equal(uniqueID);
      expect(type).to.equal(checkbox);
      expect(valueRef).to.equal('checked');
      expect(initValue).to.equal(false);
      expect(isInput).to.equal(false);
      expect(groupName).to.equal(null);
      expect(nameRef).to.be.equal(`${checkbox}_${uniqueID}`);
      expect(CellComponent).to.equal('input');
    });

    it('passes valueKey as nameRef when provided', () => {
      const key = 'someKey';
      wrapper = shallow(<PureCell valueKey={key} />);

      const { nameRef } = wrapper.props();
      expect(nameRef).to.be.equal(key);
    });

    it.only('calls registerCellInfo with expected args', () => {
      const registerCellInfo = sinon.stub();

      const key = 'someKey';

      wrapper = shallow(<PureCell valueKey={key} value="h" registerCellInfo={registerCellInfo} />);
      // expect(registerCellInfo).to.have.property('callCount', 1);
      expect(
        wrapper.instance().props.registerCellInfo.calledWith({
          nameRef: key,
          iniValue: 'h',
          groupName: null,
        }),
      ).to.equal(true);
    });
  });
});
