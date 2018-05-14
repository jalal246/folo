import React from 'react';

import PanelDesignController from './PanelDesignController';
import PanelMode from './PanelMode';

import { ShapeConsumer, withContext } from '../context';

function Panel({ isIntractive }) {
  return isIntractive ? (
    <React.Fragment>
      <PanelMode />
      <PanelDesignController />
    </React.Fragment>
  ) : null;
}

export default withContext(Panel, ShapeConsumer);
