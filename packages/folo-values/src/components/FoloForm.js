import React from "react";
import { ValuesProvider } from "./context/ValuesContext";

const Form = ({
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

const FoloForm = (props) => {
  return (
    <ValuesProvider>
      <Form props={props} />
    </ValuesProvider>
  );
};

export default FoloForm;
