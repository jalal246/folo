import React from "react";
import { render, cleanup } from "react-testing-library";

import { PureGridItem } from "../src/components/GridItem";

const autoPosition = jest.fn(() => 0);

const TESTID = "testidforGridItem";

const CENTER = "center";
const ROW = "row";
const COLUMN = "column";
const DISPLAY_FLEX = "flex";
const SPACE_BETWEEN = "space-between";
const STRETCH = "stretch";

const MyGridItem = (props = {}) => (
  <PureGridItem data-testid={TESTID} autoPosition={autoPosition} {...props} />
);

afterEach(cleanup);

describe("GridItem", () => {
  describe("style", () => {
    it("returns default style", () => {
      const { baseElement, getByTestId } = render(<MyGridItem />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: "0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns flexDirection column when it is isHorizontal = false", () => {
      const { baseElement, getByTestId } = render(
        <MyGridItem isHorizontal={false} />
      );
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: STRETCH,
        flexDirection: COLUMN,
        gridRow: "0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("overrides styles", () => {
      const { baseElement, getByTestId } = render(
        <MyGridItem
          style={{
            flexDirection: COLUMN,
            alignItems: STRETCH
          }}
        />
      );
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: STRETCH,
        flexDirection: COLUMN,
        gridRow: "0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns center", () => {
      const { baseElement, getByTestId } = render(<MyGridItem isCenter />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: "0",
        gridColumn: "0",
        justifyContent: CENTER
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("gridRow", () => {
    it("returns gridRow with toRow and alignItems center", () => {
      const { baseElement, getByTestId } = render(<MyGridItem toRow={6} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: "0 / 6",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns gridRow with toRow =0", () => {
      const { baseElement, getByTestId } = render(<MyGridItem toRow={0} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: "0 / 0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns gridRow with toRow =0", () => {
      const { baseElement, getByTestId } = render(<MyGridItem toRow={0} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: "0 / 0",
        gridColumn: "0",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });

  describe("gridColumn", () => {
    it("returns column position with when col is provided", () => {
      const { baseElement, getByTestId } = render(<MyGridItem col={10} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: "0",
        gridColumn: "10",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });

    it("returns column position with justifyContent, when toCol is provided", () => {
      const { baseElement, getByTestId } = render(<MyGridItem toCol={10} />);
      const { style } = getByTestId(TESTID);

      const expected = {
        display: DISPLAY_FLEX,
        alignItems: CENTER,
        flexDirection: ROW,
        gridRow: "0",
        gridColumn: "0 / 10",
        justifyContent: SPACE_BETWEEN
      };

      expect(baseElement).toMatchSnapshot();
      expect(style).toMatchObject(expected);
    });
  });
});
