import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { keyGenerator } from '../../utils';

import {
  TEXT,
  SELECT,
  LIST,
  CHECKBOX,
  RADIO,
  INPUT,
  BTN
} from '../../constants';

import { ValuesConsumer } from './context';
import withContext from '../withContext';

// const basicProps = [
//   'component',
//
//   'type',
//   'nameRef',
//   'groupName',
//
//   'value',
//   'checked',
//   'id',
//
//   /** context props */
//   'registerCellInfo',
//   'updateCellValue',
//   'values',
//
//   'onChange',
//   'onBlur',
//
//   'children'
// ];

const propTypes = {
  component: PropTypes.node,

  type: PropTypes.string,
  nameRef: PropTypes.string.isRequired,
  groupName: PropTypes.string,

  value: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.string,

  /** context props */
  cn: PropTypes.shape({
    registerCellInfo: PropTypes.func.isRequired,
    updateCellValue: PropTypes.func.isRequired,
    values: PropTypes.objectOf(PropTypes.string).isRequired
  }).isRequired,

  onChange: PropTypes.func,
  onBlur: PropTypes.func,

  children: PropTypes.node
};

const defaultProps = {
  component: null,

  type: TEXT,
  groupName: null,

  value: '',
  checked: false,
  id: keyGenerator('autoID'),

  onChange: null,
  onBlur: null,

  children: null
};

/**
 * Gets the cell type
 * returns booleans type flage.
 *
 * @param {string} cell_type
 * @return {Object} - isBtn, isSelect, isInput
 */
function recognizeCellType(type) {
  let isBtn = false;
  let isSelect = false;

  if (type === SELECT || type === LIST) {
    isSelect = true;
  } else if (type === CHECKBOX || type === RADIO) {
    isBtn = true;
  }

  return {
    isSelect,
    isBtn,
    isInput: !isBtn && !isSelect
  };
}

class Cell extends Component {
  constructor(props) {
    super(props);

    const {
      component: CellComponent,
      nameRef,
      value,
      checked,
      id,
      cn: { registerCellInfo },
      groupName,
      type
    } = props;

    const { isBtn, isSelect, isInput } = recognizeCellType(type);

    this.isBtn = isBtn;
    this.isSelect = isSelect;
    this.isInput = isInput;

    /**
     * assign render component
     * input is default
     */
    if (!CellComponent) {
      if (this.isSelect) {
        this.CellComponent = SELECT;
      } else {
        this.CellComponent = INPUT;
      }
    } else {
      // user choise
      this.CellComponent = CellComponent;
    }

    // choose the init value that will be saved in context and local state
    const localValue = isBtn ? checked : value;

    // get unique reference name if nameRef is not provided
    let artificialNameRe = nameRef;
    if (!artificialNameRe) {
      /*
      * if there's id so be it
      * otherwise, generate new one
      * */
      artificialNameRe = `${type}_${id}${groupName ? `_${groupName}` : ''}`;
    }

    // register cell info in context state
    registerCellInfo(artificialNameRe, localValue, groupName);

    this.nameRef = artificialNameRe;
    this.valueRef = this.isBtn ? 'checked' : 'value';

    this.state = { localValue };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { groupName } = this.props;
    const { cn: { values: { [this.nameRef]: contextValue } } } = nextProps;

    const { localValue } = this.state;

    if (groupName && contextValue !== localValue) {
      this.setState({
        localValue: contextValue
      });
    }

    return localValue !== nextState.localValue;
  }

  handleChange(e) {
    const { target: { checked, value } } = e;
    const { groupName, cn: { updateCellValue }, onChange } = this.props;

    this.setState({
      localValue: this.isBtn ? checked : value
    });

    if (!this.isInput) {
      updateCellValue(
        this.nameRef,
        checked,
        this.isBtn ? BTN : SELECT,
        groupName
      );
    }
    if (onChange) {
      onChange(e);
    }
  }

  handleBlur(e) {
    const { target: { value } } = e;
    const { cn: { updateCellValue }, onBlur } = this.props;

    updateCellValue(this.nameRef, value, INPUT);

    if (onBlur) {
      onBlur(e);
    }
  }

  render() {
    console.log('button update');

    const {
      component,

      type,
      nameRef,
      groupName,

      value,
      checked,
      id,

      /** context props */
      cn,

      onChange,
      onBlur,

      children,
      ...other
    } = this.props;

    const { localValue } = this.state;

    const onBlurFunc = this.isInput ? this.handleBlur : onBlur;

    const cellProps = {
      type,
      [this.valueRef]: localValue,
      onChange: this.handleChange,
      onBlur: onBlurFunc,
      ...other
    };
    return this.isSelect ? (
      <this.CellComponent {...cellProps}>{children}</this.CellComponent>
    ) : (
      <this.CellComponent {...cellProps} />
    );
  }
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

export default withContext(Cell, ValuesConsumer);
