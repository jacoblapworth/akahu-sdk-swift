// Libs
import React from 'react';

// Components we need to test with
import XUIStepper from '../XUIStepper';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, select, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName, baseProps } from './variations';

const wrapperStyles = {
	background: 'white',
	padding: '50px',
};

const contentStyles = {
	padding: '20px 20px 200px',
	width: '100%',
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => (
	<div style={ wrapperStyles }>
		<XUIStepper
			id={ text('id', 'myStepperId') }
			qaHook={ text('qaHook', 'myStepperQaHook') }
			currentStep={ number('currentStep', 0) }
			hasStackedButtons={ boolean('hasStackedButtons', false) }
			lockLayout={ select('lockLayout', ['default', 'stacked', 'sidebar', 'inline']) }
			tabs={ object('tabs', baseProps.tabs) }>
			<h3 style={ contentStyles }>Content Area</h3>
		</XUIStepper>
	</div>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {

	const { storyTitle, storyKind, ...props } = variation; // eslint-disable-line no-unused-vars
	const Comparison = (
		<div style={ wrapperStyles }>
			<XUIStepper {...props}>
				<h3 style={ contentStyles }>Content Area</h3>
			</XUIStepper>
		</div>
	);

	storiesWithVariations.add(storyTitle, () => Comparison);

});
