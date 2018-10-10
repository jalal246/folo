import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import MAIN_APP from "./directories";

import Folio, { Form, Grid, Cell } from "../../src";

storiesOf(`${MAIN_APP}/nested`, module)
  .add("basic", () => (
    <Folio>
      <Grid isCenter colMinWidth="50%" colMaxWidth="60%">
        <Grid isCenter>
          <h1>LOGIN</h1>
        </Grid>

        <Form
          onSubmit={action("onSubmit")}
          style={{
            backgroundColor: "whitesmoke"
          }}
        >
          <Grid>
            <Cell />
            <Cell />
          </Grid>

          <Grid isCenter style={{ paddingTop: "10px" }} colMaxWidth="40%">
            <button type="submit">login</button>
          </Grid>
        </Form>
      </Grid>
    </Folio>
  ))
  .add("more nested grid", () => (
    <Folio>
      <Form
        onSubmit={action("onSubmit")}
        style={{
          width: "50%",
          backgroundColor: "whitesmoke",
          padding: "5px"
        }}
      >
        <Grid isCenter>
          <Grid style={{ backgroundColor: "#ddd", padding: "5px" }}>
            <Grid col={3}>
              <Cell placeHolder="1" />
              <Cell placeHolder="2" />
              <Cell placeHolder="3" />
            </Grid>
          </Grid>

          <Grid
            style={{ backgroundColor: "#ddd", padding: "5px" }}
            col={2}
            row={2}
          >
            <Cell placeHolder="1" />
            <Cell placeHolder="2" />
            <Cell placeHolder="3" />
            <Cell placeHolder="4" />
          </Grid>

          <Grid style={{ backgroundColor: "#ddd", padding: "5px" }}>
            <Cell placeHolder="1" />
            <Cell placeHolder="2" />
          </Grid>
        </Grid>

        <Grid col={3} style={{ padding: "5px" }}>
          <div />
          <div />

          <button type="submit">login</button>
        </Grid>
      </Form>
    </Folio>
  ));
