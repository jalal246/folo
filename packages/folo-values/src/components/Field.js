import React from "react";

import Core from "./Core";

import cellRecognizer from "../utils/cellRecognizer";
import { TEXT } from "../constants";

import registry from "../valuesStore";

const Field = ({
  component,
  valueKey,
  id,
  value = "",
  checked = false,
  type = TEXT,
  groupName = null,
  children,
  ...rest
}) => {
  const {
    valueRef,
    isInput,
    initValue,
    RecommendedComponent,
  } = cellRecognizer({ type, checked, value });
  console.log("file: Field.js ~ line 27 ~ type", type);

  const nameRef =
    valueKey || id
      ? `${id}${groupName ? `_${groupName}` : ""}`
      : `${new Date().getTime()}`;

  registry.subscribe({
    nameRef,
    initValue,
    groupName,
  });

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
      {...rest}
    >
      {children}
    </Core>
  );
};

export default Field;
