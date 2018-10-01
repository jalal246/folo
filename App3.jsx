import React from "react";

import Folio, { Form, Grid, Cell, CellItem, GridItem } from "./src";

export default function FormApp(props) {
  const { onSubmit } = props;

  return (
    <Folio>
      {/* <Form
        onSubmit={onSubmit}
        style={{
          backgroundColor: "red",
          width: "70%"
        }}
      > */}
      <Grid
        style={{
          color: "red"
        }}
        colMinWidth="10px"
        row="5"
        rowMinWidth="2px"
        rowMaxWidth="10px"
      >
        {/* <GridItem
            style={{
              backgroundColor: "blue"
            }}
            isHorizontal={false}
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
          </GridItem> */}
        <div>
          <Cell valueKey="try_not_groupde_button" type="checkbox" />
          <label>try not groupde button</label>
        </div>

        <div>
          <Cell id="try_button2<" type="checkbox" groupName="alpha" />
          <label>try button2</label>
        </div>

        <div>
          <label>try button</label>
          <Cell valueKey="select4" type="list" value="world">
            <CellItem>hello</CellItem>
            <CellItem>world</CellItem>
            <CellItem>!</CellItem>
          </Cell>
        </div>

        {/* <GridItem isCenter>
            <button>submit</button>
          </GridItem> */}
      </Grid>
      {/* </Form> */}
    </Folio>
  );
}
