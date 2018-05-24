import React from 'react';

import {
  Container,
  Label,
  Panel,
  Form,
  Button,
  Cell,
  CellItem,
  CellContainer
} from './src/components';

import {
  ValuesProvider,
  GridProvider,
  // GlobalStaticSettingsProvider,
  ShapeProvider
} from './src/context';

export default function FormApp(props) {
  const { isIntractive, isDesignMode, onSubmit } = props;

  return (
    <ShapeProvider isDesignMode={isDesignMode} isIntractive={isIntractive}>
      <Container>
        <Label>dynamic form</Label>
        <Panel />
        <GridProvider>
          <ValuesProvider onSubmit={onSubmit}>
            <Form col={2}>
              <CellContainer isHorizontal>
                <Label>first type text</Label>
                <Cell
                  nameRef="souldBeCobinationOfColAndRow"
                  type="input"
                  value="username"
                />
                <Label text="error msg" />
              </CellContainer>
              <CellContainer isHorizontal row={10} toRow={14}>
                <Cell
                  nameRef="btn1"
                  type="checkbox"
                  checked
                  groupName="alpha"
                />
                <Label>try button</Label>
              </CellContainer>
              <CellContainer isHorizontal /* col={3} row={3} */>
                <Cell nameRef="btn2" type="checkbox" groupName="alpha" />
                <Label>try button</Label>
              </CellContainer>
              <CellContainer isHorizontal /* col={3} */>
                <Cell type="checkbox" groupName="alpha2" />
                <Label>try button</Label>
              </CellContainer>
              <CellContainer isHorizontal /* row={5} */>
                <Label>try button</Label>
                <Cell
                  nameRef="select4"
                  type="list"
                  value="world"
                  groupName="alpha2"
                >
                  <CellItem>hello</CellItem>
                  <CellItem>world</CellItem>
                  <CellItem>!</CellItem>
                </Cell>
              </CellContainer>
              {/* <Button /> */}
            </Form>
          </ValuesProvider>
        </GridProvider>
      </Container>
    </ShapeProvider>
  );
}

// export { Form, Cell, CellWrapper };
