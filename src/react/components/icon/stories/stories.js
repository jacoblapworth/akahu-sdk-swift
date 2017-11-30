// Libs
import React from 'react';

// Components we need to test with
import XUIIcon from '../XUIIcon';
import iconData from '@xero/xui-icon/lib/private/iconData';
import { sizeClasses, rotationClasses, colorClasses } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const swappedIconData = {};
Object.keys(iconData).forEach(groupKey => {
	Object.keys(iconData[groupKey]).forEach(iconKey => {
		swappedIconData[iconData[groupKey][iconKey]] = iconKey;
	});
});

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const rotation = select('Rotation', [0, ...Object.keys(rotationClasses)]);

	return (
		<XUIIcon
			path={select('Icon', swappedIconData, iconData.other.xero)}
			size={select('Size', Object.keys(sizeClasses), 'large')}
			rotation={rotation > 0 ? rotation : null}
			color={select('Color', Object.keys(colorClasses), 'standard')}
			inline={boolean('Inline', false)}
			viewBox={text('View Box', '0 0 30 30')}
			title={text('Title', '')}
			desc={text('Desc', '')}
			role={text('Role', '')}
		/>
	)
}
);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

function generateSubVariants(subVariants, variant) {
	const examples = subVariants.map((prop, idx) => <XUIIcon key={idx} {...prop} {...variant} />)
	return (
		<div>{examples}</div>
	);
}

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const subVariants = variationMinusStoryDetails.subVariants;
		variationMinusStoryDetails.subVariants = undefined;
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;

		let example;
		if (subVariants) {
			example = generateSubVariants(subVariants, variationMinusStoryDetails);
		} else {
			example = <XUIIcon {...variationMinusStoryDetails} />
		}


		return example;
	});
});
