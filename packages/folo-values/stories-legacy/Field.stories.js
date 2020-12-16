import { Field } from "../src";

export default {
  title: "Example/Button",
  component: Field,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Field {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  type: "text",
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: "password",
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  type: "email",
};

export const RadioButtonInput = Template.bind({});
RadioButtonInput.args = {
  type: "radio",
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
