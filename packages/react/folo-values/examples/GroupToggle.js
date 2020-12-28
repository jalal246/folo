import React from "react";

import Field from "../src/components/Field";
import Form from "../src/components/Form";

export const GroupToggleNoInitValue = () => (
  <Form storeID="GroupToggleNoInitValue">
    <Field
      storeID="GroupToggleNoInitValue"
      type="radio"
      id="1"
      groupName="test"
    />
    <Field
      storeID="GroupToggleNoInitValue"
      type="radio"
      id="2"
      groupName="test"
    />
    <Field
      storeID="GroupToggleNoInitValue"
      type="radio"
      id="3"
      groupName="test"
    />
  </Form>
);

export const GroupToggleWithInitValue = () => (
  <Form storeID="GroupToggleWithInitValue">
    <Field
      storeID="GroupToggleWithInitValue"
      type="radio"
      id="1"
      groupName="test"
      checked
    />
    <Field
      storeID="GroupToggleWithInitValue"
      type="radio"
      id="2"
      groupName="test"
    />
    <Field
      storeID="GroupToggleWithInitValue"
      type="radio"
      id="3"
      groupName="test"
    />
  </Form>
);

export const GroupToggleDifferentGroupName = () => (
  <Form storeID="GroupToggleDifferentGroupName">
    <Field
      storeID="GroupToggleDifferentGroupName"
      type="radio"
      id="1"
      groupName="testA"
      checked
    />
    <Field
      storeID="GroupToggleDifferentGroupName"
      type="radio"
      id="2"
      groupName="testA"
    />
    <Field
      storeID="GroupToggleDifferentGroupName"
      type="radio"
      id="3"
      groupName="testB"
      checked
    />
    <Field
      storeID="GroupToggleDifferentGroupName"
      type="radio"
      id="4"
      groupName="testB"
    />
  </Form>
);
