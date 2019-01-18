class AutoPositionCell {
  constructor() {
    // store cells number accourding to its name
    this.cellPositions = {};

    this.biggestRowItem = 0;

    this.autoPosition = this.autoPosition.bind(this);
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
   * @param {number} GridItem.row
   * @param {number} GridItem.toRow
   * @return {number} row position
   */
  autoPosition({ key, row, toRow }) {
    const parseRow = parseInt(row, 10);

    /*
     * if we have row,
     * then set position & calculate the biggest
     */
    if (parseRow) {
      this.cellPositions[key] = parseRow;

      if (parseRow > this.biggestRowItem) {
        this.biggestRowItem = parseRow;
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
  }
}

export default AutoPositionCell;
