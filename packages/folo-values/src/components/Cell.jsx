import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import withcontext from "@folo/withcontext";
import { keyGenerator } from "@folo/utils";

import CellEngine from "./CellEngine";
import { ValuesConsumer } from "./context";

import {
  VALUE,
  CHECKED,
  TEXT,
  SELECT,
  LIST,
  CHECKBOX,
  RADIO,
  INPUT
} from "../constants";

// import componentShape from "../shapes/componentShape";
// console.log("withcontext>>>>>>>>>>>>>>>", withcontext);

const propTypes = {
  /**
   * custom render-component
   */
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * key used to store value in values object
   * this will be later nameRef after being processed
   */
  valueKey: PropTypes.string,

  /**
   * init value if it is string
   */
  value: PropTypes.string,

  /**
   * init value if it is boolean
   */
  checked: PropTypes.bool,

  id: PropTypes.string,
  type: PropTypes.string,

  /**
   * group name in case the cell is group-toggle
   * this is only valid for boolean cells
   */
  groupName: PropTypes.string,

  children: PropTypes.node,

  /**
   * supposed to be context function
   * helps to register values and key reference
   * beacuse context values is not aware of data we have, yet.
   */
  registerCellInfo: PropTypes.func,

  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

const defaultProps = {
  component: null,
  valueKey: null,
  value: "",
  checked: false,
  id: undefined,
  type: TEXT,
  groupName: null,
  children: null,
  registerCellInfo() {},
  onChange() {},
  onBlur() {}
};

/**
 * Gets the cell type
 * returns booleans type flage.
 *
 * @param {string} type
 * @param {boolean} checked
 * @param {string} value
 * @return {{isInput:boolean, valueRef: string, initValue: string||boolean, RecommendedComponent: string }}
 */
function recognizeCellProps(type, checked, value) {
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
    RecommendedComponent
  };
}

/**
 * mainly reposible for user props
 * handling cell type, init value and pass it to CellEngine
 * update when cell basic change
 * like attr
 */
class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this.isCellUpdated = false;
  }

  render() {
    // console.log("Cell update");

    const {
      component: userComponent,
      valueKey,
      value,
      checked,
      id = keyGenerator("autoID"),
      type,
      groupName,
      children,
      registerCellInfo,
      onChange,
      onBlur,
      ...rest
    } = this.props;

    const {
      valueRef,
      isInput,
      initValue,
      RecommendedComponent
    } = recognizeCellProps(type, checked, value);

    const nameRef =
      valueKey || `${type}_${id}${groupName ? `_${groupName}` : ""}`;

    // register cell info in context state
    registerCellInfo({
      nameRef,
      initValue,
      groupName
    });

    this.isCellUpdated = !this.isCellUpdated;

    return (
      <CellEngine
        id={id}
        type={type}
        valueRef={valueRef}
        initValue={initValue}
        isInput={isInput}
        groupName={groupName}
        nameRef={nameRef}
        isCellUpdated={this.isCellUpdated}
        CellComponent={userComponent || RecommendedComponent}
        onChange={onChange}
        onBlur={onBlur}
        rest={rest}
      >
        {children}
      </CellEngine>
    );
  }
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

export { Cell as PureCell };

export default withcontext({
  Component: Cell,
  Consumer: ValuesConsumer,
  contextProps: ["registerCellInfo"]
});
