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

function generateTemp(colOrRow, calculated, min, max) {
  const choosenColNum = chooseNum(colOrRow, calculated);
  const colGridWidth = minmax(min, max);
  return repeat(choosenColNum, colGridWidth);
}

class NativeGrid extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }
  render() {
    const {
      col,
      colMinWidth,
      colMaxWidth,

      row,
      rowMinWidth,
      rowMaxWidth,

      grandRow,
      grandCol,

      gridRowWidth,
      autoFlow,
      gap,

      children
    } = this.props;
    const template = {};

    if (col || grandCol || colMinWidth || colMaxWidth) {
      template.gridTemplateColumns = generateTemp(
        col,
        grandCol,
        colMinWidth,
        colMaxWidth
      );
    }

    if (row || grandRow || rowMinWidth || rowMaxWidth) {
      template.gridTemplateRows = generateTemp(
        row,
        grandRow,
        rowMinWidth,
        rowMaxWidth
      );
    }

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
}

NativeGrid.propTypes = {
  col: PropTypes.number,
  gridRowWidth: PropTypes.string,
  gap: PropTypes.string
};
NativeGrid.defaultProps = {
  col: null,
  gridRowWidth: null,
  gap: null
};

export default withContext(NativeGrid, GridConsumer);
