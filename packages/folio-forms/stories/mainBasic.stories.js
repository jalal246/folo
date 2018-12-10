import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { MAIN_APP, BASIC } from "./_directories";

import { Folio, Form, Grid, Cell, CellItem } from "../src";

storiesOf(`${MAIN_APP}/${BASIC}`, module)
  .add("form with auto-grid", () => (
    <Folio>
      <Form
        onSubmit={action("onSubmit")}
        style={{
          width: "60%",
          padding: "15px",
          backgroundColor: "cornsilk"
        }}
      >
        <Grid>
          <Cell valueKey="name" type="text" placeHolder="names goes here" />
          <Cell valueKey="email" type="email" placeHolder="your email" />
          <label>
            single?
            <Cell valueKey="isSingle" type="checkbox" />
          </label>
          <label>
            <Cell valueKey="city" type="list">
              <CellItem>ABC</CellItem>
              <CellItem>DEF</CellItem>
            </Cell>
          </label>
          <button
            style={{
              width: "50%",
              margin: "0 auto"
            }}
            type="submit"
          >
            submit
          </button>
        </Grid>
      </Form>
    </Folio>
  ))
  .add("form with explicit grid", () => (
    <Folio>
      <Form
        onSubmit={action("onSubmit")}
        style={{
          width: "50%",
          backgroundColor: "whitesmoke",
          padding: "5px"
        }}
      >
        <Grid
          row={1}
          rowMinWidth="30px"
          col={2}
          colMinWidth="30%"
          colMaxWidth="70%"
        >
          <Cell valueKey="username" type="text" placeHolder="username" />
          <Cell valueKey="pass" type="password" placeHolder="password" />
        </Grid>
        <button
          style={{
            display: "block",
            width: "50%",
            margin: "15px auto"
          }}
          type="submit"
        >
          login
        </button>
      </Form>
    </Folio>
  ));
