import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Form, Cell, CellItem } from "../src";

const FORM = "form";

/**
 * directory connected with context
 */
const styleLabel = {
  padding: "17px"
};

storiesOf(`${FORM}`, module)
  .add("basic form connected to context", () => (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        background: "beige",
        width: "40%",
        margin: "10px",
        padding: "17px"
      }}
      onSubmit={action("onSubmit")}
    >
      <label style={styleLabel} htmlFor="1">
        type a text:
        <Cell type="text" />
      </label>
      <label style={styleLabel} htmlFor="2">
        choose this checkbox:
        <Cell type="checkbox" groupName="test" />
      </label>
      <label style={styleLabel} htmlFor="2">
        or this checkbox:
        <Cell type="checkbox" groupName="test" />
      </label>
      <label style={styleLabel} htmlFor="3">
        items
        <Cell type="select">
          <CellItem>A</CellItem>
          <CellItem>B</CellItem>
          <CellItem>C</CellItem>
        </Cell>
      </label>
      <button type="submit">submit</button>
    </Form>
  ))
  .add("with more custom attr", () => (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        background: "beige",
        width: "40%",
        margin: "10px",
        padding: "17px"
      }}
      onSubmit={action("onSubmit")}
    >
      <label style={styleLabel}>
        type a text:
        <Cell valueKey="text1" value="someText" type="text" />
      </label>
      <label style={styleLabel}>
        choose this checkbox:
        <Cell valueKey="checkbox1" checked type="checkbox" groupName="test" />
      </label>
      <label style={styleLabel}>
        or this checkbox:
        <Cell valueKey="checkbox2" type="checkbox" groupName="test" />
      </label>
      <label style={styleLabel}>
        items
        <Cell valueKey="itemsGroup" type="select" value="B">
          <CellItem>A</CellItem>
          <CellItem value="B">B</CellItem>
          <CellItem>C</CellItem>
        </Cell>
      </label>
      <button type="submit">submit</button>
    </Form>
  ));
