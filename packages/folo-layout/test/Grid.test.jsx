import React from "react";
import { render, cleanup } from "react-testing-library";

import Grid from "../src/components/Grid";

const TESTID = "testidforGrid";

const DEFAULT_DISPLAY = "grid";
const STRETCH = "stretch";
const DEFAULT_GAP = "1em";
const SPACE_BETWEEN = "space-between";
const AUTO_FIT = "auto-fit";
const CENTER = "center";

const MyGrid = (props = {}) => (
  <Grid data-testid={TESTID} {...props}>
    <div />
  </Grid>
);

afterEach(cleanup);

describe("Grid", () => {
  describe("style", () => {
    it("returns default style", () => {
      const { baseElement, getByTestId } = render(<MyGrid />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns default style", () => {
      const DISPLAY_ENLINE = "inline-grid";
      const { baseElement, getByTestId } = render(
        <MyGrid style={{ display: DISPLAY_ENLINE }} />
      );
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_ENLINE,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("alignItems", () => {
    it("returns alignItems justifyContent center when no columns passed", () => {
      const { baseElement, getByTestId } = render(<MyGrid isCenter />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: CENTER,
        justifyContent: CENTER,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns alignItems center and justifyContent when columns passed", () => {
      const { baseElement, getByTestId } = render(<MyGrid isCenter col={1} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: "repeat(1, minmax(auto, 1fr))",
        alignItems: CENTER,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("rows", () => {
    it("returns gridTemplateRows when passing row with minmax", () => {
      const { baseElement, getByTestId } = render(<MyGrid row={1} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        gridTemplateRows: "repeat(1, minmax(auto, 1fr))",
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns gridTemplateRows when passing row with width", () => {
      const { baseElement, getByTestId } = render(
        <MyGrid row={1} rowWidth="20px" />
      );
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        gridTemplateRows: "repeat(1, 20px)",
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns gridAutoRows when passing rowWidth only", () => {
      const { baseElement, getByTestId } = render(<MyGrid rowWidth="20px" />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        gridAutoRows: "20px",
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("coulmns", () => {
    it("returns gridAutoColumns when passing colWidth only", () => {
      const { baseElement, getByTestId } = render(<MyGrid colWidth="20px" />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridAutoColumns: "20px",
        alignItems: STRETCH,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns gridTemplateColumns when passing col", () => {
      const { baseElement, getByTestId } = render(<MyGrid col={4} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: "repeat(4, minmax(auto, 1fr))",
        alignItems: STRETCH,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns gridTemplateColumns when passing colWidth and col", () => {
      const { baseElement, getByTestId } = render(
        <MyGrid col={4} colWidth="20px" />
      );
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: "repeat(4, 20px)",
        alignItems: STRETCH,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });
});
