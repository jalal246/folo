import React from "react";
import PropTypes from "prop-types";

const container = {
  display: "grid",
  justifyItems: "stretch",
  alignItems: "stretch"
};

const propTypes = {
  // direct props used only for fixed temp
  col: PropTypes.number,
  colMinWidth: PropTypes.string,
  colMaxWidth: PropTypes.string,

  row: PropTypes.number,
  rowMinWidth: PropTypes.string,
  rowMaxWidth: PropTypes.string,

  // grid dimensions
  gridRowWidth: PropTypes.string,
  autoFlow: PropTypes.string,
  gap: PropTypes.string,

  //
  children: PropTypes.node.isRequired
};

const defaultProps = {
  col: 0,
  colMinWidth: null,
  colMaxWidth: null,

  row: 0,
  rowMinWidth: null,
  rowMaxWidth: null,

  gridRowWidth: null,
  autoFlow: null,
  gap: "1em"
};

const FR = "1fr";
const AUTO_FIT = "auto-fit";

function genFixedTemp(rowColNum, min, max) {
  const rowCol = rowColNum || AUTO_FIT;

  const width = min ? `minmax(${min}, ${max || FR}` : FR;

  return `repeat(${rowCol}, ${width})`;
}

//
class Grid extends React.PureComponent {
  render() {
    const {
      col,
      colMinWidth,
      colMaxWidth,

      row,
      rowMinWidth,
      rowMaxWidth,

      // grid dimensions
      gridRowWidth,
      autoFlow,
      gap,

      children,

      //
      ...otherProps
    } = this.props;

    const template = {};

    template.gridTemplateColumns = genFixedTemp(col, colMinWidth, colMaxWidth);

    template.gridTemplateRows = genFixedTemp(row, rowMinWidth, rowMaxWidth);

    const style = Object.assign(
      {},
      container,
      template,
      gridRowWidth && { gridAutoRows: gridRowWidth },
      autoFlow && { gridAutoFlow: autoFlow },
      { gridGap: gap }
    );

    return (
      <div style={style} {...otherProps}>
        {children}
      </div>
    );
  }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
