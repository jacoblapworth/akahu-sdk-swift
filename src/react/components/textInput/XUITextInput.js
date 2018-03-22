import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import autosize from 'autosize';

import { compose } from '../helpers/compose';
import { baseClass } from './private/constants';
import { calculateMaxHeight } from '../textarea/helpers';

// Deconstructs attributes from props to determine whether autoresizing should be enabled
const shouldAutomaticallyResize = ({isMultiline, rows}) =>
	isMultiline && typeof rows !== 'number';

class XUITextInput extends PureComponent {
	state = {
		hasFocus: false
	}

	componentDidMount() {
		const { maxRows } = this.props;

		if (shouldAutomaticallyResize(this.props)) {
			if (maxRows != null) {
				this.setState({
					maxHeight: calculateMaxHeight({
						textArea: this.input,
						maxRows,
					})
				});
			}

			autosize(this.input);
		}
	}

	componentWillUnmount() {
		autosize.destroy(this.input);
	}

	componentDidUpdate() {
		if (shouldAutomaticallyResize(this.props)) {
			var evt = document.createEvent('Event');
			evt.initEvent('autosize:update', true, false);
			this.input.dispatchEvent(evt);
		}
	}

	onFocus = e => {
		this.setState({
			hasFocus: true
		}, () => this.props.onFocus && this.props.onFocus(e))
	}

	onBlur = e => {
		this.setState({
			hasFocus: false
		}, () => this.props.onBlur && this.props.onBlur(e))
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
			onKeyDown,
			leftElement,
			rightElement,
			qaHook,
			inputProps,
			inputRef,
			isFieldLayout,
			fieldClassName,
			containerClassName,
			inputClassName,
			defaultValue,
			placeholder,
			isInverted,
			isDisabled,
			isMultiline,
			isManuallyResizable,
			minRows,
			rows
		} = input.props;
		const {
			maxHeight,
			hasFocus,
		} = this.state;

		const message = (validationMessage || hintMessage) && (
			<div className={cn(
				'xui-validation',
				'xui-validation-layout',
				{ 'xui-validation-is-invalid': isInvalid && validationMessage }
			)}
			data-automationid={`${qaHook}--message`}>{(isInvalid && validationMessage) ? validationMessage : hintMessage}</div>
		);

		const classes = cn (
			inputClassName,
			`${baseClass}--input`,
			{
				[`${baseClass}-has-left-element`] : !!leftElement,
				[`${baseClass}-has-right-element`] : !!rightElement,
				'xui-u-resize-none': isMultiline && !isManuallyResizable,
				'xui-u-resize-vertical': isMultiline && isManuallyResizable
			}
		);

		const rootClasses = cn(
			fieldClassName,
			`${baseClass}wrapper`,
			{
				'xui-field-layout': isFieldLayout
			}
		);

		const baseClasses = cn(
			containerClassName,
			baseClass,
			{
				[`${baseClass}-is-invalid`] : isInvalid,
				[`${baseClass}-borderless`] : isBorderlessTransparent || isBorderlessSolid,
				[`${baseClass}-borderless-inverted`] : isInverted,
				[`${baseClass}-borderless-transparent`] : isBorderlessTransparent,
				[`${baseClass}-borderless-solid`] : isBorderlessSolid,
				[`${baseClass}-focus`]: hasFocus,
				[`${baseClass}-is-disabled`]: isDisabled,
			}
		);

		const InputEl = isMultiline ? 'textarea' : 'input';

		inputProps.style = {
			...inputProps.style,
			maxHeight // used by autosize for textarea resizing http://www.jacklmoore.com/autosize/
		};

		return(
			<div className={rootClasses} onKeyDown={onKeyDown}>
				<label className={baseClasses} data-automationid={qaHook}>
					{leftElement}
					<div className="xui-u-flex xui-u-flex-grow">
						<InputEl
							type={type}
							value={value}
							defaultValue={defaultValue}
							data-automationid={qaHook && `${qaHook}--input`}
							className={classes}
							onFocusCapture={input.onFocus}
							onBlurCapture={input.onBlur}
							onChange={onChange}
							placeholder={placeholder}
							disabled={isDisabled}
							ref={compose(inputRef, i => this.input = i)}
							rows={isMultiline ? rows || minRows : undefined} // used by autosize for textarea resizing http://www.jacklmoore.com/autosize/
							{...inputProps}
						/>
						{rightElement}
					</div>
				</label>
				{message}
			</div>
		)
	}
}

XUITextInput.propTypes = {
	qaHook: PropTypes.string,
	/** Value of the text input */
	value: PropTypes.string,
	/** Default value of the text input */
	defaultValue: PropTypes.string,
	/** Type of the input - should not be used together with `isMultiline` */
	type: PropTypes.oneOf(["text", "number", "password", "hidden", "email", "range", "search", "time", "tel", "url", "color"]),
	/** Function to call when the input value is changed */
	onChange: PropTypes.func,
	/** Function to call when the input is focused (does not include side elements) */
	onFocus: PropTypes.func,
	/** Function to call when focus leaves the input */
	onBlur: PropTypes.func,
	/** Function to call on keydown inside the textinput */
	onKeyDown: PropTypes.func,
	/** Whether the current input value is invalid */
	isInvalid: PropTypes.bool,
	/** Validation message to show under the input if `isInvalid` is true */
	validationMessage: PropTypes.string,
	/** Hint message to show under the input */
	hintMessage: PropTypes.string,
	/** Props to be spread onto the input element itself */
	inputProps: PropTypes.object,
	/** Sets a ref for the input element */
	inputRef: PropTypes.func,
	/** Content to be added to the left of the input element. It is recommended that you use `XUITextInputSideElement` for correct padding */
	leftElement: PropTypes.node,
	/** Content to be added to the right of the input element. It is recommended that you use `XUITextInputSideElement` for correct padding */
	rightElement: PropTypes.node,
	/** Whether to use the field layout classes */
	isFieldLayout: PropTypes.bool,
	/** Class names to be added to the field wrapper element */
	fieldClassName: PropTypes.string,
	/** Class names to add to the div wrapping the input and icons */
	containerClassName: PropTypes.string,
	/** Class names to add to the input element */
	inputClassName: PropTypes.string,
	/** Placeholder text for the input */
	placeholder: PropTypes.string,
	/** Whether to render as a solid borderless input */
	isBorderlessSolid: PropTypes.bool,
	/** Whether to render as a transparent borderless input */
	isBorderlessTransparent: PropTypes.bool,
	/** Should be set to true when placing a borderless input on a dark background */
	isInverted: PropTypes.bool,
	/** Whether the input is disabled */
	isDisabled: PropTypes.bool,
	/** Whether this should be rendered as a multiline textarea */
	isMultiline: PropTypes.bool,
	/** Minimum number of rows to render in the textarea (should only be used with `isMutliline=true`) */
	minRows: PropTypes.number,
	/** Maximum number of rows to render in the textarea (should only be used with `isMultiline=true`) */
	maxRows: PropTypes.number,
	/** Set number of rows to use as a size for the textarea (should only be used with `isMultiline=true`) */
	rows: PropTypes.number,
	/** Whether the textarea should be manually resizable (should only be used with `isMultiline=true` and `rightElement=undefined`) */
	isManuallyResizable: PropTypes.bool,
};

XUITextInput.defaultProps = {
	inputProps: {},
	minRows: 3,
};

export default XUITextInput;
