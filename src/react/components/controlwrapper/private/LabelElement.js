import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../../helpers/xuiClassNamespace';

export default class LabelElement extends PureComponent {
	render() {
		const {
			labelClassName,
			label,
			isLabelHidden,
			qaHook,
			wrapperIds,
			isInline,
		} = this.props;
		const labelClasses = isInline ? labelClassName : cn(
			labelClassName,
			`${ns}-text-label`,
			`${ns}-fieldlabel-layout`,
		);

		const labelElement = label != null && !isLabelHidden && (
			<span
				className={labelClasses}
				id={wrapperIds.label}
				data-automationid={qaHook && `${qaHook}--label`}
			>
				{label}
			</span>
		);
		return labelElement || null;
	}
}

LabelElement.propTypes = {
	qaHook: PropTypes.string,
	/** Label to show near the input. Validated on the wrapper. */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** Class names to add to the label */
	labelClassName: PropTypes.string,
	/** Should label be applied as an aria-label, rather than being visibly displayed. */
	isLabelHidden: PropTypes.bool,
	/** IDs generated by generateIds and passed in from the parent component of the wrapper */
	wrapperIds: PropTypes.shape({
		label: PropTypes.string,
		message: PropTypes.string,
	}).isRequired,
	isInline: PropTypes.bool,
};
