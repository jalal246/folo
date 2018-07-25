import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GridConsumer } from './context';

import withContext from '../withContext';

import { keyGenerator } from '../../utils';

function location(colOrRow, to) {
  if (colOrRow && to) {
    return `${colOrRow} / ${to}`;
  }
  return `${colOrRow}`;
}

const CENTER = 'center';
const ROW = 'row';
const COLUMN = 'column';

const container = {
  display: 'flex',
  backgroundColor: 'red'
};

class GridItem extends Component {
  state = {
    key: keyGenerator('gridItem')
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      component: CellComponent,

      row,
      toRow,
      rowWidth,

      col,
      toCol,
      colWidth,

      isCenter,

      style,

      cnFuncs: { registerCellContainer, getCellCounter },

      isHorizontal,
      children
    } = this.props;

    const { key } = this.state;

    console.log('GridItem updated');

    registerCellContainer({
      key,
      row,
      toRow,
      rowWidth,
      col,
      toCol,
      colWidth
    });

    const cellCounter = getCellCounter(key);

    if (isCenter) {
      container.justifyContent = CENTER;
      container.gridColumn = location(1, -1);
    } else {
      container.gridColumn = location(col, toCol);
    }

    const choosenRow = row || cellCounter;

    container.gridRow = location(choosenRow, toRow);

    if (isHorizontal) {
      container.flexDirection = ROW;
    } else {
      container.flexDirection = COLUMN;
    }
    //
    const styles = Object.assign({}, container, style);

    return <CellComponent style={styles}>{children}</CellComponent>;
  }
}

const propTypes = {
  component: PropTypes.node,

  row: PropTypes.number,
  toRow: PropTypes.number,
  rowWidth: PropTypes.string,

  col: PropTypes.number,
  toCol: PropTypes.number,
  colWidth: PropTypes.string,
  isCenter: PropTypes.bool,

  style: PropTypes.objectOf(PropTypes.string),

  cnFuncs: PropTypes.shape({
    registerCellContainer: PropTypes.func.isRequired
  }).isRequired,

  isHorizontal: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  component: 'div',

  row: null,
  toRow: null,
  rowWidth: null,

  col: 0,
  toCol: null,
  colWidth: null,
  isCenter: false,

  style: {},

  isHorizontal: true
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;

export default withContext(GridItem, GridConsumer);
