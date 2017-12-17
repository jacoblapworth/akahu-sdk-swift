// Libs
import React from 'react';

// Components we need to test with
import XUIInput from '../XUIInput';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, object, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations } from './variations';
import iconData from '@xero/xui-icon/lib/private/iconData';

const swappedIconData = {};
Object.keys(iconData).forEach(groupKey => {
	Object.keys(iconData[groupKey]).forEach(iconKey => {
		swappedIconData[iconData[groupKey][iconKey]] = iconKey;
	});
});
const inputAttributes = {
	placeholder: 'placeholder text',
	defaultValue: 'default Value'
};
const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<XUIInput
		inputAttributes={object('input attributes', inputAttributes)}
		iconAttributes= {{
			path: select('Icon', swappedIconData, iconData.other.xero)
		}}
		isBorderless={boolean('is borderless', false)}
		isInvalid={boolean('is invalid', false)}
		validationMessage={text('validation message', '')}
		hintMessage={text('hint message', '')}
		hasClearButton={boolean('has clear button', false)}
	/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		return <XUIInput {...variationMinusStoryDetails} />;
		
	});
});
