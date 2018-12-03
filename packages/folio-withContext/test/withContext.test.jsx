import React, { createContext } from "react";

import withContext from "../src/withContext";

// eslint-disable-next-line
const MyComponent = ({ id = "unique", type = "text" }) => (
  <div id={id} type={type} />
);

describe("withContext", () => {
  const TestContext = createContext({
    prop1: "extra1",
    prop2: "extra2",
    prop3: "extra3",
    prop4: "extra4"
  });

  const { Consumer } = TestContext;
  const Cell = withContext({
    Component: MyComponent,
    Consumer,
    contextProps: ["prop1", "prop4"]
  });

  const wrapper = mount(shallow(<Cell />).get(0));

  const { prop1, prop2, prop4 /*, type */ } = wrapper.props();

  it("returns component with required context", () => {
    expect(prop1).to.be.equal("extra1");
    expect(prop4).to.be.equal("extra4");
  });

  it("does not have all context props, just the required", () => {
    expect(prop2).to.be.equal(undefined);
  });

  // TODO: fix this
  // it("has the orginal props", () => {
  //   expect(type).to.be.equal("text");
  // });

  it("retruns all context props when contextProps is not defined", () => {
    const ComponentWithContext = withContext({
      Component: MyComponent,
      Consumer
    });

    const wrapper2 = mount(shallow(<ComponentWithContext />).get(0));

    const { prop1: p1, prop2: p2, prop3: p3, prop4: p4 } = wrapper2.props();
    expect(p1).to.be.equal("extra1");
    expect(p2).to.be.equal("extra2");
    expect(p3).to.be.equal("extra3");
    expect(p4).to.be.equal("extra4");
  });
});
