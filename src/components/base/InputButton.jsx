import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SELECT, LIST, CHECKBOX, RADIO, INPUT, BTN } from '../../constants';

import { ValuesConsumer, withContext } from '../cell/context';

const propTypes = {
  updateCellValue: PropTypes.func.isRequired,
  initValue: PropTypes.bool,
  component: PropTypes.node,
  nameRef: PropTypes.string.isRequired,
  attr: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string)
    ])
  ).isRequired,

  groupName: PropTypes.string
};

const defaultProps = {
  component: 'input',
  initValue: false,
  groupName: null
};

/**
 * Gets the cell type
 * assign component type depending on cell
 * if the type is not define, consider it InputField as default
 *
 * @param {string} cell_type
 * @return {Object} the choosen component and toggls state
 */
function recognizeCellType(type) {
  let isBtn = false;
  let isSelect = false;

  if (type === SELECT || type === LIST) {
    isSelect = true;
  } else if (type === CHECKBOX || type === RADIO) {
    isBtn = true;
  }

  return { isSelect, isBtn };
}

class InputButton extends Component {
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
      attr
    } = this.props;

    let checked;

    if (!this.didMount) {
      // register cell info in context state
      registerCellInfo(nameRef, this.initValue, groupName);

      //
      const { isBtn, isSelect } = recognizeCellType(type);
      this.isBtn = isBtn;
      this.isSelect = isSelect;
      this.isInput = !isBtn && !isSelect;
      //
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

    return <CellComponent {...props} />;
  }
}

InputButton.propTypes = propTypes;
InputButton.defaultProps = defaultProps;

// export default InputButton;

export default withContext(InputButton, ValuesConsumer);
