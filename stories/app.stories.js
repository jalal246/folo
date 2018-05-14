import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import FormApp from '../App';

storiesOf('FormApp', module).add('with text', () => (
  <FormApp isIntractive onSubmit={action('onSubmit')} />
));
// .add('with some emoji', () => (
//   <Button onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// ));
