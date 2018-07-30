import React from 'react';

import {
  ValuesProvider,
  Cell,
  CellItem,
  Form,
  GridProvider,
  Grid,
  GridItem
} from './components';

export default function Folio({ children }) {
  return (
    <GridProvider>
      <ValuesProvider>{children}</ValuesProvider>
    </GridProvider>
  );
}

export { Form, Grid, Cell, CellItem, GridItem };
