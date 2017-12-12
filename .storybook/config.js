import { configure } from '@storybook/react';

function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

function loadStories() {
	require('./welcome.js');
	requireAll(require.context('../src/react/components', true, /stories.js$/));
	// Compositions
	requireAll(require.context('../src/react/stories', true, /index.js$/));
}

configure(loadStories, module);
