import React from 'react';
import PropTypes from 'prop-types';
import XUIButton from '../../button';
import cn from 'classnames';

export default function XUIBannerAction(props) {
	const className = cn(props.className, 'xui-button-small');
	const isLink = !!props.href;

	return (
		<li className="xui-banner--action">
			<XUIButton {...props} isLink={isLink} variant="link" className={className}>{props.children}</XUIButton>
		</li>
	);
}

XUIBannerAction.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	href: PropTypes.string
};
