import cellRecognizer from "../src/utils/cellRecognizer";

import {
  VALUE,
  CHECKED,
  SELECT,
  LIST,
  CHECKBOX,
  RADIO,
  INPUT,
} from "../src/constants";

const MY_VAL = "HELLO WORLD!";

describe("cellRecognizer function", () => {
  it("Testing type=INPUT", () => {
    expect(
      cellRecognizer({ type: INPUT, checked: false, value: MY_VAL })
    ).toMatchObject({
      valueRef: VALUE,
      isInput: true,
      initValue: MY_VAL,
      RecommendedComponent: INPUT,
    });
  });

  it("Testing type=CHECKBOX or RADIO", () => {
    const RESULT_CHECKBOX = cellRecognizer({
      type: CHECKBOX,
      checked: true,
      value: MY_VAL,
    });

    const RESULT_RADIO = cellRecognizer({
      type: RADIO,
      checked: true,
      value: MY_VAL,
    });

    const expected = {
      valueRef: CHECKED,
      isInput: false,
      initValue: true,
      RecommendedComponent: INPUT,
    };

    expect(RESULT_CHECKBOX).toMatchObject(expected);
    expect(RESULT_RADIO).toMatchObject(expected);
  });

  it("Testing type=SELECT or LIST", () => {
    const RESULT_SELECT = cellRecognizer({
      type: SELECT,
      checked: true,
      value: MY_VAL,
    });

    const RESULT_LIST = cellRecognizer({
      type: LIST,
      checked: true,
      value: MY_VAL,
    });

    const expected = {
      valueRef: VALUE,
      isInput: false,
      initValue: MY_VAL,
      RecommendedComponent: SELECT,
    };

    expect(RESULT_SELECT).toMatchObject(expected);
    expect(RESULT_LIST).toMatchObject(expected);
  });
});
