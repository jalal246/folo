import React from "react";

import {
  GRID,
  STRETCH,
  CENTER,
  SPACE_BETWEEN,
  AUTO,
  FR,
  AUTO_FIT,
  DEFAULT_GAP,
} from "../constants";

/**
 * call repeat() CSS function
 * depending on length, min,max
 * with some enhancements
 *
 *
 * @param {number} length row or column number in grid
 * @param {string} min minimum unit for row or column
 * @param {string} max maximum unit for row or column
 * @return {string}   repeat() CSS function represents a repeated fragment of the track list
 */
function repeat(length, fixed, min, max) {
  return `repeat(${length}, ${fixed || `minmax(${min}, ${max})`})`;
}

const Grid = (props) => {
  const {
    component: CellComponent = "div",

    col,
    colWidth,
    colMinWidth = AUTO,
    colMaxWidth = FR,

    row,
    rowWidth,
    rowMinWidth,
    rowMaxWidth,

    isCenter = false,

    style: {
      display = GRID,

      alignItems = isCenter ? CENTER : STRETCH,

      // eslint-disable-next-line
      justifyContent = col || colWidth
        ? SPACE_BETWEEN
        : isCenter
        ? CENTER
        : STRETCH,

      gap = DEFAULT_GAP,

      ...otherStyles
    } = {},
    children,

    //
    ...rest
  } = props;

  const style = {
    display,

    ...(row
      ? { gridTemplateRows: repeat(row, rowWidth, rowMinWidth, rowMaxWidth) }
      : rowWidth && { gridAutoRows: rowWidth }),

    ...(colWidth && !col
      ? { gridAutoColumns: colWidth }
      : {
          gridTemplateColumns: repeat(
            col || AUTO_FIT,
            colWidth,
            colMinWidth,
            colMaxWidth
          ),
        }),

    alignItems,
    justifyContent,
    gap,
    ...otherStyles,
  };

  return (
    <CellComponent style={style} {...rest}>
      {children}
    </CellComponent>
  );
};

export default Grid;
