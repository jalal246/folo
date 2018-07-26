import React, { createContext } from 'react';

// import { isObjEmpty, bigger } from '../../../utils';

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

export class GridProvider extends React.Component {
  constructor(props) {
    super(props);

    // store cells number accourding to its name
    this.cellPositions = {};
    this.cellDefaultRow = {};

    // comes from user by GridItem
    // this.biggestColItem = 0;
    this.biggestRowItem = 0;
    //
    // // comes from user by Grid
    // this.fixedCol = 0;
    // this.fixedRow = 0;
    //
    // this.rowCellsWidth = {};
    // this.colCellsWidth = {};
    //
    // this.didMount = false;
    // this.isDynamicTempRow = false;
    // this.isDynamicTempCol = false;
    //
    // this.state = {
    //   isDynamicTempRow: false,
    //   rowCellsWidth: {},
    //   biggestRowItem: 0,
    //
    //   isDynamicTempCol: false,
    //   colCellsWidth: {},
    //   biggestColItem: 0
    // };
  }

  cellAutoPosition = (key, row, toRow) => {
    this.cellDefaultRow[key] = { row, toRow };

    let isRowUpdated = false;
    let isBiggestRowUpdated = false;

    if (row) {
      if (this.cellPositions[key] !== row) {
        this.cellPositions[key] = row;
        isRowUpdated = true;
      }

      if (row > this.biggestRowItem) {
        this.biggestRowItem = row;
        isBiggestRowUpdated = true;
      }
    }

    if (toRow && toRow > this.biggestRowItem) {
      this.biggestRowItem = toRow;
      isBiggestRowUpdated = true;
    }

    if (!isBiggestRowUpdated) {
      this.biggestRowItem += 1;
    }

    if (!isRowUpdated) {
      this.cellPositions[key] = this.biggestRowItem;
    }

    return this.cellPositions[key];
  };

  remCellPosition = key => {
    delete this.cellPositions[key];

    //
    const rows = Object.keys(this.cellPositions);
    let tempBiggest = 0;
    rows.forEach(ky => {
      if (this.cellPositions[ky] > tempBiggest) {
        tempBiggest = this.cellPositions[ky];
      }
    });
    this.biggestRowItem = tempBiggest;
  };

  // registerCellContainer = ({
  //   key,
  //   row,
  //   toRow,
  //   rowWidth,
  //   col,
  //   toCol,
  //   colWidth
  // }) => {
  //   console.log('registerCellContainer');
  //
  //   if (!this.cellPositions[key]) {
  //     // initiate if not exist
  //     this.cellPositions[key] = {};
  //   }
  //
  //   if (col) {
  //     if (this.cellPositions[key].col !== col) {
  //       this.cellPositions[key].col = col;
  //     }
  //
  //     if (col > this.biggestColItem) {
  //       this.biggestColItem = col;
  //     }
  //   }
  //
  //   if (toCol && toCol > this.biggestColItem) {
  //     this.biggestColItem = toCol;
  //   }
  //
  //   let isBiggestRowUpdated = false;
  //   let isRowUpdated = false;
  //
  //   if (row) {
  //     if (this.cellPositions[key].row !== row) {
  //       this.cellPositions[key].row = row;
  //       isRowUpdated = true;
  //     }
  //
  //     if (row > this.biggestRowItem) {
  //       this.biggestRowItem = row;
  //       isBiggestRowUpdated = true;
  //     }
  //   }
  //
  //   if (toRow > this.biggestRowItem) {
  //     this.biggestRowItem = toRow;
  //     isBiggestRowUpdated = true;
  //   }
  //
  //   if (!isBiggestRowUpdated) {
  //     this.biggestRowItem += 1;
  //   }
  //
  //   if (!isRowUpdated) {
  //     let position;
  //     if (!this.isFirstRowSet) {
  //       position = 1;
  //       this.isFirstRowSet = true;
  //     } else {
  //       position = this.biggestRowItem;
  //     }
  //
  //     this.cellPositions[key].row = position;
  //   }
  //
  //   if (rowWidth && this.cellPositions[key].rowWidth !== rowWidth) {
  //     // we check if this is the first time
  //
  //     if (!this.isDynamicTempRow) {
  //       // if it is, then set row width flag
  //       this.isDynamicTempRow = true;
  //     }
  //     /*
  //     we accept row width without knowing the row number
  //     this should be easy guess, since we count each cell counter
  //   */
  //     this.rowCellsWidth[this.cellPositions[key].row] = rowWidth;
  //   }
  //
  //   if (colWidth && this.cellPositions[key].colWidth !== colWidth) {
  //     /*
  //       support default column, as zero index
  //     */
  //     if (!this.isDynamicTempCol) {
  //       this.isDynamicTempCol = true;
  //     }
  //     if (!col) {
  //       // if no column and column 0 is not set
  //       if (!this.colCellsWidth[0]) {
  //         this.colCellsWidth[0] = colWidth;
  //       }
  //     } else {
  //       this.colCellsWidth[col] = colWidth;
  //     }
  //   }
  // };

  render() {
    console.log('GridProvider update');

    const { children } = this.props;

    const { remCellPosition, cellAutoPosition } = this;

    return (
      <GridController.Provider
        value={{
          cnFuncs: {
            remCellPosition,
            cellAutoPosition
          }
        }}
      >
        {children}
      </GridController.Provider>
    );
  }
}
