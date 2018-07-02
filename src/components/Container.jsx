import React from 'react';
import PropTypes from 'prop-types';

export default function Container({
  component: ContainerComponent,
  children,
  other
}) {
  return <ContainerComponent {...other}>{children}</ContainerComponent>;
}

Container.propTypes = {
  component: PropTypes.node
};
Container.defaultProps = {
  component: 'div'
};
