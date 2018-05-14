import React from 'react';
import PropTypes from 'prop-types';

import { ValuesConsumer, withContext } from '../context';

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

export function Form({ component: FormComponent, children }) {
  return <FormComponent>{children}</FormComponent>;
}

Form.propTypes = {
  component: PropTypes.node
};
Form.defaultProps = {
  component: 'form'
};

export function ButtonNative({ component: ButtonComponent, onClick, text }) {
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
