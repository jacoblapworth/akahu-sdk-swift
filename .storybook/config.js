import { configure } from '@storybook/react';

function loadStories() {
	require('./welcome.js');
	require('../src/react/components/autocompleter/stories/stories.js');
	require('../src/react/components/button/stories/stories.js');
	require('../src/react/components/modal/stories/stories.js');
	require('../src/react/components/pill/stories/stories.js');
}

configure(loadStories, module);
