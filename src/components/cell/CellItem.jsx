import React from "react";
import PropTypes from "prop-types";

import componentShape from "../shapes/componentShape";

// import { keyGenerator } from "../../utils";

const propTypes = {
  /**
   * custom render-component
   */
  component: componentShape,
  /**
   * option value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @see See [key](https://reactjs.org/docs/lists-and-keys.html) for a list of color names
   */
  // key: PropTypes.string,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  component: "option",
  value: null
  // key: keyGenerator("autoKey")
};

/**
 * Used only when the Cell type is list
 * render option as defautl
 */
export default function CellItem({
  component: CellComponent,
  value,
  children,
  ...other
}) {
  return (
    <CellComponent value={value} {...other}>
      {children}
    </CellComponent>
  );
}

CellItem.propTypes = propTypes;
CellItem.defaultProps = defaultProps;
