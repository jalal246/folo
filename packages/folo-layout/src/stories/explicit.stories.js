import React from "react";

import Grid from "../components/Grid";

import {
  FourColumnsProps,
  ThreeColumnsThreeRowsProps,
  MinimumWidthProps,
  CenterWithFixedWidthProps,
} from "./examples/ExplicitGrid";

export default {
  title: "Grid Layout/Explicit Layout",
  component: Grid,
};

export const FourColumns = (args) => <FourColumnsProps {...args} />;
FourColumns.arg = {
  col: 4,
};

export const ThreeColumnsThreeRows = (args) => (
  <ThreeColumnsThreeRowsProps {...args} />
);
ThreeColumnsThreeRows.arg = {
  col: 3,
  row: 4,
};

export const MinimumWidth = (args) => <MinimumWidthProps {...args} />;
MinimumWidth.args = {
  gap: "0.3em",
  col: 3,
  row: 2,
  rowMinWid: "140px",
  colMinWidth: "300px",
};

export const CenterWithFixedWidth = (args) => (
  <CenterWithFixedWidthProps {...args} />
);
CenterWithFixedWidth.args = {
  gap: 0,
  isCenter: true,
  col: 2,
  row: 2,
  rowWidth: "220px",
  colWidth: "500px",
};
