import React, { Component } from "react";
import PropTypes from "prop-types";

import { ValuesConsumer } from "./context";

import withContext from "../withContext";

const propTypes = {
  CellComponent: PropTypes.node.isRequired,

  type: PropTypes.string.isRequired,
  nameRef: PropTypes.string.isRequired,
  groupName: PropTypes.string,

  /** context props */
  updateCellValue: PropTypes.func,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  ),

  onChange: PropTypes.func,
  onBlur: PropTypes.func,

  children: PropTypes.node
};

const defaultProps = {
  groupName: null,

  /** context props */
  updateCellValue() {},
  values: {},

  onChange() {},
  onBlur() {},

  children: null
};

class CellEngine extends Component {
  constructor(props) {
    super(props);

    const { initValue } = props;

    this.state = { localValue: initValue };

    this.handleEvent = this.handleEvent.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { nameRef, groupName, cellUpdated } = this.props;
    const {
      values: { [nameRef]: contextValue },
      cellUpdated: nextCellUpdated
    } = nextProps;

    const { localValue } = this.state;

    if (groupName && contextValue !== localValue) {
      this.setState({
        localValue: contextValue
      });
    }

    return (
      localValue !== nextState.localValue || cellUpdated !== nextCellUpdated
    );
  }

  handleEvent(e) {
    const {
      nameRef,
      valueRef,
      cellType,
      isInput,
      groupName,
      updateCellValue,
      onBlur,
      onChange
    } = this.props;
    const {
      target: { [valueRef]: newValue },
      type
    } = e;

    if (type === "blur") {
      updateCellValue({
        nameRef,
        newValue,
        cellType,
        groupName
      });
      onBlur(e);
    } else {
      this.setState({
        localValue: newValue
      });
      if (!isInput) {
        updateCellValue({
          nameRef,
          newValue,
          cellType,
          groupName
        });
      }
      onChange(e);
    }
  }

  render() {
    // console.log("CellEngine update");

    const {
      CellComponent,

      valueRef,
      isSelect,
      isInput,
      initValue,
      cellType,
      nameRef,
      cellUpdated,
      groupName,

      /** context props */
      updateCellValue,
      getContextValues,
      values,

      onChange,
      onBlur,

      children,
      ...other
    } = this.props;

    const { localValue } = this.state;

    const { handleEvent } = this;

    const cellProps = {
      /**
       * valueRef is value for regular input
       * checked when button
       */
      [valueRef]: localValue,
      // all type bind to it
      onChange: handleEvent,
      onBlur: handleEvent,
      ...other
    };

    return isSelect ? (
      <CellComponent {...cellProps}>{children}</CellComponent>
    ) : (
      <CellComponent {...cellProps} />
    );
  }
}

CellEngine.propTypes = propTypes;
CellEngine.defaultProps = defaultProps;

export { CellEngine as PureCellEngine };

export default withContext({
  Component: CellEngine,
  Consumer: ValuesConsumer,
  contextProps: ["updateCellValue", "getContextValues", "values"]
});
