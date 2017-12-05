import { configure } from '@storybook/react';

function loadStories() {
	require('./welcome.js');
	require('../src/react/components/autocompleter/stories/stories.js');
	require('../src/react/components/avatar/stories/stories.js');
	require('../src/react/components/banner/stories/stories.js');
	require('../src/react/components/button/stories/stories.js');
	require('../src/react/components/checkbox/stories/stories.js');
	require('../src/react/components/datepicker/stories/stories.js');
	require('../src/react/components/icon/stories/stories.js');
	require('../src/react/components/modal/stories/stories.js');
	require('../src/react/components/picklist/stories/stories.js');
	require('../src/react/components/pill/stories/stories.js');
	require('../src/react/components/radio/stories/stories.js');
	require('../src/react/components/switch/stories/stories.js');
	require('../src/react/components/tag/stories/stories.js');
	require('../src/react/components/textarea/stories/stories.js');
	require('../src/react/components/toast/stories/stories.js');
	require('../src/react/components/toggle/stories/stories.js');
	require('../src/react/components/rolloverCheckbox/stories/stories.js');
}

configure(loadStories, module);
