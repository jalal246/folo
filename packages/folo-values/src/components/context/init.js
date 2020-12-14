import React from "react";
import { Registry } from "@folo/store/src";

function init() {
  const StoreContext = React.createContext({
    values: {},
    updateCellValue() {},
  });

  const registry = new Registry();

  const { Consumer, Provider } = StoreContext;

  return { registry, Consumer, Provider };
}

export default init;
