import React, { createContext } from 'react';
// import PropTypes from 'prop-types';
// import { INPUT } from '../constants';

const ShapeHolder = createContext();

export const { Consumer: ShapeConsumer } = ShapeHolder;

const propTypes = {};

const defaultProps = {};

export class ShapeProvider extends React.Component {
  constructor(props) {
    super(props);

    const { isDesignMode, isIntractive } = props;

    this.state = {
      isIntractive,
      isDesignMode,
      shape: {}
    };
  }

  modifyShape = type => {
    console.log(`${type} isPressed`);
  };

  toggleDesignMode = () => {
    this.setState(ps => ({ isDesignMode: !ps.isDesignMode }));
  };

  render() {
    // console.log('ShapeProvider update');

    const { shape, isIntractive, isDesignMode } = this.state;

    const { modifyShape, toggleDesignMode } = this;

    return (
      <ShapeHolder.Provider
        value={{
          isIntractive,
          shape,
          modifyShape,
          isDesignMode,
          toggleDesignMode
        }}
      >
        {this.props.children}
      </ShapeHolder.Provider>
    );
  }
}

ShapeProvider.propTypes = propTypes;
ShapeProvider.defaultProps = defaultProps;
