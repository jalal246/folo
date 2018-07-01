import React from 'react';
import PropTypes from 'prop-types';

import { ValuesConsumer } from './cell/context';
import { Grid } from './grid';

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
            <Grid>{children}</Grid>
          </FormComponent>
        )}
      </ValuesConsumer>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
