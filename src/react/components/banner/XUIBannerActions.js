import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIBannerActions(props) {
	const className = cn(props.className, 'xui-banner--actions');

	return (
		<ul className={className} data-automationid={props.qaHook}>
			{props.children}
		</ul>
	);
}

XUIBannerActions.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string
};
