import React from "react";

import { storiesOf } from "@storybook/react";
import { text, number } from "@storybook/addon-knobs";
import { GRID, GRID_EXPLICIT } from "./directories";
import { Grid } from "../src";

const styleLabel = {
  backgroundColor: " #444",
  color: "#fff",
  padding: "20px",
  fontSize: "150%"
};

storiesOf(`${GRID}/${GRID_EXPLICIT}: Using Grid component`, module)
  .add("columns", () => (
    <Grid
      style={{
        backgroundColor: "navajowhite"
      }}
      col={number("col", 4)}
    >
      <div style={styleLabel}>1</div>
      <div style={styleLabel}>2</div>
      <div style={styleLabel}>3</div>
      <div style={styleLabel}>4</div>
      <div style={styleLabel}>5</div>
      <div style={styleLabel}>6</div>
      <div style={styleLabel}>7</div>
      <div style={styleLabel}>8</div>
    </Grid>
  ))
  .add("rows and columns", () => (
    <Grid
      style={{
        backgroundColor: "navajowhite"
      }}
      col={number("col", 4)}
      row={number("row", 3)}
    >
      <div style={styleLabel}>1</div>
      <div style={styleLabel}>2</div>
      <div style={styleLabel}>3</div>
      <div style={styleLabel}>4</div>
      <div style={styleLabel}>5</div>
      <div style={styleLabel}>6</div>
      <div style={styleLabel}>7</div>
      <div style={styleLabel}>8</div>
    </Grid>
  ))
  .add("widths", () => (
    <Grid
      style={{
        gap: text("gap", "2em")
      }}
      col={number("col", 4)}
      row={number("row", 2)}
      rowMinWidth={text("rowMinWidth", "140px")}
      colMinWidth={text("colMinWidth", "300px")}
    >
      <div style={styleLabel}>1</div>
      <div style={styleLabel}>2</div>
      <div style={styleLabel}>3</div>
      <div style={styleLabel}>4</div>
      <div style={styleLabel}>5</div>
      <div style={styleLabel}>6</div>
      <div style={styleLabel}>7</div>
      <div style={styleLabel}>8</div>
    </Grid>
  ));
