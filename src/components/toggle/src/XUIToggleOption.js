import React from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';


/** @private typeMap - Map types to attributes */
const typeMap = {
	radio: 'radio',
	checkbox: 'checkbox'
};


const propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** @property {boolean} [isChecked] - The input is selected */
	isChecked: PropTypes.bool,

	/** @property {boolean} [isDisabled] - The input is disabled */
	isDisabled: PropTypes.bool,

	/** @property {boolean} [isRequired] - The input is required for form submission */
	isRequired: PropTypes.bool,

	/** @property {string} [name] - The name to use as a reference for the value */
	name: PropTypes.string,

	/** @property {function} onChange - The function to call when the control changes state */
	onChange: PropTypes.func.isRequired,

	/** @property {string} [type='radio'] - The type of the input */
	type: PropTypes.oneOf(Object.keys(typeMap)),

	/** @property {string} [value] - The value to return on form submission */
	value: PropTypes.string
};


const defaultProps = {
	type: 'radio'
};


export default function XUIToggleOption(props) {
	const {children, className, qaHook, isChecked, isDisabled, isRequired, name, onChange, type, value} = props;
	const classes = cn(className, 'xui-toggle-option', {'xui-is-disabled': isDisabled});

	return (
		<label className={classes} data-automationid={qaHook}>
			<input className="xui-toggle--input" checked={isChecked} disabled={isDisabled} required={isRequired} name={name} onChange={onChange} type={typeMap[type]} value={value} />
			<span className="xui-toggle--label">{children}</span>
		</label>
	);
}


XUIToggleOption.propTypes = propTypes;
XUIToggleOption.defaultProps = defaultProps;
