import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { genKeyObj } from '../utils';

const propTypes = {
  component: PropTypes.node,

  col: PropTypes.number,
  row: PropTypes.number,

  isHorizontal: PropTypes.bool
};
const defaultProps = {
  component: 'div',

  col: 0,
  row: 0,

  isHorizontal: true
};

class CellContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      component: CellComponent,
      row,
      col,
      isHorizontal,
      children
    } = this.props;
    const uniqueCellKey = genKeyObj(row, col);
    return (
      <CellComponent>
        {React.Children.map(children, child => {
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
        })}
      </CellComponent>
    );
  }
}

CellContainer.propTypes = propTypes;
CellContainer.defaultProps = defaultProps;

export default CellContainer;
