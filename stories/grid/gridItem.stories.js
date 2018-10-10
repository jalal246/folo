import React from "react";

import { storiesOf } from "@storybook/react";
// import { number, text } from "@storybook/addon-knobs";
import { GRID, GRID_IMPLICIT } from "./directories";

import { Grid, GridItem } from "../../src/components/grid";
import { GridProvider } from "../../src/components/grid/context";

const styleLabel = {
  backgroundColor: "red",
  color: "#fff",
  padding: "10px",
  fontSize: "100%"
};

storiesOf(`${GRID}/${GRID_IMPLICIT}: Using GridItem component`, module).add(
  "default",
  () => (
    <GridProvider>
      <Grid
        style={{
          backgroundColor: "navajowhite"
        }}
      >
        <GridItem col={4} row={1} style={styleLabel}>
          item
        </GridItem>
        {/* next one will be prev + 1 */}
        <GridItem col={3} style={styleLabel}>
          item
        </GridItem>
        <GridItem col={2} row={3} style={styleLabel}>
          item
        </GridItem>
        <GridItem col={1} row={5} style={styleLabel}>
          item
        </GridItem>
        <GridItem col={4} row={10} style={styleLabel}>
          item
        </GridItem>
      </Grid>
    </GridProvider>
  )
);
