import React from "react";

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

// const defaultProps = {
//   component: "div",

//   row: null,
//   toRow: null,

//   col: 0,
//   toCol: null,
//   isCenter: false,

//   style: {},

//   isHorizontal: true,
//   children: null,
// };

/**
 * For implicit grid
 * Takes column and row number
 * to inform the grid parent of total positions
 *
 * It collects numbers report it to Grid
 */
const GridItem = (props) => {
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
  } = props;

  // console.log('GridItem updated');
  const calculatedPosition = autoPosition({ key, row, toRow });

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
