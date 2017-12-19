import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WithCircularStroke from './WithCircularStroke';
import { NAME_SPACE } from '../helpers/constants';

// HACK: The addition of this <canvas /> is to address an IE11 bug where <svg />
// options are not scaling accurately.
// NOTE: http://nicolasgallagher.com/canvas-fix-svg-scaling-in-internet-explorer/
const IE11SvgScaleHack = ({viewBoxHeight, viewBoxWidth}) => {

	return (
		<canvas
			className={`${NAME_SPACE}-circular-scaler`}
			height={viewBoxHeight}
			width={viewBoxWidth}
		/>
	)

};

IE11SvgScaleHack.propTypes = {
	viewBoxHeight: PropTypes.number.isRequired,
	viewBoxWidth: PropTypes.number.isRequired,
};

const createCircularStandardDashes = () => ({strokeDasharray: 'initial'});

const createCircularSegmentDashes = ({total, strokeWidth, circumference}) => {

	// A 10px stroke width pairs with a 16px segment gap.
	const ratio = 16 / 10;
	const gap = strokeWidth * ratio;
	const segments = total;

	return {
		strokeDasharray: `${circumference / segments - gap}, ${gap}`,
		strokeDashoffset: gap * -0.5
	};

};

const createCircularOffset = ({circumference, progress, total}) => {

	const offset = circumference * (1 - (progress / total));

	return isNaN(offset) || !isFinite(offset) ? 0 : offset;

};

const CircularTrack = ({id, total, progress, isSegmented, strokeWidth}) => {

	const viewBoxWidth = 100;
	const viewBoxHeight = 100;
	const center = viewBoxWidth / 2;
	const radius = center - (strokeWidth / 2);
	const circumference = 2 * Math.PI * radius;
	const offset = createCircularOffset({circumference, progress, total});
	const dashes = isSegmented
		? createCircularSegmentDashes({total, strokeWidth, circumference})
		: createCircularStandardDashes({offset, circumference});
	const progressClasses = cn(
		`${NAME_SPACE}-circular-current`,
		{[`${NAME_SPACE}-roundcap`]: !isSegmented}
	);

	return ([
		<IE11SvgScaleHack
			key="canvas"
			viewBoxHeight={viewBoxHeight}
			viewBoxWidth={viewBoxWidth}
		/>,

		<svg
			key="svg"
			className={`${NAME_SPACE}-circular-wrapper`}
			viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>

			<defs>

				<mask
					id={`${id}-progress-mask`}
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					width={viewBoxWidth}
					height={viewBoxHeight}>

					<circle
						{...dashes}
						className={`
							${NAME_SPACE}-circular-mask
							${NAME_SPACE}-roundcap
						`}
						strokeWidth={strokeWidth}
						r={radius}
						cx={center}
						cy={center}>
					</circle>

				</mask>

			</defs>

			<g mask={`url(#${id}-progress-mask)`}>

				<circle
					className={`${NAME_SPACE}-circular-track`}
					strokeWidth={strokeWidth}
					r={radius}
					cx={center}
					cy={center}>
				</circle>

				<circle
					className={progressClasses}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeWidth={strokeWidth}
					r={radius}
					cx={center}
					cy={center}>
				</circle>

			</g>

		</svg>
	]);

};

CircularTrack.propTypes = {
	id: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	progress: PropTypes.number.isRequired,
	isSegmented: PropTypes.bool,

	/** The SVG stroke width generated via the the "WithCircularStroke" HOC. */
	strokeWidth: PropTypes.number,

};

export default WithCircularStroke(CircularTrack);
