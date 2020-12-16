/* eslint-disable import/no-extraneous-dependencies */
import React from "react";

import { storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import TextField from "@material-ui/core/TextField";

import { Field } from "../src";

// import { MAIN_APP, Field } from "./_directories";

const PURE_CELL = "PureCell";
const TYPE = "type";

const CONTEXT = "context";

/**
 * directory for PureCell
 */
// storiesOf(`${MAIN_APP}/${Field}/${PURE_CELL}`, module)
//   .add("default", () => <PureCell />)
//   .add("with init value", () => <PureCell value="Hi there!" />)
//   .add("with button type and groupName", () => (
//     <PureCell checked type="radio" groupName="gender" />
//   ))
//   .add("with component", () => (
//     <PureCell component={TextField} label="Name" margin="normal" />
//   ))
//   .add("with handlers", () => (
//     <PureCell onChange={action("onChange")} onBlur={action("onBlur")} />
//   ))
//   .add("with items", () => (
//     <PureCell type="select">
//       <option>A</option>
//       <option>B</option>
//       <option>C</option>
//     </PureCell>
//   ));

/**
 * directory for types
 */

//  .add("text", () => <Field type="text" />)
//   .add("password", () => <Field type="password" />)
//   .add("email", () => <Field type="email" />)
//   .add("radio", () => <Field type="radio" />)
//   .add("checkbox", () => <Field type="checkbox" />)
//   .add("color", () => <Field type="color" />)
//   .add("date", () => <Field type="date" />);

/**
 * directory connected with context
 */

// storiesOf(`${MAIN_APP}/${Field}/${CONTEXT}`, module)
//   .add("group toggle", () => (
//     <FoloValues>
//       <Field type="radio" id="1" groupName="test" />
//       <Field type="radio" id="2" groupName="test" />
//       <Field type="radio" id="3" groupName="test" />
//     </FoloValues>
//   ))
//   .add("another way of toggling", () => (
//     <FoloValues>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <label htmlFor="1">
//           grouped:
//           <Field type="checkbox" id="1" groupName="test" />
//         </label>
//         <label htmlFor="2">
//           grouped:
//           <Field type="checkbox" id="2" groupName="test" />
//         </label>
//         <label htmlFor="3">
//           not grouped:
//           <Field type="checkbox" id="3" />
//         </label>
//       </div>
//     </FoloValues>
//   ));
