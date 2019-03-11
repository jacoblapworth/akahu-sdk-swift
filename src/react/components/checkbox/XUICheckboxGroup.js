import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { baseClass } from './constants';
import XUICheckbox from './XUICheckbox';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';

/**
 * Presentational component that outputs the container necessary to implement
 * the grouped checkboxes pattern.
 *
 * @export
 * @param {Object} [props]
 * @returns
 */
export default class XUICheckboxGroup extends PureComponent {
	wrapperIds = generateIds(this.props.labelId);

	render() {
		const {
			children,
			className,
			qaHook,
			label,
			isLabelHidden,
			isFieldLayout,
			labelClassName,
			fieldClassName,
			isInvalid,
			validationMessage,
			hintMessage,
		} = this.props;

		const groupClasses = cn(
			className,
			`${baseClass}-group`,
			isInvalid && `${baseClass}-group-is-invalid`,
		);

		const childrenToRender = React.Children.map(children, child =>
			(child.type === XUICheckbox
				? React.cloneElement(child, {
					isGrouped: true,
				})
				: child));

		return (
			<XUIControlWrapper
				fieldClassName={fieldClassName}
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
					className={groupClasses}
					data-automationid={qaHook}
					{...getAriaAttributes(this.wrapperIds, this.props, { isGroup: true })}
				>
					{childrenToRender}
				</div>
			</XUIControlWrapper>
		);
	}
}


XUICheckboxGroup.propTypes = {
	children: PropTypes.node,
	/** Class names to be added to bordered grouping element */
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Label the radio group for accessibility. Highly recommended */
	label: PropTypes.node,
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
	/** Whether the current input value is invalid */
	isInvalid: PropTypes.bool,
	/** Validation message to show under the input if `isInvalid` is true */
	validationMessage: PropTypes.string,
	/** Hint message to show under the input */
	hintMessage: PropTypes.string,
};

XUICheckboxGroup.defaultProps = {
	isFieldLayout: false,
};
