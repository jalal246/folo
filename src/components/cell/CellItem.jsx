import React from 'react';
import PropTypes from 'prop-types';

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
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  key: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
CellItem.defaultProps = {
  component: 'option'
};
