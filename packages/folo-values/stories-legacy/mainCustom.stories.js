import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

import { MAIN_APP, CUSTOM } from "./_directories";

import { FoloValues, Form, Cell } from "../src";

storiesOf(`${MAIN_APP}/${CUSTOM}`, module).add(
  "using component form material-ui",
  () => (
    <FoloValues>
      <Form
        onSubmit={action("onSubmit")}
        style={{
          width: "60%"
        }}
      >
        <Cell
          component={TextField}
          label="Password"
          valueKey="pass"
          type="password"
          margin="normal"
        />

        <List>
          <ListItem key={0} dense button>
            <Cell
              component={Checkbox}
              disableRipple
              valueKey="NYC"
              type="checkbox"
            />
            <ListItemText primary="NYC" />
          </ListItem>
          <ListItem key={1} dense button>
            <Cell
              component={Checkbox}
              disableRipple
              valueKey="LA"
              type="checkbox"
            />
            <ListItemText primary="LA" />
          </ListItem>
        </List>

        <Button
          variant="contained"
          type="submit"
          style={{
            width: "50%",
            margin: "0 auto"
          }}
        >
          submit
        </Button>
      </Form>
    </FoloValues>
  )
);
