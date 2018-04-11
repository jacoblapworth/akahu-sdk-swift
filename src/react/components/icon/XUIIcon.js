import '../helpers/xuiGlobalChecks';
import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { baseClass, sizeClasses, rotationClasses, colorClasses } from './private/constants';

export default function XUIIcon(props) {
	const {
		className,
		qaHook,
		size,
		title,
		desc,
		role,
		rotation,
		color,
		isInline,
		viewBox,
		path
	} = props;

	const classes = cn(
		baseClass,
		className,
		sizeClasses[size],
		colorClasses[color],
		rotationClasses[rotation],
		isInline && `${baseClass}-inline`
	);

	const optionalTitle = title? <title>{ title }</title> : null;
	const optionalDescription = desc? <desc>{ desc }</desc> : null;

	return(
		<svg data-automationid={qaHook} focusable="false" className={ classes } viewBox={ viewBox }>
			{ optionalTitle }
			{ optionalDescription }
			<path d={ path } role={ role } />
		</svg>
	);
}

XUIIcon.propTypes = {
	/**path The path to use in the SVG */
	path: PropTypes.string.isRequired,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Adds a size modifier to the icon */
	size: PropTypes.oneOf(Object.keys(sizeClasses)),
	/** Title to be read by screen readers */
	title: PropTypes.string,
	/** Description to be read by screen readers */
	desc: PropTypes.string,
	/** Role to be applied to the SVG for screen readers */
	role: PropTypes.string,
	/** Adds a rotation modifier to the icon. Accepted values are 0 (default), 90, 180, 270 */
	rotation: PropTypes.oneOf(Object.keys(rotationClasses).concat(Object.keys(rotationClasses).map(n => parseInt(n)))),
	/** Adds a color modifier to the icon */
	color: PropTypes.oneOf(Object.keys(colorClasses)),
	/** Whether the inline class modifier should be added */
	isInline: PropTypes.bool,
	/** */
	viewBox: PropTypes.string
};

XUIIcon.defaultProps = {
	size: 'standard',
	role: 'presentation',
	viewBox: '0 0 30 30'
};
