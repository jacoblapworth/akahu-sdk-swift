import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseClass} from "./constants";
import {ns} from "../helpers/xuiClassNamespace";
import uuidv4 from 'uuid/v4';

/**
 * Presentational (aka dumb) component that outputs the container necessary to implement
 * the grouped checkboxes pattern.
 *
 * @export
 * @param {Object} [props]
 * @returns
 */
export default class XUICheckboxGroup extends PureComponent {
	id = this.props.labelId || uuidv4();
	render() {
		const {
			children,
			className,
			qaHook,
			labelText,
			isLabelHidden,
			isFieldLayout,
			labelClassName,
			fieldClassName,
			labelId
		} = this.props;

		const rootClasses = cn(
			fieldClassName,
			isFieldLayout && `${ns}-field-layout`
		);

		const labelClasses = cn(
			labelClassName,
			`${ns}-text-label`,
			`${ns}-fieldlabel-layout`
		);

		const labelElement = !isLabelHidden && labelText && (
			<div className={labelClasses} id={this.id}>
				{labelText}
			</div>
		);

		return (
			<div className={rootClasses}>
				{labelElement}
				<div
					className={cn(className, `${baseClass}-group`)}
					data-automationid={qaHook}
					aria-label={isLabelHidden && labelText || undefined}
					// Attach a "labelledby" prop if we've created the label, or if the user has provided an id.
					aria-labelledby={labelElement && this.id || labelId || undefined}
				>
					{children}
				</div>
			</div>
		);
	}
}


XUICheckboxGroup.propTypes = {
	children: PropTypes.node,
	/** Class names to be added to bordered grouping element */
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Label the radio group for accessibility. Highly recommended */
	labelText: PropTypes.string,
	/** Whether the label should be visible or hidden. Defaults to visible */
	isLabelHidden: PropTypes.bool,
	/** Whether to use the field layout classes. Defaults to true. */
	isFieldLayout: PropTypes.bool,
	/** Class names to add to the label text element */
	labelClassName: PropTypes.string,
	/** Class names to be added to the field wrapper element */
	fieldClassName: PropTypes.string,
	/** Provide a specific label ID which will be used as the "labelleby" aria property */
	labelId: PropTypes.string,
};

XUICheckboxGroup.defaultProps = {
	isFieldLayout: false
};
