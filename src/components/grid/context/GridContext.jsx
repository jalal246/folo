import React, { createContext } from "react";

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

export class GridProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    // store cells number accourding to its name
    this.cellPositions = {};

    this.biggestRowItem = 0;
  }

  /**
   * Auto set the row number
   * If we dont have row then take the highest value
   * depending on biggestRowItem which updated with each grid item
   * Otherwise set the row do you have and update biggestRowItem
   *
   * This helps to assign position value according to highest value
   * If we start from 10, the next will be 11 and so on.
   *
   * @param {object} GridItem -  GridItem that should be register and calculated
   * @param {string} GridItem.key unique key generated in GridItem
   * @param {string} GridItem.row
   * @param {string} GridItem.toRow
   */
  autoPositionCell = ({ key, row, toRow }) => {
    /*
    * if we have row,
    * then set position & calculate the biggest
    */
    if (row) {
      /*
      * if we have new value, then update
      * update flag
      * update biggestRowItem
      */
      if (this.cellPositions[key] !== row) {
        this.cellPositions[key] = row;
      }

      if (row > this.biggestRowItem) {
        this.biggestRowItem = row;
      }
      /*
      * we dont have row so let's update biggestRowItem
      *
      * if toRow is the biggest so be it
      */
    } else {
      if (toRow && toRow > this.biggestRowItem) {
        this.biggestRowItem = toRow;
      } else {
        /*
        * then auto increment
        */
        this.biggestRowItem += 1;
      }
      /*
      * we are definitely didnt update row
      * let's give it the biigest
      */
      this.cellPositions[key] = this.biggestRowItem;
    }

    return this.cellPositions[key];
  };

  render() {
    // console.log('GridProvider update');

    // eslint-disable-next-line
    const { children } = this.props;

    const { autoPositionCell } = this;

    return (
      <GridController.Provider
        value={{
          autoPositionCell
        }}
      >
        {children}
      </GridController.Provider>
    );
  }
}
