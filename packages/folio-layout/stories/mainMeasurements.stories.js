import React from "react";

import { storiesOf } from "@storybook/react";

// import { number, text } from "@storybook/addon-knobs";

import { MAIN_APP } from "./directories";

import { FolioLayout, Grid, GridItem } from "../src";

storiesOf(`${MAIN_APP}/measurements`, module)
  .add("fixed width with explicit", () => (
    <FolioLayout>
      <Grid row={3} col={1} rowWidth="20px" colWidth="220px">
        <div />
      </Grid>
    </FolioLayout>
  ))
  .add("fixed width no explicit", () => (
    <FolioLayout>
      <Grid rowWidth="90px" colWidth="320px">
        <div />
      </Grid>
    </FolioLayout>
  ))
  .add("custom for each GridItem", () => (
    <FolioLayout>
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
    </FolioLayout>
  ));
