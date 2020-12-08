import { configure, addParameters } from '@storybook/react';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  require('./welcome.js');
  requireAll(require.context('../src/react/components', true, /stories.(j|t)sx?$/));
  requireAll(
    require.context('../src/react/stories/components-in-components', true, /index.(j|t)sx?$/),
  );
}

addParameters({ layout: 'fullscreen' }); // Removes default padding in storybook v6
configure(loadStories, module);
