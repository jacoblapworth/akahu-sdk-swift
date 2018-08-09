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
		icon,
		isInline,
	} = props;

	const classes = cn(
		baseClass,
		className,
		!icon && sizeClasses[size], // TODO: apply multiplier to width and height instead?
		colorClasses[color],
		rotationClasses[rotation],
		isInline && !icon && `${baseClass}-inline`
	);

	const width = icon && isInline ? icon.width : 30;
	const height = icon && isInline ? icon.height : 30;
	const pathTransform = icon && !isInline ? `translate(${(30 - icon.width) / 2},${(30 - icon.height) / 2})` : undefined;

	const optionalTitle = title? <title>{ title }</title> : null;
	const optionalDescription = desc? <desc>{ desc }</desc> : null;
	const viewBox = icon ? `0 0 ${width} ${height}` : props.viewBox;
	const path = icon ? icon.path : props.path;
	const style = icon ? { width: `${width}px`, height: `${height}px`} : null;

	return(
		<svg data-automationid={qaHook} focusable="false" style={style} className={ classes } viewBox={ viewBox }>
			{ optionalTitle }
			{ optionalDescription }
			<path d={ path } role={ role } transform={pathTransform} />
		</svg>
	);
}

XUIIcon.propTypes = {
	/** The path to use in the SVG. This will render the icon in a standardised, fixed-size viewbox */
	path: function(props, propName) {
		if (!props[propName] && !props.icon) {
			return new Error('Icon component requires either a non-empty `path` or `icon` property');
		}
	},
	/** An object describing the path, width and height. This will render a SVG only as big as the icon itself */
	icon: PropTypes.shape({
		path: PropTypes.string.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired
	}),
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
