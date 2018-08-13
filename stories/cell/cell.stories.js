import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TextField from '@material-ui/core/TextField';

import Cell from '../../src/components/cell/Cell';
import CellItem from '../../src/components/cell/CellItem';

const required = {
  registerCellInfo: action('registerCellInfo'),
  updateCellValue: action('updateCellValue'),
  values: {}
};

storiesOf('Cell', module)
  .add('default', () => <Cell cn={required} />)
  .add('with nameRef', () => <Cell cn={required} nameRef="storybook_test" />)
  .add('with init value', () => <Cell cn={required} value="Hi there!" />)
  .add('with groupName', () => (
    <Cell cn={required} checked type="radio" groupName="gender" />
  ))
  .add('with component', () => (
    <Cell cn={required} component={TextField} label="Name" margin="normal" />
  ))
  .add('with handlers', () => (
    <Cell
      cn={required}
      onChange={action('onChange')}
      onBlur={action('onBlur')}
    />
  ))
  .add('with items', () => (
    <Cell cn={required} type="select">
      <CellItem>A</CellItem>
      <CellItem>B</CellItem>
      <CellItem>C</CellItem>
    </Cell>
  ));

storiesOf('Cell/type', module)
  .add('text', () => <Cell cn={required} type="text" />)
  .add('password', () => <Cell cn={required} type="password" />)
  .add('email', () => <Cell cn={required} type="email" />)
  .add('radio', () => <Cell cn={required} type="radio" />)
  .add('checkbox', () => <Cell cn={required} type="checkbox" />)
  .add('color', () => <Cell cn={required} type="color" />)
  .add('date', () => <Cell cn={required} type="date" />);
