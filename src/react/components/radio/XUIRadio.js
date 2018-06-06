import '../helpers/xuiGlobalChecks';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import radioMain from '@xero/xui-icon/icons/radio-main';
import radioCheck from '@xero/xui-icon/icons/radio-check';
import {baseClass} from "./constants";
import {ns} from "../helpers/xuiClassNamespace";

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

const buildRadio = (qaHook, htmlClassName, svgSettings) => {
	if (svgSettings.iconMainPath || svgSettings.iconCheckPath) {
		return buildSvgRadio(qaHook, svgSettings);
	} else {
		return buildHtmlRadio(qaHook, htmlClassName);
	}
};

const buildSvgRadio = (qaHook, {svgClassName, iconMainPath, iconCheckPath}) => {
	const svgClasses = cn(`${ns}-icon`, svgClassName);
	return (<svg className={svgClasses} data-automationid={qaHook && `${qaHook}--icon`}>
					<path className={`${baseClass}--focus`} role="presentation" d={iconMainPath || radioMain} />
					<path className={`${baseClass}--main`} role="presentation" d={iconMainPath || radioMain} />
					{iconMainPath && !iconCheckPath ? null : <path className={`${baseClass}--check`} role="presentation" d={iconCheckPath || radioCheck} />}
				</svg>);
};

const buildHtmlRadio = (qaHook, htmlClassName) => {
	const htmlClasses = cn(`${baseClass}--radio`, htmlClassName);
	return (
		<div className={htmlClasses} data-automationid={qaHook && `${qaHook}--radio`}/>
	);
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
			isDefaultChecked,
			isChecked,
			isDisabled,
			isRequired,
			isReversed,
			name,
			onChange,
			value,
			svgClassName,
			htmlClassName,
			labelClassName,
			isLabelHidden,
			role,
			id
		} = this.props;

		const classes = cn(
			className,
			`${baseClass}`,
			isReversed && `${baseClass}-reversed`,
			isDisabled && `${ns}-is-disabled`
		);

		const labelClasses = cn(
			`${baseClass}--label`,
			labelClassName
		);
		const labelElement =
			!isLabelHidden &&
			children &&
			<span className={labelClasses} data-automationid={qaHook && `${qaHook}--label`}>{children}</span>;
		const inputProps = {
			'type': 'radio',
			'disabled': isDisabled,
			'required': isRequired,
			'aria-label': isLabelHidden && children || undefined,
			tabIndex,
			name,
			onChange,
			value,
			id
		};
		const svgSettings = {
			svgClassName,
			iconCheckPath,
			iconMainPath
		};

		if (typeof isChecked !== 'boolean') {
			inputProps.defaultChecked = !!isDefaultChecked;
		} else {
			inputProps.checked = isChecked;
			// checked prop without an onChange handler means this is readonly, so set that to prevent
			// warnings in the console.
			if (onChange == null) {
				inputProps.readOnly = true;
			}
		}

		return (
			<label className={classes} data-automationid={qaHook} onClick={onLabelClick}>
				<input role={role} className={`${baseClass}--input`} {...inputProps} data-automationid={qaHook && `${qaHook}--input`} />
				{buildRadio(qaHook, htmlClassName, svgSettings)}
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

	/** Additional class names for the html input */
	htmlClassName: PropTypes.string,

	/** The tabindex property to place on the radio input */
	tabIndex: PropTypes.number,

	/** Prevents the label element from being displayed on the page. Label is still accessible to screen readers. */
	isLabelHidden: PropTypes.bool,

	/** Used to output an uncontrolled checkbox component.  If a value is passed to the isChecked prop, this prop will be ignored. */
	isDefaultChecked: PropTypes.bool,

	/** Role to be applied for screen readers */
	role: PropTypes.string,

	id: PropTypes.string
};

XUIRadio.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isIndeterminate: false,
	isRequired: false,
	isReversed: false,
	role: "radio"
};
