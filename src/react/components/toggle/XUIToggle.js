import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { colorMap, layoutMap } from './private/constants';

export default function XUIToggle({ children, className, qaHook, color, layout }) {
	const classes = cn(className, 'xui-toggle', colorMap[color], layoutMap[layout]);

	return (
		<div className={classes} data-automationid={qaHook}>
			{children}
		</div>
	)
}

XUIToggle.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** The color of the toggle */
	color: PropTypes.oneOf(Object.keys(colorMap)),
	/** The layout of the toggle */
	layout: PropTypes.oneOf(Object.keys(layoutMap))
};
XUIToggle.defaultProps = {
	color: 'standard'
};
