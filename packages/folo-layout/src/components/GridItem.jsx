import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import withcontext from "@folo/withcontext";

import { GridConsumer } from "./context";

import {
  CENTER,
  SPACE_BETWEEN,
  ROW,
  COLUMN,
  DISPLAY_FLEX,
  STRETCH
} from "../constants";

function location(from, to) {
  if (from !== null && to !== null) {
    return `${from} / ${to}`;
  }
  return `${from}`;
}

const propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  row: PropTypes.number,
  toRow: PropTypes.number,

  col: PropTypes.number,
  toCol: PropTypes.number,
  isCenter: PropTypes.bool,

  style: PropTypes.objectOf(PropTypes.string),

  autoPosition: PropTypes.func.isRequired,

  isHorizontal: PropTypes.bool,
  children: PropTypes.node
};

const defaultProps = {
  component: "div",

  row: null,
  toRow: null,

  col: 0,
  toCol: null,
  isCenter: false,

  style: {},

  isHorizontal: true,
  children: null
};

/**
 * For implicit grid
 * Takes column and row number
 * to inform the grid parent of total positions
 *
 * It collects numbers report it to Grid
 */
class GridItem extends PureComponent {
  state = {
    key: new Date().getTime()
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

        flexDirection: fDirection,
        alignItems: aItems,
        ...otherStyle
      },

      autoPosition,

      children,

      ...rest
    } = this.props;

    const { key } = this.state;

    // console.log('GridItem updated');
    const calculatedPosition = autoPosition({ key, row, toRow });

    const container = {
      display,

      ...(isHorizontal
        ? {
            flexDirection: fDirection || ROW,
            alignItems: aItems || CENTER
          }
        : {
            flexDirection: fDirection || COLUMN,
            alignItems: aItems || STRETCH
          }),

      justifyContent: isCenter ? CENTER : SPACE_BETWEEN,

      gridRow: location(calculatedPosition, toRow),
      gridColumn: location(col, toCol),

      ...otherStyle
    };

    return (
      <CellComponent style={container} {...rest}>
        {children}
      </CellComponent>
    );
  }
}

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;

export { GridItem as PureGridItem };

export default withcontext({
  Component: GridItem,
  Consumer: GridConsumer,
  contextProps: ["autoPosition"]
});
