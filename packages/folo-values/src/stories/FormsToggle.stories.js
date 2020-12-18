import React from "react";

import Field from "../components/Field";
import Form from "../components/Form";

export default {
  title: "Forms/Toggle",
  component: Form,
  onSubmit: {
    action: "onSubmit",
  },
};

const Template = ({ storeID, groupName1, groupName2, initValue }) => (
  <Form storeID={storeID}>
    <Field
      storeID={storeID}
      type="radio"
      id="1"
      groupName={groupName1}
      initValue={initValue}
    />
    <Field storeID={storeID} type="radio" id="2" groupName={groupName1} />
    <Field storeID={storeID} type="radio" id="3" groupName={groupName2} />
    <Field storeID={storeID} type="radio" id="3" groupName={groupName2} />
  </Form>
);

export const GroupToggleNoInitValue = Template.bind({});
GroupToggleNoInitValue.args = {
  storeID: "GroupToggleNoInitValue",
  groupName: "test",
};

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
