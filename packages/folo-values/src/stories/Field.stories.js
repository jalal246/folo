/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import TextField from "@material-ui/core/TextField";

import Field from "../components/Field";

export default {
  title: "Form Values/Available Field",
  component: Field,
  argTypes: {
    onChange: {
      action: "onChange",
    },
    onBlur: {
      action: "onBlur",
    },
  },
};

const Template = (args) => <Field {...args} />;

export const DefaultInput = Template.bind({});

export const TextInput = Template.bind({});
TextInput.args = {
  type: "text",
  value: "Initial Value",
};

export const EmailInputWithCustomComponent = Template.bind({});
EmailInputWithCustomComponent.args = {
  type: "email",
  component: TextField,
  label: "Name",
  margin: "normal",
};

export const PasswordInputWithHandlers = Template.bind({});
PasswordInputWithHandlers.args = {
  type: "password",
  // onBlur:{action("onBlur")}
};

export const RadioButtonInput = Template.bind({});
RadioButtonInput.args = {
  type: "radio",
  groupName: "choices",
};

export const CheckboxInput = Template.bind({});
CheckboxInput.args = {
  type: "checkbox",
};

export const ColorInput = Template.bind({});
ColorInput.args = {
  type: "color",
};

export const DateInput = Template.bind({});
DateInput.args = {
  type: "date",
};

export const SelectOpts = Template.bind({});
SelectOpts.args = {
  type: "select",
  children: (
    <>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </>
  ),
};
