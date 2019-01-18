import React, { createContext } from "react";

import AutoPositionCell from "./AutoPositionCell";

const GridController = createContext();

export const { Consumer: GridConsumer } = GridController;

export class GridProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.AutoPositionCell = new AutoPositionCell();
  }

  render() {
    // console.log('GridProvider update');
    const { children } = this.props;

    const { autoPosition } = this.AutoPositionCell;

    return (
      <GridController.Provider
        value={{
          autoPosition
        }}
      >
        {children}
      </GridController.Provider>
    );
  }
}
