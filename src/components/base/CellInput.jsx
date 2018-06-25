/* eslint func-names: ["error", "never"] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { INPUT } from '../../constants';

const propTypes = {
  updateCellValue: PropTypes.func.isRequired,
  initValue: PropTypes.string,
  component: PropTypes.node,
  nameRef: PropTypes.string.isRequired,
  attr: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string)
    ])
  )
};

const defaultProps = {
  initValue: '',
  component: 'input',
  attr: null
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { tempValue: props.initValue };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.tempValue !== this.state.tempValue;
  }

  handleChange({ target: { value } }) {
    this.setState({ tempValue: value });
  }

  handleBlur({ target: { value } }) {
    const { nameRef, updateCellValue } = this.props;

    updateCellValue(nameRef, value, INPUT, undefined);
  }

  render() {
    console.log('input update');

    const { component: CellComponent, type, attr } = this.props;
    const { tempValue } = this.state;
    return (
      <CellComponent
        value={tempValue}
        type={type}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        {...attr}
      />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
