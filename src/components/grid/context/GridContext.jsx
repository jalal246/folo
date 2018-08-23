import React, { createContext } from "react";

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

  /**
   * Auto set the row number
   * If we dont have row then take the higher value
   * depending on biggestRowItem which updated with each grid item
   * Otherwise set the row do you have and update biggestRowItem
   *
   * This helps to assign position value according to highest value
   * If we start from 10, the next will be 11 and so on.
   *
   * @param {String} key unique key for GridItem
   * @param {Number} row row number
   * @param {Number} toRow extends to row number
   * @return {Number} position
   */
  cellAutoPosition = (key, row, toRow) => {
    this.cellDefaultRow[key] = { row, toRow };

    let isRowUpdated = false;
    let isBiggestRowUpdated = false;

    // if we have row
    // set position & calculate the biggest
    if (row) {
      if (this.cellPositions[key] !== row) {
        // if we have new Value
        // update it and inform the flag
        this.cellPositions[key] = row;
        isRowUpdated = true;
      } else {
        // do nothing, dont waste our time
        return this.cellPositions[key];
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

    // if we dont have row and toRow
    // then auto increment
    if (!isBiggestRowUpdated) {
      this.biggestRowItem += 1;
    }

    // if not updated
    // take the higher row value: biggestRowItem
    if (!isRowUpdated) {
      this.cellPositions[key] = this.biggestRowItem;
    }

    return this.cellPositions[key];
  };

  // remCellPosition = key => {
  //   delete this.cellPositions[key];
  //
  //   //
  //   const rows = Object.keys(this.cellPositions);
  //   let tempBiggest = 0;
  //   rows.forEach(ky => {
  //     if (this.cellPositions[ky] > tempBiggest) {
  //       tempBiggest = this.cellPositions[ky];
  //     }
  //   });
  //   this.biggestRowItem = tempBiggest;
  // };

  render() {
    // console.log('GridProvider update');

    // eslint-disable-next-line
    const { children } = this.props;

    const { /* remCellPosition, */ cellAutoPosition } = this;

    return (
      <GridController.Provider
        value={{
          cellAutoPosition
        }}
      >
        {children}
      </GridController.Provider>
    );
  }
}
