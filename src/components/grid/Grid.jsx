import React from 'react';
import PropTypes from 'prop-types';

import { GridConsumer } from './context';

import withContext from '../withContext';

const container = {
  backgroundColor: 'grey',
  display: 'grid',
  justifyItems: 'stretch',
  alignItems: 'stretch'
};

const FR = '1fr';
const AUTO_FIT = 'auto-fit';

function genFixedTemp(rowColNum, biggest, min, max) {
  const rowCol = rowColNum || biggest || AUTO_FIT;

  const width = min ? `minmax(${min}, ${max || FR}` : FR;

  return `repeat(${rowCol}, ${width})`;
}

function genDynamicTemp(widthObj, biggest) {
  /*
  * object keys contain row/columns
  * extract them, to find out the biggest number do we have
  */
  const rowColNum = Object.keys(widthObj);
  const maxInTemplate = rowColNum.reduce((acc, elm) => Math.max(acc, elm));

  /*
  * now, maybe the biggest number is not in template
  * only way to know, by comparing it with the biggest
  * we got biggest through each cell
  */
  const max = Math.max(maxInTemplate, biggest);

  // let's generate the template
  let temp = '';
  for (let rowCol = 0; rowCol < max; rowCol += 1) {
    // fill the non-declared rows/columns with 1 fr
    temp += `${widthObj[rowCol] || FR} `;
  }

  return temp;
}

function setGridStyle({
  col: totalGridCol,
  colMinWidth: fixedColMinWidth,
  colMaxWidth: fixedColMaxWidth,

  row: totalGridRow,
  rowMinWidth: fixedRowMinWidth,
  rowMaxWidth: fixedRowMaxWidth,

  gridRowWidth,
  autoFlow,
  gap,

  isDynamicTempCol,
  rowCellsWidth,
  biggestCol,

  isDynamicTempRow,
  colCellsWidth,
  biggestRow
}) {
  const template = {};

  template.gridTemplateColumns = isDynamicTempCol
    ? genDynamicTemp(colCellsWidth, biggestCol)
    : genFixedTemp(
        totalGridCol,
        biggestCol,
        fixedColMinWidth,
        fixedColMaxWidth
      );

  template.gridTemplateRows = isDynamicTempRow
    ? genDynamicTemp(rowCellsWidth, biggestRow)
    : genFixedTemp(
        totalGridRow,
        biggestRow,
        fixedRowMinWidth,
        fixedRowMaxWidth
      );

  const style = Object.assign(
    {},
    container,
    template,
    gridRowWidth && { gridAutoRows: gridRowWidth },
    autoFlow && { gridAutoFlow: autoFlow },
    { gridGap: gap }
  );

  return style;
}
//
class NativeGrid extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    // console.log(props, state);
  }
  render() {
    console.log('NativeGrid update');
    const { isAllGridComponentsMounted, children, ...otherProps } = this.props;

    const style = isAllGridComponentsMounted
      ? setGridStyle(otherProps)
      : container;

    return <div style={style}>{children}</div>;
  }
}
//
NativeGrid.propTypes = {
  totalGridCol: PropTypes.number,
  gridRowWidth: PropTypes.string,
  gap: PropTypes.string
};
NativeGrid.defaultProps = {
  totalGridCol: null,
  gridRowWidth: null,
  gap: '1em'
};

export default withContext(NativeGrid, GridConsumer);
