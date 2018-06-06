// Libs
import React from 'react';

// Components we need to test with
import XUISwitch from '../XUISwitch';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import NOOP from '../../helpers/noop';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<XUISwitch
		isChecked={boolean('isChecked', false)}
		isDisabled={boolean('isDisabled', false)}
		onChange={NOOP}
		labelText='Sample switch label'
	></XUISwitch>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;
		variationMinusStoryDetails.onChange = NOOP;
		variationMinusStoryDetails.labelText = 'Sample switch label';

		return <XUISwitch {...variationMinusStoryDetails}/>
	});
});
