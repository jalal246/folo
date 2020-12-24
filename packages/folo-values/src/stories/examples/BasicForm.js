/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import Field from "../../components/Field";
import Form from "../../components/Form";

const styleForm = {
  display: "flex",
  flexDirection: "column",
  background: "#d4e2d4",
  width: "40%",
  margin: "10px",
  padding: "17px",
};

const styleLabel = {
  marginTop: "20px",
  fontSize: "18px",
};

const styleText = {
  paddingRight: "10px",
};

const BasicForm = ({ onSubmit }) => (
  <Form style={styleForm} onSubmit={onSubmit} storeID="BasicForm">
    <label style={styleLabel}>
      <span style={styleText}>Type a text:</span>
      <Field
        storeID="BasicForm"
        valueKey="textInput"
        type="text"
        placeholder="start typing..."
      />
    </label>
    <label style={styleLabel}>
      <span style={styleText}>Choose this checkbox:</span>
      <Field
        storeID="BasicForm"
        valueKey="checkbox1"
        type="checkbox"
        groupName="test"
      />
    </label>
    <label style={styleLabel}>
      <span style={styleText}>Or this one:</span>
      <Field
        storeID="BasicForm"
        valueKey="checkbox2"
        type="checkbox"
        groupName="test"
        checked
      />
    </label>
    <label style={styleLabel}>
      <span style={styleText}>Choose your items</span>
      <Field storeID="BasicForm" valueKey="options" type="select">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </Field>
    </label>
    <button style={styleLabel} type="submit">
      submit
    </button>
  </Form>
);

export default BasicForm;
