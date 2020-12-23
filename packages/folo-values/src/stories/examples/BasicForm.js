/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import Field from "../../components/Field";
import Form from "../../components/Form";

const styleForm = {
  display: "flex",
  flexDirection: "column",
  background: "beige",
  width: "40%",
  margin: "10px",
  padding: "17px",
};

const styleLabel = {
  padding: "17px",
};

const BasicForm = ({ onSubmit }) => (
  <Form style={styleForm} onSubmit={onSubmit}>
    type a text:
    <Field valueKey="textInput" type="text" placeholder="start typing..." />
    choose this checkbox:
    <Field valueKey="checkbox1" type="checkbox" groupName="test" />
    or this checkbox:
    <Field valueKey="checkbox2" type="checkbox" groupName="test" checked />
    <label style={styleLabel}>
      items
      <Field valueKey="options" type="select">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Field>
    </label>
    <button type="submit">submit</button>
  </Form>
);

export default BasicForm;
