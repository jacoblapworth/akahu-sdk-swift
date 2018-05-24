import '../helpers/xuiGlobalChecks';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import checkboxIndeterminate from '@xero/xui-icon/icons/checkbox-indeterminate';
import checkboxMain from '@xero/xui-icon/icons/checkbox-main';
import {baseClass} from './constants';
import {ns} from "../helpers/xuiClassNamespace";

/**
 * @function setIndeterminate - Set the indeterminate DOM property of the given checkbox instance
 * @param xuiCheckbox - The checkbox instance for which to set the indeterminate DOM property
 */
const setIndeterminate = (xuiCheckbox) => {
	if(xuiCheckbox._input) {
		xuiCheckbox._input.indeterminate = xuiCheckbox.props.isIndeterminate;
	}
};

/**
 * @function onLabelClick - Prevent 2 click events bubbling. Since our input is wrapped inside a label,
 * then clicking the label will also cause a new click event on the input, which also bubbles up. If a consumer
 * attaches an onClick event listener further up the DOM, we don't want it to be fired twice.
 *
 * @private
 */
const onLabelClick = e => {
	if (e.target.tagName !== 'INPUT') {
		e.stopPropagation();
	}
};

/**
 * @function buildSvgCheckbox - If triggered with a custom icon path, build svg checkbox
 * @param qaHook - Optional hook label
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 *
 */
const buildSvgCheckbox = (qaHook, {svgClassName, iconMainPath, iconCheckPath, iconIndeterminatePath}) => {
	const svgClasses = cn(`${ns}-icon`, svgClassName);
	return (
		<svg className={svgClasses} data-automationid={qaHook && `${qaHook}--icon`}>
			<path d={iconMainPath || checkboxMain} className={`${baseClass}--focus`} role="presentation" />
			<path d={iconMainPath || checkboxMain} className={`${baseClass}--main`} role="presentation" />
			{iconMainPath && !iconCheckPath ? null : <path d={iconCheckPath || checkboxCheck} className={`${baseClass}--check`} role="presentation" />}
			{iconMainPath && !iconIndeterminatePath ? null : <path d={iconIndeterminatePath || checkboxIndeterminate} className={`${baseClass}--indeterminate`} role="presentation" />}
		</svg>
	);
};

/**
 * @function buildHtmlCheckbox - given the checkbox props supplied, select which checkbox builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of checkbox
 *
 */
const buildHtmlCheckbox = (qaHook, htmlClassName) => {
	const htmlClasses = cn(`${baseClass}--checkbox`, htmlClassName);
	return (
		<div className={htmlClasses} data-automationid={qaHook && `${qaHook}--checkbox`}/>
	);
};

/**
 * @function buildCheckbox - given the checkbox props supplied, select which checkbox builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of checkbox
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 *
 */
const buildCheckbox = (qaHook, htmlClassName, svgSettings) => {
	if (svgSettings.iconMainPath || svgSettings.iconCheckPath || svgSettings.iconIndeterminatePath) {
		return buildSvgCheckbox(qaHook, svgSettings);
	}
	return buildHtmlCheckbox(qaHook, htmlClassName);
};

/**
 * Outputs a checkbox with custom XUI styling.
 *
 * @export
 * @class XUICheckbox
 * @extends {Component}
 */
export default class XUICheckbox extends Component {
	componentDidMount() {
		setIndeterminate(this);
	}

	componentDidUpdate() {
		setIndeterminate(this);
	}

	onClick = () => {
		setIndeterminate(this);
	};

	render() {
		const {
			tabIndex,
			children,
			className,
			qaHook,
			iconCheckPath,
			iconIndeterminatePath,
			iconMainPath,
			isDefaultChecked,
			isChecked,
			isDisabled,
			isRequired,
			isReversed,
			isLabelHidden,
			name,
			onChange,
			value,
			svgClassName,
			labelClassName,
			htmlClassName
		} = this.props;
		const classes = cn(
			className,
			baseClass,
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
			type: 'checkbox',
			disabled: isDisabled,
			required: isRequired,
			onClick: this.onClick,
			['aria-label']: isLabelHidden && children || undefined,
			tabIndex,
			name,
			onChange,
			value,
		};
		const svgSettings = {
			svgClassName,
			iconMainPath,
			iconCheckPath,
			iconIndeterminatePath
		};

		// If the user has not passed in anything for the isChecked prop, we need to set the
		// `defaultChecked` prop on the input in order to prevent React from outputting warnings
		// in the console.
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
				<input
					ref={cb => this._input = cb}
					{...inputProps}
					className={cn(`${baseClass}--input`, inputProps.className)}
					data-automationid={qaHook && `${qaHook}--input`}
				/>
				{buildCheckbox(qaHook, htmlClassName, svgSettings)}
				{labelElement}
			</label>
		);
	}
}

XUICheckbox.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** The icon path to use for the checkmark */
	iconCheckPath: PropTypes.string,

	/** The icon path to use for the indeterminate mark */
	iconIndeterminatePath: PropTypes.string,

	/** The icon path to use for the checkbox */
	iconMainPath: PropTypes.string,

	/** The input is selected */
	isChecked: PropTypes.bool,

	/** The input is disabled */
	isDisabled: PropTypes.bool,

	/**
	 * The input is indeterminate.  In order for this prop value to
	 * stick, you MUST pass in isChecked={false} or a user clicking on this
	 * will cause React to clear the indeterminate state.
	 */
	isIndeterminate: PropTypes.bool,

	/** The input is required for form submission */
	isRequired: PropTypes.bool,

	/** The label and control are displayed in reverse order */
	isReversed: PropTypes.bool,

	/** Additional class names on the span (pseudo-label) element  */
	labelClassName: PropTypes.string,

	/** Prevents the label element from being displayed on the page. Label is still accessible to screen readers. */
	isLabelHidden: PropTypes.bool,

	/** The name to use as a reference for the value */
	name: PropTypes.string,

	/** The function to call when the control changes state */
	onChange: PropTypes.func,

	/** The value to return on form submission */
	value: PropTypes.string,

	/** Additional class names on the svg element  */
	svgClassName: PropTypes.string,

	/** Additional class names for the html input */
	htmlClassName: PropTypes.string,

	/** The tab-index property to place on the checkbox */
	tabIndex: PropTypes.number,

	/** Used to output an uncontrolled checkbox component.  If a value is passed to the isChecked prop, this prop will be ignored. */
	isDefaultChecked: PropTypes.bool,
};

XUICheckbox.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isIndeterminate: false,
	isRequired: false,
	isReversed: false
};
