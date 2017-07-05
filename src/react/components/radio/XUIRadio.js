import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import radioMain from '@xero/xui-icon/icons/radio-main';
import radioCheck from '@xero/xui-icon/icons/radio-check';

/**
 * @function handleLabelClick - Prevent 2 click events bubbling. Since our input is wrapped inside a label,
 * then clicking the label will also cause a new click event on the input, which also bubbles up. If a consumer
 * attaches an onClick event listener further up the DOM, we don't want it to be fired twice.
 *
 * @private
 */
const onLabelClick = e => {
	if(e.target.tagName !== 'INPUT') {
		e.stopPropagation();
	}
};

export default class XUIRadio extends React.Component {
	render() {
		const {
			tabIndex,
			children,
			className,
			qaHook,
			iconCheckPath,
			iconMainPath,
			defaultChecked,
			isChecked,
			isDisabled,
			isRequired,
			isReversed,
			name,
			onChange,
			value,
			svgClassName,
			labelClassName,
			isLabelHidden
		} = this.props;

		const classes = cn(
			className,
			'xui-styledradio',
			{
				'xui-styledradio-reversed': isReversed,
				'xui-is-disabled': isDisabled
			}
		);

		const svgClasses = cn('xui-icon', svgClassName);
		const labelClasses = cn('xui-styledradio--label', labelClassName);
		const labelElement = !isLabelHidden ? <span className={labelClasses}>{children}</span> : null;
		const inputProps = {
			type: 'radio',
			disabled: isDisabled,
			required: isRequired,
			tabIndex,
			name,
			onChange,
			value,
		}

		if (isChecked) {
			inputProps.checked = isChecked;
			// checked prop without an onChange handler means this is readonly, so set that to prevent
			// warnings in the console.
			if (onChange == null) {
				inputProps.readOnly = true;
			}
		} else {
			inputProps.defaultChecked = defaultChecked;
		}

		return (
			<label className={classes} data-automationid={qaHook} onClick={onLabelClick}>
				<input {...inputProps} />
				<svg className={svgClasses}>
					<path className="xui-styledradio--focus" role="presentation" d={iconMainPath || radioMain} />
					<path className="xui-styledradio--main" role="presentation" d={iconMainPath || radioMain} />
					{iconMainPath && !iconCheckPath ? null : <path className="xui-styledradio--check" role="presentation" d={iconCheckPath || radioCheck} />}
				</svg>
				{labelElement}
			</label>
		);
	}
}

XUIRadio.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** The icon path to use for the checkmark */
	iconCheckPath: PropTypes.string,

	/** The icon path to use for the radio */
	iconMainPath: PropTypes.string,

	/** The input is selected */
	isChecked: PropTypes.bool,

	/** The input is disabled */
	isDisabled: PropTypes.bool,

	/** The input is required for form submission */
	isRequired: PropTypes.bool,

	/** The label and control are displayed in reverse order */
	isReversed: PropTypes.bool,

	/** Additional class names on the span (pseudo-label) element  */
	labelClassName: PropTypes.string,

	/** The name to use as a reference for the value */
	name: PropTypes.string,

	/**onChange - The function to call when the control changes state */
	onChange: PropTypes.func,

	/** The value to return on form submission */
	value: PropTypes.string,

	/** Additional class names on the svg element  */
	svgClassName: PropTypes.string,

	/** The tabindex property to place on the radio input */
	tabIndex: PropTypes.number,

	/** Prevents the label element from being rendered to the page */
	isLabelHidden: PropTypes.bool,

	/** Used to output an uncontrolled checkbox component.  If a value is passed to the isChecked prop, this prop will be ignored. */
	defaultChecked: PropTypes.bool,
};

XUIRadio.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isIndeterminate: false,
	isRequired: false,
	isReversed: false,
	defaultChecked: false
};
