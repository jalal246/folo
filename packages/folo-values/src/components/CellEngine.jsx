import React, { Component } from "react";
import PropTypes from "prop-types";

import withcontext from "@folo/withcontext";

import { ValuesConsumer } from "./context";

const propTypes = {
  /**
   * value ref to the element
   * value or checked; depends on the type
   * detected by parent Cell
   */
  valueRef: PropTypes.string.isRequired,
  initValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,

  /**
   * only true when cell is button
   */
  isInput: PropTypes.bool.isRequired,

  /**
   * group name in case the cell is group-toggle
   * this is only valid for boolean cells
   */
  groupName: PropTypes.string,

  /**
   * key used to store value in values object
   * that owned by context
   * orginal name is valueKey
   * changing its name after being
   */
  nameRef: PropTypes.string.isRequired,

  /**
   * flag chane its value when the parent Cell render
   * this flag is created for props that changed in paren level only
   * which require this component to update
   */
  isCellUpdated: PropTypes.bool.isRequired,

  /**
   * custom render-component
   */
  CellComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,

  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

  /**
   * rest object contains extra props
   * passed by user to Cell
   */
  rest: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.objectOf(PropTypes.string)
    ])
  ).isRequired,

  /**
   * a context function
   * trigger the context to when a updating the value
   */
  updateCellValue: PropTypes.func.isRequired,

  /**
   * cells values, owned by context
   */
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  )
};

const defaultProps = {
  groupName: null,
  values: {}
};

/**
 * manage value updates for all cell types
 * all controlled
 */
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
    const { CellComponent, valueRef, rest, children } = this.props;

    const { localValue } = this.state;

    const { handleEvent } = this;

    return (
      <CellComponent
        {...{ [valueRef]: localValue }}
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

export default withcontext({
  Component: CellEngine,
  Consumer: ValuesConsumer,
  contextProps: ["updateCellValue", "values"]
});
