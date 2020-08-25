import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

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

addDecorator(withA11y);
configure(loadStories, module);
