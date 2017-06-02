import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';

/**
 * @public
 *
 * Property types for the XUISwitch component
 */
const propTypes = {

	/** @property {function} onChange Fires parent onChange handler */
	onChange : PropTypes.func.isRequired,

	/** @property {boolean} [checked=false] Determines whether the switch is checked or unchecked */
	checked : PropTypes.bool,

	/** @property {boolean} [disabled=false] Determines whether the switch is enabled or disabled */
	disabled : PropTypes.bool,

	/** @property {string} [name=name] Name attribute for the input */
	name : PropTypes.string,

	/** @property {string} [value=value] Value attribute for the input */
	value: PropTypes.string

};

export default class XUISwitch extends PureComponent {
	render() {
		const {props} = this;

		const labelClasses = cn(
			'xui-switch',
			{'xui-is-disabled': props.disabled}
		);

		const inputClasses = cn(
			'xui-u-hidden-visually',
			'xui-switch--checkbox'
		);

		return (
			<label className={labelClasses}>
				<input
					type="checkbox"
					{...props}
					className={inputClasses} />
				<div className="xui-switch--control"></div>
			</label>
		);
	}
}

XUISwitch.propTypes = propTypes;
