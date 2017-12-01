// Libs
import React from 'react';

// Components we need to test with
import XUISteps from '../XUISteps';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

const storiesWithKnobs = storiesOf('Instances/XUIStep', module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

const tabs = new Array(6).fill(0).map((_, i) => ({
	name: `Link ${i + 1}`,
	description: `Description ${i + 1}`,
	href: '#',
	isActive: !i
}));

storiesWithKnobs.add('Playground', () => (
	<XUISteps tabs={tabs}>
		<h3>Link One Content:</h3>
		<p>...</p>
		<p>...</p>
		<p>...</p>
		<p>...</p>
		<p>...</p>
	</XUISteps>
));
