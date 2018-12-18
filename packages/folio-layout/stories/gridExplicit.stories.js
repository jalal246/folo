import React from "react";

import { storiesOf } from "@storybook/react";
import { text, number } from "@storybook/addon-knobs";

import { MAIN_APP, GRID_EXPLICIT } from "./_directories";

import { Grid } from "../src";

const styleLabel = {
  backgroundColor: " #444",
  color: "#fff",
  padding: "20px",
  fontSize: "150%"
};

const styleLabel2 = {
  width: "172px",
  height: "81px",
  backgroundColor: " #444",
  color: "#fff",
  padding: "20px",
  fontSize: "150%"
};

storiesOf(`${MAIN_APP}/${GRID_EXPLICIT}: Using Grid component`, module)
  .add("4 columns", () => (
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
  .add("3 rows and 3 columns", () => (
    <Grid
      style={{
        backgroundColor: "navajowhite"
      }}
      col={number("col", 3)}
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
      <div style={styleLabel}>9</div>
    </Grid>
  ))
  .add("minimum widths", () => (
    <Grid
      style={{
        gap: text("gap", "0.3em")
      }}
      col={number("col", 3)}
      row={number("row", 2)}
      rowMinWidth={text("rowMinWidth", "140px")}
      colMinWidth={text("colMinWidth", "300px")}
    >
      <div style={styleLabel2}>1</div>
      <div style={styleLabel2}>2</div>
      <div style={styleLabel2}>3</div>
      <div style={styleLabel2}>4</div>
      <div style={styleLabel2}>5</div>
      <div style={styleLabel2}>6</div>
    </Grid>
  ))
  .add("centered fixed widths", () => (
    <Grid
      style={{
        gap: text("gap", "0")
      }}
      isCenter
      col={number("col", 2)}
      row={number("row", 2)}
      rowWidth={text("rowWidth", "220px")}
      colWidth={text("colWidth", "500px")}
    >
      <div style={styleLabel2}>2</div>
      <div style={styleLabel2}>1</div>
      <div style={styleLabel2}>3</div>
      <div style={styleLabel2}>4</div>
    </Grid>
  ));
