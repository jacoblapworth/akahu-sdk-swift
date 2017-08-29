import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { colorMap, layoutMap, variantMap } from './private/constants';

export default function XUIToggle({ children, className, qaHook, color, layout, variant }) {
	const classes = cn(className, 'xui-toggle', colorMap[color], layoutMap[layout], variantMap[variant]);

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
	layout: PropTypes.oneOf(Object.keys(layoutMap)),
	/** The variant of the toggle */
	variant: PropTypes.oneOf(Object.keys(variantMap))
};
XUIToggle.defaultProps = {
	color: 'standard'
};
