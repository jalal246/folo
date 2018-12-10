import React from "react";

import { storiesOf } from "@storybook/react";

import { MAIN_APP, GRID_IMPLICIT } from "./_directories";

import { FolioLayout, Grid, GridItem } from "../src";

const styleLabel = {
  backgroundColor: "red",
  color: "#fff",
  padding: "10px",
  fontSize: "100%"
};

storiesOf(`${MAIN_APP}/${GRID_IMPLICIT}: Using GridItem component`, module)
  .add("creating friendly ladder", () => (
    <FolioLayout>
      <Grid
        style={{
          backgroundColor: "navajowhite"
        }}
      >
        <GridItem col={1} row={1} style={styleLabel}>
          item
        </GridItem>
        {/* next one will be prev + 1 */}
        <GridItem col={2} style={styleLabel}>
          item
        </GridItem>
        <GridItem col={3} row={3} style={styleLabel}>
          item
        </GridItem>
        <GridItem col={4} row={4} style={styleLabel}>
          item
        </GridItem>
        <GridItem col={5} row={5} style={styleLabel}>
          item
        </GridItem>
      </Grid>
    </FolioLayout>
  ))
  .add("doing some art here", () => (
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
