// Libs
import React from 'react';
import cn from 'classnames';

// Components we need to test with
import XUILoader from '../XUILoader';
import { sizeClassNames } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const sizes = Object.keys(sizeClassNames);

const getContainerClassName = isInverted => cn('xui-panel', {
	'xui-background-grey-1': isInverted
});

const getContainerStyle = isRequired => isRequired ? { position: 'relative', height: '40px', width: '100px' } : {};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => {

	const size = select('size', sizes, sizes[0]);
	const isInverted = boolean('is inverted', false);

	const defaultLayout = boolean('default layout', true);
	const retainLayout = boolean('retain layout', true);

	return (
		<div className={getContainerClassName(isInverted)} style={getContainerStyle(!defaultLayout)}>
			<XUILoader
				defaultLayout={defaultLayout}
				size={size}
				isInverted={isInverted}
				retainLayout={retainLayout}
			>
			</XUILoader>
		</div>
	);

});


const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		const isInverted = variationMinusStoryDetails.isInverted;
		const hasContainerStyle = variationMinusStoryDetails.retainLayout || variationMinusStoryDetails.defaultLayout === false;

		let example;
		if (variationMinusStoryDetails.sizes) {
			const sizes = variationMinusStoryDetails.sizes;
			delete variationMinusStoryDetails.sizes;
			example = (
				<div>
					{sizes.map(size => <XUILoader key={size} size={size} {...variationMinusStoryDetails}></XUILoader>)}
				</div>);
		} else {
			example = <XUILoader  {...variationMinusStoryDetails}> </XUILoader>;
		}
		return (
			<div className={getContainerClassName(isInverted)} style={getContainerStyle(hasContainerStyle)}>
				{example}
			</div>
		)
	});
});
