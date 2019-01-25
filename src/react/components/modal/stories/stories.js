// Libs
import React, { Fragment } from 'react';

// Components we need to test with
import XUIModal from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';
import XUITextInput from '../../textInput/XUITextInput';
import XUIButton from '../../button/XUIButton';
import { modalSizes } from '../constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import { storiesWithVariationsKindName, variations } from './variations';

const isolatedInstance = storiesOf(storiesWithVariationsKindName, module);
isolatedInstance.addDecorator(withKnobs);

isolatedInstance.add('XUIModal', () => {
	const headerEnabled = boolean('Show Header', true);
	const header = headerEnabled ? (
		<XUIModalHeader>Header</XUIModalHeader>
	) : null;

	const footerEnabled = boolean('Show Footer', true);
	const footer = footerEnabled ? (
		<XUIModalFooter>Footer!</XUIModalFooter>
	) : null;

	return (
		<Fragment>
			<XUITextInput />
			<XUIButton>Test button</XUIButton>
			<XUIModal
				isOpen={boolean('Is open', true)}
				size={select('Size', Object.keys(modalSizes))}
				isForm={boolean('Main content is a form', false)}
				isUsingPortal={boolean('Uses portal', true)}
			>
				{header}
				<XUIModalBody>
					Plain modal
					<XUITextInput />
					<XUIButton>Test button</XUIButton>
				</XUIModalBody>
				{footer}
			</XUIModal>
		</Fragment>
	);
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		const header = variationMinusStoryDetails.header ? (
			<XUIModalHeader>Header</XUIModalHeader>
		) : null;

		const footer = variationMinusStoryDetails.footer ? (
			<XUIModalFooter>Footer!</XUIModalFooter>
		) : null;

		return (
			<XUIModal isOpen {...variationMinusStoryDetails}>
				{header}
				<XUIModalBody>
					This is some Modal content.
				</XUIModalBody>
				{footer}
			</XUIModal>
		);
	});
});
