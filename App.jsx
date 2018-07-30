import React from 'react';

import {
  Form,
  Grid,
  Cell,
  CellItem,
  GridItem,
  ValuesProvider
} from './src/components';

import { GridProvider } from './src/components/grid/context';

export default function FormApp(props) {
  const { isIntractive, isDesignMode, onSubmit } = props;

  return (
    <GridProvider>
      <ValuesProvider>
        <Form
          onSubmit={(e, d) => {
            e.preventDefault();
            onSubmit(d);
          }}
          style={{
            backgroundColor: 'grey'
          }}
        >
          <Grid col={3} colMaxWidth="3.5fr">
            <GridItem
              style={{
                backgroundColor: 'blue'
              }}
              isHorizontal={false}
              row={8}
              rowWidth="2rem"
              col={0}
              colWidth="0.2fr"
              toCol={2}
            >
              <label>first type text</label>
              <Cell
                nameRef="souldBeCobinationOfColAndRow"
                type="input"
                value="username"
                style={{
                  fontSize: '17px'
                }}
              />
              <label text="error msg22" />
            </GridItem>
            <GridItem rowWidth="5rem">
              <Cell
                nameRef="try_button"
                type="checkbox"
                checked
                groupName="alpha"
              />
              <label>try button</label>
            </GridItem>
            <GridItem row={3} rowWidth="3rem">
              <Cell nameRef="try_not_groupde_button" type="checkbox" />
              <label>try not groupde button</label>
            </GridItem>
            <GridItem row={4}>
              <Cell id="try_button2<" type="checkbox" groupName="alpha" />
              <label>try button2</label>
            </GridItem>
            <GridItem isHorizontal={false}>
              <label>try button</label>
              <Cell nameRef="select4" type="list" value="world">
                <CellItem>hello</CellItem>
                <CellItem>world</CellItem>
                <CellItem>!</CellItem>
              </Cell>
            </GridItem>
            <GridItem isCenter>
              <button>submit</button>
            </GridItem>
          </Grid>
        </Form>
      </ValuesProvider>
    </GridProvider>
  );
}

// export { Form, Cell, CellWrapper };
