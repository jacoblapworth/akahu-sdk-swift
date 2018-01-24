// Libs
import React from 'react';

// Components we need to test with
import XUIStepper from '../XUIStepper';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const wrapperStyles = {
	background: 'white',
	padding: '50px',
};

const contentStyles = {
	padding: '20px 20px 200px',
	width: '100%',
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

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
	<div style={ wrapperStyles }>
		<XUIStepper
			tabs={tabs}
			id={text('id', 'myStepperId')}
			qaHook={text('qaHook', 'myStepperQaHook')}
			currentStep={number('currentStep', 0)}
			hasStackedButtons={boolean('hasStackedButtons', false)}
			lockLayout={select('lockLayout', ['default', 'stacked', 'sidebar', 'inline'])}>
			<h3 style={ contentStyles }>Content Area</h3>
		</XUIStepper>
	</div>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {

	const { storyTitle, storyKind, ...props } = variation; // eslint-disable-line no-unused-vars
	const Comparison = (
		<div style={ wrapperStyles }>
			<XUIStepper {...props}>
				<h3 style={ contentStyles }>Content Area</h3>
			</XUIStepper>
		</div>
	);

	storiesWithVariations.add(storyTitle, () => Comparison);

});
