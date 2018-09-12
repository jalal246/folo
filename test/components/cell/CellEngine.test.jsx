import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow, mount } from 'enzyme';

import { PureCellEngine } from '../../../src/components/cell/CellEngine';

const required = {
  id: 'id',
  type: 'text',
  valueRef: 'value',
  initValue: '',
  isInput: true,
  groupName: null,
  nameRef: 'nameRef',
  isCellUpdated: false,
  CellComponent: 'input',
  onChange() {},
  onBlur() {},
  rest: {},
  updateCellValue() {},
};

describe('CellEngine', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('render', () => {
    it('returns input element', () => {
      const wrapper = shallow(<PureCellEngine {...required} />);

      expect(wrapper.html()).to.equal('<input type="text" value="" id="id"/>');
    });

    it('returns button element', () => {
      const type = 'checkbox';
      const valueRef = 'checked';
      const initValue = false;

      const wrapper = shallow(
        <PureCellEngine
          {...Object.assign({}, required, {
            type,
            valueRef,
            initValue,
          })}
        />,
      );

      expect(wrapper.find('[type="checkbox"]')).to.have.lengthOf(1);
    });

    it('sets state equal to initValue ', () => {
      const wrapper = mount(<PureCellEngine {...required} />);

      expect(wrapper.state().localValue).to.equal(required.initValue);
    });

    it('returns custom component', () => {
      const Custom = () => (
        <div className="wrapper class">
          <input
            aria-invalid="false"
            className="inner class"
            type="text"
            value="custom"
            onChange={() => {}}
          />
        </div>
      );
      const wrapperComp = shallow(
        <PureCellEngine
          {...Object.assign({}, required, {
            CellComponent: Custom,
          })}
        />,
      );
      const wrapperCustom = shallow(<Custom />);

      expect(wrapperComp.html()).to.equal(wrapperCustom.html());
    });
  });

  describe('shouldComponentUpdate', () => {
    let wrapper;
    let shouldComponentUpdate;
    const newRequiredProps = {
      ...Object.assign({}, required, {
        type: 'checkbox',
        valueRef: 'checked',
        initValue: false,
        isInput: false,
        groupName: 'whatEver',
      }),
    };

    beforeEach(() => {
      wrapper = mount(<PureCellEngine {...newRequiredProps} />);

      shouldComponentUpdate = sinon.spy(PureCellEngine.prototype, 'shouldComponentUpdate');
    });

    it('updates when changing isCellUpdated from props', () => {
      expect(shouldComponentUpdate).to.have.property('callCount', 0);

      wrapper.setProps({ isCellUpdated: !newRequiredProps.isCellUpdated });

      expect(shouldComponentUpdate).to.have.property('callCount', 1);

      expect(shouldComponentUpdate.returned(true)).to.be.equal(true);
    });
    it('updates when changing values from context/props', () => {
      expect(shouldComponentUpdate).to.have.property('callCount', 0);

      const values = Object.assign(
        {},
        { ...newRequiredProps.values },
        { [newRequiredProps.nameRef]: !newRequiredProps.initValue },
      );

      wrapper.setProps({ values });

      /*
      * Triggers shouldComponentUpdate twice
      * first call will be when recivieng new props
      * second one when updating the state, which will return true
      */
      expect(shouldComponentUpdate).to.have.property('callCount', 2);

      expect(shouldComponentUpdate.returned(true)).to.be.equal(true);
    });
    it('updates when changing state locally', () => {
      expect(shouldComponentUpdate).to.have.property('callCount', 0);

      wrapper.setState({ localValue: !newRequiredProps.initValue });

      expect(shouldComponentUpdate).to.have.property('callCount', 1);

      expect(shouldComponentUpdate.returned(true)).to.be.equal(true);
    });
  });

  describe('handlers and functions calls', () => {
    let handleChange;
    beforeEach(() => {
      handleChange = sinon.spy(PureCellEngine.prototype, 'handleEvent');
    });
    describe('handleChange for input', () => {
      let event;
      let wrapper;
      const newValue = 1;
      beforeEach(() => {
        event = { target: { value: newValue }, type: 'change' };
        wrapper = shallow(<PureCellEngine {...required} />);
        wrapper.simulate('change', event);
      });

      it('triggers handleEvent when change happens', () => {
        expect(handleChange).to.have.property('callCount', 1);
      });

      it('changes state to new value', () => {
        expect(wrapper.state().localValue).to.equal(newValue);
      });
    });

    describe('handleChange for button', () => {
      const groupName = 'groupName';
      let event;
      let wrapper;
      const updateCellValue = sinon.stub();
      let onChange;

      beforeEach(() => {
        const type = 'checkbox';
        const valueRef = 'checked';
        const initValue = false;
        onChange = sinon.stub();

        event = { target: { checked: true }, type: 'change' };
        wrapper = shallow(
          <PureCellEngine
            {...Object.assign({}, required, {
              type,
              valueRef,
              initValue,
              groupName,
              updateCellValue,
              onChange,
              isInput: false,
            })}
          />,
        );
        wrapper.simulate('change', event);
      });

      it('calls props.updateCellValue', () => {
        expect(updateCellValue).to.have.property('callCount', 1);
      });

      it('calls props.updateCellValue with the new args', () => {
        expect(
          updateCellValue.calledWith({
            nameRef: required.nameRef,
            newValue: true,
            groupName,
          }),
        ).to.equal(true);
      });

      it('calls props.onChange', () => {
        expect(onChange).to.have.property('callCount', 1);
      });
    });

    describe('handleBlur', () => {
      let event;
      let wrapper;
      const newValue = 1;
      let updateCellValue;
      beforeEach(() => {
        event = { target: { value: newValue }, type: 'blur' };
        updateCellValue = sinon.stub();
        wrapper = shallow(
          <PureCellEngine
            {...Object.assign({}, required, {
              updateCellValue,
            })}
          />,
        );
        wrapper.simulate('change', event);
      });

      it('triggers handleEvent when blur happens', () => {
        expect(handleChange).to.have.property('callCount', 1);
      });

      it('calls props.updateCellValue', () => {
        expect(updateCellValue).to.have.property('callCount', 1);
      });

      it('calls props.updateCellValue with the new args', () => {
        expect(
          updateCellValue.calledWith({
            nameRef: required.nameRef,
            newValue,
            groupName: required.groupName,
          }),
        ).to.equal(true);
      });
    });
  });
});
