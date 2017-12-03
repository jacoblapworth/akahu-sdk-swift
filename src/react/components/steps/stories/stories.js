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

// const tabs = new Array(6).fill(0).map((_, i) => ({
// 	name: `Link ${i + 1}`,
// 	description: `Description ${i + 1}`,
// 	href: '#',
// 	isActive: !i
// }));

const tabs = [
	{
		name: `Link 1`,
		// description: `Description 1`,
		// href: '#',
		handleClick: () => console.log('clicked link 1'),
		// isActive: true
	},
	{
		name: `Link 2`,
		// description: `Description 2`,
		// href: '#',
		handleClick: () => console.log('clicked link 2'),
		// isActive: true
		isStacked: true
	},
	{
		name: `Link 3`,
		description: `Description 3`,
		// href: '#',
		handleClick: () => console.log('clicked link 3'),
		// isActive: true
		isError: true
	},
	{
		name: `Link 4`,
		// description: `Description 4`,
		// href: '#',
		handleClick: () => console.log('clicked link 4'),
		// isActive: true
	}
];

storiesWithKnobs.add('Playground', () => (
	<div style={{
		background: 'white',
		padding: '50px'
	}}>

		<XUISteps
			tabs={tabs}
			currentStep={1}
			isLinear
		>
			<h3>Content:</h3>
			<p>...</p>
			<p>...</p>
			<p>...</p>
			<p>...</p>
			<p>...</p>
		</XUISteps>

	</div>
));
