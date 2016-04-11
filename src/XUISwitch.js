import React from 'react';
import XUIBaseComponent from 'xui-base-component';
import CSSClasses from 'xui-css-classes';
import cn from 'classnames';

/**
 * @public
 *
 * Property types for the XUISwitch component
 */
const propTypes = {

	/** @property {function} onChange Fires parent onChange handler */
	onChange : React.PropTypes.func.isRequired,

	/** @property {boolean} [checked=false] Determines whether the switch is checked or unchecked */
	checked : React.PropTypes.bool,

	/** @property {boolean} [disabled=false] Determines whether the switch is enabled or disabled */
	disabled : React.PropTypes.bool,

	/** @property {string} [name=name] Name attribute for the input */
	name : React.PropTypes.string,

	/** @property {string} [value=value] Value attribute for the input */
	value: React.PropTypes.string

};

/**
 * @public
 *
 * Defaults for the checked state. Defaults to not checked
 * Defaults for the disabled state. Defaults to enabled
 */
const defaultProps = {

  checked: false,

  disabled: false

};

export default class XUISwitch extends XUIBaseComponent {

	render() {

		const props = this.props;

		const labelClasses = cn(
			CSSClasses.Switch.BASE,
			{[CSSClasses.GlobalState.IS_DISABLED]: props.disabled}
		);

		const inputClasses = cn(
			CSSClasses.Utility.Hidden.VISUALLY,
			CSSClasses.Switch.CHECKBOX
		);

		return (
			<label className={labelClasses}>
				<input
					type="checkbox"
					{...props}
					className={inputClasses} />
				<div className={CSSClasses.Switch.CONTROL}></div>
			</label>
		);
	}

}

XUISwitch.propTypes = propTypes;
XUISwitch.defaultProps = defaultProps;
