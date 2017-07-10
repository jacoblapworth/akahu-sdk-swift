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
			...other
		} = input.props;

		const baseClass = 'xui-input';

		const inputClasses = cn(
			baseClass,
			className,
			{
				[`${baseClass}-is-invalid`]: isInvalid
			}
		);

		const inputWrapperClasses = cn(
			`${baseClass}-wrapper`,
			containerClassName
		);

		const hasIcon = !!(iconAttributes && iconAttributes.path);

		let iconComponent;

		if (hasIcon) {
			const iconClass = `${baseClass}--icon-${iconAttributes.position || 'left'}`;
			const iconWrapperClass = hasIcon && `${baseClass}--iconwrapper`;

			const iconWrapperClasses = cn(iconWrapperClass, `${iconWrapperClass}-${iconAttributes.position}`, {
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
		}

		const inputProps = {...other, ...XUIStatelessInput.defaultProps.inputAttributes, ...inputAttributes};

		const message = (validationMessage || hintMessage) && (
			<div className={cn(
				'xui-validation',
				'xui-validation-layout',
				{ 'xui-validation-is-invalid': isInvalid && validationMessage }
			)}>{(isInvalid && validationMessage) ? validationMessage : hintMessage}</div>
		);

		return (
			<div
				data-automationid={qaHook ? `${qaHook}-container` : null}
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
	validationMessage: PropTypes.string,
	/** Explanatory message to show */
	hintMessage: PropTypes.string,
	/** Whether the input should be show as invalid */
	isInvalid: PropTypes.bool
};

XUIStatelessInput.defaultProps = {
	inputAttributes: {
		type : 'text',
		disabled: false,
		readOnly: false
	},
	isInvalid: false
};
