import React from "react";

import Folio, { Form, Grid, Cell, CellItem, GridItem } from "./src";

export default function FormApp(props) {
  const { onSubmit } = props;

  return (
    <Folio>
      <Form
        onSubmit={onSubmit}
        style={{
          backgroundColor: "rgb(247, 247, 247)",
          width: "70%"
        }}
      >
        <Grid col={3} colMaxWidth="3.5fr">
          <GridItem
            col={3}
            row={2}
            style={{
              backgroundColor: "red"
            }}
            isHorizontal={false}
          >
            <label>1</label>
          </GridItem>
          <GridItem
            col={2}
            row={2}
            style={{
              backgroundColor: "red"
            }}
            isHorizontal={false}
          >
            <label>2</label>
          </GridItem>
          <GridItem
            col={1}
            row={4}
            style={{
              backgroundColor: "red"
            }}
            isHorizontal={false}
          >
            <label>3</label>
          </GridItem>
          <GridItem
            col={2}
            row={4}
            style={{
              backgroundColor: "red"
            }}
            isHorizontal={false}
          >
            <label>4</label>
          </GridItem>
          <GridItem
            col={3}
            row={9}
            style={{
              backgroundColor: "red"
            }}
            isHorizontal={false}
          >
            <label>5</label>
          </GridItem>
          <GridItem
            col={3}
            style={{
              backgroundColor: "red"
            }}
            isHorizontal={false}
          >
            <label>6</label>
          </GridItem>
        </Grid>
      </Form>
    </Folio>
  );
}
