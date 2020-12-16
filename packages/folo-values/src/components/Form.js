import React from "react";

import registry from "../valuesStore";

const Form = ({
  component: FormComponent = "form",
  onSubmit: onSubmitProps,
  children,
  ...rest
}) => {
  function onSubmit(e) {
    e.preventDefault();
    console.log("file: Form.js ~ line 12 ~ e", registry.getAll());

    if (typeof onSubmitProps === "function") {
      onSubmitProps(e, registry.getAll());
    }
  }

  return (
    <FormComponent onSubmit={onSubmit} {...rest}>
      {children}
    </FormComponent>
  );
};

export default Form;
