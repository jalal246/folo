import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { number, text } from "@storybook/addon-knobs";

import MAIN_APP from "./directories";

import Folio, { Form, Grid, GridItem, Cell } from "../../src";

storiesOf(`${MAIN_APP}/measurements`, module)
  .add("fixed width with explicit", () => (
    <Folio>
      <Form
        onSubmit={action("onSubmit")}
        style={{
          width: "20%",
          padding: "15px",
          backgroundColor: "cornsilk"
        }}
      >
        <Grid row={3} col={1} rowWidth="20px" colWidth="220px">
          <Cell placeholder="20px X 220px" />
          <Cell placeholder="20px X 220px" />
          <Cell placeholder="20px X 220px" />
        </Grid>
      </Form>
    </Folio>
  ))
  .add("fixed width no explicit", () => (
    <Folio>
      <Form onSubmit={action("onSubmit")}>
        <Grid rowWidth="90px" colWidth="320px">
          <Cell placeholder="90px X 320px" />
          <Cell placeholder="90px X 320px" />
        </Grid>
      </Form>
    </Folio>
  ))
  .add("custom for each GridItem", () => (
    <Folio>
      <Form onSubmit={action("onSubmit")}>
        <Grid
          rowWidth="90px"
          colWidth="320px"
          style={{ backgroundColor: "red", justifyContent: "space-around" }}
        >
          <GridItem
            isCenter
            style={{ backgroundColor: "blue" }}
            col={1}
            row={1}
            toRow={4}
          />
          <GridItem
            isCenter
            style={{ backgroundColor: "orange" }}
            col={3}
            row={1}
            toRow={2}
          />
          <GridItem
            isCenter
            style={{ backgroundColor: "pink" }}
            col={2}
            row={3}
            toRow={5}
          />
        </Grid>
      </Form>
    </Folio>
  ));
