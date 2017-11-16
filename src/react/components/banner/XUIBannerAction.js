import React from 'react';
import PropTypes from 'prop-types';
import XUIButton from '../../button';
import cn from 'classnames';

export default function XUIBannerAction(props) {
	const className = cn(props.className, 'xui-button-small');
	const buttonQaHook = props.qaHook && `${props.qaHook}--button`;

	return (
		<li className="xui-banner--action" data-automationid={props.qaHook}>
			<XUIButton href={props.href} isLink={props.isLink} variant="link" className={className} qaHook={buttonQaHook}>{props.children}</XUIButton>
		</li>
	);
}

XUIBannerAction.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,
	/** Target URl of action, will also trun the button into a link, <a /> tag. */
	href: PropTypes.string,
	/** Whether or not to render this button using an tag. */
	isLink: PropTypes.bool
};

XUIBannerAction.defaultProps = {
	isLink: false
}
