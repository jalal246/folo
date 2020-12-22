import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import GridItem from "../src/components/GridItem";

const TEST_ID = "testForGrid";

const CENTER = "center";
const ROW = "row";
const COLUMN = "column";
const DISPLAY_FLEX = "flex";
const SPACE_BETWEEN = "space-between";
const STRETCH = "stretch";

const MyGridItem = (props = {}) => (
  <GridItem data-testid={TEST_ID} {...props} />
);

describe("GridItem - Implicit Layout", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Testing Style", () => {
    it("Returns default style", () => {
      render(<MyGridItem />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        // gridRow: "0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns flexDirection column when it is isHorizontal = false", () => {
      render(<MyGridItem isHorizontal={false} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: STRETCH,
        flexDirection: COLUMN,
        // gridRow: "0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Overrides styles", () => {
      render(
        <MyGridItem
          style={{
            flexDirection: COLUMN,
            alignItems: STRETCH,
          }}
        />
      );
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: STRETCH,
        flexDirection: COLUMN,
        // gridRow: "0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns center", () => {
      render(<MyGridItem isCenter />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        // gridRow: "0",
        gridColumn: "0",
        justifyContent: CENTER,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("Testing gridRow", () => {
    it("Returns gridRow with toRow and alignItems center", () => {
      render(<MyGridItem toRow={6} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        // gridRow: "0 / 6",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns gridRow with toRow =0", () => {
      render(<MyGridItem toRow={0} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        // gridRow: "0 / 0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns gridRow with toRow =0", () => {
      render(<MyGridItem toRow={0} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        // gridRow: "0 / 0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("Testing gridColumn", () => {
    it("Returns column position with when col is provided", () => {
      render(<MyGridItem col={10} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        // gridRow: "0",
        gridColumn: "10",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("Returns column position with justifyContent, when toCol is provided", () => {
      render(<MyGridItem toCol={10} />);
      const { baseElement, style } = screen.getByTestId(TEST_ID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        // gridRow: "0",
        gridColumn: "0 / 10",
        justifyContent: SPACE_BETWEEN,
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });
});
