import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';

export default class XUISwitch extends PureComponent {
	render() {
		const {
			onChange,
			checked,
			disabled,
			name,
			value,
			qaHook,
			className
		} = this.props;

		const labelClasses = cn(
			className,
			'xui-switch',
			{'xui-is-disabled': disabled}
		);

		const inputClasses = cn(
			'xui-u-hidden-visually',
			'xui-switch--checkbox'
		);

		return (
			<label data-automationid={qaHook} className={labelClasses}>
				<input
					type="checkbox"
					onChange={onChange}
					checked={checked}
					name={name}
					value={value}
					disabled={disabled}
					className={inputClasses} />
				<div className="xui-switch--control"></div>
			</label>
		);
	}
}

XUISwitch.propTypes = {
	/** Fires when the switch is turned on or off */
	onChange : PropTypes.func.isRequired,
	qaHook: PropTypes.string,
	className: PropTypes.string,
	/** Determines whether the switch is checked or unchecked */
	checked : PropTypes.bool,
	/** Determines whether the switch is enabled or disabled */
	disabled : PropTypes.bool,
	/** Name attribute for the input */
	name : PropTypes.string,
	/** Value attribute for the input */
	value: PropTypes.string
};
