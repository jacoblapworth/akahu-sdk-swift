import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import cross from '@xero/xui-icon/icons/cross';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../icon/XUIIcon';

export default function XUIToast(props) {
	const { qaHook, role, isHidden, onCloseClick, onMouseOver, onMouseLeave, children, defaultLayout } = props;
	const buttonQAHook = qaHook ? `${qaHook}-close-button` : null;

	const classNames = cn(
		'xui-toast',
		{
			'xui-toast-is-hidden' : isHidden,
			'xui-toast-layout': defaultLayout
		}
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
	defaultLayout: true,
	role: 'status'
};
