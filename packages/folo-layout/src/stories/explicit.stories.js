import Grid from "../components/Grid";

import {
  FourColumns,
  ThreeColumnsThreeRows,
  MinimumWidth,
  CenterWithFixedWidth,
} from "./examples/ExplicitGrid";

export default {
  title: "Grid Layout/Explicit Layout",
  component: Grid,
  onSubmit: {
    action: "onSubmit",
  },
};

export { FourColumns };
export { ThreeColumnsThreeRows };
export { MinimumWidth };
export { CenterWithFixedWidth };
