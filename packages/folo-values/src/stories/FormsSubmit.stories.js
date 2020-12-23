/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import Form from "../components/Form";

import BasicForm from "./examples/BasicForm";
import AddressForm from "./examples/AddressForm";

export default {
  title: "Forms/Forms with Submit",
  component: Form,
  argTypes: {
    onSubmit: {
      action: "onSubmit",
    },
  },
};

export const SimpleForm = (args) => <BasicForm {...args} />;

export const CustomComponents = (args) => <AddressForm {...args} />;
