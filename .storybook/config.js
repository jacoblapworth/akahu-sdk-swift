import { configure, addDecorator, setAddon } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  require('./welcome.js');
  requireAll(require.context('../src/react/components', true, /stories.js$/));
  // Components in Components
  requireAll(require.context('../src/react/stories/components-in-components', true, /index.js$/));
  // Page Layout
  requireAll(require.context('../src/react/stories/page-layouts', true, /index.js$/));
}

addDecorator(withA11y);
configure(loadStories, module);
