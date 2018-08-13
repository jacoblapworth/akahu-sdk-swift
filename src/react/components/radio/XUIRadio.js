import '../helpers/xuiGlobalChecks';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseClass} from "./constants";
import {ns} from "../helpers/xuiClassNamespace";
import uuidv4 from 'uuid/v4';

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
	if (svgSettings.iconMain) {
		return buildSvgRadio(qaHook, svgSettings);
	} else {
		return buildHtmlRadio(qaHook, htmlClassName);
	}
};

const buildSvgRadio = (qaHook, {svgClassName, iconMain}) => {
	const svgClasses = cn(`${ns}-icon`, svgClassName);
	return (
		<div className="xui-iconwrapper">
			<svg
				className={svgClasses}
				data-automationid={qaHook && `${qaHook}--icon`}
				width={iconMain.width}
				height={iconMain.height}
				viewBox={`0 0 ${iconMain.width} ${iconMain.height}`}
			>
				<path className={`${baseClass}--focus`} role="presentation" d={iconMain.path} />
				<path className={`${baseClass}--main`} role="presentation" d={iconMain.path} />
			</svg>
		</div>
	);
};

const buildHtmlRadio = (qaHook, htmlClassName) => {
	const htmlClasses = cn(`${baseClass}--radio`, htmlClassName);
	return (
		<div className={htmlClasses} data-automationid={qaHook && `${qaHook}--radio`}/>
	);
};

export default class XUIRadio extends React.Component {
	// User can manually proivde an id, or we will generate one.
	labelId = this.props.labelId || uuidv4();

	render() {
		const {
			tabIndex,
			children,
			className,
			qaHook,
			iconMain,
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
			isDisabled && `${ns}-styledcheckboxradio-is-disabled`
		);

		const labelClasses = cn(
			`${baseClass}--label`,
			labelClassName
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
		const inputProps = {
			'type': 'radio',
			'disabled': isDisabled,
			'required': isRequired,
			'aria-label': isLabelHidden && children || undefined,
			// Attach a "labelledby" prop if we've created the label, or if the user has provided an id.
			'aria-labelledby': labelElement && this.labelId || !children && this.props.labelId || undefined,
			tabIndex,
			name,
			onChange,
			value,
			id
		};
		const svgSettings = {
			svgClassName,
			iconMain
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
			<label className={classes} data-automationid={qaHook} onClick={onLabelClick} role="presentation">
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

	/** The icon path to use for the radio */
	iconMain: PropTypes.shape({
		path: PropTypes.string.isRequired,
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
	}),

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

	id: PropTypes.string,

	/** Provide a specific label ID which will be used as the "labelleby" aria property */
	labelId: PropTypes.string
};

XUIRadio.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isIndeterminate: false,
	isRequired: false,
	isReversed: false,
	role: "radio"
};
