import { configure, addDecorator } from "@storybook/react";

import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { withOptions } from "@storybook/addon-options";

const requests = [];

// TODO: it must be a better way to do this!
// see this: https://github.com/storybooks/storybook/issues/4890
const folioValues = require.context(
  "../packages/folio-values/stories",
  true,
  /.stories.js$/
);

const folioLayout = require.context(
  "../packages/folio-layout/stories",
  true,
  /.stories.js$/
);

const folioForms = require.context(
  "../packages/folio-forms/stories",
  true,
  /.stories.js$/
);

requests.push(folioValues);
requests.push(folioLayout);
requests.push(folioForms);

const opts = withOptions({
  name: "Folio",
  url: "https://jalal246.github.io/folio/"
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
