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

export default class XUICheckbox extends Component {
	componentDidMount() {
		setIndeterminate(this);
	}

	componentDidUpdate() {
		setIndeterminate(this);
	}

	render() {
		const {tabIndex, children, className, qaHook, iconCheckPath, iconIndeterminatePath, iconMainPath, isChecked, isDisabled, isRequired, isReversed, isLabelHidden, name, onChange, value, svgClassName, labelClassName} = this.props;
		const classes = cn(className, 'xui-styledcheckbox', {
			'xui-styledcheckbox-reversed': isReversed,
			'xui-is-disabled': isDisabled
		});
		const svgClasses = cn('xui-icon', svgClassName);
		const labelClasses = cn('xui-styledcheckbox--label', labelClassName);
		const labelElement = isLabelHidden ? null : <span className={labelClasses}>{children}</span>;

		return (
			<label className={classes} data-automationid={qaHook} onClick={onLabelClick}>
				<input tabIndex={tabIndex} type="checkbox" checked={isChecked} disabled={isDisabled} required={isRequired} name={name} onChange={onChange} value={value} ref={cb => this._input = cb} />
				<svg className={svgClasses}>
					<path d={iconMainPath || checkboxMain} className="xui-styledcheckbox--focus" role="presentation" />
					<path d={iconMainPath || checkboxMain} className="xui-styledcheckbox--main" role="presentation" />
					{iconMainPath && !iconCheckPath ? null : <path d={iconCheckPath || checkboxCheck} className="xui-styledcheckbox--check" role="presentation" />}
					{iconMainPath && !iconIndeterminatePath ? null : <path d={iconIndeterminatePath || checkboxIndeterminate} className="xui-styledcheckbox--indeterminate" role="presentation" />}
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

	/** @property {string} [iconCheck] - The icon path to use for the checkmark */
	iconCheckPath: PropTypes.string,

	/** @property {string} [iconIndeterminate] - The icon path to use for the indeterminate mark */
	iconIndeterminatePath: PropTypes.string,

	/** @property {string} [iconMain] - The icon path to use for the checkbox */
	iconMainPath: PropTypes.string,

	/** @property {boolean} [isChecked=false] - The input is selected */
	isChecked: PropTypes.bool,

	/** @property {boolean} [isDisabled=false] - The input is disabled */
	isDisabled: PropTypes.bool,

	/** @property {boolean} [isIndeterminate=false] - The input is indeterminate */
	isIndeterminate: PropTypes.bool,

	/** @property {boolean} [isRequired=false] - The input is required for form submission */
	isRequired: PropTypes.bool,

	/** @property {boolean} [isReversed=false] - The label and control are displayed in reverse order */
	isReversed: PropTypes.bool,

	/** @property {string} [labelClassName] - Additional class names on the span (pseudo-label) element  */
	labelClassName: PropTypes.string,

	/** @property {boolean} [labelHidden=false] - Prevents the label element from being rendered to the page */
	isLabelHidden: PropTypes.bool,

	/** @property {string} [name] - The name to use as a reference for the value */
	name: PropTypes.string,

	/** @property {function} onChange - The function to call when the control changes state */
	onChange: PropTypes.func,

	/** @property {string} [value] - The value to return on form submission */
	value: PropTypes.string,

	/** @property {string} [svgClassName] - Additional class names on the svg element  */
	svgClassName: PropTypes.string,

	/** @property {number} [tabIndex=0] - The tab-index property to place on the checkbox */
	tabIndex: PropTypes.number
};

XUICheckbox.defaultProps = {
	isLabelHidden: false
};
