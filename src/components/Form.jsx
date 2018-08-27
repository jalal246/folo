import React from "react";
import PropTypes from "prop-types";

import { ValuesConsumer } from "./cell/context";
import withContext from "./withContext";

const propTypes = {
  component: PropTypes.node,
  onSubmit: PropTypes.func,
  getContextValues: PropTypes.func
};
const defaultProps = {
  component: "form",
  onSubmit() {},
  getContextValues() {}
};

class Form extends React.PureComponent {
  onSubmit = e => {
    e.preventDefault();
    const { getContextValues, onSubmit } = this.props;
    onSubmit(e, getContextValues());
  };

  render() {
    const {
      component: FormComponent,
      onSubmit,
      getContextValues,
      // eslint-disable-next-line
      children,
      ...other
    } = this.props;
    return (
      <FormComponent onSubmit={this.onSubmit} {...other}>
        {children}
      </FormComponent>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export { Form as PureForm };

export default withContext({
  Component: Form,
  Consumer: ValuesConsumer,
  contextProps: ["getContextValues"]
});
