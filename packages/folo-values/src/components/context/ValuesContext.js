import React from "react";
import { updater } from "@folo/store/src";

import init from "./init";

const { registry, Consumer: ValuesConsumer, Provider } = init();

const ValuesProvider = ({ children }) => {
  const [setState, state] = React.useState({
    values: {},
    isGroupValuesUpdate: false,
  });

  React.useEffect(() => {
    setState({ values: registry.dataObj });
  }, []);

  /**
   * update cell value in the state
   *
   * @param {object} cell - new cell that should be register
   * @param {string} cell.nameRef   key for value
   * @param {string||boolean} cell.initValue value
   * @param {string} cell.groupName group name in case the cell is group-toggle
   */
  function updateCellValue({ nameRef, newValue, groupName }) {
    const {
      values: { [nameRef]: oldValue },
    } = state;

    // don't update if it is the same value
    if (oldValue !== newValue) {
      const { btnGroup } = registry;

      setState(({ values, isGroupValuesUpdate }) =>
        updater({
          values,
          isGroupValuesUpdate,
          btnGroup,
          nameRef,
          newValue,
          groupName,
        })
      );
    }
  }

  const { values } = state;

  const value = {
    registerCellInfo: registry.registerCellInfo,
    updateCellValue,
    getContextValues: () => values,
    values,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { ValuesProvider, ValuesConsumer };
