import React from "react";

import { FoloValues, Form, Cell } from "@folo/values";
import { FoloLayout, GridItem, Grid } from "@folo/layout";

export function Folo({ children }) {
  return (
    <FoloLayout>
      <FoloValues>{children}</FoloValues>
    </FoloLayout>
  );
}

export { Form, Grid, Cell, GridItem };
