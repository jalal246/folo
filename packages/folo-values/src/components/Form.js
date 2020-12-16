import React from "react";
import { ValuesProvider } from "./context/ValuesContext";

const PureForm = ({
  component: FormComponent = "form",
  onSubmit: onSubmitProps,
  children,
  ...rest
}) => {
  function onSubmit(e) {
    e.preventDefault();

    if (typeof onSubmitProps === "function") {
      const { getContextValues } = React.useContext();
      onSubmitProps(e, getContextValues());
    }
  }

  return (
    <FormComponent onSubmit={onSubmit} {...rest}>
      {children}
    </FormComponent>
  );
};

const Form = (props) => {
  return (
    <ValuesProvider>
      <PureForm props={props} />
    </ValuesProvider>
  );
};

export default Form;
