import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {NAME_SPACE} from '../helpers/constants';

const dashProps = {
	total: PropTypes.number.isRequired,
	progress: PropTypes.number.isRequired,
};

const createLinearSegmentDashes = ({total, progress}) => {

	return new Array(total).fill(0).map((_, index) => {

		const isProgress = index < progress;
		const dashClasses = cn(
			`${NAME_SPACE}-linear-segment`,
			{
				[`${NAME_SPACE}-linear-current`]: isProgress,
				[`${NAME_SPACE}-linear-track`]: !isProgress
			}
		);

		return <div key={index} className={dashClasses} />;

	});

};

const createLinearStandardDashes = ({total, progress}) => {

	const width = `${progress / total * 100}%`;

	return (
		<div className={`${NAME_SPACE}-linear-track`}>
			<div
				className={`${NAME_SPACE}-linear-current`}
				style={{width}}
			/>
		</div>
	);

};

createLinearStandardDashes.propTypes = dashProps;

const LinearTrack = ({total, progress, isSegmented}) => {

	const dashes = isSegmented
		? createLinearSegmentDashes({total, progress})
		: createLinearStandardDashes({total, progress});

	return (
		<div className={`${NAME_SPACE}-linear-wrapper`}>
			{dashes}
		</div>
	);

};

LinearTrack.propTypes = {
	...dashProps,
	isSegmented: PropTypes.bool,
};

export default LinearTrack;
