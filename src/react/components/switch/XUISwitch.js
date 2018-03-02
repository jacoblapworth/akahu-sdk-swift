import '../helpers/xuiGlobalChecks';
import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';

export default class XUISwitch extends PureComponent {
	render() {
		const {
			onChange,
			isChecked,
			isDisabled,
			name,
			value,
			qaHook,
			className
		} = this.props;

		const labelClasses = cn(
			className,
			'xui-switch',
			{'xui-is-disabled': isDisabled}
		);

		const inputClasses = cn(
			'xui-u-hidden-visually',
			'xui-switch--checkbox'
		);

		return (
			<label data-automationid={qaHook && `${qaHook}--label`} className={labelClasses}>
				<input
					type="checkbox"
					onChange={onChange}
					checked={isChecked}
					name={name}
					value={value}
					disabled={isDisabled}
					className={inputClasses}
					data-automationid={qaHook && `${qaHook}--input`}/>
				<div className="xui-switch--control" data-automationid={qaHook}></div>
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
	isChecked : PropTypes.bool,
	/** Determines whether the switch is enabled or disabled */
	isDisabled : PropTypes.bool,
	/** Name attribute for the input */
	name : PropTypes.string,
	/** Value attribute for the input */
	value: PropTypes.string
};
