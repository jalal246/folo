import React from "react";

import Grid from "../components/Grid";

import { FriendlyLadder, ArtCollectionProps } from "./examples/ImplicitGrid";

export default {
  title: "Grid Layout/Implicit Layout",
  component: Grid,
};

export { FriendlyLadder };

export const ArtCollection = (args) => <ArtCollectionProps {...args} />;
ArtCollection.args = {
  items1: { col1: 1, row1: 1, toRow1: 4, backgroundColor1: "blue" },
  items2: { col2: 3, row2: 1, toRow2: 2, backgroundColor2: "orange" },
  items3: { col3: 2, row3: 3, toRow3: 5, backgroundColor3: "pink" },
};
