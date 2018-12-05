import React from "react";

import { storiesOf } from "@storybook/react";

import { MAIN_APP } from "./directories";

import { FolioLayout, Grid } from "../src";

storiesOf(`${MAIN_APP}/nested`, module)
  .add("basic", () => (
    <FolioLayout>
      <Grid isCenter colMinWidth="50%" colMaxWidth="60%">
        <Grid isCenter>
          <h1>LOGIN</h1>
        </Grid>

        <Grid>
          <div />
        </Grid>

        <Grid isCenter style={{ paddingTop: "10px" }} colMaxWidth="40%">
          <button type="submit">login</button>
        </Grid>
      </Grid>
    </FolioLayout>
  ))
  .add("more nested grid", () => (
    <FolioLayout>
      <Grid isCenter>
        <Grid style={{ backgroundColor: "#ddd", padding: "5px" }}>
          <Grid col={3}>
            <div />
          </Grid>
        </Grid>

        <Grid
          style={{ backgroundColor: "#ddd", padding: "5px" }}
          col={2}
          row={2}
        >
          <div />
        </Grid>

        <Grid style={{ backgroundColor: "#ddd", padding: "5px" }}>
          <div />
        </Grid>
      </Grid>

      <Grid col={3} style={{ padding: "5px" }}>
        <div />
        <div />

        <button type="submit">login</button>
      </Grid>
    </FolioLayout>
  ));
