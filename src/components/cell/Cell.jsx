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

    const { initValue, groupName } = props;

    this.state = { tempValue: groupName ? initValue : null };

    this.didMount = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.didMount = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { values, nameRef, groupName } = this.props;
    if (groupName) {
      return nextProps.values[nameRef] !== values[nameRef];
    }

    const { tempValue } = this.state;
    return tempValue !== nextState.tempValue;
  }

  init = ({ registerCellInfo, nameRef, groupName, type, CellComponent }) => {
    // register cell info in context state
    registerCellInfo(nameRef, this.initValue, groupName);

    //
    const { isBtn, isSelect, isInput } = recognizeCellType(type);
    this.isBtn = isBtn;
    this.isSelect = isSelect;
    this.isInput = isInput;
    //
    if (!CellComponent) {
      if (this.isSelect) {
        this.CellComponent = SELECT;
      } else {
        this.CellComponent = INPUT;
      }
    } else {
      this.CellComponent = CellComponent;
    }
  };

  handleChange({ target: { checked, value } }) {
    const { nameRef, groupName, updateCellValue } = this.props;

    if (!groupName) {
      this.setState({
        tempValue: this.isBtn ? checked : value
      });
    }

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

    const {
      component: CellComponent,
      type,
      groupName,
      initValue,
      registerCellInfo,
      values,
      nameRef,
      attr,
      children
    } = this.props;

    let checked;

    if (!this.didMount) {
      this.init({ registerCellInfo, nameRef, groupName, type, CellComponent });
      checked = initValue;
    } else if (groupName) {
      checked = values[nameRef];
    } else {
      checked = this.state.tempValue;
    }

    const props = {
      type,
      [this.isBtn ? 'checked' : 'value']: checked,
      onChange: this.handleChange,
      ...(this.isInput && { onBlur: this.handleBlur }),
      ...attr
    };

    return this.isSelect ? (
      <this.CellComponent {...props}>{children}</this.CellComponent>
    ) : (
      <this.CellComponent {...props} />
    );
  }
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

// export default Cell;

export default withContext(Cell, ValuesConsumer);
