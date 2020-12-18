/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

import Field from "../components/Field";
import Form from "../components/Form";

const FormAcceptComponent = ({ onSubmit }) => (
  <Form
    storeID="FormAcceptComponent"
    style={{
      width: "60%",
    }}
    onSubmit={onSubmit}
  >
    <Field
      component={TextField}
      storeID="FormAcceptComponent"
      label="username"
      valueKey="username"
      type="text"
      margin="normal"
    />

    <List>
      <ListItem key={0} dense button>
        <Field
          component={Checkbox}
          storeID="FormAcceptComponent"
          disableRipple
          valueKey="NYC"
          type="checkbox"
          groupName="city"
        />
        <ListItemText primary="NYC" />
        <ListItem key={1} dense button>
          <Field
            component={Checkbox}
            storeID="FormAcceptComponent"
            disableRipple
            valueKey="LA"
            type="checkbox"
            groupName="city"
          />
          <ListItemText primary="LA" />
        </ListItem>
      </ListItem>
    </List>

    <Button
      variant="contained"
      type="submit"
      style={{
        width: "50%",
        margin: "0 auto",
      }}
    >
      submit
    </Button>
  </Form>
);

export default {
  title: "Forms/Custom Component",
  component: FormAcceptComponent,
  argTypes: {
    onSubmit: {
      action: "onSubmit",
    },
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <FormAcceptComponent {...args} />;

export const Basic = Template.bind({});
