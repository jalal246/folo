import React, { createContext } from 'react';

import { isObjEmpty, bigger } from '../../../utils';

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

export class GridProvider extends React.Component {
  constructor(props) {
    super(props);

    this.cellCounter = 0;

    // store cells number accourding to its name
    this.cellCounterStore = {};

    // comes from user by GridItem
    this.biggestColItem = 0;
    this.biggestRowItem = 0;

    // comes from user by Grid
    this.fixedCol = 0;
    this.fixedRow = 0;

    this.rowCellsWidth = {};
    this.colCellsWidth = {};

    this.didMount = false;
    this.isDynamicTempRow = false;
    this.isDynamicTempCol = false;

    this.state = {
      isDynamicTempRow: false,
      rowCellsWidth: {},
      biggestRowItem: 0,

      isDynamicTempCol: false,
      colCellsWidth: {},
      biggestColItem: 0
    };
  }

  componentDidMount() {
    this.didMount = true;
    this.cellCounter = 0;

    if (!this.isDynamicTempCol && !this.isDynamicTempRow) {
      // we've got nothing from gid items
      // dont update the state
      return;
    }
    this.updateState();
  }

  getCellCounter = key => this.cellCounterStore[key];

  updateState = () => {
    console.log('updateState');

    this.setState({
      isDynamicTempRow: this.isDynamicTempRow,
      rowCellsWidth: this.rowCellsWidth,
      biggestRowItem: bigger(this.biggestRowItem, this.cellCounter),

      isDynamicTempCol: this.isDynamicTempCol,
      colCellsWidth: this.colCellsWidth,
      biggestColItem: this.biggestColItem
    });
  };

  registerCellContainer = ({
    key,
    row,
    toRow,
    rowWidth,
    col,
    toCol,
    colWidth
  }) => {
    console.log('registerCellContainer');

    // find out the biggest column number
    // this hepls to know how many columns do we have
    if (col > toCol && col > this.biggestColItem) {
      this.biggestColItem = col;
    } else if (toCol > this.biggestColItem) {
      this.biggestColItem = toCol;
    }

    // find out the biggest row number
    // this hepls to know how many rows do we have
    if (row > toRow && row > this.biggestRowItem) {
      this.biggestRowItem = row;
    } else if (toRow > this.biggestRowItem) {
      this.biggestRowItem = toRow;
    } else {
      /*
      * we can count rows automatically
      * increasing one for each call
      * relying on column zero 0
      */
      this.biggestRowItem += 1;
    }

    if (!this.didMount) {
      this.cellCounter += 1;

      let position = 0;
      if (row) {
        position = row;
      } else if (this.cellCounter === 1) {
        position = 1;
      } else {
        position = this.biggestRowItem;
      }
      this.cellCounterStore[key] = position;
    }

    // if we have row width
    if (rowWidth) {
      // we check if this is the first time

      if (!this.isDynamicTempRow) {
        // if it is, then set row width flag
        this.isDynamicTempRow = true;
      }
      /*
        we accept row width without knowing the row number
        this should be easy guess, since we count each cell counter
      */
      this.rowCellsWidth[row || this.cellCounter] = rowWidth;
    }

    /*
      support default column, as zero index
    */
    if (colWidth) {
      if (!this.isDynamicTempCol) {
        this.isDynamicTempCol = true;
      }
      if (!col) {
        // if no column and column 0 is not set
        if (!this.colCellsWidth[0]) {
          this.colCellsWidth[0] = colWidth;
        }
      } else {
        this.colCellsWidth[col] = colWidth;
      }
    }
  };

  render() {
    console.log('GridProvider update');

    const {
      isDynamicTempCol,
      rowCellsWidth,
      biggestColItem,

      isDynamicTempRow,
      colCellsWidth,
      biggestRowItem
    } = this.state;

    const { children } = this.props;

    const { registerCellContainer, getCellCounter } = this;

    return (
      <GridController.Provider
        value={{
          cnValues: {
            isDynamicTempCol,
            rowCellsWidth,
            biggestColItem,

            isDynamicTempRow,
            colCellsWidth,
            biggestRowItem
          },

          cnFuncs: {
            registerCellContainer,
            getCellCounter
          }
        }}
      >
        {children}
      </GridController.Provider>
    );
  }
}
