import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SELECT } from '../../constants';

const propTypes = {
  nameRef: PropTypes.string.isRequired,
  attr: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      PropTypes.objectOf(PropTypes.string)
    ])
  ).isRequired,

  component: PropTypes.node
};

const defaultProps = {
  component: 'select'
};

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { tempValue: props.initValue };

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.tempValue !== this.state.tempValue;
  }

  handleChange({ target: { value } }) {
    const { nameRef, updateCellValue } = this.props;
    this.setState({ tempValue: value });
    updateCellValue(nameRef, value, SELECT, undefined);
  }

  render() {
    console.log('select update');

    const { handleChange } = this;
    const { tempValue } = this.state;

    const {
      component: CellComponent,
      children,
      attr: { id, ...rest }
    } = this.props;
    return (
      <CellComponent
        onChange={handleChange}
        value={tempValue}
        id={id}
        {...rest}
      >
        {children}
      </CellComponent>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
