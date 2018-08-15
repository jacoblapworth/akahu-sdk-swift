import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuidv4 from 'uuid/v4';

import '../helpers/xuiGlobalChecks';
import { ns } from '../helpers/xuiClassNamespace';

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
	// User can manually proivde an id, or we will generate one.
	labelId = this.props.labelId || uuidv4();

	render() {
		const {
			children,
			onChange,
			isChecked,
			isDisabled,
			name,
			value,
			qaHook,
			className,
			isReversed,
			isLabelHidden,
			labelClassName,
		} = this.props;

		const classes = cn(
			className,
			baseClass,
			isReversed && `${baseClass}-reversed`,
			isDisabled && `${ns}-is-disabled`,
		);
		const labelClasses = cn(
			`${baseClass}--label`,
			labelClassName,
		);
		const labelElement =
			!isLabelHidden &&
			children && (
				<span
					id={this.labelId}
					className={labelClasses}
					data-automationid={qaHook && `${qaHook}--label`}
				>
					{children}
				</span>
			);

		const inputClasses = `${ns}-u-hidden-visually ${baseClass}--checkbox`;

		const ariaProps = {
			'role': 'switch',
			'aria-checked': !!isChecked,
			'aria-disabled': isDisabled || undefined,
			'aria-label': (isLabelHidden && children) || undefined,
			// Attach a "labelledby" prop if we've created the label, or if the user has provided an id.
			'aria-labelledby':
				(labelElement && this.labelId)
				|| (!children && this.props.labelId)
				|| undefined,
		};

		return (
			<label
				data-automationid={qaHook && `${qaHook}--label`}
				className={classes}
				onClick={onLabelClick}
				role="presentation"
			>
				<input
					type="checkbox"
					onChange={onChange}
					checked={isChecked}
					name={name}
					value={value}
					disabled={isDisabled || undefined}
					className={inputClasses}
					data-automationid={qaHook && `${qaHook}--input`}
					{...ariaProps}
				/>
				<div className={`${ns}-switch--control`} data-automationid={qaHook} />
				{labelElement}
			</label>
		);
	}
}

XUISwitch.propTypes = {
	children: PropTypes.node,
	/** Fires when the switch is turned on or off */
	onChange: PropTypes.func.isRequired,
	qaHook: PropTypes.string,
	className: PropTypes.string,
	/** Determines whether the switch is checked or unchecked */
	isChecked: PropTypes.bool,
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
};

XUISwitch.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isReversed: false,
};
