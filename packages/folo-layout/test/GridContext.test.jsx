import React from "react";
import { render, cleanup } from "react-testing-library";

import { FoloLayout, GridItem, Grid } from "../src";

const TESTID_1 = "testidforGrid1";

const MyApp = () => (
  <FoloLayout>
    <Grid>
      <GridItem data-testid={TESTID_1} toRow={2} />
    </Grid>
  </FoloLayout>
);

afterEach(cleanup);

describe("Grid with context", () => {
  it("whatever", () => {
    const { getByTestId } = render(<MyApp />);
    const { style } = getByTestId(TESTID_1);

    expect(style).toMatchObject({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gridRow: "1 / 2",
      gridColumn: "0"
    });
  });
});
