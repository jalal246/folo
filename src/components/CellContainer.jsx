import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { genKeyObj } from '../utils';
import { GridConsumer, withContext } from '../context';

function cellEnhancer(children, row, col) {
  const uniqueCellKey = genKeyObj(row, col);

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
  }
  return `${colOrRow}`;
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
      isCenter,

      style,

      registerCellContainer,

      isHorizontal,
      children
    } = this.props;
    console.log('CellContainer updated');

    const cellCounter = registerCellContainer(
      row,
      toRow,
      rowWidth,
      col,
      toCol,
      colWidth
    );

    const container = {
      display: 'flex',
      backgroundColor: 'red'
    };

    const choosenRow = row || cellCounter;
    const choosenCol = col || 0;

    if (isCenter) {
      container.justifyContent = 'center';
      container.gridColumn = location(1, -1);
    } else {
      container.gridColumn = location(choosenCol, toCol);
    }

    container.gridRow = location(choosenRow, toRow);

    if (isHorizontal) {
      container.flexDirection = 'row';
    } else {
      container.flexDirection = 'column';
    }
    //
    const styles = Object.assign({}, container, style);

    return (
      <CellComponent style={styles}>
        {cellEnhancer(children, choosenRow, choosenCol)}
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
