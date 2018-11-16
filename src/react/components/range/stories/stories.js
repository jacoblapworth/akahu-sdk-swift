// Libs
import React from 'react';

// Components we need to test with
import XUIRange from '../XUIRange';
import XUIAvatar from '../../avatar/XUIAvatar';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => {

	const showLeftElement = boolean('Show left element', true);
	const showRightElement = boolean('Show right element', true);

	return (
		<XUIRange
			label={text('label', 'Label for the select box')}
			isDisabled={boolean('isDisabled', false)}
			isInvalid={boolean('isInvalid', false)}
			max={number('max', 100)}
			min={number('min', 0)}
			step={number('step', 0)}
			leftElement={showLeftElement && <XUIAvatar className="xui-margin-small" imageUrl={"https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/48.jpg"}/>}
			rightElement={showRightElement && <XUIAvatar className="xui-margin-small" imageUrl={"https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/48.jpg"}/>}
			size={select('size', ['default','small', 'xsmall'], 'default')}
			validationMessage={text('validationMessage', 'validation text')}
		/>
	)
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = {
			...variation,
		};

		return (
			<XUIRange
				{...variationMinusStoryDetails}
				label={variation.storyTitle}
			/>
		);
	});
});
