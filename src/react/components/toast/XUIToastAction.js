import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';

export default function XUIToastAction(props) {
	const classNames = cn(props.className, 'xui-button-small');
	const isLink = !!props.href;
	const buttonQaHook = props.qaHook && `${props.qaHook}-button`;

	return (
		<li className="xui-toast--action" data-automationid={props.qaHook}>
			<XUIButton {...props} isLink={isLink} variant="link" className={classNames} qaHook={buttonQaHook}>{props.children}</XUIButton>
		</li>
	);
}

XUIToastAction.propTypes = {
	className: PropTypes.string,
	href: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string
};
