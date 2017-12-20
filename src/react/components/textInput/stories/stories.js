// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import XUITextInput from '../XUITextInput';
import XUITextInputIcon from '../XUITextInputIcon';


// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations } from './variations';
import clear from '@xero/xui-icon/icons/clear';
import facebook from '@xero/xui-icon/icons/social-facebook';

const inputProps = {};
const NOOP = () => {};

const TextInputWrapper = props => {
	const {
		inputProps,
		isBorderlessTransparent,
		isBorderlessSolid,
		isInvalid,
		validationMessage,
		hintMessage,
		showLeftElement,
		showRightElement,
		showWrapperColor,
		placeholder
	} = props;

	/* eslint-disable react/display-name */
	const rightElement =  showRightElement ? props => <XUITextInputIcon {...props} variant='icon' path={clear} onClick={NOOP}/> : null
	const leftElement = showLeftElement ? props => <XUITextInputIcon {...props} path={facebook} color={showWrapperColor && 'white'} wrapperColor={showWrapperColor && 'facebook'}/> : null
	/* eslint-enable react/display-name */

	return(
		<XUITextInput
			inputProps={inputProps}
			leftElement= {leftElement}
			isBorderlessTransparent={isBorderlessTransparent}
			isBorderlessSolid={isBorderlessSolid}
			isInvalid={isInvalid}
			validationMessage={validationMessage}
			hintMessage={hintMessage}
			rightElement={rightElement}
			defaultValue='default Value'
			placeholder={placeholder}
		/>
	)
}

TextInputWrapper.propTypes = {
	inputProps: PropTypes.object,
	isBorderlessTransparent: PropTypes.bool,
	isBorderlessSolid: PropTypes.bool,
	isInvalid: PropTypes.bool,
	validationMessage: PropTypes.string,
	hintMessage: PropTypes.string,
	showLeftElement: PropTypes.bool,
	showRightElement: PropTypes.bool,
	showWrapperColor: PropTypes.bool,
	placeholder: PropTypes.string
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<TextInputWrapper
		inputAttributes={object('input props', inputProps)}
		showLeftElement= {boolean('show left element (icon)', false)}
		showWrapperColor={boolean('show left element wrapper color', false)}
		isBorderlessTransparent={boolean('is borderless transparent', false)}
		isBorderlessSolid={boolean('is borderless solid', false)}
		isInvalid={boolean('is invalid', false)}
		validationMessage={text('validation message', '')}
		hintMessage={text('hint message', '')}
		showRightElement={boolean('show right element (clear button)', false)}
		placeholder={text('placeholder', 'placeholder text')}
	/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		return <TextInputWrapper {...variationMinusStoryDetails} />;

	});
});
