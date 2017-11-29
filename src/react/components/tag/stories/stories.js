// Libs
import React from 'react';

// Components we need to test with
import XUITag, { variants } from '../XUITag';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName, NOOP } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<XUITag
        children={text('value', 'Plain tag')}
        variant={select('variant', Object.keys(variants), 'standard')}
    />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;

		return <XUITag {...variationMinusStoryDetails}/>
	});
});
