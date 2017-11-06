import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { compose } from '../helpers/compose';

export default class XUIStatelessInput extends PureComponent {
	render() {
		const input = this;
		const {
			button,
			className,
			containerClassName,
			iconAttributes,
			inputAttributes,
			inputRef,
			qaHook,
			validationMessage,
			hintMessage,
			isInvalid,
			isBorderless,
			isFieldLayout,
			...other
		} = input.props;

		const baseClass = 'xui-input';
		const hasLeftIcon = `${baseClass}-has-left-icon`;
		const hasRightIcon = `${baseClass}-has-right-icon`;

		let inputClasses = cn(
			baseClass,
			className,
			{
				[`${baseClass}-is-invalid`] : isInvalid,
				[`${baseClass}-borderless`] : isBorderless
			}
		);

		const inputWrapperClasses = cn(
			`${baseClass}wrapper`,
			containerClassName,
			{
				'xui-field-layout': isFieldLayout
			}
		);

		const hasIcon = !!(iconAttributes && iconAttributes.path);

		let iconComponent;

		if (hasIcon) {
			if ((!iconAttributes.position || iconAttributes.position == "left") && !inputClasses.includes(hasLeftIcon)) {
				inputClasses += ` ${hasLeftIcon}`;
				if (button && !inputClasses.includes(hasRightIcon)) {
					inputClasses += ` ${hasRightIcon}`
				}
			} else if (!inputClasses.includes(hasRightIcon)) {
				inputClasses += ` ${hasRightIcon}`;
			}

			const iconClass = `${baseClass}--icon-${iconAttributes.position || 'left'}`;
			const iconWrapperClass = hasIcon && `${baseClass}--iconwrapper`;

			const iconWrapperClasses = cn(
				iconWrapperClass,
				`${iconWrapperClass}-${iconAttributes.position}`,
				{
					[`${iconWrapperClass}-${iconAttributes.wrapperColor}`]: iconAttributes.wrapperColor != null
				});

			iconComponent = iconWrapperClass ? (
				<div className={iconWrapperClasses}>
					<XUIIcon
						className={iconClass}
						{...iconAttributes}
					/>
				</div>
			) : (
				<XUIIcon
					className={iconClass}
					{...iconAttributes}
				/>
			)
		} else if (button && !inputClasses.includes(hasRightIcon)) {
			inputClasses += ` ${hasRightIcon}`;
		}

		// TODO: clean this up. Don't use both ...other and inputAttributes
		const inputProps = {...other, ...XUIStatelessInput.defaultProps.inputAttributes, ...inputAttributes};

		// null is not a valid value
		if(inputProps.defaultValue === null) {
			inputProps.defaultValue = '';
		}

		if(inputProps.value === null) {
			inputProps.value = '';
		}

		const message = (validationMessage || hintMessage) && (
			<div className={cn(
				'xui-validation',
				'xui-validation-layout',
				{ 'xui-validation-is-invalid': isInvalid && validationMessage }
			)}>{(isInvalid && validationMessage) ? validationMessage : hintMessage}</div>
		);

		return (
			<div
				data-automationid={qaHook && `${qaHook}--container`}
				className={inputWrapperClasses}>
				{iconComponent}
				<input
					ref={compose(inputRef, n => input.inputNode = n)}
					data-automationid={qaHook}
					className={inputClasses}
					{...inputProps}
				/>
				{button}
				{message}
			</div>
		);
	}
}

XUIStatelessInput.propTypes = {
	/** Object containing button element placed after input in dom */
	button: PropTypes.element,
	/** Class to apply to the input element */
	className: PropTypes.string,
	/** Class to apply to the container element */
	containerClassName: PropTypes.string,
	/** Object containing icon element related properties */
	iconAttributes: PropTypes.shape({
		path: PropTypes.string,
		position: PropTypes.oneOf(['left', 'right']),
		wrapperColor: PropTypes.oneOf(['twitter', 'facebook', 'linkedin'])
	}),
	/** Object containing any additional properties and their values to the Input element.
	 * Includes event handler callbacks i.e. onChange, onSelect, onClick, onKeyDown etc. */
	inputAttributes: PropTypes.object,
	/** Function to add a reference to the Input element */
	inputRef: PropTypes.func,
	/** Value of the automationId attribute */
	qaHook: PropTypes.string,
	/** Validation message to show */
	validationMessage: PropTypes.node,
	/** Explanatory message to show */
	hintMessage: PropTypes.node,
	/** Whether the input should be show as invalid */
	isInvalid: PropTypes.bool,
	/** Whether to use the input field layout */
	isFieldLayout: PropTypes.bool
};

XUIStatelessInput.defaultProps = {
	inputAttributes: {
		type : 'text',
		disabled: false,
		readOnly: false
	},
	isInvalid: false
};
