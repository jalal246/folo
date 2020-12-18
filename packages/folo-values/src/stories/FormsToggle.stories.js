import React from "react";

import Field from "../components/Field";
import Form from "../components/Form";

export default {
  title: "Forms/Toggle group",
  component: Form,
  onSubmit: {
    action: "onSubmit",
  },
};

export const GroupToggleNoInitValue = () => (
  <Form>
    <Field type="radio" id="1" groupName="test" />
    <Field type="radio" id="2" groupName="test" />
    <Field type="radio" id="3" groupName="test" />
  </Form>
);

export const GroupToggleWithInitValue = () => (
  <Form>
    <Field type="radio" id="1" groupName="test" initValue />
    <Field type="radio" id="2" groupName="test" />
    <Field type="radio" id="3" groupName="test" />
  </Form>
);

export const GroupToggleDifferentGroupName = () => (
  <Form>
    <Field type="radio" id="1" groupName="testA" initValue />
    <Field type="radio" id="2" groupName="testA" />
    <Field type="radio" id="3" groupName="testB" initValue />
    <Field type="radio" id="4" groupName="testB" />
  </Form>
);
