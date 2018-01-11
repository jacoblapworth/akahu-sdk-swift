import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { baseClass } from './private/constants';

const onFocus = (e, instance) => {
	instance.setState({
		hasFocus: true
	}, instance.onFocus && instance.onFocus(e, instance))
}

const onBlur = (e, instance) => {
	instance.setState({
		hasFocus: false
	}, instance.onBlur && instance.onBlur(e, instance))
}

class XUITextInput extends Component {
	constructor() {
		super();

		this.state = {
			hasFocus: false
		}
	}

	render(){
		const input = this;
		const {
			value,
			type,
			isInvalid,
			isBorderlessTransparent,
			isBorderlessSolid,
			validationMessage,
			hintMessage,
			onChange,
			leftElement,
			rightElement,
			qaHook,
			inputProps,
			isFieldLayout,
			containerClasses,
			defaultValue,
			placeholder,
			isInverted,
			...other
		} = input.props;

		const message = (validationMessage || hintMessage) && (
			<div className={cn(
				'xui-validation',
				'xui-validation-layout',
				{ 'xui-validation-is-invalid': isInvalid && validationMessage }
			)}
			data-automationid={`${qaHook}--message`}>{(isInvalid && validationMessage) ? validationMessage : hintMessage}</div>
		);

		const classes = cn (
			`${baseClass}--input`,
			`${baseClass}-borderless`,
			{
				[`${baseClass}-has-left-icon`] : !!leftElement,
				[`${baseClass}-has-right-icon`] : !!rightElement,
			}
		);

		const rootClasses = cn(
			containerClasses,
			`${baseClass}wrapper`,
			{
				'xui-field-layout': isFieldLayout
			}
		);

		const baseClasses = cn(
			baseClass,

			{
				[`${baseClass}-is-invalid`] : isInvalid,
				[`${baseClass}-borderless`] : isBorderlessTransparent || isBorderlessSolid,
				[`${baseClass}-borderless-inverted`] : isInverted,
				[`${baseClass}-borderless-transparent`] : isBorderlessTransparent,
				[`${baseClass}-borderless-solid`] : isBorderlessSolid,
				[`${baseClass}-focus`]: this.state.hasFocus
			}
		);

		return(
			<div className={rootClasses} {...other}>
				<div className={baseClasses} data-automationid={qaHook}>
					{leftElement && leftElement({
						className: `${baseClass}--iconwrapper ${baseClass}--iconwrapper-left`,
						position: 'left'
					})}
					<input
						type={type}
						value={value}
						defaultValue={defaultValue}
						data-automationid={qaHook && `${qaHook}--input`}
						className={classes}
						onFocusCapture={e => onFocus(e, input)}
						onBlurCapture={e => onBlur(e, input)}
						onChange={onChange}
						placeholder={placeholder}
						{...inputProps}
					/>
					{rightElement && rightElement({
						className: `${baseClass}--iconwrapper ${baseClass}--iconwrapper-right`,
						position: 'right'
					})}
				</div>
				{message}
			</div>
		)
	}
}

XUITextInput.propTypes = {
	value: PropTypes.string,
	defaultValue: PropTypes.string,
	type: PropTypes.oneOf(["text", "number", "password", "hidden", "email", "range", "search", "time", "tel", "url", "color"]),
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	qaHook: PropTypes.string,
	isInvalid: PropTypes.bool,
	validationMessage: PropTypes.string,
	hintMessage: PropTypes.string,
	inputProps: PropTypes.object,
	leftElement: PropTypes.func,
	rightElement: PropTypes.func,
	isFieldLayout: PropTypes.bool,
	containerClasses: PropTypes.string,
	placeholder: PropTypes.string,
	isBorderlessSolid: PropTypes.bool,
	isBorderlessTransparent: PropTypes.bool,
	isInverted: PropTypes.bool
}

XUITextInput.defaultProps = {
	inputProps: {}
}

export default XUITextInput;
