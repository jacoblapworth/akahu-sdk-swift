import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { colorMap, layoutMap, sizeMap, baseClass } from './private/constants';
import { ns } from '../helpers/xuiClassNamespace';
import '../helpers/xuiGlobalChecks';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';

export default class XUIToggle extends PureComponent {
	wrapperIds = generateIds(this.props.labelId);

	toggleIsCheckbox() {
		const { children } = this.props;
		const isCheckbox = child => (child && child.props.type === 'checkbox');
		return children != null && React.Children.map(children, isCheckbox).some(Boolean);
	}
	render() {
		const {
			children,
			className,
			qaHook,
			color,
			layout,
			size,
			secondaryProps,
			label,
			isLabelHidden,
			fieldClassName,
			isFieldLayout,
			labelClassName,
			isInvalid,
			validationMessage,
			hintMessage,
		} = this.props;
		const classes = cn(
			className,
			baseClass,
			colorMap[color],
			layoutMap[layout],
			sizeMap[size],
		);

		const rootClasses = cn(
			fieldClassName,
			`${ns}-togglewrapper`,
			isInvalid && `${ns}-togglewrapper-is-invalid`,
		);

		const ariaRole = (secondaryProps && secondaryProps.role) || this.toggleIsCheckbox()
			? 'group'
			: 'radiogroup';

		return (
			<XUIControlWrapper
				fieldClassName={rootClasses}
				wrapperIds={this.wrapperIds}
				isGroup
				{...{
					qaHook,
					label,
					isInvalid,
					validationMessage,
					hintMessage,
					isFieldLayout,
					labelClassName,
					isLabelHidden,
				}}
			>
				<div
					{...secondaryProps}
					role={ariaRole}
					className={classes}
					data-automationid={qaHook}
					{...getAriaAttributes(this.wrapperIds, this.props, { isGroup: true })}
				>
					{children}
				</div>
			</XUIControlWrapper>
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
	/** The size of the toggle */
	size: PropTypes.oneOf(Object.keys(sizeMap)),
	/** Additional props to pass to the toggle element */
	secondaryProps: PropTypes.object,
	/** Label to show above the toggle */
	label: PropTypes.node,
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
	/** Whether the current input value is invalid */
	isInvalid: PropTypes.bool,
	/** Validation message to show under the input if `isInvalid` is true */
	validationMessage: PropTypes.string,
	/** Hint message to show under the input */
	hintMessage: PropTypes.string,
};

XUIToggle.defaultProps = {
	color: 'standard',
	size: 'medium',
	isFieldLayout: false,
};
