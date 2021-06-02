import { configure, addParameters, addDecorator } from '@storybook/react';

import xuiDefaultDecorator from './decorators/xuiDefaultDecorator';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  require('./welcome.js');
  requireAll(require.context('../src/react/components', true, /stories.(j|t)sx?$/));
  requireAll(require.context('../src/react/stories/use-cases', true, /index.(j|t)sx?$/));
  requireAll(require.context('../src/react/stories/form-controls', true, /index.(j|t)sx?$/));
}

addDecorator(xuiDefaultDecorator);
addParameters({ layout: 'fullscreen' });
configure(loadStories, module);
