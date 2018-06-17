import React, { createContext } from 'react';
import PropTypes from 'prop-types';
// import { INPUT } from '../constants';

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

const propTypes = {};

const defaultProps = {};

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

function generateTemp(colOrRow, grandColOrRow, fixedMin, fixedMax) {
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

export class GridProvider extends React.Component {
  constructor(props) {
    super(props);

    this.cellCounter = 0;

    this.biggestCol = 0;
    this.biggestRow = 0;

    this.rowCellsWidth = {};
    this.colCellsWidth = {};

    this.didMount = false;
    this.isRowWidthSet = false;
    this.isColWidthSet = false;

    this.state = {};
  }

  componentDidMount() {
    this.didMount = true;

    this.setState({
      isDynamicTempCol: this.isColWidthSet,
      rowCellsWidth: this.rowCellsWidth,
      biggestCol: this.biggestCol,

      isDynamicTempRow: this.isRowWidthSet,
      colCellsWidth: this.colCellsWidth,
      biggestRow: this.biggestRow,

      isAllGridComponentsMounted: true
    });
  }

  registerCellContainer = (row, toRow, rowWidth, col, toCol, colWidth) => {
    if (this.didMount) return;

    // count cells
    this.cellCounter += 1;

    // find out the biggest column number
    // this hepls to know how many columns do we have
    if (col > toCol && col > this.biggestCol) {
      this.biggestCol = col;
    } else if (toCol > this.biggestCol) {
      this.biggestCol = toCol;
    }

    // find out the biggest row number
    // this hepls to know how many rows do we have
    if (row > toRow && row > this.biggestRow) {
      this.biggestRow = row;
    } else if (toRow > this.biggestRow) {
      this.biggestRow = toRow;
    } else {
      /*
      * we can count rows automatically
      * increasing one for each call
      * relying on column zero 0
      */
      this.biggestRow += 1;
    }

    // if we have row width
    if (rowWidth) {
      // we check if this is the first time

      if (!this.isRowWidthSet) {
        // if it is, then set row width flag
        this.isRowWidthSet = true;
      }
      /*
        we accept row width without knowing the row number
        this should be easy guess, since we count each cell counter
      */
      this.rowCellsWidth[row || this.cellCounter] = rowWidth;
    }

    /*
      if we have row width and known column number
      beacuse we cannot guess colmn number
    */
    if (colWidth && col) {
      if (!this.isColWidthSet) {
        this.isColWidthSet = true;
      }

      this.colCellsWidth[col] = colWidth;
    }
  };

  render() {
    console.log('GridProvider update');

    const {
      isDynamicTempCol,
      rowCellsWidth,
      biggestCol,

      isDynamicTempRow,
      colCellsWidth,
      biggestRow,

      isAllGridComponentsMounted
    } = this.state;

    const { registerCellContainer } = this;
    return (
      <GridController.Provider
        value={{
          isDynamicTempCol,
          rowCellsWidth,
          biggestCol,

          isDynamicTempRow,
          colCellsWidth,
          biggestRow,

          isAllGridComponentsMounted,

          registerCellContainer
        }}
      >
        {this.props.children}
      </GridController.Provider>
    );
  }
}

GridProvider.propTypes = propTypes;
GridProvider.defaultProps = defaultProps;
