import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import { shallow } from 'enzyme';

import { Cell } from '../../src/components/cell';

describe('Cell', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#render', () => {
    it('returns input type text as default', () => {
      const wrapper = shallow(<Cell />);

      expect(wrapper.html()).to.equal('<input type="text" value=""/>');
    });

    it('generates nameRef combined of type + _ + id + _ + groupName', () => {
      const type = 'input';
      const id = 'unique';
      const groupName = 'gn';
      const separator = '_';
      const wrapper = shallow(<Cell type={type} id={id} groupName={groupName} />);
      expect(wrapper.instance().nameRef).to.equal(type + separator + id + separator + groupName);
    });

    it('returns select type when passes select as type', () => {
      const wrapperSelect = shallow(<Cell type="select" />);

      expect(wrapperSelect.html()).to.equal('<select type="select"></select>');
    });

    it('sets the init value as state', () => {
      const init = 'init value';
      const wrapperInit = shallow(<Cell value={init} />);

      expect(wrapperInit.state().localValue).to.equal(init);
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
      const wrapperComp = shallow(<Cell component={Custom} />);
      const wrapperCustom = shallow(<Custom />);

      expect(wrapperComp.html()).to.equal(wrapperCustom.html());
    });

    it('calls registerCellInfo with expected args', () => {
      const registerCellInfo = sinon.stub();

      const nameRef = 'testName';
      const iniValue = '';
      const groupName = null;

      shallow(<Cell nameRef={nameRef} cellContext={{ registerCellInfo }} />);
      expect(registerCellInfo).to.have.property('callCount', 1);
      expect(
        registerCellInfo.calledWith({
          nameRef,
          iniValue,
          groupName,
        }),
      ).to.equal(true);
    });
  });

  describe('#handlers', () => {
    describe('handleChange', () => {
      let handleChange;
      beforeEach(() => {
        handleChange = sinon.spy(Cell.prototype, 'handleChange');
      });

      it('triggers handleChange when change happens', () => {
        const event = { target: { value: '1' } };

        const wrapper = shallow(<Cell />);
        wrapper.simulate('change', event);

        expect(handleChange).to.have.property('callCount', 1);
      });

      it('calls props.updateCellValue when button', () => {
        const updateCellValue = sinon.stub();

        const nameRef = 'testName';
        const iniValue = true;
        const groupName = 'gName';
        const wrapper = shallow(
          <Cell
            type="radio"
            nameRef={nameRef}
            checked={iniValue}
            groupName={groupName}
            cellContext={{ updateCellValue, registerCellInfo() {}, values: {} }}
          />,
        );

        const newValue = false;
        const event = { target: { checked: newValue } };
        wrapper.instance().handleChange(event);

        expect(updateCellValue).to.have.property('callCount', 1);
        expect(
          updateCellValue.calledWith({
            nameRef,
            newValue,
            cellType: 'button',
            groupName,
          }),
        ).to.equal(true);
      });

      it('calls props.updateCellValue when select', () => {
        const updateCellValue = sinon.stub();

        const nameRef = 'testName';
        const groupName = 'gName';
        const wrapper = shallow(
          <Cell
            type="select"
            nameRef={nameRef}
            groupName={groupName}
            cellContext={{ updateCellValue, registerCellInfo() {}, values: {} }}
          />,
        );

        const newValue = 'A';
        const event = { target: { value: newValue } };
        wrapper.instance().handleChange(event);

        expect(updateCellValue).to.have.property('callCount', 1);
        expect(
          updateCellValue.calledWith({
            nameRef,
            newValue,
            cellType: 'select',
            groupName,
          }),
        ).to.equal(true);
      });

      it('calls props.onChange', () => {
        const onChange = sinon.stub();

        const newValue = false;
        const event = { target: { checked: newValue } };
        const wrapper = shallow(<Cell type="radio" checked onChange={onChange} />);
        wrapper.instance().handleChange(event);

        expect(onChange).to.have.property('callCount', 1);
      });
    });

    describe('handleBlur', () => {
      let handleBlur;
      beforeEach(() => {
        handleBlur = sinon.spy(Cell.prototype, 'handleBlur');
      });

      it('triggers handleBlur when change happens', () => {
        const event = { target: { value: '1' } };

        const wrapper = shallow(<Cell />);
        wrapper.simulate('blur', event);

        expect(handleBlur).to.have.property('callCount', 1);
      });

      it('calls props.updateCellValue', () => {
        const updateCellValue = sinon.stub();

        const nameRef = 'testName';
        const iniValue = 'whatever';
        const groupName = null;
        const wrapper = shallow(
          <Cell
            nameRef={nameRef}
            value={iniValue}
            groupName={groupName}
            cellContext={{ updateCellValue, registerCellInfo() {}, values: {} }}
          />,
        );

        const newValue = 'new';
        const event = { target: { value: newValue } };
        wrapper.instance().handleBlur(event);

        expect(updateCellValue).to.have.property('callCount', 1);
        expect(
          updateCellValue.calledWith({
            nameRef,
            newValue,
            cellType: 'input',
            groupName,
          }),
        ).to.equal(true);
      });

      it('calls props.onBlur', () => {
        const onBlur = sinon.stub();

        const newValue = 'new';
        const event = { target: { value: newValue } };
        const wrapper = shallow(<Cell onBlur={onBlur} />);
        wrapper.instance().handleBlur(event);

        expect(onBlur).to.have.property('callCount', 1);
      });
    });
  });
});
