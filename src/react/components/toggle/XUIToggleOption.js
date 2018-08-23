import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './private/constants';

/** @private typeMap - Map types to attributes */
const typeMap = {
	radio: 'radio',
	checkbox: 'checkbox',
};

export default function XUIToggleOption(props) {
	const {
		children,
		className,
		qaHook,
		isChecked,
		isDefaultChecked,
		isDisabled,
		isRequired,
		name,
		onChange,
		type,
		value,
		id,
	} = props;
	const classes = cn(
		className,
		`${baseClass}-option`,
		isDisabled && `${baseClass}-is-disabled`,
	);

	return (
		<label htmlFor={id} className={classes} data-automationid={qaHook}>
			<input
				className={`${baseClass}--input`}
				data-automationid={qaHook && `${qaHook}--input`}
				checked={isChecked}
				defaultChecked={isDefaultChecked}
				disabled={isDisabled}
				required={isRequired}
				name={name}
				onChange={onChange}
				type={typeMap[type]}
				value={value}
				id={id}
			/>
			<span className={`${baseClass}--label`}>{children}</span>
		</label>
	);
}


XUIToggleOption.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** The input is selected */
	isChecked: PropTypes.bool,
	/** The input is selected initially, but not in a controlled manner */
	isDefaultChecked: PropTypes.bool,
	/** The input is disabled */
	isDisabled: PropTypes.bool,
	/** The input is required for form submission */
	isRequired: PropTypes.bool,
	/** The name to use as a reference for the value */
	name: PropTypes.string,
	/** onChange - The function to call when the control changes state */
	onChange: PropTypes.func.isRequired,
	/** The type of the input */
	type: PropTypes.oneOf(Object.keys(typeMap)),
	/** The value to return on form submission */
	value: PropTypes.string,
	id: PropTypes.string,
};

XUIToggleOption.defaultProps = {
	type: typeMap.radio,
};
