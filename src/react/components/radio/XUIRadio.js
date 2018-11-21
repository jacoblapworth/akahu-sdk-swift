import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { baseClass } from './constants';
import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapperInline, { getAriaAttributes } from '../controlwrapper/XUIControlWrapperInline';
import generateIds from '../controlwrapper/helpers';

import '../../../sass/7-components/_forms.checkboxesradios.styled.scss';

/**
 * @function handleLabelClick - Prevent 2 click events bubbling. Since our input is
 * wrapped inside a label, then clicking the label will also cause a new click event
 * on the input, which also bubbles up. If a consumer attaches an onClick event listener
 * further up the DOM, we don't want it to be fired twice.
 *
 * @private
 */
const onLabelClick = e => {
	if (e.target.tagName !== 'INPUT') {
		e.stopPropagation();
	}
};

const buildSvgRadio = (qaHook, { svgClassName, iconMain }) => {
	const svgClasses = cn(`${ns}-icon`, svgClassName);
	return (
		<div className={`${ns}-iconwrapper`}>
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

/**
 * @function buildHtmlRadio - given the radio props supplied, select which radio
 * builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of radio
 * @param calculatedSize - String to specify the size of the radio
 *
 */
const buildHtmlRadio = (qaHook, htmlClassName, calculatedSize) => {
	const htmlClasses = cn(
		`${baseClass}--radio`,
		htmlClassName,
		calculatedSize && `${baseClass}--radio-${calculatedSize}`,
	);
	return (
		<div className={htmlClasses} data-automationid={qaHook && `${qaHook}--radio`} />
	);
};

/**
 * @function buildRadio - given the radio props supplied, select which checkbox
 * builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of radio
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 * @param calculatedSize - String to specify the size of the radio
 *
 */
const buildRadio = (qaHook, htmlClassName, svgSettings, calculatedSize) => {
	if (svgSettings.iconMain) {
		return buildSvgRadio(qaHook, svgSettings);
	}
	return buildHtmlRadio(qaHook, htmlClassName, calculatedSize);
};

export default class XUIRadio extends PureComponent {
	// User can manually provide an id, or we will generate one.
	wrapperIds = generateIds(this.props.labelId);

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
			id,
			isGrouped,
			isInvalid,
			validationMessage,
			hintMessage,
			size,
		} = this.props;

		const classes = cn(
			className,
			`${baseClass}`,
			isReversed && `${baseClass}-reversed`,
			isDisabled && `${ns}-styledcheckboxradio-is-disabled`,
		);

		// If no size, or 'standard' is provided, use an empty string. Grouping defaults to 'small'.
		const calculatedSize = (size !== 'standard' && size) || (isGrouped && 'small') || '';

		const labelClasses = cn(
			`${baseClass}--label`,
			calculatedSize && `${baseClass}--label-${calculatedSize}`,
			labelClassName,
		);

		const inputProps = {
			type: 'radio',
			disabled: isDisabled,
			required: isRequired,
			tabIndex,
			name,
			onChange,
			value,
			id,
			...getAriaAttributes(this.wrapperIds, this.props),
		};
		const svgSettings = {
			svgClassName,
			iconMain,
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
			<XUIControlWrapperInline
				fieldClassName={classes}
				wrapperIds={this.wrapperIds}
				onClick={onLabelClick}
				labelClassName={labelClasses}
				label={children}
				{...{
					qaHook,
					isInvalid,
					validationMessage,
					hintMessage,
					isLabelHidden,
				}}
			>
				<input
					role={role}
					className={cn(
						`${baseClass}--input`,
						inputProps.className,
						calculatedSize && `${baseClass}--input-${calculatedSize}`,
					)}
					data-automationid={qaHook && `${qaHook}--input`}
					{...inputProps}
				/>
				{buildRadio(qaHook, htmlClassName, svgSettings, calculatedSize)}
			</XUIControlWrapperInline>
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

	/** onChange - The function to call when the control changes state */
	onChange: PropTypes.func,

	/** The value to return on form submission */
	value: PropTypes.string,

	/** Additional class names on the svg element  */
	svgClassName: PropTypes.string,

	/** Additional class names for the html input */
	htmlClassName: PropTypes.string,

	/** The tabindex property to place on the radio input */
	tabIndex: PropTypes.number,

	/** Prevents the label element from being displayed on the page. Label is still
	 * accessible to screen readers. */
	isLabelHidden: PropTypes.bool,

	/** Used to output an uncontrolled checkbox component.  If a value is passed to the
	 * isChecked prop, this prop will be ignored. */
	isDefaultChecked: PropTypes.bool,

	/** Role to be applied for screen readers */
	role: PropTypes.string,

	id: PropTypes.string,

	/** Provide a specific label ID which will be used as the "labelleby" aria property */
	labelId: PropTypes.string,

	/** Used by XUI components to state whether the radio is part of a group */
	isGrouped: PropTypes.bool,
	/** Whether the current input value is invalid */
	isInvalid: PropTypes.bool,
	/** Validation message to show under the input if `isInvalid` is true */
	validationMessage: PropTypes.string,
	/** Hint message to show under the input */
	hintMessage: PropTypes.string,
	/** Size variant */
	size: PropTypes.oneOf(['standard', 'small', 'xsmall']),
};

XUIRadio.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isIndeterminate: false,
	isRequired: false,
	isReversed: false,
	role: 'radio',
};
