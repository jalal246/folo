import React, { createContext } from 'react';
import PropTypes from 'prop-types';
// import { INPUT } from '../constants';

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

const propTypes = {};

const defaultProps = {};

export class GridProvider extends React.Component {
  constructor(props) {
    super(props);

    this.grandCol = 0;
    this.grandRow = 0;

    // calculatedRow,
    // calculatedCol,

    this.state = {
      isAllGridComponentsMounted: false,
      grandCol: 0,
      grandRow: 0
    };
  }

  componentDidMount() {
    this.setState({
      isAllGridComponentsMounted: true,
      grandCol: this.grandCol,
      grandRow: this.grandRow
    });
  }

  setMaxColRow = (col, toCol, row, toRow) => {
    if (col > toCol && col > this.grandCol) {
      this.grandCol = col;
    } else if (toCol > this.grandCol) {
      this.grandCol = toCol;
    }

    //
    if (row > toRow && row > this.grandRow) {
      this.grandRow = row;
    } else if (toRow > this.grandRow) {
      this.grandRow = toRow;
    }
  };

  render() {
    console.log('GridProvider update');

    const { isAllGridComponentsMounted, grandCol, grandRow } = this.state;

    const { setMaxColRow } = this;

    return (
      <GridController.Provider
        value={{
          isAllGridComponentsMounted,

          setMaxColRow,

          grandCol,
          grandRow
        }}
      >
        {this.props.children}
      </GridController.Provider>
    );
  }
}

GridProvider.propTypes = propTypes;
GridProvider.defaultProps = defaultProps;
