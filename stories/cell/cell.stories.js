import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TextField from "@material-ui/core/TextField";

import { Cell, CellItem } from "../../src/components/cell";
import { PureCell } from "../../src/components/cell/Cell";
import { ValuesProvider } from "../../src/components/cell/context";

const CELL = "Cell";

const PURE_CELL = "PureCell";
const TYPE = "type";

const CONTEXT = "context";

/**
 * directory for PureCell
 */
storiesOf(`${CELL}/${PURE_CELL}`, module)
  .add("default", () => <PureCell />)
  .add("with init value", () => <PureCell value="Hi there!" />)
  .add("with button type and groupName", () => (
    <PureCell checked type="radio" groupName="gender" />
  ))
  .add("with component", () => (
    <PureCell component={TextField} label="Name" margin="normal" />
  ))
  .add("with handlers", () => (
    <PureCell onChange={action("onChange")} onBlur={action("onBlur")} />
  ))
  .add("with items", () => (
    <PureCell type="select">
      <CellItem>A</CellItem>
      <CellItem>B</CellItem>
      <CellItem>C</CellItem>
    </PureCell>
  ));

/**
 * directory for types
 */
storiesOf(`${CELL}/${PURE_CELL}/${TYPE}`, module)
  .add("text", () => <PureCell type="text" />)
  .add("password", () => <PureCell type="password" />)
  .add("email", () => <PureCell type="email" />)
  .add("radio", () => <PureCell type="radio" />)
  .add("checkbox", () => <PureCell type="checkbox" />)
  .add("color", () => <PureCell type="color" />)
  .add("date", () => <PureCell type="date" />);

/**
 * directory connected with context
 */

storiesOf(`${CELL}/${CONTEXT}`, module)
  .add("group toggle", () => (
    <ValuesProvider>
      <Cell type="radio" id="1" groupName="test" />
      <Cell type="radio" id="2" groupName="test" />
      <Cell type="radio" id="3" groupName="test" />
    </ValuesProvider>
  ))
  .add("another way of toggling", () => (
    <ValuesProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <label htmlFor="1">
          grouped:
          <Cell type="checkbox" id="1" groupName="test" />
        </label>
        <label htmlFor="2">
          grouped:
          <Cell type="checkbox" id="2" groupName="test" />
        </label>
        <label htmlFor="3">
          not grouped:
          <Cell type="checkbox" id="3" />
        </label>
      </div>
    </ValuesProvider>
  ));
