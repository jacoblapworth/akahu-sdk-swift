import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';

const baseClass = `${ns}-switch`;

/**
 * Presentational (aka dumb) component that outputs the container necessary to implement
 * the grouped switches pattern.
 *
 * @export
 * @param {Object} [props]
 * @returns
 */
export default class XUISwitchGroup extends PureComponent {
	wrapperIds = generateIds(this.props.labelId);

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
			isInvalid,
			validationMessage,
			hintMessage,
		} = this.props;

		const rootClasses = cn(
			fieldClassName,
			isInvalid && `${ns}-group-invalid`,
		);

		return (
			<XUIControlWrapper
				fieldClassName={rootClasses}
				wrapperIds={this.wrapperIds}
				isGroup
				{...{
					qaHook,
					labelText,
					isInvalid,
					validationMessage,
					hintMessage,
					isFieldLayout,
					labelClassName,
					isLabelHidden,
				}}
			>
				<div
					className={cn(className, `${baseClass}-group`)}
					data-automationid={qaHook}
					{...getAriaAttributes(this.wrapperIds, this.props)}
				>
					{children}
				</div>
			</XUIControlWrapper>
		);
	}
}


XUISwitchGroup.propTypes = {
	children: PropTypes.node,
	/** Class names to be added to bordered grouping element */
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Label the radio group for accessibility. Highly recommended */
	labelText: PropTypes.string,
	/** Whether the label should be visible or hidden. Defaults to visible */
	isLabelHidden: PropTypes.bool,
	/** Whether to use the field layout classes. Defaults to false. */
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

XUISwitchGroup.defaultProps = {
	isFieldLayout: false,
};
