import React from "react";

import registry from "../valuesStore";

const Form = ({
  component: FormComponent = "form",
  onSubmit: onSubmitProps,
  storeID,
  children,
  ...rest
}) => {
  function onSubmit(e) {
    e.preventDefault();

    if (typeof onSubmitProps === "function") {
      onSubmitProps(e, registry.getAll(storeID));
    }
  }

  return (
    <FormComponent onSubmit={onSubmit} {...rest}>
      {children}
    </FormComponent>
  );
};

export default Form;
