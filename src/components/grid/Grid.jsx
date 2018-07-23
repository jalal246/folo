import React from 'react';
import PropTypes from 'prop-types';

import { GridConsumer } from './context';

import withContext from '../withContext';

const container = {
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

//
class Grid extends React.PureComponent {
  render() {
    console.log('Grid update');
    const {
      // direct props used only for fixed temp
      col: totalGridCol,
      colMinWidth: fixedColMinWidth,
      colMaxWidth: fixedColMaxWidth,

      row: totalGridRow,
      rowMinWidth: fixedRowMinWidth,
      rowMaxWidth: fixedRowMaxWidth,

      // grid dimensions
      gridRowWidth,
      autoFlow,
      gap,

      //  context props calculated from grid item
      cnValues: {
        isDynamicTempRow,
        rowCellsWidth,
        biggestCol,

        isDynamicTempCol,
        colCellsWidth,
        biggestRow,

        isDynamic
      },

      cnFuncs: { registerFixedColRow },

      //
      children,

      //
      ...otherProps
    } = this.props;

    registerFixedColRow(totalGridCol, totalGridRow);

    const template = {};

    if (!isDynamic) {
      if (totalGridCol > 0) {
        template.gridTemplateColumns = genFixedTemp(
          totalGridCol,
          biggestCol,
          fixedColMinWidth,
          fixedColMaxWidth
        );
      }
      if (totalGridRow > 0) {
        template.gridTemplateRows = genFixedTemp(
          totalGridRow,
          biggestRow,
          fixedRowMinWidth,
          fixedRowMaxWidth
        );
      }
    } else {
      if (isDynamicTempCol) {
        template.gridTemplateColumns = genDynamicTemp(
          colCellsWidth,
          biggestCol
        );
      }
      if (isDynamicTempRow) {
        template.gridTemplateRows = genDynamicTemp(rowCellsWidth, biggestRow);
      }
    }

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

Grid.propTypes = {
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

  cnValues: PropTypes.shape({
    isDynamicTempRow: PropTypes.bool.isRequired,
    rowCellsWidth: PropTypes.objectOf(PropTypes.string).isRequired,
    biggestCol: PropTypes.number.isRequired,

    isDynamicTempCol: PropTypes.bool.isRequired,
    colCellsWidth: PropTypes.objectOf(PropTypes.string).isRequired,
    biggestRow: PropTypes.number.isRequired,

    isDynamic: PropTypes.bool.isRequired
  }).isRequired,

  cnFuncs: PropTypes.shape({
    registerFixedColRow: PropTypes.func.isRequired
  }).isRequired,

  //
  children: PropTypes.node.isRequired
};
Grid.defaultProps = {
  col: 0,
  colMinWidth: null,
  colMaxWidth: null,

  row: 0,
  rowMinWidth: null,
  rowMaxWidth: null,

  gridRowWidth: null,
  autoFlow: null,
  gap: '1em'
};

export default withContext(Grid, GridConsumer);
