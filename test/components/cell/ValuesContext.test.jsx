import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { ValuesProvider } from '../../../src/components/cell/context';

describe('ValuesContext', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    let wrapper;

    it('returns functions and values as expected for defalut', () => {
      wrapper = shallow(<ValuesProvider />);
      const {
        // eslint-disable-next-line
        value: { updateCellValue, registerCellInfo, getContextValues, values },
      } = wrapper.props();
      expect(updateCellValue).to.be.a('function');
      expect(registerCellInfo).to.be.a('function');
      expect(getContextValues()).to.deep.equal({});
      expect(values).to.deep.equal({});
    });

    it('returns functions and values as expected for defalut', () => {
      wrapper = shallow(<ValuesProvider />);
      const {
        value: { registerCellInfo, updateCellValue },
      } = wrapper.props();

      const nameRef1 = 'nameTest1';
      const initValue1 = false;
      const groupName = 'gr';

      const obj1 = {
        nameRef: nameRef1,
        initValue: initValue1,
        groupName,
      };
      registerCellInfo(obj1);

      // do a second call
      const { datatObj, btnGroup } = wrapper.instance();
      expect(datatObj).to.deep.equal({ [nameRef1]: initValue1 });

      const nameRef2 = 'nameTest2';
      const initValue2 = false;

      const obj2 = {
        nameRef: nameRef2,
        initValue: initValue2,
        groupName,
      };
      registerCellInfo(obj2);

      // do more push to test accumalting keys
      expect(datatObj).to.deep.equal({ [nameRef1]: initValue1, [nameRef2]: initValue2 });

      const btnGroupTest = new Set();
      btnGroupTest.add(groupName);
      btnGroupTest[groupName] = new Set();
      btnGroupTest[groupName].add(nameRef1);
      btnGroupTest[groupName].add(nameRef2);

      expect(btnGroup).to.deep.equal(btnGroupTest);

      // test for different group name
      const nameRef3 = 'nameTest3';
      const initValue3 = false;
      const newGroupName = 'newGR';

      const obj3 = {
        nameRef: nameRef3,
        initValue: initValue3,
        groupName: newGroupName,
      };
      registerCellInfo(obj3);

      // sitmulate btnGroupTest
      btnGroupTest.add(newGroupName);
      btnGroupTest[newGroupName] = new Set();
      btnGroupTest[newGroupName].add(nameRef3);

      expect(btnGroup).to.deep.equal(btnGroupTest);

      // test for wothout group name
      const nameRef4 = 'nameTest4';
      const initValue4 = 'initValue4';

      const obj4 = {
        nameRef: nameRef4,
        initValue: initValue4,
        groupName: null,
      };
      registerCellInfo(obj4);
      expect(btnGroup).to.deep.equal(btnGroupTest);
      expect(datatObj).to.deep.equal({
        [nameRef1]: initValue1,
        [nameRef2]: initValue2,
        [nameRef3]: initValue3,
        [nameRef4]: initValue4,
      });

      // update the same info with updateCellValue
      updateCellValue(obj4);
      expect(datatObj).to.deep.equal({
        [nameRef1]: initValue1,
        [nameRef2]: initValue2,
        [nameRef3]: initValue3,
        [nameRef4]: initValue4,
      });

      // invoke componentDidMount
      wrapper.instance().componentDidMount();

      // test state
      expect(wrapper.state().values).to.deep.equal({
        [nameRef1]: initValue1,
        [nameRef2]: initValue2,
        [nameRef3]: initValue3,
        [nameRef4]: initValue4,
      });

      // update info 4, which dosent have groupName
      const newValue1 = 'newValue1';

      const obj5 = {
        nameRef: nameRef4,
        newValue: newValue1,
        groupName: obj4.groupName,
      };

      updateCellValue(obj5);
      expect(wrapper.state().values).to.deep.equal({
        [nameRef1]: initValue1,
        [nameRef2]: initValue2,
        [nameRef3]: initValue3,
        [nameRef4]: newValue1,
      });

      // update info 2, which dosent have groupName
      const newValue2 = !obj2.initValue;

      const obj6 = {
        nameRef: obj2.nameRef,
        newValue: newValue2,
        groupName: obj2.groupName,
      };

      const prevIsGroupValuesUpdate = wrapper.state().isGroupValuesUpdate;
      updateCellValue(obj6);
      expect(wrapper.state().values).to.deep.equal({
        [nameRef1]: initValue1,
        [nameRef2]: newValue2,
        [nameRef3]: initValue3,
        [nameRef4]: newValue1,
      });

      expect(wrapper.state().isGroupValuesUpdate).to.be.equal(!prevIsGroupValuesUpdate);

      // update info 2, which dosent have groupName with false values
      // false dosent toggle its siblings
      const newValue3 = false;

      const obj7 = {
        nameRef: obj2.nameRef,
        newValue: newValue3,
        groupName: obj2.groupName,
      };

      updateCellValue(obj7);
      expect(wrapper.state().values).to.deep.equal({
        [nameRef1]: initValue1,
        [nameRef2]: newValue3,
        [nameRef3]: initValue3,
        [nameRef4]: newValue1,
      });
    });
  });
});
