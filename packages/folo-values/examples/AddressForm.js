/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

import Field from "../src/components/Field";
import Form from "../src/components/Form";

const AddressForm = ({ onSubmit }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Form onSubmit={onSubmit} storeID="customComponent">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              storeID="customComponent"
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Field
                  component={Checkbox}
                  storeID="customComponent"
                  type="checkbox"
                  color="secondary"
                  name="saveAddress"
                  id="saveAddress"
                  value="yes"
                />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" type="submit">
            submit
          </Button>
        </Grid>
      </Form>
    </div>
  </div>
);

export default AddressForm;
