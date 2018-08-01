import React from 'react';
import PropTypes from 'prop-types';

import { ValuesConsumer } from './cell/context';

const propTypes = {
  component: PropTypes.node,
  // onClick: PropTypes.func,
  onSubmit: PropTypes.func
};
const defaultProps = {
  component: 'form',
  // onClick: null,
  onSubmit: null
};

class Form extends React.PureComponent {
  render() {
    const {
      component: FormComponent,
      onSubmit,
      // eslint-disable-next-line
      children,
      ...other
    } = this.props;
    return (
      <ValuesConsumer>
        {({ cn: { onSubmitBtnClick } }) => (
          <FormComponent
            onSubmit={e => (onSubmit ? onSubmitBtnClick(e, onSubmit) : null)}
            {...other}
          >
            {children}
          </FormComponent>
        )}
      </ValuesConsumer>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
