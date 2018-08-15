import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WithCircularGrowth from './WithCircularGrowth';
import { NAME_SPACE } from '../helpers/constants';

const DEFAULT_THICKNESS = 3;

// Make sure the stroke width has a minimum viable value and a maximum that does
// not exceed its half of the <svg /> (or the browser throws an error).
const standardiseThickness = (width, thickness) => {
	const max = width / 2;
	const min = DEFAULT_THICKNESS;

	return thickness < min ? min : Math.min(thickness, max);
};

// HACK: The addition of this <canvas /> is to address an IE11 bug where <svg />
// options are not scaling accurately.
// NOTE: http://nicolasgallagher.com/canvas-fix-svg-scaling-in-internet-explorer/
const IE11SvgScaleHack = ({ viewBoxHeight, viewBoxWidth }) => (
	<canvas
		className={`${NAME_SPACE}-circular-scaler`}
		height={viewBoxHeight}
		width={viewBoxWidth}
	/>
);

IE11SvgScaleHack.propTypes = {
	viewBoxHeight: PropTypes.number.isRequired,
	viewBoxWidth: PropTypes.number.isRequired,
};

const createContentStyles = (strokeWidth, viewBoxWidth) => {
	// Content is placed inside the circle taking into account the thickness of the
	// track. We need to offset the <div /> container based on the <svg /> "viewbox"
	// width and the track stroke. This generates us a percentage offset which can
	// create a sub pixel rendering issue where the track and the content do not fix
	// completely snugly together - to combat this we pull back the content by a
	// pixel to create a slight overlap.
	const offset = `calc(${(strokeWidth / viewBoxWidth) * 100}% - 1px)`;

	return {
		bottom: offset,
		left: offset,
		right: offset,
		top: offset,
	};
};

const createCircularStandardDashes = () => ({ strokeDasharray: 'initial' });

const createCircularSegmentDashes = ({ total, strokeWidth, circumference }) => {
	// A 10px stroke width pairs with a 16px segment gap.
	const ratio = 16 / 10;
	const gap = strokeWidth * ratio;
	const segments = total;

	return {
		strokeDasharray: `${(circumference / segments) - gap}, ${gap}`,
		strokeDashoffset: gap * -0.5,
	};
};

const createCircularOffset = ({ circumference, progress, total }) => {
	const offset = circumference * (1 - (progress / total));

	return isNaN(offset) || !isFinite(offset) ? 0 : offset;
};

const CircularTrack = ({
	id,
	qaHook,
	total,
	progress,
	isSegmented,
	customContent,
	thickness,
	elementWidth,
}) => {
	const strokeWidth = standardiseThickness(elementWidth, thickness);
	const viewBoxWidth = elementWidth;
	const viewBoxHeight = viewBoxWidth;
	const center = viewBoxWidth / 2;
	const radius = center - (strokeWidth / 2);
	const circumference = 2 * Math.PI * radius;
	const offset = createCircularOffset({
		circumference,
		progress,
		total,
	});
	const dashes = isSegmented
		? createCircularSegmentDashes({ total, strokeWidth, circumference })
		: createCircularStandardDashes({ offset, circumference });
	const progressClasses = cn(
		`${NAME_SPACE}-circular-current`,
		{ [`${NAME_SPACE}-roundcap`]: !isSegmented },
	);
	const contentStyles = createContentStyles(strokeWidth, viewBoxWidth);

	return ([
		<IE11SvgScaleHack
			key="canvas"
			viewBoxHeight={viewBoxHeight}
			viewBoxWidth={viewBoxWidth}
		/>,

		customContent ? (
			<div
				key="content"
				data-automationid={qaHook && `${qaHook}-custom-content`}
				className={`${NAME_SPACE}-circular-content`}
				style={contentStyles}
			>
				{customContent}
			</div>
		) : null,

		<svg
			key="svg"
			className={`${NAME_SPACE}-circular-wrapper`}
			viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
		>

			<defs>

				<mask
					id={`${id}-progress-mask`}
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					width={viewBoxWidth}
					height={viewBoxHeight}
				>

					<circle
						{...dashes}
						className={`
							${NAME_SPACE}-circular-mask
							${NAME_SPACE}-roundcap
						`}
						strokeWidth={strokeWidth}
						r={radius}
						cx={center}
						cy={center}
					/>

				</mask>

			</defs>

			<g mask={`url(#${id}-progress-mask)`}>

				<circle
					className={`${NAME_SPACE}-circular-track`}
					strokeWidth={strokeWidth}
					r={radius}
					cx={center}
					cy={center}
				/>

				<circle
					className={progressClasses}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeWidth={strokeWidth}
					r={radius}
					cx={center}
					cy={center}
				/>

			</g>

		</svg>,
	]);
};

CircularTrack.propTypes = {
	id: PropTypes.string.isRequired,
	qaHook: PropTypes.string,
	total: PropTypes.number.isRequired,
	progress: PropTypes.number.isRequired,
	isSegmented: PropTypes.bool,
	customContent: PropTypes.node,
	thickness: PropTypes.number,
	elementWidth: PropTypes.number,
};

CircularTrack.defaultProps = {
	thickness: DEFAULT_THICKNESS,
};

export default WithCircularGrowth(CircularTrack);
