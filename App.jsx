import React from 'react';

import {
  Container,
  Label,
  Panel,
  Form,
  Button,
  Cell,
  CellItem,
  GridItem
} from './src/components';

// import { ValuesProvider } from './src/context';

import { ValuesProvider } from './src/components/cell/context';
import { GridProvider } from './src/components/grid/context';
import { ShapeProvider } from './src/components/panel/context';

export default function FormApp(props) {
  const { isIntractive, isDesignMode, onSubmit } = props;

  return (
    <ShapeProvider isDesignMode={isDesignMode} isIntractive={isIntractive}>
      <Container>
        <Label>dynamic form</Label>
        <Panel />
        <GridProvider>
          <ValuesProvider onSubmit={onSubmit}>
            <Form col={2} colMaxWidth="3.5fr">
              <GridItem
                style={{
                  backgroundColor: 'blue'
                }}
                isHorizontal={false}
                row={0}
                rowWidth="2rem"
                col={0}
                colWidth="0.2fr"
                toCol={2}
              >
                <Label>first type text</Label>
                <Cell
                  nameRef="souldBeCobinationOfColAndRow"
                  type="input"
                  value="username"
                />
                <Label text="error msg" />
              </GridItem>
              <GridItem rowWidth="5rem">
                <Cell
                  nameRef="btn1"
                  type="checkbox"
                  checked
                  groupName="alpha"
                />
                <Label>try button</Label>
              </GridItem>
              <GridItem row={3} rowWidth="3rem">
                <Cell nameRef="btn2" type="checkbox" />
                <Label>try not groupde button</Label>
              </GridItem>
              <GridItem toRow={3}>
                <Cell type="checkbox" groupName="alpha" />
                <Label>try button2</Label>
              </GridItem>
              <GridItem toCol={2}>
                <Label>try button</Label>
                <Cell nameRef="select4" type="list" value="world">
                  <CellItem>hello</CellItem>
                  <CellItem>world</CellItem>
                  <CellItem>!</CellItem>
                </Cell>
              </GridItem>
              <GridItem isCenter>
                <Button />
              </GridItem>
            </Form>
          </ValuesProvider>
        </GridProvider>
      </Container>
    </ShapeProvider>
  );
}

// export { Form, Cell, CellWrapper };
