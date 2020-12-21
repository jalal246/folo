import Form from "../components/Form";

import {
  GroupToggleNoInitValue,
  GroupToggleWithInitValue,
  GroupToggleDifferentGroupName,
} from "./examples/GroupToggle";

export default {
  title: "Forms/Toggle groups",
  component: Form,
  onSubmit: {
    action: "onSubmit",
  },
};

export { GroupToggleNoInitValue };

export { GroupToggleWithInitValue };

export { GroupToggleDifferentGroupName };
