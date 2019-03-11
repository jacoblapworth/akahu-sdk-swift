import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import {
	baseClass,
	wrapperClass,
	wrapperSizeClasses,
	rotationClasses,
	colorClasses,
	iconSizeMultipliers,
} from './private/constants';

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
		isBoxed,
	} = props;

	const svgClasses = cn(
		baseClass,
		colorClasses[color],
		rotationClasses[rotation],
		!isBoxed && className, // If no wrapper is needed, apply custom classes directly on the SVG
	);

	const optionalTitle = title ? <title>{ title }</title> : null;
	const optionalDescription = desc ? <desc>{ desc }</desc> : null;
	const sizeMultiplier = iconSizeMultipliers[size] || 1;

	const svgElement = (
		<svg
			data-automationid={qaHook}
			focusable="false"
			className={svgClasses}
			width={icon.width * sizeMultiplier}
			height={icon.height * sizeMultiplier}
			viewBox={`0 0 ${icon.width} ${icon.height}`}
		>
			{optionalTitle}
			{optionalDescription}
			<path d={icon.path} role={role} />
		</svg>
	);

	return !isBoxed ? svgElement : (
		<div
			className={cn(
				className,
				wrapperClass,
				wrapperSizeClasses[size],
			)}
			data-automationid={qaHook && `${qaHook}-wrapper`}
		>
			{svgElement}
		</div>
	);
}

XUIIcon.propTypes = {
	/** An object describing the path, width and height. */
	icon: PropTypes.shape({
		path: PropTypes.string.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
	}).isRequired,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Adds a size modifier to the icon */
	size: PropTypes.oneOf(Object.keys(wrapperSizeClasses)),
	/** Title to be read by screen readers */
	title: PropTypes.string,
	/** Description to be read by screen readers */
	desc: PropTypes.string,
	/** Role to be applied to the SVG for screen readers */
	role: PropTypes.string,
	/** Adds a rotation modifier to the icon. Accepted values are 0 (default), 90, 180, 270 */
	rotation: PropTypes.oneOf([
		...Object.keys(rotationClasses),
		...Object.keys(rotationClasses).map(n => parseInt(n)),
	]),
	/** Adds a color modifier to the icon */
	color: PropTypes.oneOf(Object.keys(colorClasses)),
	/** Whether the icon should be wrapped in a wrapper with a set size */
	isBoxed: PropTypes.bool,
};

XUIIcon.defaultProps = {
	size: 'medium',
	role: 'presentation',
};
