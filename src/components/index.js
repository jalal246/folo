import withContext from './withContext';

import Form from './Form';

import { ValuesConsumer, ValuesProvider, Cell, CellItem } from './cell';

import { GridConsumer, GridProvider, Grid, GridItem } from './grid';

const WrappedCell = withContext(Cell, ValuesConsumer);
const WrappedGridItem = withContext(GridItem, GridConsumer);

export {
  ValuesProvider,
  GridProvider,
  Form,
  WrappedCell as Cell,
  CellItem,
  Grid,
  WrappedGridItem as GridItem
};
