import React from 'react';
import PropTypes from 'prop-types';

import { GridConsumer, withContext } from '../context';

const container = {
  backgroundColor: 'grey',
  display: 'grid',
  justifyItems: 'stretch',
  alignItems: 'stretch'
};

const AUTO_FIT = 'auto-fit';
const FR = 'fr';

function minmax(min, max = FR) {
  if (!min) return FR;
  return `minmax(${min}, ${max}`;
}

function repeat(colOrRowNum, width) {
  return `repeat(${colOrRowNum}, ${width})`;
}

export default function NativeGrid({
  col,
  colMinWidth,
  colMaxWidth,

  row,
  rowMinWidth,

  gridRowWidth,

  autoFlow,
  gap,

  children,

  calculatedRow,
  calculatedCol
}) {
  const template = {};

  const choosenColNum = col || calculatedCol;
  if (choosenColNum) {
    const calculatedColWidth = minmax(colMinWidth, colMaxWidth);

    template.gridTemplateColumns = repeat(choosenColNum, calculatedColWidth);
  }
  console.log(template);
  // const rowGridWidth = minmax(rowMinWidth);
  // const choosenRow = row || calculatedRow || 'auto-fit';
  // template.gridTemplateRows = `repeat(${choosenRow}, ${rowGridWidth})`;

  const style = Object.assign(
    {},
    container,
    template,

    gridRowWidth && { gridAutoRows: gridRowWidth },
    autoFlow && { gridAutoFlow: autoFlow },
    gap && { gridGap: gap }
  );

  return <div style={style}>{children}</div>;
}

NativeGrid.propTypes = {
  isAutoFit: PropTypes.bool,
  col: PropTypes.number,
  gridRowWidth: PropTypes.string,
  gap: PropTypes.string
};
NativeGrid.defaultProps = {
  isAutoFit: null,
  col: null,
  gridRowWidth: null,
  gap: null
};

export const Grid = withContext(NativeGrid, GridConsumer);
