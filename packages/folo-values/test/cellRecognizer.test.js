import cellRecognizer from "../src/components/cellRecognizer";

import {
  VALUE,
  CHECKED,
  SELECT,
  LIST,
  CHECKBOX,
  RADIO,
  INPUT
} from "../src/constants";

const MY_VAL = "HELLO WORLD!";

describe("cellRecognizer", () => {
  it("test type=INPUT", () => {
    expect(
      cellRecognizer({ type: INPUT, checked: false, value: MY_VAL })
    ).toMatchObject({
      valueRef: VALUE,
      isInput: true,
      initValue: MY_VAL,
      RecommendedComponent: INPUT
    });
  });
  it("test type=CHECKBOX or RADIO", () => {
    const result_CHECKBOX = cellRecognizer({
      type: CHECKBOX,
      checked: true,
      value: MY_VAL
    });

    const result_RADIO = cellRecognizer({
      type: RADIO,
      checked: true,
      value: MY_VAL
    });

    const expected = {
      valueRef: CHECKED,
      isInput: false,
      initValue: true,
      RecommendedComponent: INPUT
    };

    expect(result_CHECKBOX).toMatchObject(expected);
    expect(result_RADIO).toMatchObject(expected);
  });
  it("test type=SELECT or LIST", () => {
    const result_SELECT = cellRecognizer({
      type: SELECT,
      checked: true,
      value: MY_VAL
    });

    const result_LIST = cellRecognizer({
      type: LIST,
      checked: true,
      value: MY_VAL
    });

    const expected = {
      valueRef: VALUE,
      isInput: false,
      initValue: MY_VAL,
      RecommendedComponent: SELECT
    };

    expect(result_SELECT).toMatchObject(expected);
    expect(result_LIST).toMatchObject(expected);
  });
});
