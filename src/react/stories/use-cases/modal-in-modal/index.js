// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';

import { nonBackstopStoryNames, compositionKind } from '../tests';

// Components we need to test with
import Example from './components/Example';
import Example2 from './components/Example2';

<Example />;
<Example2 />;

const test = storiesOf(`${compositionKind}/${nonBackstopStoryNames.modalInModal}`, module);

test.add(nonBackstopStoryNames.modalInModal, () => {
  const body = document.querySelector('body.xui-container');
  if (body && body.style) {
    body.style.height = '200%';
  }
  return <Example />;
});
