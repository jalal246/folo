import React from "react";

import Core from "./Core";

import cellRecognizer from "../utils/cellRecognizer";
import { TEXT } from "../constants";

const Field = ({
  component,
  valueKey,
  id,
  value = "",
  checked = false,
  type = TEXT,
  groupName = null,
  storeID,
  children,
  ...rest
}) => {
  const {
    valueRef,
    isInput,
    initValue,
    RecommendedComponent,
  } = cellRecognizer({ type, checked, value });

  const nameRef = valueKey || id || `${new Date().getTime()}`;

  return (
    <Core
      valueRef={valueRef}
      initValue={initValue}
      isInput={isInput}
      groupName={groupName}
      nameRef={nameRef}
      coreComponent={component || RecommendedComponent}
      type={type}
      id={id}
      storeID={storeID}
      {...rest}
    >
      {children}
    </Core>
  );
};

export default Field;
