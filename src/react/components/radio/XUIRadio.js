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
			isChecked,
			isDisabled,
			isRequired,
			isReversed,
			name,
			onChange,
			value,
			svgClassName,
			labelClassName
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

		return (
			<label className={classes} data-automationid={qaHook} onClick={onLabelClick}>
				<input tabIndex={tabIndex} type="radio" checked={isChecked} disabled={isDisabled} required={isRequired} name={name} onChange={onChange} value={value} />
				<svg className={svgClasses}>
					<path className="xui-styledradio--focus" role="presentation" d={iconMainPath || radioMain} />
					<path className="xui-styledradio--main" role="presentation" d={iconMainPath || radioMain} />
					{iconMainPath && !iconCheckPath ? null : <path className="xui-styledradio--check" role="presentation" d={iconCheckPath || radioCheck} />}
				</svg>
				<span className={labelClasses}>{children}</span>
			</label>
		);
	}
}

XUIRadio.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** @property {string} [iconCheckPath] - The icon path to use for the checkmark */
	iconCheckPath: PropTypes.string,

	/** @property {string} [iconMainPath] - The icon path to use for the radio */
	iconMainPath: PropTypes.string,

	/** @property {boolean} [isChecked] - The input is selected */
	isChecked: PropTypes.bool,

	/** @property {boolean} [isDisabled] - The input is disabled */
	isDisabled: PropTypes.bool,

	/** @property {boolean} [isRequired] - The input is required for form submission */
	isRequired: PropTypes.bool,

	/** @property {boolean} [isReversed] - The label and control are displayed in reverse order */
	isReversed: PropTypes.bool,

	/** @property {string} [labelClassName] - Additional class names on the span (pseudo-label) element  */
	labelClassName: PropTypes.string,

	/** @property {string} [name] - The name to use as a reference for the value */
	name: PropTypes.string,

	/** @property {function} onChange - The function to call when the control changes state */
	onChange: PropTypes.func,

	/** @property {string} [value] - The value to return on form submission */
	value: PropTypes.string,

	/** @property {string} [svgClassName] - Additional class names on the svg element  */
	svgClassName: PropTypes.string,

	/** @property {number} [tabIndex] - The tabindex property to place on the radio input */
	tabIndex: PropTypes.number
};
