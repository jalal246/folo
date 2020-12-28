/* eslint-disable operator-assignment */
import AutoPositionCell from "../src";

const autoPositionTest = new AutoPositionCell();

const key = () => new Date().getTime();

let POSITION;

let EXPECTED_BIGGEST_ROW;

let CELL_1;
let EXPECTED_ROW_1;

let CELL_2;
let EXPECTED_ROW_2;

let CELL_3;
let EXPECTED_ROW_3;

let CELL_4;
let EXPECTED_ROW_4;

let CELL_5;
let EXPECTED_ROW_5;

let CELL_6;
let EXPECTED_ROW_6;

let CELL_7;
let EXPECTED_ROW_7;

let CELL_8;
let EXPECTED_ROW_8;

let CELL_9;
let EXPECTED_ROW_9;

let CELL_10;
let EXPECTED_ROW_10;

describe("Testing AutoPositionCell Algorithm", () => {
  it("Works for known row", () => {
    CELL_1 = {
      key,
      row: 10,
      toRow: 0,
    };
    EXPECTED_ROW_1 = 10;
    EXPECTED_BIGGEST_ROW = 10;

    POSITION = autoPositionTest.autoPosition(CELL_1);

    expect(EXPECTED_ROW_1).toBe(10);
    expect(EXPECTED_BIGGEST_ROW).toBe(10);

    expect(POSITION).toBe(EXPECTED_ROW_1); // 10
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW); // 10
  });

  it("Calculates row number prev_row + 1", () => {
    CELL_2 = {
      key,
      row: null,
      toRow: 0,
    };
    EXPECTED_ROW_2 = CELL_1.row + 1;
    EXPECTED_BIGGEST_ROW = EXPECTED_ROW_2;

    POSITION = autoPositionTest.autoPosition(CELL_2);

    expect(EXPECTED_ROW_2).toBe(11);
    expect(EXPECTED_BIGGEST_ROW).toBe(11);

    expect(POSITION).toBe(EXPECTED_ROW_2);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("No change when passing the same value", () => {
    // same value in cell 2
    CELL_3 = {
      key,
      row: EXPECTED_ROW_2, // 11
      toRow: 0,
    };
    EXPECTED_ROW_3 = CELL_3.row; // no change for the same value: 11
    // no change for EXPECTED_BIGGEST_ROW

    POSITION = autoPositionTest.autoPosition(CELL_3);

    expect(EXPECTED_ROW_3).toBe(11);

    expect(POSITION).toBe(EXPECTED_ROW_3);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("Assigns lower row value, to test biggest value", () => {
    CELL_4 = {
      key,
      row: 2,
      toRow: 0,
    };
    EXPECTED_ROW_4 = CELL_4.row;
    // no change for EXPECTED_BIGGEST_ROW

    POSITION = autoPositionTest.autoPosition(CELL_4);

    expect(EXPECTED_ROW_4).toBe(2);

    expect(POSITION).toBe(EXPECTED_ROW_4);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("No row, the expected is not prev + 1, must be biggest +1", () => {
    CELL_5 = {
      key,
      row: null,
      toRow: 0,
    };
    EXPECTED_ROW_5 = EXPECTED_BIGGEST_ROW + 1;
    EXPECTED_BIGGEST_ROW = EXPECTED_ROW_5;

    POSITION = autoPositionTest.autoPosition(CELL_5);

    expect(EXPECTED_ROW_5).toBe(12);
    expect(EXPECTED_BIGGEST_ROW).toBe(12);

    expect(POSITION).toBe(EXPECTED_ROW_5);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("No row, but toRow, the expected is prev + 1", () => {
    CELL_6 = {
      key,
      row: null,
      toRow: 200,
    };
    EXPECTED_ROW_6 = EXPECTED_ROW_5 + 1;
    EXPECTED_BIGGEST_ROW = CELL_6.toRow;

    POSITION = autoPositionTest.autoPosition(CELL_6);

    expect(EXPECTED_ROW_6).toBe(13);
    expect(EXPECTED_BIGGEST_ROW).toBe(200);

    expect(POSITION).toBe(EXPECTED_ROW_6);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("No row, but lower toRow, biggest + 1", () => {
    CELL_7 = {
      key,
      row: null,
      toRow: 3,
    };
    EXPECTED_ROW_7 = EXPECTED_BIGGEST_ROW + 1;
    EXPECTED_BIGGEST_ROW = EXPECTED_BIGGEST_ROW + 1;

    POSITION = autoPositionTest.autoPosition(CELL_7);

    expect(EXPECTED_ROW_7).toBe(201);
    expect(EXPECTED_BIGGEST_ROW).toBe(201);

    expect(POSITION).toBe(EXPECTED_ROW_7);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("Passes toRow & row both smaller than prev biggest", () => {
    CELL_8 = {
      key,
      row: 100,
      toRow: 3,
    };
    EXPECTED_ROW_8 = CELL_8.row;
    // no change for EXPECTED_BIGGEST_ROW

    POSITION = autoPositionTest.autoPosition(CELL_8);

    expect(EXPECTED_ROW_8).toBe(100);

    expect(POSITION).toBe(EXPECTED_ROW_8);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("Passes toRow & row both but row bigger than biggest", () => {
    CELL_9 = {
      key,
      row: 205,
      toRow: 3,
    };
    EXPECTED_ROW_9 = CELL_9.row;
    EXPECTED_BIGGEST_ROW = EXPECTED_ROW_9;

    POSITION = autoPositionTest.autoPosition(CELL_9);

    expect(EXPECTED_ROW_9).toBe(205);
    expect(EXPECTED_BIGGEST_ROW).toBe(205);

    expect(POSITION).toBe(EXPECTED_ROW_9);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });

  it("Passes toRow & row both but toRow bigger than biggest", () => {
    CELL_10 = {
      key,
      row: 88,
      toRow: 210,
    };
    EXPECTED_ROW_10 = CELL_10.row;
    EXPECTED_BIGGEST_ROW = CELL_10.toRow;

    POSITION = autoPositionTest.autoPosition(CELL_10);

    expect(EXPECTED_ROW_10).toBe(88);
    expect(EXPECTED_BIGGEST_ROW).toBe(210);

    expect(POSITION).toBe(EXPECTED_ROW_10);
    expect(autoPositionTest.biggestRowItem).toBe(EXPECTED_BIGGEST_ROW);
  });
});
