import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { compose } from './private/utilities';

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

			const iconWrapperClasses = cn(
				iconWrapperClass,
				`${iconWrapperClass}-${iconAttributes.position}`,
				`${iconWrapperClass}-${iconAttributes.wrapperColor}`
			);

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

const iconPositions = ['left', 'right'];
const iconWrapperColors = ['twitter', 'facebook', 'linkedin'];

XUIStatelessInput.propTypes = {
	/** @property {Element} [button] Object containing button element placed after input in dom */
	button: PropTypes.element,
	/** @property {String} [className] Class to apply to the input element */
	className: PropTypes.string,
	/** @property {String} [containerClassName] Class to apply to the container element */
	containerClassName: PropTypes.string,
	/** @property {Object} [iconAttributes] Object containing icon element related properties */
	iconAttributes: PropTypes.shape({
		position: PropTypes.oneOf(iconPositions),
		wrapperColor: PropTypes.oneOf(iconWrapperColors)
	}),
	/** @property {Object} [inputAttributes] Object containing any additional properties and their values to the Input element.
	 * Includes event handler callbacks i.e. onChange, onSelect, onClick, onKeyDown etc. */
	inputAttributes: PropTypes.object,
	/** @property {Function} [inputRef] Function to add a reference to the Input element */
	inputRef: PropTypes.func,
	/** @property {String} [qaHook] Value of the automationId attribute */
	qaHook: PropTypes.string,
	/** @property {String} [validationMessage] Validation message to show */
	validationMessage: PropTypes.string,
	/** @property {String} [hintMessage] Explanatory message to show */
	hintMessage: PropTypes.string,
	/** @property {String} [isInvalid=false] Whether the input should be show as invalid */
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
