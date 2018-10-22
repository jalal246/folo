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
   * @see See [key](https://reactjs.org/docs/lists-and-keys.html) for a list of color names
   */
  // key: PropTypes.string,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  component: "option"
};

/**
 * Used only when the Cell type is list
 * render option as defautl
 */
export default function CellItem({
  component: CellComponent,
  children,
  ...other
}) {
  return <CellComponent {...other}>{children}</CellComponent>;
}

CellItem.propTypes = propTypes;
CellItem.defaultProps = defaultProps;
