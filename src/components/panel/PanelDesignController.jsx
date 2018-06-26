import React from 'react';
// import PropTypes from 'prop-types';

import { DIRECTIONS } from '../../constants';
import { ShapeConsumer, withContext } from './context';

const propTypes = {};
const defaultProps = {};

class PanelDesignController extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isDesignMode !== nextProps.isDesignMode;
  }

  onClick = e => {
    this.props.modifyShape(e.target.id);
  };

  render() {
    return this.props.isDesignMode ? (
      <div>
        {DIRECTIONS.map(({ id, symbol }) => (
          <button id={id} key={id} onClick={this.onClick}>
            {symbol}
          </button>
        ))}
      </div>
    ) : null;
  }
}

PanelDesignController.propTypes = propTypes;
PanelDesignController.defaultProps = defaultProps;

export default withContext(PanelDesignController, ShapeConsumer);
