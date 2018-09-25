import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../../helpers/xuiClassNamespace';

export default class MessageElement extends PureComponent {
	render() {
		const {
			isInvalid,
			validationMessage,
			hintMessage,
			qaHook,
			wrapperIds,
		} = this.props;

		const showingErrorMessage = isInvalid && validationMessage;
		const messageElement = (validationMessage || hintMessage) && (
			<div
				className={cn(
					`${ns}-validation`,
					`${ns}-validation-layout`,
					showingErrorMessage && `${ns}-validation-is-invalid`,
				)}
				data-automationid={qaHook && `${qaHook}--message`}
				role="status"
				id={wrapperIds.message}
			>
				{showingErrorMessage ? validationMessage : hintMessage}
			</div>
		);
		return messageElement || null;
	}
}

MessageElement.propTypes = {
	qaHook: PropTypes.string,
	/** Whether the current input value is invalid */
	isInvalid: PropTypes.bool,
	/** Validation message to show near the input if `isInvalid` is true */
	validationMessage: PropTypes.string,
	/** Hint message to show near the input */
	hintMessage: PropTypes.string,
	/** IDs generated by generateIds and passed in from the parent component of the wrapper */
	wrapperIds: PropTypes.shape({
		label: PropTypes.string,
		control: PropTypes.string,
		message: PropTypes.string,
	}).isRequired,
};
