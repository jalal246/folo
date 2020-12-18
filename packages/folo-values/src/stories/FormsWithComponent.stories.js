/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Field from "../components/Field";
import Form from "../components/Form";

export default {
  title: "Forms/Custom components",
  component: Form,
  onSubmit: {
    action: "onSubmit",
  },
};

export function AddressForm() {
  return (
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
        <Form>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                storeID="customComponent"
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
        </Form>
      </div>
    </div>
  );
}
