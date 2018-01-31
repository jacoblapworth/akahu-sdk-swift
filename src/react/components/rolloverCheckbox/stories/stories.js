// Libs
import React from 'react';

// Components we need to test with
import RolloverCheckbox from '../rolloverCheckbox';
import XUIAvatar from '../../avatar/XUIAvatar';
import { sizeClassNames } from '../private/constants';
// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<RolloverCheckbox
		isCheckboxHidden={boolean('checkbox hidden', true)}
		size={select('hit target size', sizeClassNames, 'medium')}
		isChecked={boolean('checked', false)}
		isDisabled={boolean('disabled', false)}
		rolloverComponent={<XUIAvatar value="abc" />}
	/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;

		return <RolloverCheckbox rolloverComponent={<XUIAvatar value="abc" />} {...variationMinusStoryDetails}/>
	});
});
