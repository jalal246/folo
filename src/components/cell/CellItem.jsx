import React from "react";
import PropTypes from "prop-types";

import { keyGenerator } from "../../utils";

export default function CellItem({
  component: CellComponent,
  value,
  key,
  children,
  ...other
}) {
  return (
    <CellComponent value={value} key={key} {...other}>
      {children}
    </CellComponent>
  );
}

CellItem.propTypes = {
  component: PropTypes.node,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  key: PropTypes.string,
  children: PropTypes.node.isRequired
};
CellItem.defaultProps = {
  component: "option",
  value: null,
  key: keyGenerator("autoKey")
};
