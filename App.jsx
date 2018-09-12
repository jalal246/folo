import React from "react";

import Folio, { Form, Grid, Cell, CellItem, GridItem } from "./src";

export default function FormApp(props) {
  const { onSubmit } = props;

  return (
    <Folio>
      <Form
        onSubmit={onSubmit}
        style={{
          backgroundColor: "grey"
        }}
      >
        <Grid col={3} colMaxWidth="3.5fr">
          <GridItem
            style={{
              backgroundColor: "blue"
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
              valueKey="souldBeCobinationOfColAndRow"
              type="input"
              value="username"
              style={{
                fontSize: "17px"
              }}
            />
            <label text="error msg22" />
          </GridItem>
          <GridItem rowWidth="5rem">
            <Cell
              valueKey="try_button"
              type="checkbox"
              checked
              groupName="alpha"
            />
            <label>try button</label>
          </GridItem>
          <GridItem row={3} rowWidth="3rem">
            <Cell valueKey="try_not_groupde_button" type="checkbox" />
            <label>try not groupde button</label>
          </GridItem>
          <GridItem row={4}>
            <Cell id="try_button2<" type="checkbox" groupName="alpha" />
            <label>try button2</label>
          </GridItem>
          <GridItem isHorizontal={false}>
            <label>try button</label>
            <Cell valueKey="select4" type="list" value="world">
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
    </Folio>
  );
}
