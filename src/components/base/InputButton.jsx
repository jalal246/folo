import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BTN } from '../../constants';

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

class InputButton extends Component {
  constructor(props) {
    super(props);

    this.firstMount = true;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.firstMount = false;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.bindingValue !== this.props.bindingValue;
  }

  handleChange({ target: { checked } }) {
    const { nameRef, groupName, updateCellValue } = this.props;
    updateCellValue(nameRef, checked, BTN, groupName);
  }

  render() {
    console.log('button update');

    const {
      component: CellComponent,
      type,
      initValue,
      bindingValue,
      attr
    } = this.props;

    return (
      <CellComponent
        type={type}
        checked={this.firstMount ? initValue : bindingValue}
        onChange={this.handleChange}
        {...attr}
      />
    );
  }
}

InputButton.propTypes = propTypes;
InputButton.defaultProps = defaultProps;

export default InputButton;
