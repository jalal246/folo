import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import CellEngine from "./CellEngine";
import cellRecognizer from "./cellRecognizer";

import { TEXT } from "../constants";

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

  /**
   * supposed to be context function
   * helps to register values and key reference
   * beacuse context values is not aware of data we have, yet.
   */
  registerCellInfo: PropTypes.func,

  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

const defaultProps = {
  component: null,
  valueKey: null,
  value: "",
  checked: false,
  id: undefined,
  type: TEXT,
  groupName: null,
  registerCellInfo() {},
  onChange() {},
  onBlur() {},
};
// `unknown_valueKey_created_at_${new Date().getTime()}`;
/**
 * mainly responsible for user props
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
    const {
      component: UserComponent,
      valueKey,
      value,
      checked,
      id,
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
      RecommendedComponent,
    } = cellRecognizer({ type, checked, value });

    const nameRef =
      valueKey ||
      (id
        ? `${type}_${id}${groupName ? `_${groupName}` : ""}`
        : `unknown_valueKey_created_at_${new Date().getTime()}`);

    // register cell info in context state
    registerCellInfo({
      nameRef,
      initValue,
      groupName,
    });

    this.isCellUpdated = !this.isCellUpdated;

    return (
      <CellEngine
        valueRef={valueRef}
        initValue={initValue}
        isInput={isInput}
        groupName={groupName}
        nameRef={nameRef}
        isCellUpdated={this.isCellUpdated}
        CellComponent={UserComponent || RecommendedComponent}
        onChange={onChange}
        onBlur={onBlur}
        rest={{ ...rest, id, type }}
      >
        {children}
      </CellEngine>
    );
  }
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;

export { Cell as PureCell };
