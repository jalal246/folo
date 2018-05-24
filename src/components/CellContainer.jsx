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
  constructor(props) {
    super(props);
    this.state = {};
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { grandCol, grandRow } = this.props;
  //   const { isAllGridComponentsMounted, isAutoFit } = nextProps;
  //
  //   if (isAllGridComponentsMounted && !isAutoFit) {
  //     return grandCol !== nextProps.grandCol || grandRow !== nextProps.grandRow;
  //   }
  //   return false;
  // }

  render() {
    const {
      component: CellComponent,

      row,
      toRow,

      col,
      toCol,

      style,

      setMaxColRow,

      isHorizontal,
      children
    } = this.props;

    const uniqueCellKey = genKeyObj(row, col);

    setMaxColRow(col, toCol, row, toRow);

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

    return (
      <CellComponent style={styles}>
        {cellEnhancer(children, uniqueCellKey)}
      </CellComponent>
    );
  }
}

const propTypes = {
  component: PropTypes.node,

  col: PropTypes.number,
  row: PropTypes.number,
  toCol: PropTypes.number,
  toRow: PropTypes.number,

  isHorizontal: PropTypes.bool,
  style: PropTypes.object
};
const defaultProps = {
  component: 'div',

  col: null,
  row: null,
  toCol: null,
  toRow: null,

  isHorizontal: true,
  style: {}
};

CellContainer.propTypes = propTypes;
CellContainer.defaultProps = defaultProps;

export default withContext(CellContainer, GridConsumer);
