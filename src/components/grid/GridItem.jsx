import React, { PureComponent } from 'react';
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

class GridItem extends PureComponent {
  state = {
    key: keyGenerator('gridItem')
  };

  componentWillUnmount() {
    this.props.cnFuncs.remCellPosition(this.state.key);
  }

  render() {
    const {
      component: CellComponent,

      row,
      toRow,

      col,
      toCol,

      isCenter,

      style,

      cnFuncs: { cellAutoPosition },

      isHorizontal,
      children
    } = this.props;

    const { key } = this.state;

    console.log('GridItem updated');

    const autoPosition = cellAutoPosition(key, row, toRow);

    console.log(col);
    if (isCenter) {
      container.justifyContent = CENTER;
      container.gridColumn = location(1, -1);
    } else if (col || toCol) {
      container.gridColumn = location(col, toCol);
    }

    container.gridRow = location(autoPosition, toRow);

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

  col: PropTypes.number,
  toCol: PropTypes.number,
  isCenter: PropTypes.bool,

  style: PropTypes.objectOf(PropTypes.string),

  cnFuncs: PropTypes.shape({
    cellAutoPosition: PropTypes.func.isRequired,
    remCellPosition: PropTypes.func.isRequired
  }).isRequired,

  isHorizontal: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  component: 'div',

  row: null,
  toRow: null,

  col: null,
  toCol: null,
  isCenter: false,

  style: {},

  isHorizontal: true
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;

export default withContext(GridItem, GridConsumer);
