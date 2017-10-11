import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import checkboxIndeterminate from '@xero/xui-icon/icons/checkbox-indeterminate';
import checkboxMain from '@xero/xui-icon/icons/checkbox-main';

/**
 * @function setIndeterminate - Set the indeterminate DOM property of the given checkbox instance
 * @param xuiCheckbox - The checkbox instance for which to set the indeterminate DOM property
 */
const setIndeterminate = (xuiCheckbox) => {
	xuiCheckbox._input.indeterminate = xuiCheckbox.props.isIndeterminate;
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
	}

	render() {
		const {
			tabIndex,
			children,
			className,
			qaHook,
			iconCheckPath,
			iconIndeterminatePath,
			iconMainPath,
			defaultChecked,
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
		} = this.props;
		const classes = cn(className, 'xui-styledcheckboxradio', {
			'xui-styledcheckboxradio-reversed': isReversed,
			'xui-is-disabled': isDisabled
		});
		const svgClasses = cn('xui-icon', svgClassName);
		const labelClasses = cn('xui-styledcheckboxradio--label', labelClassName);
		const labelElement = isLabelHidden ? null : <span className={labelClasses}>{children}</span>;
		const inputProps = {
			type: 'checkbox',
			disabled: isDisabled,
			required: isRequired,
			onClick: this.onClick,
			tabIndex,
			name,
			onChange,
			value,
		};

		// If the user has not passed in anything for the isChecked prop, we need to set the
		// `defaultChecked` prop on the input in order to prevent React from outputting warnings
		// in the console.
		if (typeof isChecked !== 'boolean') {
			inputProps.defaultChecked = !!defaultChecked;
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
				<input ref={cb => this._input = cb} {...inputProps} className={cn("xui-styledcheckboxradio--input", inputProps.classname)}/>
				<svg className={svgClasses}>
					<path d={iconMainPath || checkboxMain} className="xui-styledcheckboxradio--focus" role="presentation" />
					<path d={iconMainPath || checkboxMain} className="xui-styledcheckboxradio--main" role="presentation" />
					{iconMainPath && !iconCheckPath ? null : <path d={iconCheckPath || checkboxCheck} className="xui-styledcheckboxradio--check" role="presentation" />}
					{iconMainPath && !iconIndeterminatePath ? null : <path d={iconIndeterminatePath || checkboxIndeterminate} className="xui-styledcheckboxradio--indeterminate" role="presentation" />}
				</svg>
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

	/** Prevents the label element from being rendered to the page */
	isLabelHidden: PropTypes.bool,

	/** The name to use as a reference for the value */
	name: PropTypes.string,

	/** The function to call when the control changes state */
	onChange: PropTypes.func,

	/** The value to return on form submission */
	value: PropTypes.string,

	/** Additional class names on the svg element  */
	svgClassName: PropTypes.string,

	/** The tab-index property to place on the checkbox */
	tabIndex: PropTypes.number,

	/** Used to output an uncontrolled checkbox component.  If a value is passed to the isChecked prop, this prop will be ignored. */
	defaultChecked: PropTypes.bool,
};

XUICheckbox.defaultProps = {
	isLabelHidden: false,
	isDisabled: false,
	isIndeterminate: false,
	isRequired: false,
	isReversed: false
};
