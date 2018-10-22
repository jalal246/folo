import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Folio, { Form, Grid, Cell, CellItem, GridItem } from "../src";

/**
 * directory connected with context
 */
const styleLabel = {
  padding: "17px"
};

// eslint-desabled-next-line
const Label = ({ children }) => <label style={styleLabel}>{children}</label>;

storiesOf(`example`, module).add("default", () => (
  <Folio>
    <Form
      style={{
        background: "beige"
      }}
      onSubmit={action("onSubmit")}
    >
      <Grid>
        <GridItem col={1} row={1}>
          <Label>
            type a text:
            <Cell valueKey="text1" value="someText" type="text" />
          </Label>
        </GridItem>
        <GridItem col={2} row={1}>
          <Label>
            another a text:
            <Cell valueKey="text2" value="anotherText" type="text" />
          </Label>
        </GridItem>
        <GridItem col={1} row={3}>
          <Label>
            choose this checkbox:
            <Cell
              valueKey="checkbox1"
              checked
              type="checkbox"
              groupName="test"
            />
          </Label>
        </GridItem>
        <GridItem col={2} row={3}>
          <Label>
            or this checkbox:
            <Cell valueKey="checkbox2" type="checkbox" groupName="test" />
          </Label>
        </GridItem>
        <GridItem col={1} row={4}>
          <Label>
            items
            <Cell valueKey="itemsGroup" type="select" value="B">
              <CellItem>A</CellItem>
              <CellItem value="B">B</CellItem>
              <CellItem>C</CellItem>
            </Cell>
          </Label>
        </GridItem>
        <GridItem isCenter col={1} toCol={3}>
          <button type="submit">submit</button>
        </GridItem>
      </Grid>
    </Form>
  </Folio>
));
