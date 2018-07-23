import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { genKeyObj } from '../../utils';
import { GridConsumer } from './context';

import withContext from '../withContext';

function location(colOrRow, to) {
  if (colOrRow && to) {
    return `${colOrRow} / ${to}`;
  }
  return `${colOrRow}`;
}

const container = {
  display: 'flex',
  backgroundColor: 'red'
};

class GridItem extends Component {
  shouldComponentUpdate(nextProps) {
    if (!this.props.cnValues.isDynamic && nextProps.cnValues.isDynamic) {
      return false;
    }
    return true;
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
    console.log('GridItem updated');

    registerCellContainer(row, toRow, rowWidth, col, toCol, colWidth);

    const cellCounter = getCellCounter();

    if (isCenter) {
      container.justifyContent = 'center';
      container.gridColumn = location(1, -1);
    } else {
      container.gridColumn = location(col, toCol);
    }

    const choosenRow = row || cellCounter;
    container.gridRow = location(choosenRow, toRow);

    if (isHorizontal) {
      container.flexDirection = 'row';
    } else {
      container.flexDirection = 'column';
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

  registerCellContainer: PropTypes.func.isRequired,
  isAllGridComponentsMounted: PropTypes.bool.isRequired,

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
