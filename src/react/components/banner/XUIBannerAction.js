import React from 'react';
import PropTypes from 'prop-types';
import XUIButton from '../../button';
import cn from 'classnames';

export default function XUIBannerAction(props) {
	const className = cn(props.className, 'xui-button-small');
	const isLink = !!props.href;
	const buttonQaHook = props.qaHook && `${props.qaHook}-button`;

	return (
		<li className="xui-banner--action" data-automationId={props.qaHook}>
			<XUIButton {...props} isLink={isLink} variant="link" className={className} qaHook={buttonQaHook}>{props.children}</XUIButton>
		</li>
	);
}

XUIBannerAction.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,
	href: PropTypes.string
};
