import React, { Component } from "react";
import PropTypes from "prop-types";

import { ValuesConsumer } from "./context";

import withContext from "../withContext";

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  valueRef: PropTypes.string.isRequired,
  initValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  isInput: PropTypes.bool.isRequired,
  groupName: PropTypes.string,
  nameRef: PropTypes.string.isRequired,
  isCellUpdated: PropTypes.bool.isRequired,
  CellComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  rest: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string)
    ])
  ).isRequired,

  /** context props */
  updateCellValue: PropTypes.func.isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  ),

  children: PropTypes.node
};

const defaultProps = {
  groupName: null,
  values: {},
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
    const {
      nameRef,
      groupName,
      isCellUpdated,
      values: { [nameRef]: contextValue }
    } = this.props;
    const {
      values: { [nameRef]: nextContextValue },
      isCellUpdated: nextCellUpdated
    } = nextProps;

    const { localValue } = this.state;

    if (groupName && contextValue !== nextContextValue) {
      this.setState({
        localValue: nextContextValue
      });
    }
    return (
      localValue !== nextState.localValue || isCellUpdated !== nextCellUpdated
    );
  }

  handleEvent(e) {
    const {
      nameRef,
      valueRef,
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
          groupName
        });
      }
      onChange(e);
    }
  }

  render() {
    // console.log("CellEngine update");
    const { CellComponent, id, type, valueRef, rest, children } = this.props;

    const { localValue } = this.state;

    const { handleEvent } = this;

    return (
      <CellComponent
        {...{ [valueRef]: localValue }}
        type={type}
        id={id}
        onChange={handleEvent}
        onBlur={handleEvent}
        {...rest}
      >
        {children}
      </CellComponent>
    );
  }
}

CellEngine.propTypes = propTypes;
CellEngine.defaultProps = defaultProps;

export { CellEngine as PureCellEngine };

export default withContext({
  Component: CellEngine,
  Consumer: ValuesConsumer,
  contextProps: ["updateCellValue", "values"]
});
