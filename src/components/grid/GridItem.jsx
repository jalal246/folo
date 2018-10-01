import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { GridConsumer } from "./context";

import { keyGenerator } from "../../utils";
import withContext from "../withContext";

import componentShape from "../shapes/componentShape";

function location(from, to) {
  if (from !== null && to !== null) {
    return `${from} / ${to}`;
  }
  return `${from}`;
}

const CENTER = "center";
const FLEX_START = "flex-start";
const ROW = "row";
const COLUMN = "column";
const DISPLAY_FLEX = "flex";

const propTypes = {
  component: componentShape,

  row: PropTypes.number,
  toRow: PropTypes.number,

  col: PropTypes.number,
  toCol: PropTypes.number,
  isCenter: PropTypes.bool,

  style: PropTypes.objectOf(PropTypes.string),

  autoPositionCell: PropTypes.func.isRequired,

  isHorizontal: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  component: "div",

  row: null,
  toRow: null,

  col: null,
  toCol: null,
  isCenter: false,

  style: {},

  isHorizontal: true
};

/**
 * Used only when the Cell type is list
 * render option as defautl
 */
class GridItem extends PureComponent {
  state = {
    key: keyGenerator("gridItem")
  };

  render() {
    const {
      component: CellComponent,

      row,
      toRow,

      col,
      toCol,

      isCenter,
      isHorizontal,

      style: {
        display = DISPLAY_FLEX,
        flexDirection = isHorizontal ? ROW : COLUMN,
        ...otherStyle
      },

      autoPositionCell,

      children
    } = this.props;

    const { key } = this.state;

    // console.log('GridItem updated');

    const autoPosition = autoPositionCell({ key, row, toRow });

    const container = {
      display,
      flexDirection,
      // position row grid
      gridRow: location(autoPosition, toRow)
    };

    /**
     * justifyContent only set when there are:
     * col, toCol or isCenter
     */
    if (isCenter) {
      container.justifyContent = CENTER;
      container.gridColumn = location(1, -1);
    } else if (col || toCol) {
      container.justifyContent = FLEX_START;
      container.gridColumn = location(col || 0, toCol);
    }

    const styles = Object.assign({}, container, otherStyle);

    return <CellComponent style={styles}>{children}</CellComponent>;
  }
}

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;

export { GridItem as PureGridItem };

export default withContext({
  Component: GridItem,
  Consumer: GridConsumer,
  contextProps: ["autoPositionCell"]
});
