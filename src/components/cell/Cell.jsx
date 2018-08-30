import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import CellEngine from "./CellEngine";

import { ValuesConsumer } from "./context";

import { keyGenerator } from "../../utils";
import withContext from "../withContext";

import {
  VALUE,
  CHECKED,
  TEXT,
  SELECT,
  LIST,
  CHECKBOX,
  RADIO,
  INPUT,
  BTN
} from "./constants";

const propTypes = {
  component: PropTypes.node,
  valueKey: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  groupName: PropTypes.string,
  children: PropTypes.node,
  registerCellInfo: PropTypes.func
};

const defaultProps = {
  component: null,
  valueKey: null,
  value: "",
  checked: false,
  id: keyGenerator("autoID"),
  type: TEXT,
  groupName: null,
  children: null,
  registerCellInfo() {}
};

/**
 * Gets the cell type
 * returns booleans type flage.
 *
 * @param {string} cell_type
 * @return {Object} - isBtn, isSelect, isInput
 */
function recognizeCellType(type, checked, value) {
  let isSelect = false;
  let isInput = false;
  let RecommendedComponent = INPUT;
  let valueRef = VALUE;
  let initValue = value;
  let cellType = INPUT;

  if (type === SELECT || type === LIST) {
    isSelect = true;
    RecommendedComponent = SELECT;
    cellType = SELECT;
  } else if (type === CHECKBOX || type === RADIO) {
    valueRef = CHECKED;
    initValue = checked;
    cellType = BTN;
  } else {
    isInput = true;
  }

  return {
    isSelect,
    isInput,
    valueRef,
    initValue,
    cellType,
    RecommendedComponent
  };
}

class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this.cellUpdated = false;
  }

  render() {
    // console.log("Cell update");

    const {
      component: userComponent,
      valueKey,
      value,
      checked,
      id,
      type,
      groupName,
      children,
      registerCellInfo,
      ...rest
    } = this.props;

    const {
      valueRef,
      isSelect,
      isInput,
      initValue,
      cellType,
      RecommendedComponent
    } = recognizeCellType(type, checked, value);

    const nameRef =
      valueKey || `${type}_${id}${groupName ? `_${groupName}` : ""}`;

    // register cell info in context state
    registerCellInfo({
      nameRef,
      initValue,
      groupName
    });

    this.cellUpdated = !this.cellUpdated;

    return (
      <CellEngine
        id={id}
        type={type}
        valueRef={valueRef}
        initValue={initValue}
        isSelect={isSelect}
        isInput={isInput}
        cellType={cellType}
        groupName={groupName}
        nameRef={nameRef}
        cellUpdated={this.cellUpdated}
        CellComponent={userComponent || RecommendedComponent}
        {...rest}
      >
        {children}
      </CellEngine>
    );
  }
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

export { Cell as PureCell };

export default withContext({
  Component: Cell,
  Consumer: ValuesConsumer,
  contextProps: ["registerCellInfo"]
});
