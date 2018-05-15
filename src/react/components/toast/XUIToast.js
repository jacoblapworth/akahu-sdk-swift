import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import cross from '@xero/xui-icon/icons/cross';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../icon/XUIIcon';
import { sentimentMap, baseClass } from './private/constants';
import XUIToastAction from './XUIToastAction';
import XUIToastActions from './XUIToastActions';
import XUIToastMessage from './XUIToastMessage';

const sentiments = Object.keys(sentimentMap);

export default function XUIToast(
	{
		qaHook,
		isHidden,
		sentiment,
		onCloseClick,
		onMouseOver,
		onMouseLeave,
		children,
		defaultLayout,
		actions,
		message,
		role,
		primaryAction,
		secondaryAction
	}
) {

	const sentimentData = sentimentMap[sentiment];
	const sentimentClass = sentimentData && sentimentData.class;
	const a11yRole = role || (sentimentData && sentimentData.role) || 'status';
	const buttonQAHook = qaHook && `${qaHook}-close-button`;
	const displayMessage = message && <XUIToastMessage>{message}</XUIToastMessage>;

	const displayActions = actions && actions.length > 0 ? (
		<XUIToastActions>
			{actions}
		</XUIToastActions>
	) : null;

	const actionsNewAPI = primaryAction != null ? (
		<XUIToastActions
			primaryAction={primaryAction}
			secondaryAction={secondaryAction != null && secondaryAction}>
			{actions}
		</XUIToastActions>
	) : null;

	const classNames = cn(
		baseClass,
		isHidden && `${baseClass}-is-hidden`,
		defaultLayout && `${baseClass}-layout`,
		sentimentClass
	);

	const close = onCloseClick ?
		<XUIButton
			qaHook={buttonQAHook}
			className={`${baseClass}--close`}
			variant="icon"
			title="Close"
			onClick={onCloseClick}
		>
			<XUIIcon path={cross} />
		</XUIButton>
		: null;

	return (
		<div
			className={classNames}
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
			role={a11yRole}
			aria-hidden={isHidden}
			data-automationid={qaHook}
		>
			{close}
			{displayMessage}
			{children}
			{displayActions}
			{actionsNewAPI}
		</div>
	);

}

XUIToast.propTypes = {
	/** Adds optional class to wrapping component */
	className: PropTypes.string,
	/** Adds QA hook to wrapping component */
	qaHook: PropTypes.string,
	/** Facility to pass in custom children */
	children: PropTypes.node,
	/** Hides the component when set to true */
	isHidden : PropTypes.bool,
	/** The sentiment of the toast (positive or negative) */
	sentiment : PropTypes.oneOf(sentiments),
	/** When defined, displays the close button */
	onCloseClick : PropTypes.func,
	/** Handles the event for when the mouse hovers over the toast */
	onMouseOver : PropTypes.func,
	/** Handles the event for when the mouse moves out of the toast */
	onMouseLeave : PropTypes.func,
	/** Applies default layout class to the component */
	defaultLayout : PropTypes.bool,
	/** Applies a role attribute to the toast element.
	 * This will override any component-determined value. */
	role: PropTypes.string,
	/** Custom Actions */
	actions: PropTypes.arrayOf(PropTypes.node),
	/** Custom toast message */
	message: PropTypes.string,
	/** First and primary action. Always use this one first before using
	 * `secondaryAction` */
	primaryAction: PropTypes.node,
	/** Secondary action */
	secondaryAction: PropTypes.node
};

XUIToast.defaultProps = {
	isHidden : false,
	defaultLayout: true
};
