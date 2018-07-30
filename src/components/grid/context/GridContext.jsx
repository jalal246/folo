import React, { createContext } from 'react';

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

export class GridProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    // store cells number accourding to its name
    this.cellPositions = {};
    this.cellDefaultRow = {};

    this.biggestRowItem = 0;
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
