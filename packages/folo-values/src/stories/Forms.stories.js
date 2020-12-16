import React from "react";

import Field from "../components/Field";
import Form from "../components/Form";

export default {
  title: "Forms/Basic Forms",
  component: Form,
  argTypes: {
    onChange: {
      action: "onChange",
    },
    onBlur: {
      action: "onBlur",
    },
  },
};

const Template = () => (
  <Form>
    <Field type="radio" id="1" groupName="test" />
    <Field type="radio" id="2" groupName="test" />
    <Field type="radio" id="3" groupName="test" />
  </Form>
);

export const GroupToggle = Template.bind({});
