// Libs
import React from 'react';

// Components we need to test with
import XUIAvatar from '../XUIAvatar';
import XUIAvatarGroup from '../XUIAvatarGroup';
import { sizeClassNames } from '../constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const props = { };
	props.value = text('Value', 'Example avatar') || 'Example avatar';
	props.variant = select('Variant', ['standard', 'business'], 'business') === 'standard' ? undefined : 'business';
	props.image = boolean('Turn image on', false);
	props.imageUrl = props.image ? text('Image URL', 'https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg') : undefined;
	const size = select('Size', Object.keys(sizeClassNames), 'medium');
	props.size = size === 'medium' ? undefined : size;
	const grouped = boolean('Go grouped', false);

	if (grouped) {
		const numberOfAvatars = number('How many avatars', 3, {range: true, min: 1, max: 10, step: 1});
		const maxAvatars = number('Maximum avatars', 10, {range:true, min: 2, max: 10, step: 1});
		const generatedAvatars = [];

		for(let i = 0; i < numberOfAvatars; i++) {
			const thisAvatarProps = {
				...props,
				value: `${i+1} ${props.value}`
			};
			generatedAvatars.push(<XUIAvatar key={i} {...thisAvatarProps}/>);
		}

		return (
			<XUIAvatarGroup maxAvatars={maxAvatars}>
				{generatedAvatars}
			</XUIAvatarGroup>
		)
	}

	return (
		<XUIAvatar {...props}/>
	);
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const { sizes } = variationMinusStoryDetails;
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;
		if (sizes) {
			delete variationMinusStoryDetails.sizes;

			return sizes.map((size, idx) => (
				<XUIAvatar key={idx} {...variationMinusStoryDetails} size={size} className="xui-margin-small"/>
			));
		}

		return (
			<XUIAvatar {...variationMinusStoryDetails}/>
		)
	});
});
