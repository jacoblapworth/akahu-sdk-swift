import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import cross from '@xero/xui-icon/icons/cross';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../icon/XUIIcon';
import { sentimentMap } from './private/sentiments';

const sentiments = Object.keys(sentimentMap);

export default function XUIToast(props) {
	const { qaHook, isHidden, sentiment, onCloseClick, onMouseOver, onMouseLeave, children, defaultLayout } = props;
	const sentimentData = sentimentMap[sentiment];
	const sentimentClass = sentimentData && sentimentData.class;
	const role = props.role || (sentimentData && sentimentData.role) || 'status';
	const buttonQAHook = qaHook && `${qaHook}-close-button`;

	const classNames = cn(
		'xui-toast',
		{
			'xui-toast-is-hidden' : isHidden,
			'xui-toast-layout': defaultLayout
		},
		sentimentClass
	);

	const close = onCloseClick ?
		<XUIButton
			qaHook={buttonQAHook}
			className="xui-toast--close"
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
			role={role}
			aria-hidden={isHidden}
			data-automationid={qaHook}
		>
			{close}
			{children}
		</div>
	);

}

XUIToast.propTypes = {

	className: PropTypes.string,
	qaHook: PropTypes.string,
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
	/** Applies a role attribute to the toast element. This will override any component-determined value. */
	role: PropTypes.string
};
XUIToast.defaultProps = {
	isHidden : false,
	defaultLayout: true
};
