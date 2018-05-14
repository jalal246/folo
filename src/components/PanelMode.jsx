import React from 'react';
import PropTypes from 'prop-types';

import { ShapeConsumer, withContext } from '../context';

const propTypes = {};
const defaultProps = {};

class PanelMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // onClick  () => {};
  handleChange = () => {
    this.props.toggleDesignMode();
  };

  render() {
    return (
      <div>
        <label htmlFor="mode">
          <input id="mode" type="checkbox" onChange={this.handleChange} />
          Design mode
        </label>
      </div>
    );
  }
}

PanelMode.propTypes = propTypes;
PanelMode.defaultProps = defaultProps;

export default withContext(PanelMode, ShapeConsumer);
