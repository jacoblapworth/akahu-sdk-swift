import '../helpers/xuiGlobalChecks';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { colorMap, layoutMap, variantMap, baseClass } from './private/constants';
import {ns} from '../helpers/xuiClassNamespace';
import uuidv4 from 'uuid/v4';

export default class XUIToggle extends PureComponent {
	id = this.props.labelId || uuidv4();
	render() {
		const {
			children,
			className,
			qaHook,
			color,
			layout,
			variant,
			secondaryProps,
			labelText,
			isLabelHidden,
			fieldClassName,
			isFieldLayout,
			labelClassName,
			labelId
		} = this.props;
		const classes = cn(className, baseClass, colorMap[color], layoutMap[layout], variantMap[variant]);

		const labelClasses = cn(
			labelClassName,
			`${ns}-text-label`,
			`${ns}-fieldlabel-layout`
		);

		const labelElement = labelText != null && !isLabelHidden && (
			<span className={labelClasses} id={this.id}>
				{labelText}
			</span>
		);

		const rootClasses = cn(
			fieldClassName,
			isFieldLayout && `${ns}-field-layout`
		);

		return (
			<div className={rootClasses}>
				{labelElement}
				{ /* Default the role to radiogroup, but allow it to be superceded by secondaryProps. */ }
				<div
					className={classes}
					data-automationid={qaHook}
					aria-label={isLabelHidden && labelText || undefined}
					// Attach a "labelledby" prop if we've created the label, or if the user has provided an id.
					aria-labelledby={labelElement && this.id || labelId || undefined}
					role="radiogroup"
					{...secondaryProps}
				>
					{children}
				</div>
			</div>
		);
		}
}

XUIToggle.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** The color of the toggle */
	color: PropTypes.oneOf(Object.keys(colorMap)),
	/** The layout of the toggle */
	layout: PropTypes.oneOf(Object.keys(layoutMap)),
	/** The variant of the toggle */
	variant: PropTypes.oneOf(Object.keys(variantMap)),
	/** Additional props to pass to the root HTML element */
	secondaryProps: PropTypes.object,
	/** Label to show above the toggle */
	labelText: PropTypes.string,
	/** Should label be applied as an aria-label, rather than being visibly displayed. */
	isLabelHidden: PropTypes.bool,
	/** Class names to add to the label */
	labelClassName: PropTypes.string,
	/** Provide a specific label ID which will be used as the "labelleby" aria property */
	labelId: PropTypes.string,
	/** Whether to use the field layout classes */
	isFieldLayout: PropTypes.bool,
	/** Class names to be added to the field wrapper element */
	fieldClassName: PropTypes.string,
};

XUIToggle.defaultProps = {
	color: 'standard',
	isFieldLayout: false
};
