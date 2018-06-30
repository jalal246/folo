import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  TEXT,
  SELECT,
  LIST,
  CHECKBOX,
  RADIO,
  INPUT,
  BTN
} from '../../constants';

import { ValuesConsumer, withContext } from '../cell/context';

const propTypes = {
  /** Description of prop "baz". */
  type: PropTypes.string,
  nameRef: PropTypes.string.isRequired,
  groupName: PropTypes.string,

  value: PropTypes.string,
  checked: PropTypes.bool,

  // context props
  registerCellInfo: PropTypes.func.isRequired,
  updateCellValue: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,

  children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

const defaultProps = {
  type: TEXT,
  groupName: null,

  value: '',
  checked: false,

  children: PropTypes.node
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
      registerCellInfo,
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

    const localValue = isBtn ? checked : value;

    // register cell info in context state
    registerCellInfo(nameRef, localValue, groupName);

    //
    this.state = { localValue };

    this.didMount = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.didMount = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { nameRef, groupName } = this.props;
    const { values: { [nameRef]: contextValue } } = nextProps;

    const { localValue } = this.state;

    if (groupName && contextValue !== localValue) {
      this.setState({
        localValue: nextProps.values[nameRef]
      });
    }

    return localValue !== nextState.localValue;
  }

  handleChange({ target: { checked, value } }) {
    const { nameRef, groupName, updateCellValue } = this.props;

    this.setState({
      localValue: this.isBtn ? checked : value
    });

    if (!this.isInput) {
      updateCellValue(nameRef, checked, this.isBtn ? BTN : SELECT, groupName);
    }
  }

  handleBlur({ target: { value } }) {
    const { nameRef, updateCellValue } = this.props;

    updateCellValue(nameRef, value, INPUT);
  }

  render() {
    console.log('button update');

    const { type, children } = this.props;

    const { localValue } = this.state;

    const cellProps = {
      type,
      [this.isBtn ? 'checked' : 'value']: localValue,
      onChange: this.handleChange,
      ...(this.isInput && { onBlur: this.handleBlur })
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
