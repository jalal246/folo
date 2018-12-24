import React from "react";

import CellItem from "../src/components/CellItem";

describe("CellItem", () => {
  it("render", () => {
    const wrapper = shallow(<CellItem>A</CellItem>);

    expect(wrapper.html()).to.equal("<option>A</option>");
  });
});
