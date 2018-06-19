import React from 'react';
import PropTypes from 'prop-types';

import { ValuesConsumer, GridConsumer, withContext } from '../context';
import Grid from './Grid';

export function Container({ component: ContainerComponent, children, other }) {
  return <ContainerComponent {...other}>{children}</ContainerComponent>;
}

Container.propTypes = {
  component: PropTypes.node
};
Container.defaultProps = {
  component: 'div'
};

export function Label({
  component: LabelComponent,
  htmlFor,
  children,
  ...other
}) {
  return (
    <LabelComponent htmlFor={htmlFor} {...other}>
      {children}
    </LabelComponent>
  );
}
Label.propTypes = {
  component: PropTypes.node
};
Label.defaultProps = {
  component: 'label'
};
Label.displayName = 'Label';

const container = {
  display: 'grid',
  justifyItems: 'stretch',
  alignItems: 'stretch'
};

export function Form({
  component: FormComponent,
  style,
  className,
  children,
  ...other
}) {
  return (
    <FormComponent style={style} className={className}>
      <Grid {...other}>{children}</Grid>
    </FormComponent>
  );
}

Form.propTypes = {
  component: PropTypes.node,
  isAutoFit: PropTypes.bool,
  colNumber: PropTypes.number
};
Form.defaultProps = {
  component: 'form',
  isAutoFit: true,
  colNumber: null
};

export function ButtonNative({
  component: ButtonComponent,
  onClick,
  text,
  biggestCol
}) {
  console.log(biggestCol);
  return (
    <ButtonComponent type="button" onClick={onClick}>
      {text}
    </ButtonComponent>
  );
}

export const Button = withContext(ButtonNative, ValuesConsumer);

ButtonNative.propTypes = {
  component: PropTypes.node,
  onClick: PropTypes.func,
  text: PropTypes.string
};
ButtonNative.defaultProps = {
  component: 'button',
  onClick() {},
  text: 'submit'
};
