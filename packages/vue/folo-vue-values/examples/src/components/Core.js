import { defineComponent } from "vue";

import registry from "../valuesStore";

const Core = defineComponent({
  name: "Core",
  props: {},
  mounted: {
    registry() {
      registry.subscribe(
        {
          nameRef: "",
          initValue: "",
          groupName: "",
          storeID: "",
        }
        // setValue:
      );
    },
  },
  methods: {},
});

export default Core;
