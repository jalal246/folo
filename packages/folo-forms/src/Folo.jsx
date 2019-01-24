import React from "react";

import { FoloValues, Form, Cell } from "@folo/values";
import { FoloLayout, GridItem, Grid } from "@folo/layout";

function Folo({ children }) {
  return (
    <FoloLayout>
      <FoloValues>{children}</FoloValues>
    </FoloLayout>
  );
}

export { Folo, Form, Grid, Cell, GridItem };
