// Libs
import React from 'react';

// Components we need to test with
import XUIPill from '../XUIPill';

// Story book things
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, avatarProps, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf('Instances/XUIPill', module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<XUIPill
		value={text('value', 'Plain pill')}
		secondaryText={text('secondaryText', '')}
		title={text('title', '')}
		target={text('target', '')}
		qaHook={text('qaHook', '')}
		onDeleteClick={action('Clicked the delete icon')}
		onClick={action('Clicked the pill')}
		isInvalid={boolean('isInvalid', false)}
		href={text('href', null)}
		hasLayout={boolean('hasLayout', true)}
		deleteButtonLabel={text('deleteButtonLabel', null)}
		className={text('className', '')}
		avatarProps={object('avatarProps', avatarProps)}
		/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		return <XUIPill {...variationMinusStoryDetails}/>
	});
});
