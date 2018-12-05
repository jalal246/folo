import React from "react";

import { FolioValues, Form, Cell, CellItem } from "@folio/values";
import { FolioLayout, GridItem, Grid } from "@folio/layout";

// eslint-disable-next-line
export default function Folio({ children }) {
  return (
    <FolioLayout>
      <FolioValues>{children}</FolioValues>
    </FolioLayout>
  );
}

export { Form, Grid, Cell, CellItem, GridItem };
