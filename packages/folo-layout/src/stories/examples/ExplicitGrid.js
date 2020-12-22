import React from "react";

import Grid from "../../components/Grid";

const styleLabel = {
  backgroundColor: " #444",
  color: "#fff",
  padding: "20px",
  fontSize: "150%",
};

export const FourColumns = () => (
  <Grid
    style={{
      backgroundColor: "navajowhite",
    }}
    col={4}
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
);

export const ThreeColumnsThreeRows = () => (
  <Grid
    style={{
      backgroundColor: "navajowhite",
    }}
    col={3}
    row={3}
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
);

const styleLabel2 = {
  width: "172px",
  height: "81px",
  backgroundColor: " #444",
  color: "#fff",
  padding: "20px",
  fontSize: "150%",
};

export const MinimumWidth = () => (
  <Grid
    style={{
      gap: "0.3em",
    }}
    col={3}
    row={2}
    rowMinWid
    th="140px"
    colMinWidth="300px"
  >
    <div style={styleLabel2}>1</div>
    <div style={styleLabel2}>2</div>
    <div style={styleLabel2}>3</div>
    <div style={styleLabel2}>4</div>
    <div style={styleLabel2}>5</div>
    <div style={styleLabel2}>6</div>
  </Grid>
);

export const CenterWithFixedWidth = () => (
  <Grid
    style={{
      gap: 0,
    }}
    isCenter
    col={2}
    row={2}
    rowWidth="220px"
    colWidth="500px"
  >
    <div style={styleLabel2}>2</div>
    <div style={styleLabel2}>1</div>
    <div style={styleLabel2}>3</div>
    <div style={styleLabel2}>4</div>
  </Grid>
);
