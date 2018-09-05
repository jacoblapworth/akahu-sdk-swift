import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuidv4 from 'uuid/v4';
import '../helpers/xuiGlobalChecks';
import { baseClass } from './constants';
import { ns } from '../helpers/xuiClassNamespace';

// TODO: If there is further need to conform to specific browser scenarios then
// we will need to replace this snippet with something more robust and granular,
// or an NPM library (one that is not too heavy). Currently this is the only case
// in XUI where we are browser sniffing.
const isIeOrEdge =
	typeof window !== 'undefined' &&
	(() => {
		const { document, navigator } = window;
		const isIe = document.documentMode;
		const isEdge = /Edge/.test(navigator.userAgent);

		return isIe || isEdge;
	})();

/**
 * @function setIndeterminate - Set the indeterminate DOM property of the given checkbox instance
 * @param xuiCheckbox - The checkbox instance for which to set the indeterminate DOM property
 */
const setIndeterminate = xuiCheckbox => {
	if (xuiCheckbox._input) {
		// TODO: Lint fix
		// eslint-disable-next-line no-param-reassign
		xuiCheckbox._input.indeterminate = xuiCheckbox.props.isIndeterminate;
	}
};

/**
 * @function onLabelClick - Prevent 2 click events bubbling. Since our input is wrapped
 * inside a label, then clicking the label will also cause a new click event on the input,
 * which also bubbles up. If a consumer attaches an onClick event listener further up the
 * DOM, we don't want it to be fired twice.
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
const buildSvgCheckbox = (qaHook, { svgClassName, iconMain }) => {
	const svgClasses = cn(`${ns}-icon`, svgClassName);
	const createPathWithClass = className => (
		<path
			d={iconMain.path}
			className={className}
			role="presentation"
		/>
	);
	return (
		<div className={`${ns}-iconwrapper`}>
			<svg
				className={svgClasses}
				data-automationid={qaHook && `${qaHook}--icon`}
				width={iconMain.width}
				height={iconMain.height}
				viewBox={`0 0 ${iconMain.width} ${iconMain.height}`}
			>
				{createPathWithClass(`${baseClass}--focus`)}
				{createPathWithClass(`${baseClass}--main`)}
			</svg>
		</div>
	);
};

/**
 * @function buildHtmlCheckbox - given the checkbox props supplied, select which checkbox
 * builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of checkbox
 *
 */
const buildHtmlCheckbox = (qaHook, htmlClassName, isGrouped) => {
	const htmlClasses = cn(
		`${baseClass}--checkbox`,
		htmlClassName,
		{
			[`${baseClass}--checkbox-small`]: isGrouped,
		},
	);
	return (
		<div className={htmlClasses} data-automationid={qaHook && `${qaHook}--checkbox`} />
	);
};

/**
 * @function buildCheckbox - given the checkbox props supplied, select which checkbox
 * builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of checkbox
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 *
 */
const buildCheckbox = (qaHook, htmlClassName, svgSettings, isGrouped) => {
	if (svgSettings.iconMain) {
		return buildSvgCheckbox(qaHook, svgSettings);
	}
	return buildHtmlCheckbox(qaHook, htmlClassName, isGrouped);
};

/**
 * Outputs a checkbox with custom XUI styling.
 *
 * @export
 * @class XUICheckbox
 * @extends {Component}
 */
export default class XUICheckbox extends Component {
	// User can manually proivde an id, or we will generate one.
	labelId = this.props.labelId || uuidv4();

	componentDidMount() {
		setIndeterminate(this);
	}

	componentDidUpdate() {
		setIndeterminate(this);
	}

	onClick = event => {
		const { _input: { indeterminate }, props: { onChange, isIndeterminate } } = this;

		setIndeterminate(this);

		// Both IE11 and Edge do not register an "onChange" event when the checkbox
		// is in an "Indeterminate" state. In that regard the checkbox becomes non
		// responsive and cannot rebound back to a "checked" or "unchecked" state.
		// Here we check if the checkbox's "Indeterminate" state is attempting to
		// change and if so we give it a helping hand by manually triggering the
		// "onChange" hook..
		if (onChange && isIeOrEdge && (indeterminate !== isIndeterminate)) {
			onChange(event);
		}
	};

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
			isLabelHidden,
			name,
			onChange,
			value,
			svgClassName,
			labelClassName,
			htmlClassName,
			isGrouped,
		} = this.props;

		const classes = cn(
			className,
			baseClass,
			isReversed && `${baseClass}-reversed`,
			isDisabled && `${ns}-styledcheckboxradio-is-disabled`,
		);

		const labelClasses = cn(
			`${baseClass}--label`,
			labelClassName,
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
			'type': 'checkbox',
			'disabled': isDisabled,
			'required': isRequired,
			'onClick': this.onClick,
			'aria-label': (isLabelHidden && children) || undefined,
			// Attach a "labelledby" prop if we've created the label, or if the user has provided an id.
			'aria-labelledby':
				(labelElement && this.labelId)
				|| (!children && this.props.labelId)
				|| undefined,
			tabIndex,
			name,
			onChange,
			value,
		};
		const svgSettings = {
			svgClassName,
			iconMain,
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
			<label
				className={classes}
				data-automationid={qaHook}
				onClick={onLabelClick}
				role="presentation"
			>
				<input
					ref={cb => this._input = cb}
					{...inputProps}
					className={cn(
						`${baseClass}--input`,
						inputProps.className,
						{
							[`${baseClass}--input-small`]: isGrouped,
						},
					)}
					data-automationid={qaHook && `${qaHook}--input`}
				/>
				{buildCheckbox(qaHook, htmlClassName, svgSettings, isGrouped)}
				{labelElement}
			</label>
		);
	}
}

XUICheckbox.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** The icon path to use for the checkbox */
	iconMain: PropTypes.shape({
		path: PropTypes.string.isRequired,
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
	}),

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

	/** Prevents the label element from being displayed on the page. Label is still
	 * accessible to screen readers. */
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

	/** Used to output an uncontrolled checkbox component.  If a value is passed to the
	 * isChecked prop, this prop will be ignored. */
	isDefaultChecked: PropTypes.bool,

	/** Provide a specific label ID which will be used as the "labelleby" aria property */
	labelId: PropTypes.string,

	/** Used by XUI components to state whether the checkbox is part of a group */
	isGrouped: PropTypes.bool,
};

XUICheckbox.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isIndeterminate: false,
	isRequired: false,
	isReversed: false,
};
