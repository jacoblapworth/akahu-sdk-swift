// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import XUITextInput from '../XUITextInput';
import XUITextInputSideElement from '../XUITextInputSideElement';
import XUIIcon from '../../icon/XUIIcon';
import XUIButton from '../../button/XUIButton';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, object, text, select, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations } from './variations';
import clearPath from '@xero/xui-icon/icons/clear';
import facebookPath from '@xero/xui-icon/icons/social-facebook';

const inputProps = {};

const TextInputWrapper = props => {
	const {
		labelText,
		inputProps,
		isBorderlessTransparent,
		isBorderlessSolid,
		isInvalid,
		validationMessage,
		hintMessage,
		leftElementType,
		rightElementType,
		leftElementAlignment,
		rightElementAlignment,
		placeholder,
		isDisabled,
		value,
		isMultiline,
		minRows,
		maxRows,
		rows,
	} = props;

	const makeSideElement = (sideElementType, sideElementAlignment) => {
		switch(sideElementType) {
			case 'icon':
				return (
					<XUITextInputSideElement type="icon" alignment={sideElementAlignment}>
						<XUIIcon path={clearPath} />
					</XUITextInputSideElement>
				);
			case 'iconWithBackground':
				return (
					<XUITextInputSideElement
						type="icon"
						backgroundColor={'facebook'}
						alignment={sideElementAlignment}
					>
						<XUIIcon path={facebookPath} />
					</XUITextInputSideElement>
				);
			case 'text':
				return (
					<XUITextInputSideElement type="text" alignment={sideElementAlignment}>
						Test
					</XUITextInputSideElement>
				)
			case 'button':
				return (
					<XUITextInputSideElement type="button" alignment={sideElementAlignment}>
						<XUIButton variant="primary" size="small">
							Test
						</XUIButton>
					</XUITextInputSideElement>
				);
			default:
				return null
		}
	}

	return(
		<XUITextInput
			labelText={labelText}
			inputProps={inputProps}
			leftElement={makeSideElement(leftElementType, leftElementAlignment)}
			rightElement={makeSideElement(rightElementType, rightElementAlignment)}
			isBorderlessTransparent={isBorderlessTransparent}
			isBorderlessSolid={isBorderlessSolid}
			isInvalid={isInvalid}
			validationMessage={validationMessage}
			hintMessage={hintMessage}
			type="text"
			defaultValue='default Value'
			placeholder={placeholder}
			isDisabled={isDisabled}
			value={value}
			isMultiline={isMultiline}
			minRows={minRows}
			maxRows={maxRows}
			rows={rows}
		/>
	)
}

TextInputWrapper.propTypes = {
	labelText: PropTypes.labelText,
	inputProps: PropTypes.object,
	isBorderlessTransparent: PropTypes.bool,
	isBorderlessSolid: PropTypes.bool,
	isInvalid: PropTypes.bool,
	validationMessage: PropTypes.string,
	hintMessage: PropTypes.string,
	leftElementType: PropTypes.oneOf(['icon', 'iconWithBackground', 'button', 'text']),
	rightElementType: PropTypes.oneOf(['icon', 'iconWithBackground', 'button', 'text']),
	leftElementAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
	rightElementAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
	placeholder: PropTypes.string,
	isDisabled: PropTypes.bool,
	value: PropTypes.string,
	isMultiline: PropTypes.bool,
	minRows: PropTypes.number,
	maxRows: PropTypes.number,
	rows: PropTypes.number,
}

const elementTypeOptions = [null, 'icon', 'iconWithBackground', 'button', 'text'];

const elementAlignmentOptions = ['top', 'center', 'bottom'];

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<TextInputWrapper
		labelText={('label text', '')}
		placeholder={text('placeholder', 'placeholder text')}
		value={text('value')}
		isMultiline={boolean('is multiline', false)}
		minRows={number('min height of multiline input in rows')}
		maxRows={number('max height of multiline input in rows')}
		rows={number('set height of multiline input in rows')}
		leftElementType={select('left side element type', elementTypeOptions)}
		leftElementAlignment={select('left side element vertical alignment', elementAlignmentOptions, 'top')}
		rightElementType={select('right side element type', elementTypeOptions)}
		rightElementAlignment={select('right side element vertical alignment', elementAlignmentOptions, 'top')}
		isBorderlessTransparent={boolean('is borderless transparent', false)}
		isBorderlessSolid={boolean('is borderless solid', false)}
		isInvalid={boolean('is invalid', false)}
		validationMessage={text('validation message', '')}
		hintMessage={text('hint message', '')}
		isDisabled={boolean('is disabled', false)}
		inputAttributes={object('input props', inputProps)}
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
