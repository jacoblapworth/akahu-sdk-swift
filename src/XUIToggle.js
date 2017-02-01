import React, {PropTypes} from 'react';
import cn from 'classnames';


/** @private colorMap - Map colors to classes */
const colorMap = {
	standard: 'xui-toggle-standard',
	inverted: 'xui-toggle-inverted'
};


/** @private layoutMap - Map layouts to classes */
const layoutMap = {
	fullwidth: 'xui-toggle-fullwidth-layout',
	form: 'xui-toggle-form-layout',
	icon: 'xui-toggle-icon-layout'
};


const propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** @property {string} [color='standard'] - The color of the toggle */
	color: PropTypes.oneOf(Object.keys(colorMap)),

	/** @property {string} [layout] - The layout of the toggle */
	layout: PropTypes.oneOf(Object.keys(layoutMap))
};


const defaultProps = {
	color: 'standard'
};


export default function XUIToggle(props) {
	const {children, className, qaHook, color, layout} = props;
	const classes = cn(className, 'xui-toggle', colorMap[color], layoutMap[layout]);

	return (
		<div className={classes} data-automationid={qaHook}>
			{children}
		</div>
	)
}


XUIToggle.propTypes = propTypes;
XUIToggle.defaultProps = defaultProps;
