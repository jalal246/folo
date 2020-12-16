// import React from "react";

// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

// import { FoloValues, Form, Cell } from "../src";

// import { MAIN_APP, FORM } from "./_directories";

// /**
//  * directory connected with context
//  */
// const styleLabel = {
//   padding: "17px"
// };

// const styleForm = {
//   display: "flex",
//   flexDirection: "column",
//   background: "beige",
//   width: "40%",
//   margin: "10px",
//   padding: "17px"
// };

// storiesOf(`${MAIN_APP}/${FORM}`, module)
//   .add("basic form connected to context", () => (
//     <FoloValues>
//       <Form style={styleForm} onSubmit={action("onSubmit")}>
//         type a text:
//         <Cell type="text" />
//         choose this checkbox:
//         <Cell type="checkbox" groupName="test" />
//         or this checkbox:
//         <Cell type="checkbox" groupName="test" />
//         <label style={styleLabel} htmlFor="3">
//           items
//           <Cell type="select">
//             <option>A</option>
//             <option>B</option>
//             <option>C</option>
//           </Cell>
//         </label>
//         <button type="submit">submit</button>
//       </Form>
//     </FoloValues>
//   ))
//   .add("with more custom attr", () => (
//     <FoloValues>
//       <Form style={styleForm} onSubmit={action("onSubmit")}>
//         <label style={styleLabel}>
//           type a text:
//           <Cell valueKey="text1" value="someText" type="text" />
//         </label>
//         <label style={styleLabel}>
//           choose this checkbox:
//           <Cell valueKey="checkbox1" checked type="checkbox" groupName="test" />
//         </label>
//         <label style={styleLabel}>
//           or this checkbox:
//           <Cell valueKey="checkbox2" type="checkbox" groupName="test" />
//         </label>
//         <label style={styleLabel}>
//           items
//           <Cell valueKey="itemsGroup" type="select" value="B">
//             <option>A</option>
//             <option value="B">B</option>
//             <option>C</option>
//           </Cell>
//         </label>
//         <button type="submit">submit</button>
//       </Form>
//     </FoloValues>
//   ));
