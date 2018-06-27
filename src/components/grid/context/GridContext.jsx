import React, { createContext } from 'react';
// import PropTypes from 'prop-types';
// import { INPUT } from '../constants';

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

const propTypes = {};

const defaultProps = {};

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

    this.state = {
      isDynamicTempCol: false,
      rowCellsWidth: {},
      biggestCol: 0,

      isDynamicTempRow: false,
      colCellsWidth: {},
      biggestRow: 0,

      isAllGridComponentsMounted: false
    };
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
      support default column, as zero index
    */
    if (colWidth) {
      if (!this.isColWidthSet) {
        this.isColWidthSet = true;
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

    return this.cellCounter;
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

          cellCounter: this.cellCounter,

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
