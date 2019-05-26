// Libs
import React from 'react';

// Components we need to test with
import XUIIcon from '../XUIIcon';
import { wrapperSizeClasses, rotationClasses, colorClasses } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';
import {flattenedIconList, flattenedIconMap} from "../../helpers/icons";

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const rotation = select('Rotation', [0, ...Object.keys(rotationClasses)]);
	const color = select('Color', Object.keys(colorClasses), 'standard');
	const icon = select('Icon', flattenedIconList, 'xero');

	return (
		<XUIIcon
			icon={flattenedIconMap[icon]}
			size={select('Size', Object.keys(wrapperSizeClasses), 'large')}
			rotation={rotation > 0 ? rotation : null}
			color={color === 'standard' ? undefined : color}
			isBoxed={boolean('Boxed', true)}
			title={text('Title', '')}
			desc={text('Desc', '')}
			role={text('Role', undefined)}
		/>
	)
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

function generateSubVariants(subVariants, variant) {
	const examples = subVariants.map((prop, idx) => {
		const icon = flattenedIconMap[prop.icon || variant.icon];
		return (
			<XUIIcon key={idx} {...prop} {...variant} icon={icon} />
		);
	});

	return (
		<div className="capture">
			{examples}
		</div>
	);
}

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		const subVariants = variationMinusStoryDetails.subVariants;
		variationMinusStoryDetails.subVariants = undefined;
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;

		return subVariants
			? generateSubVariants(subVariants, variationMinusStoryDetails)
			: (
				<div className="capture">
					<XUIIcon {...variationMinusStoryDetails} icon={flattenedIconMap[variationMinusStoryDetails.icon]} />
				</div>
			);

	});
});
