import { configure, addDecorator } from "@storybook/react";

import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { withOptions } from "@storybook/addon-options";

const requests = [];

// TODO: it must be a better way to do this!
// see this: https://github.com/storybooks/storybook/issues/4890
const foloValues = require.context(
  "../packages/folo-values/stories",
  true,
  /.stories.js$/
);

const foloLayout = require.context(
  "../packages/folo-layout/stories",
  true,
  /.stories.js$/
);

const foloForms = require.context(
  "../packages/folo-forms/stories",
  true,
  /.stories.js$/
);

requests.push(foloValues);
requests.push(foloLayout);
requests.push(foloForms);

const opts = withOptions({
  name: "Folo",
  url: "https://jalal246.github.io/folo/"
});

function loadStories() {
  addDecorator(withKnobs);
  addDecorator(withInfo);
  addDecorator(opts);

  requests.forEach(req => {
    req.keys().forEach(fname => req(fname));
  });
}

configure(loadStories, module);
