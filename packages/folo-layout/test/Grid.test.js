import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import Grid from "../src/components/Grid";

const TEST_ID = "testForGrid";

const DEFAULT_DISPLAY = "grid";
const STRETCH = "stretch";
const DEFAULT_GAP = "1em";
const SPACE_BETWEEN = "space-between";
const AUTO_FIT = "auto-fit";
const CENTER = "center";

const MyGrid = (props = {}) => (
  <Grid data-testid={TEST_ID} {...props}>
    <div />
  </Grid>
);

describe("Grid - Explicit Layout", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Testing Style", () => {
    it("Returns default style", () => {
      render(<MyGrid />);

      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns default style", () => {
      const DISPLAY_INLINE = "inline-grid";
      render(<MyGrid style={{ display: DISPLAY_INLINE }} />);

      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_INLINE,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("Testing alignItems", () => {
    it("Returns alignItems justifyContent center when no columns passed", () => {
      render(<MyGrid isCenter />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: CENTER,
        justifyContent: CENTER,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns alignItems center and justifyContent when columns passed", () => {
      render(<MyGrid isCenter col={1} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: "repeat(1, minmax(auto, 1fr))",
        alignItems: CENTER,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("Testing rows", () => {
    it("Returns gridTemplateRows when passing row with minmax", () => {
      render(<MyGrid row={1} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        gridTemplateRows: "repeat(1, minmax(auto, 1fr))",
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns gridTemplateRows when passing row with width", () => {
      render(<MyGrid row={1} rowWidth="20px" />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        gridTemplateRows: "repeat(1, 20px)",
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns gridAutoRows when passing rowWidth only", () => {
      render(<MyGrid rowWidth="20px" />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        gridAutoRows: "20px",
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("Testing columns", () => {
    it("Returns gridAutoColumns when passing colWidth only", () => {
      render(<MyGrid colWidth="20px" />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridAutoColumns: "20px",
        alignItems: STRETCH,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns gridTemplateColumns when passing col", () => {
      render(<MyGrid col={4} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: "repeat(4, minmax(auto, 1fr))",
        alignItems: STRETCH,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns gridTemplateColumns when passing colWidth and col", () => {
      render(<MyGrid col={4} colWidth="20px" />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: "repeat(4, 20px)",
        alignItems: STRETCH,
        justifyContent: SPACE_BETWEEN,
        gap: DEFAULT_GAP,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });
});
