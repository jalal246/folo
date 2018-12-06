import React from "react";
import PropTypes from "prop-types";

import {
  GRID,
  STRETCH,
  CENTER,
  SPACE_BETWEEN,
  AUTO,
  FR,
  AUTO_FIT,
  DEFAULT_GAP
} from "../constants";

const propTypes = {
  /**
   * custom render-component
   */
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * number of columns in grid
   */
  col: PropTypes.number,
  colWidth: PropTypes.string,
  colMinWidth: PropTypes.string,
  colMaxWidth: PropTypes.string,

  /**
   * number of rows in grid
   */
  row: PropTypes.number,
  rowWidth: PropTypes.string,
  rowMinWidth: PropTypes.string,
  rowMaxWidth: PropTypes.string,

  style: PropTypes.objectOf(PropTypes.string),
  //
  children: PropTypes.node.isRequired
};

const defaultProps = {
  component: "div",

  col: null,
  colWidth: undefined,
  colMinWidth: AUTO,
  colMaxWidth: FR,

  row: null,
  rowWidth: undefined,
  rowMinWidth: AUTO,
  rowMaxWidth: FR,
  style: {}
};

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

class Grid extends React.PureComponent {
  render() {
    const {
      component: CellComponent,

      col,
      colWidth,
      colMinWidth,
      colMaxWidth,

      row,
      rowWidth,
      rowMinWidth,
      rowMaxWidth,

      isCenter,

      // TODO: add style and shape to propTypes
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
      },
      children,

      //
      ...otherProps
    } = this.props;

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
            )
          }),

      alignItems,
      justifyContent,
      gap,
      ...otherStyles
    };

    return (
      <CellComponent style={style} {...otherProps}>
        {children}
      </CellComponent>
    );
  }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
