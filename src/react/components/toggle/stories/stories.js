// Libs
import React from 'react';

// Components we need to test with
import XUIToggle from '../XUIToggle';
import XUIToggleOption from '../XUIToggleOption';
import { colorMap } from '../private/constants';
import NOOP from '../../helpers/noop';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
const toggleOptions = [
	{
		isChecked: true,
		name: 'tg1',
		value: 'toggle1'
	},
	{
		isDisabled: true,
		name: 'tg1',
		value: 'toggle2'
	},
	{
		name: 'tg1',
		value: 'toggle3'
	},
];
storiesWithKnobs.add('Playground', () => (
	<div style={{width:'500px'}}>
		<XUIToggle
			color={select('color', Object.keys(colorMap), 'standard')}
			layout={boolean('full-width?', false) ? 'fullwidth': undefined}
			variant={boolean('small?', false) ? 'small': undefined}
			secondaryProps={{'aria-label': 'test label'}}
		>
			{buildOptions(toggleOptions)}
		</XUIToggle>
	</div>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const options = variationMinusStoryDetails.options;
		delete variationMinusStoryDetails.options;
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;
		return <div style={{width:'500px'}}><XUIToggle {...variationMinusStoryDetails}>{buildOptions(options)}</XUIToggle></div>;
	});
});

const buildOptions = function(options) {
	return options.map((option, index) => {
		option.onChange = NOOP;
		return <XUIToggleOption key={index} {...option}>{option.value}</XUIToggleOption>;
	});
};
