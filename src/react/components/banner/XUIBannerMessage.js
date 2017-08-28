import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIBannerMessage(props) {
	const className = cn(props.className, 'xui-banner--message');

	return (
		<p className={className}>{props.children}</p>
	);
}

XUIBannerMessage.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
};