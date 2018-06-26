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
  component: PropTypes.node
};
CellItem.defaultProps = {
  component: 'option'
};
