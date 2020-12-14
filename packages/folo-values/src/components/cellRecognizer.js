import {
  VALUE,
  CHECKED,
  SELECT,
  LIST,
  CHECKBOX,
  RADIO,
  INPUT,
} from "../constants";

/**
 * Gets the cell type
 * returns booleans type flag.
 *
 * @param {string} type
 * @param {boolean} checked
 * @param {string} value
 * @return {{isInput:boolean, valueRef: string, initValue: string||boolean, RecommendedComponent: string }}
 */
function cellRecognizer({ type, checked, value }) {
  // only true when cell is button
  let isInput = false;

  // input or select
  let RecommendedComponent = INPUT;

  // value ref to the element: value or checked; depends on the type
  let valueRef = VALUE;

  // is it boolean or string; depends on the type
  let initValue = value;

  if (type === SELECT || type === LIST) {
    RecommendedComponent = SELECT;
  } else if (type === CHECKBOX || type === RADIO) {
    valueRef = CHECKED;
    initValue = checked;
  } else {
    isInput = true;
  }

  return {
    isInput,
    valueRef,
    initValue,
    RecommendedComponent,
  };
}

export default cellRecognizer;
