class AutoPositionCell {
  constructor() {
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
   * @param {number} GridItem.row
   * @param {number} GridItem.toRow
   * @return {number} row position
   */
  autoPosition = ({ key, row, toRow }) => {
    const parseRow = parseInt(row, 10);
    const parseToRow = parseInt(toRow, 10);

    if (parseToRow && parseRow) {
      this.cellPositions[key] = parseRow;

      const bigger = parseToRow > parseRow ? parseToRow : parseRow;
      if (bigger > this.biggestRowItem) {
        this.biggestRowItem = bigger;
      }
    } else if (parseRow) {
      this.cellPositions[key] = parseRow;

      if (parseRow > this.biggestRowItem) {
        this.biggestRowItem = parseRow;
      }
    } else {
      this.biggestRowItem += 1;
      this.cellPositions[key] = this.biggestRowItem;

      if (parseToRow > this.biggestRowItem) {
        this.biggestRowItem = parseToRow;
      }
    }

    return this.cellPositions[key];
  };
}

export default AutoPositionCell;
