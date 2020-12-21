import React from "react";
import positionStore from "../positionStore";

import {
  CENTER,
  SPACE_BETWEEN,
  ROW,
  COLUMN,
  DISPLAY_FLEX,
  STRETCH,
} from "../constants";

function location(from, to) {
  if (from !== null && to !== null) {
    return `${from} / ${to}`;
  }
  return `${from}`;
}

/**
 * For implicit grid
 * Takes column and row number
 * to inform the grid parent of total positions
 *
 * It collects numbers report it to Grid
 */
const GridItem = (props) => {
  const {
    component: CellComponent = "div",

    row = null,
    toRow = null,

    col = 0,
    toCol = null,

    isCenter = false,
    isHorizontal = true,

    style: {
      display = DISPLAY_FLEX,

      flexDirection: fDirection,
      alignItems: aItems,
      ...otherStyle
    } = {},

    id,
    children,

    ...rest
  } = props;

  const calculatedPosition = positionStore.autoPosition({
    key: id || `${new Date().getTime()}`,
    row,
    toRow,
  });

  const container = {
    display,

    ...(isHorizontal
      ? {
          flexDirection: fDirection || ROW,
          alignItems: aItems || CENTER,
        }
      : {
          flexDirection: fDirection || COLUMN,
          alignItems: aItems || STRETCH,
        }),

    justifyContent: isCenter ? CENTER : SPACE_BETWEEN,

    gridRow: location(calculatedPosition, toRow),
    gridColumn: location(col, toCol),

    ...otherStyle,
  };

  return (
    <CellComponent style={container} {...rest}>
      {children}
    </CellComponent>
  );
};

export default GridItem;
