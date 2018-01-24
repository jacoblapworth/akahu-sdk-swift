// Libs
import React from 'react';

// Components we need to test with
import XUIStepper from '../XUIStepper';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, select } from '@storybook/addon-knobs';
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

	// With Progress Indicator:

	{
		name: `Link 1`,
		description: `Progress Error`,
		handleClick: () => console.log('clicked link 1'),
		isError: true,
		isProgress: true,
		totalProgress: 5,
		currentProgress: 3,
	},
	{
		name: `Link 2`,
		description: `Progress Complete`,
		handleClick: () => console.log('clicked link 2'),
		isComplete: true,
		isProgress: true,
		totalProgress: 5,
		currentProgress: 3,
	},
	{
		name: `Link 3`,
		description: `Progress Complete (automaticly)`,
		handleClick: () => console.log('clicked link 3'),
		isProgress: true,
		totalProgress: 5,
		currentProgress: 5,
	},
	{
		name: `Link 4`,
		description: `Progress Disabled`,
		handleClick: () => console.log('clicked link 4'),
		isDisabled: true,
		isProgress: true,
		totalProgress: 5,
		currentProgress: 3,
	},
	{
		name: `Link 5`,
		description: `Progress Disabled (Error)`,
		handleClick: () => console.log('clicked link 4'),
		isDisabled: true,
		isError: true,
		isProgress: true,
		totalProgress: 5,
		currentProgress: 3,
	},
	{
		name: `Link 5`,
		description: `Progress Disabled (Complete)`,
		handleClick: () => console.log('clicked link 4'),
		isDisabled: true,
		isComplete: true,
		isProgress: true,
		totalProgress: 5,
		currentProgress: 3,
	},

	// Without Progress Indicator:

	{
		name: `Link 6`,
		description: `Standard Error`,
		handleClick: () => console.log('clicked link 5'),
		isError: true,
	},
	{
		name: `Link 7`,
		description: `Standard Complete`,
		handleClick: () => console.log('clicked link 6'),
		isComplete: true,
	},
	{
		name: `Link 8`,
		description: `Standard Disabled`,
		handleClick: () => console.log('clicked link 8'),
		isDisabled: true,
	},
	{
		name: `Link 9`,
		description: `Standard Disabled (Error)`,
		handleClick: () => console.log('clicked link 8'),
		isDisabled: true,
		isError: true,
	},
	{
		name: `Link 9`,
		description: `Standard Disabled (Complete)`,
		handleClick: () => console.log('clicked link 8'),
		isDisabled: true,
		isComplete: true,
	},
];

storiesWithKnobs.add('Playground', () => (
	<div style={{
		background: 'white',
		padding: '50px'
	}}>

		<XUIStepper
			tabs={tabs}
			id={text('id', 'myStepperId')}
			currentStep={number('currentStep', 0)}
			isStacked={boolean('isStacked', false)}
			lockLayout={select('lockLayout', ['default', 'stacked', 'sidebar', 'inline'])}
		>
			{/* isLinear={boolean('isLinear', false)} */}
			<h3>Content:</h3>
			<p>...</p>
			<p>...</p>
			<p>...</p>
			<p>...</p>
			<p>...</p>
		</XUIStepper>

	</div>
));
