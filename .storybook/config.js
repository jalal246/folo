import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  addDecorator((storyFn, context) => withInfo({})(storyFn)(context));
  addDecorator(withKnobs);
  req.keys().forEach(filename => req(filename));
}

setOptions({
  name: "folio",
  url: "https://jalal246.github.io/folio/",
  hierarchySeparator: '\\/'
});

configure(loadStories, module);
