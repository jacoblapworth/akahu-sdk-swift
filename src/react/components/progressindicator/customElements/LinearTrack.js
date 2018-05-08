import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WithLinearGrowth from './WithLinearGrowth';
import {NAME_SPACE} from '../helpers/constants';
import {createArray} from '../helpers/utilities';

const DEFAULT_THICKNESS = 4;

const dashProps = {
	total: PropTypes.number.isRequired,
	progress: PropTypes.number.isRequired,
	thickness: PropTypes.number,
};

const standardiseThickness = (thickness, isGrow, elementHeight) => (
	isGrow
		? Math.min(thickness, elementHeight)
		: Math.max(thickness, DEFAULT_THICKNESS)
);

const createSegmentBaseline = ({index, total, progress, thickness}) => {

	const isProgress = index < progress;

	return {
		isFirst: !index,
		isLast: index === total - 1,
		itemClasses: cn(
			`${NAME_SPACE}-linear-segment`,
			{
				[`${NAME_SPACE}-linear-current`]: isProgress,
				[`${NAME_SPACE}-linear-track`]: !isProgress
			}
		),
		gap: `${thickness / 2}px`,
		height: `${thickness}px`,
	};
};

const createLinearSegmentDots = ({total, progress, thickness}) => (
	createArray(total).map((_, index) => {
		const {
			isFirst,
			isLast,
			itemClasses,
			gap,
			height,
		} = createSegmentBaseline({index, total, progress, thickness});
		const width = height;
		const left = `-${gap}`;
		const margin = (
			isFirst
			? `0 0 0 ${gap}`
				: isLast
				? `0 ${gap} 0 0`
					// Center segment.
					: '0'
		);

		return (
			<div
				key={index}
				className={`${NAME_SPACE}-linear-dot`}
				style={{margin, height}}
			>
				{/*
					The current / progress tracks are nested inside of a "dot" element so
					that they can be absolutely positioned centrally inside the `width: 0`
					dot container. This allows the visual dots to overlap each other when
					there are too many to space evenly. When flexing the items they "squish"
					at condensed sizes.
				*/}
				<div
					className={itemClasses}
					style={{height, left, width}}/>
			</div>
		);
	})
);

const createLinearSegmentDashes = ({total, progress, thickness}) => (
	createArray(total).map((_, index) => {
		const {
			isFirst,
			isLast,
			itemClasses,
			gap,
			height,
		} = createSegmentBaseline({index, total, progress, thickness});
		const margin = (
			isFirst
			? `0 ${gap} 0 0`
				: isLast
				? `0 0 0 ${gap}`
					// Center segment.
					: `0 ${gap}`
		);

		return (
			<div
				key={index}
				className={itemClasses}
				style={{ margin, height }}
			/>
		);
	})
);

const createLinearStandardDashes = ({total, progress, thickness}) => {

	const width = `${progress / total * 100}%`;
	const height = `${thickness}px`;

	return (
		<div
			className={`${NAME_SPACE}-linear-track`}
			style={{height}}>
			<div
				className={`${NAME_SPACE}-linear-current`}
				style={{height, width}}
			/>
		</div>
	);

};

createLinearStandardDashes.propTypes = dashProps;

const LinearTrack = ({total, progress, isSegmented, hasSegmentDots, isGrow, elementHeight, ...props}) => {

	const thickness = standardiseThickness(props.thickness, isGrow, elementHeight);
	const dashes = (
		hasSegmentDots
		? createLinearSegmentDots({total, progress, thickness})
			: isSegmented
			? createLinearSegmentDashes({total, progress, thickness})
				// Standard.
				: createLinearStandardDashes({total, progress, thickness})
	);

	return (
		<div className={`${NAME_SPACE}-linear-wrapper`}>
			{dashes}
		</div>
	);

};

LinearTrack.propTypes = {
	...dashProps,
	isSegmented: PropTypes.bool,
	elementHeight: PropTypes.number,
};

LinearTrack.defaultProps = {
	thickness: DEFAULT_THICKNESS,
};

export default WithLinearGrowth(LinearTrack);
