// Libs
import React from 'react';

// Components we need to test with
import XUIProgressLinear from '../XUIProgressLinear';
import XUIProgressCircular from '../XUIProgressCircular';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { COLORS } from '../helpers/constants';
import { variations, storiesWithVariationsKindName } from './variations';
import iconPath from '@xero/xui-icon/icons/suggestion';
import XUIIcon from '../../icon/XUIIcon';

const defaultColor = 'default';
const colorOptions = [defaultColor, ...COLORS];

const linearStyles = {
	background: 'white',
	height: '100px',
	padding: '20px',
	width: '90vw',
};

const circularStyles = {
	...linearStyles,
	height: 'auto',
	width: '30vw',
};

const playgroundStyle = {
	...linearStyles,
	height: '100%',
	position: 'fixed',
	left: '0',
	width: '100%',
	top: '0',
};

const colorStyle = {
	...linearStyles,
	height: 'auto',
	padding: '10px',
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground | Circular', () => (
	<div style={playgroundStyle}>
		<XUIProgressCircular
			id={text('id', 'myCustomCircularId')}
			total={number('total', 10)}
			progress={number('progress', 5)}
			isSegmented={boolean('isSegmented', false)}
			isGrow={boolean('isGrow', false)}
			thickness={number('thickness', 3)}
			hasToolTip={boolean('hasToolTip', false)}
			toolTipMessage={text('toolTipMessage', '')}
			isAlertOnComplete={boolean('isAlertOnComplete', false)}
			isOverflow={boolean('isOverflow', false)}
			isSoftError={boolean('isSoftError', false)}
			isHardError={boolean('isHardError', false)}
			hardErrorAlert={text('hardErrorAlert', '')}
			totalColor={select('totalColor', colorOptions, defaultColor)}
			progressColor={select('progressColor', colorOptions, defaultColor)}
		/>
	</div>
));

storiesWithKnobs.add('Playground | Linear', () => (
	<div style={playgroundStyle}>
		<XUIProgressLinear
			id={text('id', 'myCustomLinearId')}
			total={number('total', 10)}
			progress={number('progress', 5)}
			isSegmented={boolean('isSegmented', false)}
			isGrow={boolean('isGrow', false)}
			thickness={number('thickness', 4)}
			hasSegmentDots={boolean('hasSegmentDots', false)}
			hasToolTip={boolean('hasToolTip', false)}
			toolTipMessage={text('toolTipMessage', '')}
			isOverflow={boolean('isOverflow', false)}
			isSoftError={boolean('isSoftError', false)}
			totalColor={select('totalColor', colorOptions, defaultColor)}
			progressColor={select('progressColor', colorOptions, defaultColor)}
		/>
	</div>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

const createColorComparison = props => {
	const enrichedProps = (
		COLORS
			// Take the set of "color" keys, and merge them into groups of two (a custom
			// color for the "total" and "progress" tracks).
			.reduce((acc, color, index) => {
				index = Math.floor(index / 2);
				acc[index] = acc[index] || [];
				acc[index] = [...acc[index], color];

				return acc;
			}, [])
			// Spread the color groups into the supplied props to generate a component
			// scaffold for each color combination.
			.map(([totalColor, progressColor], index) => ({
				...props,
				id: `myCustomProgressId-${index}`,
				totalColor,
				progressColor,
			}))
	);

	// Create a "circular" and "linear" component for each color combination.
	return [
		enrichedProps.map((props, index) => <div key={`circular-${index}`} style={colorStyle} ><XUIProgressCircular {...props} /></div>),
		enrichedProps.map((props, index) => <div key={`linear-${index}`} style={colorStyle} ><XUIProgressLinear {...props} /></div>),
	];
};

const createStandardComparison = (styles, Component, props, children) => (
	<div style={styles}>
		<Component {...props}>
			{children}
		</Component>
	</div>
);

variations.forEach(variation => {
	const { storyTitle, storyKind, ...props } = variation; // eslint-disable-line no-unused-vars
	const isLinear = storyTitle.startsWith('linear');
	const isColor = storyTitle.startsWith('color');
	const isCustomContent = storyTitle.startsWith('circular custom content');
	const isErrorWithIcon = storyTitle.startsWith('circular custom (icon) hard error');
	let Comparison;

	if (isColor) {
		Comparison = createColorComparison(props);
	} else if (isLinear) {
		Comparison = createStandardComparison(linearStyles, XUIProgressLinear, props);
	} else if (isCustomContent) {
		const children = <img style={{ width: '100%', height: 'auto' }} alt="custom indicator fill" src="http://via.placeholder.com/350x350" />;

		Comparison = createStandardComparison(circularStyles, XUIProgressCircular, props, children);
	} else if (isErrorWithIcon) {
		const starIcon = <XUIIcon icon={iconPath} isBoxed />;

		Comparison = createStandardComparison(circularStyles, XUIProgressCircular, { hardErrorAlert: starIcon, ...props });
	} else {
		Comparison = createStandardComparison(circularStyles, XUIProgressCircular, props);
	}

	storiesWithVariations.add(storyTitle, () => Comparison);
});
