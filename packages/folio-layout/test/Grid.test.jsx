import React from "react";

import Grid from "../src/components/Grid";

const DEFAULT_DISPLAY = "grid";
const STRETCH = "stretch";
const DEFAULT_GAP = "1em";
const SPACE_BETWEEN = "space-between";
const AUTO_FIT = "auto-fit";

const CENTER = "center";

const wrapperStyle = ({ props, style }) =>
  // eslint-disable-next-line
  shallow(
    <Grid {...props} style={style}>
      <div />
    </Grid>
  ).prop("style");

describe("Grid", () => {
  describe("style", () => {
    it("returns default grid style as expected", () => {
      const expected = {
        display: DEFAULT_DISPLAY,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP
      };

      expect(wrapperStyle({})).to.deep.equal(expected);
    });

    it("returns override style", () => {
      const DISPLAY_ENLINE = "inline-grid";

      const expected = {
        display: DISPLAY_ENLINE,
        gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
        alignItems: STRETCH,
        justifyContent: STRETCH,
        gap: DEFAULT_GAP
      };

      expect(
        wrapperStyle({ style: { display: DISPLAY_ENLINE } })
      ).to.deep.equal(expected);
    });

    describe("alignItems", () => {
      it("returns alignItems justifyContent center when no columns passed", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
          alignItems: CENTER,
          justifyContent: CENTER,
          gap: DEFAULT_GAP
        };

        expect(wrapperStyle({ props: { isCenter: true } })).to.deep.equal(
          expected
        );
      });

      it("returns alignItems center and justifyContent when columns passed", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridTemplateColumns: "repeat(1, minmax(auto, 1fr))",
          alignItems: CENTER,
          justifyContent: SPACE_BETWEEN,
          gap: DEFAULT_GAP
        };

        expect(
          wrapperStyle({ props: { isCenter: true, col: 1 } })
        ).to.deep.equal(expected);
      });
    });

    describe("rows", () => {
      it("returns gridTemplateRows when passing row with minmax", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
          gridTemplateRows: "repeat(1, minmax(auto, 1fr))",
          alignItems: STRETCH,
          justifyContent: STRETCH,
          gap: DEFAULT_GAP
        };

        expect(wrapperStyle({ props: { row: 1 } })).to.deep.equal(expected);
      });

      it("returns gridTemplateRows when passing row with width", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
          gridTemplateRows: "repeat(1, 20px)",
          alignItems: STRETCH,
          justifyContent: STRETCH,
          gap: DEFAULT_GAP
        };

        expect(
          wrapperStyle({ props: { row: 1, rowWidth: "20px" } })
        ).to.deep.equal(expected);
      });

      it("returns gridAutoRows when passing rowWidth only", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridTemplateColumns: `repeat(${AUTO_FIT}, minmax(auto, 1fr))`,
          gridAutoRows: "20px",
          alignItems: STRETCH,
          justifyContent: STRETCH,
          gap: DEFAULT_GAP
        };

        expect(wrapperStyle({ props: { rowWidth: "20px" } })).to.deep.equal(
          expected
        );
      });
    });
    describe("coulmns", () => {
      it("returns gridAutoColumns when passing colWidth only", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridAutoColumns: "20px",
          alignItems: STRETCH,
          justifyContent: SPACE_BETWEEN,
          gap: DEFAULT_GAP
        };

        expect(wrapperStyle({ props: { colWidth: "20px" } })).to.deep.equal(
          expected
        );
      });

      it("returns gridTemplateColumns when passing col", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridTemplateColumns: "repeat(4, minmax(auto, 1fr))",
          alignItems: STRETCH,
          justifyContent: SPACE_BETWEEN,
          gap: DEFAULT_GAP
        };

        expect(wrapperStyle({ props: { col: 4 } })).to.deep.equal(expected);
      });
      it("returns gridTemplateColumns when passing colWidth and col", () => {
        const expected = {
          display: DEFAULT_DISPLAY,
          gridTemplateColumns: "repeat(4, 20px)",
          alignItems: STRETCH,
          justifyContent: SPACE_BETWEEN,
          gap: DEFAULT_GAP
        };

        expect(
          wrapperStyle({ props: { col: 4, colWidth: "20px" } })
        ).to.deep.equal(expected);
      });
    });
  });
});
