import { configure, addParameters, addDecorator } from '@storybook/react';
import centered from './decorators/xuiResponsiveCenter';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  require('./welcome.js');
  requireAll(require.context('../src/react/components', true, /stories.(j|t)sx?$/));
  // Components in Components
  requireAll(
    require.context('../src/react/stories/components-in-components', true, /index.(j|t)sx?$/),
  );
}

addParameters({ layout: 'fullscreen' }); // Removes default padding in storybook v6
// addDecorator(centered);
configure(loadStories, module);
