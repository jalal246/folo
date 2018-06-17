import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { genKeyObj } from '../utils';
import { GridConsumer, withContext } from '../context';

function cellEnhancer(children, uniqueCellKey) {
  return React.Children.map(children, child => {
    const name = child.type.displayName;

    const { props: { nameRef, id, htmlFor } } = child;
    if (name === 'Cell') {
      if (nameRef && id) {
        return child;
      }
      return React.cloneElement(child, {
        ...(!id && { id: uniqueCellKey }),
        ...(!nameRef && { nameRef: uniqueCellKey })
      });
    } else if (name === 'Label' && !htmlFor) {
      return React.cloneElement(child, {
        htmlFor: uniqueCellKey
      });
    }
    return child;
  });
}

function location(colOrRow, to) {
  if (colOrRow && to) {
    return `${colOrRow} / ${to}`;
  } else if (colOrRow) {
    return `${colOrRow}`;
  }
  return `span ${to}`;
}

class CellContainer extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      !this.props.isAllGridComponentsMounted &&
      nextProps.isAllGridComponentsMounted
    ) {
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

      style,

      registerCellContainer,

      isHorizontal,
      children
    } = this.props;
    console.log('CellContainer updated');

    registerCellContainer(row, toRow, rowWidth, col, toCol, colWidth);
    const area = {};

    if (col || toCol) {
      area.gridColumn = location(col, toCol);
    }

    if (row || toRow) {
      area.gridRow = location(row, toRow);
    }

    const styles = Object.assign(
      {},
      {
        backgroundColor: 'red',
        display: 'block',
        width: '100%'
      },
      area,
      style
    );

    const uniqueCellKey = genKeyObj(row, col);

    return (
      <CellComponent style={styles}>
        {cellEnhancer(children, uniqueCellKey)}
      </CellComponent>
    );
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

  isHorizontal: PropTypes.bool,
  style: PropTypes.object
};
const defaultProps = {
  component: 'div',

  col: null,
  row: null,
  toCol: null,
  toRow: null,
  rowWidth: null,
  colWidth: null,

  isHorizontal: true,
  style: {}
};

CellContainer.propTypes = propTypes;
CellContainer.defaultProps = defaultProps;

export default withContext(CellContainer, GridConsumer);
