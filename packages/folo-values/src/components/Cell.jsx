import React from "react";

import CellEngine from "./CellEngine";

import cellRecognizer from "../utils/cellRecognizer";
import { TEXT } from "../constants";

const Cell = ({
  component: UserComponent,
  valueKey,
  value = "",
  checked = false,
  id,
  type = TEXT,
  groupName = null,
  children,
  registerCellInfo,
  onChange = () => {},
  onBlur = () => {},
  ...rest
}) => {
  let isCellUpdated = false;

  const {
    valueRef,
    isInput,
    initValue,
    RecommendedComponent,
  } = cellRecognizer({ type, checked, value });

  const nameRef =
    valueKey ||
    (id
      ? `${type}_${id}${groupName ? `_${groupName}` : ""}`
      : `unknown_valueKey_created_at_${new Date().getTime()}`);

  // register cell info in context state
  registerCellInfo({
    nameRef,
    initValue,
    groupName,
  });

  isCellUpdated = !isCellUpdated;

  return (
    <CellEngine
      valueRef={valueRef}
      initValue={initValue}
      isInput={isInput}
      groupName={groupName}
      nameRef={nameRef}
      isCellUpdated={isCellUpdated}
      CellComponent={UserComponent || RecommendedComponent}
      onChange={onChange}
      onBlur={onBlur}
      rest={{ ...rest, id, type }}
    >
      {children}
    </CellEngine>
  );
};

export default Cell;
