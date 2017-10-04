import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const variants = {
	neutral: 'xui-tag-neutral',
	positive: 'xui-tag-positive',
	negative: 'xui-tag-negative',
	warning: 'xui-tag-warning',
	standard: ''
};

const XUITag = ({className, variant, qaHook, children}) =>
	<span
		className={cn(
			'xui-tag',
			className,
			variants[variant]
		)}
		role="status"
		data-automationid={qaHook}
	>
		{children}
	</span>;

XUITag.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
	className: PropTypes.string,
	/* Type of tag to render */
	variant: PropTypes.oneOf(Object.keys(variants)),
};

XUITag.defaultProps = {
	variant: 'standard'
};

export default XUITag;
