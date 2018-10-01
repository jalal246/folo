import React from "react";
import PropTypes from "prop-types";

import componentShape from "../shapes/componentShape";

const GRID = "grid";
const STRETCH = "stretch";

const FR = "1fr";
const AUTO_FIT = "auto-fit";
const DEFAULT_GAP = "1em";

const propTypes = {
  /**
   * custom render-component
   */
  component: componentShape,

  /**
   * number of columns in grid
   */
  col: PropTypes.number,
  colMinWidth: PropTypes.string,
  colMaxWidth: PropTypes.string,

  /**
   * number of rows in grid
   */
  row: PropTypes.number,
  rowMinWidth: PropTypes.string,
  rowMaxWidth: PropTypes.string,

  style: PropTypes.objectOf(PropTypes.string),
  //
  children: PropTypes.node.isRequired
};

const defaultProps = {
  component: "div",

  col: null,
  colMinWidth: null,
  colMaxWidth: null,

  row: null,
  rowMinWidth: null,
  rowMaxWidth: null,

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
function repeat(length, min, max) {
  return `repeat(${length}, ${min ? `minmax(${min}, ${max || FR}` : FR})`;
}

//
class Grid extends React.PureComponent {
  render() {
    const {
      component: CellComponent,
      col,
      colMinWidth,
      colMaxWidth,

      row,
      rowMinWidth,
      rowMaxWidth,

      // TODO: add style and shape to propTypes
      style: {
        display = GRID,
        justifyItems = STRETCH,
        alignItems = STRETCH,
        gridTemplateColumns: gtc,
        gridTemplateRows: gtr,
        gap = DEFAULT_GAP,
        ...otherStyles
      },
      children,

      //
      ...otherProps
    } = this.props;

    const style = {
      display,
      justifyItems,
      alignItems,
      ...(gtc ||
        ((col || colMinWidth) && {
          gridTemplateColumns: repeat(col || AUTO_FIT, colMinWidth, colMaxWidth)
        })),
      ...(gtr ||
        (row && {
          gridTemplateRows: repeat(row, rowMinWidth, rowMaxWidth)
        })),
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
