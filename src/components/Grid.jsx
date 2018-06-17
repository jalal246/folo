import React from 'react';
import PropTypes from 'prop-types';

import { GridConsumer, withContext } from '../context';

const container = {
  backgroundColor: 'grey',
  display: 'grid',
  justifyItems: 'stretch',
  alignItems: 'stretch'
};

const FR = '1fr';
const AUTO_FIT = 'auto-fit';

function minmax(min, max = FR) {
  if (!min) return FR;
  return `minmax(${min}, ${max}`;
}
function repeat(colOrRowNum, width) {
  return `repeat(${colOrRowNum}, ${width})`;
}
function chooseNum(num, calculatedNum) {
  return num || calculatedNum || AUTO_FIT;
}

function genFixedTemp(colOrRow, grandColOrRow, fixedMin, fixedMax) {
  const choosenColNum = chooseNum(colOrRow, grandColOrRow);
  const colGridWidth = minmax(fixedMin, fixedMax);
  return repeat(choosenColNum, colGridWidth);
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

class NativeGrid extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }
  render() {
    const {
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
      biggestRow,

      children
    } = this.props;
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
    return <div style={style}>{children}</div>;
  }
}

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
