import { configure, addDecorator, setAddon } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

function loadStories() {
	require('./welcome.js');
	requireAll(require.context('../src/react/components', true, /stories.js$/));
	// Compositions
	requireAll(require.context('../src/react/stories', true, /index.js$/));
	// Page Layout
	requireAll(require.context('../src/react/page-layouts', true, /index.js$/));
}

addDecorator(checkA11y);
configure(loadStories, module);

