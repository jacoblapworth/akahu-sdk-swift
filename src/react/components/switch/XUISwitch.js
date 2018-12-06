import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapperInline, { getAriaAttributes } from '../controlwrapper/XUIControlWrapperInline';
import generateIds from '../controlwrapper/helpers';

const baseClass = `${ns}-switch`;

/**
 * @function onLabelClick - Prevent 2 click events bubbling. Since our input is wrapped
 * inside a label, then clicking the label will also cause a new click event on the input,
 * which also bubbles up. If a consumer attaches an onClick event listener further up the
 * DOM, we don't want it to be fired twice.
 *
 * @private
 */
const onLabelClick = e => {
	if (e.target.tagName !== 'INPUT') {
		e.stopPropagation();
	}
};

export default class XUISwitch extends PureComponent {
	// User can manually provide an id, or we will generate one.
	wrapperIds = generateIds(this.props.labelId);

	constructor(props) {
		super(props);

		this._isControlled = typeof props.isChecked === 'boolean';

		// We conditionally maintain state in order to support 'uncontrolled' component
		this.state = {
			internalIsChecked: this._isControlled ? null : !!props.isDefaultChecked,
		};

		this.internalOnChange = this.internalOnChange.bind(this);
	}

	internalOnChange(e) {
		this.setState({ internalIsChecked: e.target.checked });
		this.props.onChange && this.props.onChange(e);
	}

	render() {
		const {
			children,
			isDisabled,
			name,
			value,
			qaHook,
			className,
			isReversed,
			isLabelHidden,
			labelClassName,
			isInvalid,
			validationMessage,
			hintMessage,
		} = this.props;

		const isChecked = this._isControlled ? this.props.isChecked : this.state.internalIsChecked;
		const onChange = this._isControlled ? this.props.onChange : this.internalOnChange;

		const classes = cn(
			className,
			baseClass,
			isReversed && `${baseClass}-reversed`,
			isDisabled && `${baseClass}-is-disabled`,
		);
		const labelClasses = cn(
			`${baseClass}--label`,
			labelClassName,
		);

		const inputClasses = `${baseClass}--checkbox`;

		const inputProps = {
			'type': 'checkbox',
			'role': 'switch',
			'className': inputClasses,
			'data-automationid': qaHook && `${qaHook}--input`,
			'disabled': isDisabled || undefined,
			'aria-checked': isChecked,
			'checked': isChecked,
			name,
			value,
			onChange,
			...getAriaAttributes(this.wrapperIds, this.props),
		};

		return (
			<XUIControlWrapperInline
				fieldClassName={classes}
				wrapperIds={this.wrapperIds}
				onClick={onLabelClick}
				labelClassName={labelClasses}
				label={children}
				{...{
					qaHook,
					isInvalid,
					validationMessage,
					hintMessage,
					isLabelHidden,
				}}
			>
				<input
					{...inputProps}
				/>
				<div className={`${baseClass}--control`} data-automationid={qaHook && `${qaHook}--switch`} />
			</XUIControlWrapperInline>
		);
	}
}

XUISwitch.propTypes = {
	children: PropTypes.node,
	/** Fires when the switch is turned on or off. No longer required. */
	onChange: PropTypes.func,
	qaHook: PropTypes.string,
	className: PropTypes.string,
	/** Determines whether the switch is checked or unchecked.
	 * This makes the switch a controlled component.
	 * Omitting the isChecked prop will make it an uncontrolled component. */
	isChecked: PropTypes.bool,
	/** Used to provide an uncontrolled switch component. If a value is passed to the
	 * isChecked prop, this prop will be ignored. */
	isDefaultChecked: PropTypes.bool,
	/** Determines whether the switch is enabled or disabled */
	isDisabled: PropTypes.bool,
	/** Name attribute for the input */
	name: PropTypes.string,
	/** Value attribute for the input */
	value: PropTypes.string,
	/** Provide a specific label ID which will be used as the "labelleby" aria property */
	labelId: PropTypes.string,
	/** The label and control are displayed in reverse order */
	isReversed: PropTypes.bool,

	/** Additional class names on the span (pseudo-label) element  */
	labelClassName: PropTypes.string,

	/** Prevents the label element from being displayed on the page. Label is still
	 * accessible to screen readers. */
	isLabelHidden: PropTypes.bool,
	/** Whether the current input value is invalid */
	isInvalid: PropTypes.bool,
	/** Validation message to show under the input if `isInvalid` is true */
	validationMessage: PropTypes.string,
	/** Hint message to show under the input */
	hintMessage: PropTypes.string,
};

XUISwitch.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isReversed: false,
};
