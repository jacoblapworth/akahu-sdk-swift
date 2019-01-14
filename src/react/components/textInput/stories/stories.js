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
import XUIPill from '../../pill/XUIPill';
import XUIAvatar from '../../avatar/XUIAvatar';
import { sizeShift } from '../../helpers/sizes';

const inputProps = {};

const TextInputWrapper = props => {
	const {
		label,
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
		defaultValue,
		value,
		isMultiline,
		isLabelHidden,
		minRows,
		maxRows,
		rows,
		size,
	} = props;

	const makeSideElement = (sideElementType, sideElementAlignment) => {
		const childComponentSize = sizeShift(size, -1);
		switch (sideElementType) {
		case 'icon':
			return (
				<XUITextInputSideElement type="icon" alignment={sideElementAlignment}>
					<XUIButton variant="icon" size={size}>
						<XUIIcon icon={clearPath} />
					</XUIButton>
				</XUITextInputSideElement>
			);
		case 'iconWithBackground':
			return (
				<XUITextInputSideElement
					type="icon"
					backgroundColor="facebook"
					alignment={sideElementAlignment}
				>
					<XUIIcon icon={facebookPath} isBoxed />
				</XUITextInputSideElement>
			);
		case 'text':
			return (
				<XUITextInputSideElement type="text" alignment={sideElementAlignment}>
						Test:
				</XUITextInputSideElement>
			);
		case 'button':
			return (childComponentSize !== '2xsmall' &&
				(<XUITextInputSideElement type="button" alignment={sideElementAlignment}>
					<XUIButton variant="primary" size={childComponentSize}>
							Test
					</XUIButton>
				</XUITextInputSideElement>)
			);
		case 'pill':
			return (childComponentSize !== '2xsmall' &&
					(<XUITextInputSideElement type="pill" alignment={sideElementAlignment}>
						<XUIPill
								avatarProps={{
									value: 'TP'
								}}
								value="Test Person"
								size={childComponentSize}
							/>
					</XUITextInputSideElement>)
			);
		case 'avatar':
		return (
			<XUITextInputSideElement type="avatar" alignment={sideElementAlignment}>
				<XUIAvatar
					value="Test Person"
					size={childComponentSize}
				/>
			</XUITextInputSideElement>
		);
		default:
			return null;
		}
	};

	return (
		<XUITextInput
			{...{
				label,
				inputProps,
				isBorderlessTransparent,
				isBorderlessSolid,
				isInvalid,
				validationMessage,
				hintMessage,
				placeholder,
				isDisabled,
				value,
				isMultiline,
				isLabelHidden,
				minRows,
				maxRows,
				rows,
				size,
			}}
			leftElement={makeSideElement(leftElementType, leftElementAlignment)}
			rightElement={makeSideElement(rightElementType, rightElementAlignment)}
			type="text"
			defaultValue={defaultValue || 'default Value'}
			placeholder={placeholder}
			isDisabled={isDisabled}
			value={value}
			isMultiline={isMultiline}
			isLabelHidden={isLabelHidden}
			minRows={minRows}
			maxRows={maxRows}
			rows={rows}
		/>
	);
};

TextInputWrapper.defaultProps = {
	size: 'standard',
};

TextInputWrapper.propTypes = {
	label: PropTypes.node,
	inputProps: PropTypes.object,
	isBorderlessTransparent: PropTypes.bool,
	isBorderlessSolid: PropTypes.bool,
	isInvalid: PropTypes.bool,
	validationMessage: PropTypes.string,
	hintMessage: PropTypes.string,
	leftElementType: PropTypes.oneOf(['icon', 'iconWithBackground', 'button', 'text', 'pill', 'avatar']),
	rightElementType: PropTypes.oneOf(['icon', 'iconWithBackground', 'button', 'text', 'pill', 'avatar']),
	leftElementAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
	rightElementAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
	placeholder: PropTypes.string,
	isDisabled: PropTypes.bool,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	isMultiline: PropTypes.bool,
	isLabelHidden: PropTypes.bool,
	minRows: PropTypes.number,
	maxRows: PropTypes.number,
	rows: PropTypes.number,
	size: PropTypes.oneOf(['standard', 'small', 'xsmall']),
};

const elementTypeOptions = [null, 'icon', 'iconWithBackground', 'button', 'text', 'pill', 'avatar'];

const elementAlignmentOptions = ['top', 'center', 'bottom'];

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<TextInputWrapper
		label={text('label text', 'Test label')}
		isLabelHidden={boolean('is label hidden', false)}
		placeholder={text('placeholder', 'placeholder text')}
		value={text('value')}
		size={select('size', ['standard', 'small', 'xsmall'], 'standard')}
		isMultiline={boolean('is multiline', false)}
		minRows={number('min height of multiline input in rows', 0) || undefined}
		maxRows={number('max height of multiline input in rows', 0) || undefined}
		rows={number('set height of multiline input in rows', 0) || undefined}
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
		inputProps={object('input props', inputProps)}
	/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;
		if (!variationMinusStoryDetails.label) {
			variationMinusStoryDetails.label = 'Test label';
			variationMinusStoryDetails.isLabelHidden = true;
		}
		if (variationMinusStoryDetails.noDefault) {
			delete variationMinusStoryDetails.noDefault;
			return <XUITextInput {...variationMinusStoryDetails} type="text" />
		}

		return <TextInputWrapper {...variationMinusStoryDetails} />;
	});
});
