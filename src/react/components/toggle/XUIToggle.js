import '../helpers/xuiGlobalChecks';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { colorMap, layoutMap, variantMap, baseClass } from './private/constants';

export default function XUIToggle({ children, className, qaHook, color, layout, variant, secondaryProps}) {
	const classes = cn(className, baseClass, colorMap[color], layoutMap[layout], variantMap[variant]);

	return (
		// Default the role to radiogroup, but allow it to be superceded by secondaryProps.
		<div className={classes} data-automationid={qaHook} role="radiogroup" {...secondaryProps}>
			{children}
		</div>
	);
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
	variant: PropTypes.oneOf(Object.keys(variantMap)),
	/* Additional props to pass to the root HTML element. Recommend adding an "aria-label" for accessibility */
	secondaryProps: PropTypes.object,
};

XUIToggle.defaultProps = {
	color: 'standard'
};
