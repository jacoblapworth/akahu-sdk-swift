import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import clear from '@xero/xui-icon/icons/clear';
import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import { compose } from '../helpers/compose';

const onInputChange = (statefulInput) => {
	if (statefulInput.inputNode.value === '' && statefulInput.state.showClearButton) {
		statefulInput.setState({showClearButton: false});
	}

	if (statefulInput.inputNode.value !== '' && !statefulInput.state.showClearButton) {
		statefulInput.setState({showClearButton: true});
	}
};

const onClearInputClick = (statefulInput) => {
	const { inputAttributes } = statefulInput.props;
	statefulInput.inputNode.value = '';
	statefulInput.inputNode.focus();

	if (inputAttributes && typeof inputAttributes.onChange === 'function') {
		statefulInput.props.inputAttributes.onChange({target: statefulInput.inputNode});
	}

	onInputChange(statefulInput);
};

export default class XUIInput extends Component {
	constructor(props) {
		super(props);
		const statefulInput = this;
		const {inputAttributes} = props;

		statefulInput.state = {
			showClearButton: inputAttributes && !!inputAttributes.defaultValue
		};
	}

	/**
	 * Focus the input node if we can.
	 *
	 * @public
	 * @memberof XUIInput
	 */
	focus() {
		if (this.inputNode) {
			this.inputNode.focus();
		}
	}

	render() {
		const statefulInput = this;
		let iconComponent;
		const {
			clearButtonProps,
			hasClearButton,
			inputAttributes,
			inputRef,
			isBorderless,
			qaHook,
			iconAttributes,
			className,
			containerClassName,
			isFieldLayout,
			button,
			validationMessage,
			hintMessage,
			isInvalid,
			onChange
		} = statefulInput.props;

		const clearButtonIconWrapperClassName = hasClearButton && cn(
			'xui-input--iconwrapper',
			'xui-input--iconwrapper-right',
			{'xui-u-hidden': !statefulInput.state.showClearButton}
		);

		const clearButton = (hasClearButton) ?
			<div className={clearButtonIconWrapperClassName}>
				<XUIButton
					isDisabled={false}
					onClick={() => { onClearInputClick(statefulInput) }}
					variant="icon"
					qaHook={qaHook && `${qaHook}--close`}
					{...clearButtonProps}
				>
					<XUIIcon path={clear} />
				</XUIButton>
			</div> : null;

		const hasIcon = !!(iconAttributes && iconAttributes.path);

		const baseClass = 'xui-input';
		const hasLeftIcon = `${baseClass}-has-left-icon`;
		const hasRightIcon = `${baseClass}-has-right-icon`;

		const inputWrapperClasses = cn(
			`${baseClass}wrapper`,
			containerClassName,
			{
				'xui-field-layout': isFieldLayout
			}
		);

		let inputClasses = cn(
			baseClass,
			className,
			{
				[`${baseClass}-is-invalid`] : isInvalid,
				[`${baseClass}-borderless`] : isBorderless
			}
		);
		
		// null is not a valid value
		if(inputAttributes && inputAttributes.defaultValue === null) {
			inputAttributes.defaultValue = '';
		}

		if(inputAttributes && inputAttributes.value === null) {
			inputAttributes.value = '';
		}

		const message = (validationMessage || hintMessage) && (
			<div className={cn(
				'xui-validation',
				'xui-validation-layout',
				{ 'xui-validation-is-invalid': isInvalid && validationMessage }
			)}>{(isInvalid && validationMessage) ? validationMessage : hintMessage}</div>
		);

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



		return (
			<div
				data-automationid={qaHook && `${qaHook}--container`}
				className={inputWrapperClasses}>
				{iconComponent}
				<input
					ref={compose(inputRef, n => statefulInput.inputNode = n)}
					data-automationid={qaHook}
					className={inputClasses}
					onChange={onChange}
					onKeyUp={compose(inputAttributes && inputAttributes.onKeyUp, () => { onInputChange(statefulInput) })}
					{...inputAttributes}
				/>
				{clearButton}
				{message}
			</div>
		);
	}
}

XUIInput.propTypes = {
	qaHook: PropTypes.string,
	/** Object containing button element related properties. */
	clearButtonProps: PropTypes.object,
	/** Determines if the input has a clear button or not. Should not be used if consuming application is managing input value manually */
	hasClearButton: function(props, propName, componentName) {
		if (props[propName] && typeof props[propName] !== 'boolean'){
			return new Error(
				`Value of \`${propName}\` supplied to \`${componentName}\` is not a boolean`
			);
		}

		if (props[propName] && props.inputAttributes && props.inputAttributes.value){
			return new Error(
				`Do not supply \`inputAttributes.value\` to \`${componentName}\` when using \`hasClearButton\`. Use \`defaultValue\` instead`
			);
		}
	},
	/** Object containing any additional properties and their values to the Input element.
	 * Includes defaultValue event handler callbacks i.e. onChange, onSelect, onClick, onKeyDown etc. */
	inputAttributes: PropTypes.object,
	/** Whether text area has a border. */
	isBorderless: PropTypes.bool,
	/** Function to add a reference to the Input element */
	inputRef: PropTypes.func,
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
	/** Validation message to show */
	validationMessage: PropTypes.node,
	/** Explanatory message to show */
	hintMessage: PropTypes.node,
	/** Whether the input should be show as invalid */
	isInvalid: PropTypes.bool,
	/** Whether to use the input field layout */
	isFieldLayout: PropTypes.bool,
	onChange: PropTypes.func
};

XUIInput.defaultProps = {
	inputAttributes: {
		type : 'text',
		disabled: false,
		readOnly: false
	},
	isInvalid: false
};