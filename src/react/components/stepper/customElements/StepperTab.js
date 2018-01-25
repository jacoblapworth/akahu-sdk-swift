import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIProgressCircular from '../../progressindicator/XUIProgressCircular';
import { NAME_SPACE, NOOP } from '../helpers/constants';
import StepperIcon from './StepperIcon';

const enrichProps = (props) => {

	const { isDisabled, isError, totalProgress } = props;

	const currentProgress = props.currentProgress < 0
		? 0 : Math.min(props.currentProgress, totalProgress);

	const isActive = props.isActive && !isDisabled;

	const isComplete = props.isComplete || currentProgress === totalProgress;

	const isStandard = !(isError || isActive || isDisabled);

	const handleClick = !props.handleClick || isDisabled || isActive ? NOOP : props.handleClick;

	const tabIndex = isDisabled ? -1 : 0;

	const linkClasses = cn(
		`${NAME_SPACE}-link`, {
			[`${NAME_SPACE}-link-standard`]: isStandard,
			[`${NAME_SPACE}-link-active`]: isActive,
			[`${NAME_SPACE}-link-error`]: isError,
			[`${NAME_SPACE}-link-disabled`]: isDisabled
		}
	);

	return {
		...props,
		currentProgress,
		isComplete,
		isStandard,
		handleClick,
		tabIndex,
		linkClasses,
	};

};

const StepperTab = (props) => {

	const {
		id,
		name,
		description,
		handleClick,
		isError,
		isComplete,
		isProgress,
		totalProgress,
		currentProgress,
		tabIndex,
		linkClasses,
	} = enrichProps(props);

	return (
		<button
			className={linkClasses}
			onClick={handleClick}
			tabIndex={tabIndex}>

			<div className={`${NAME_SPACE}-link-wrapper`}>

				{ isProgress && !isComplete

					? <div className={`${NAME_SPACE}-link-progress`}>
							<XUIProgressCircular id={id} total={totalProgress} progress={currentProgress} />
						</div>

					: <StepperIcon {...{ isComplete, isError }} /> }

				<div className={`${NAME_SPACE}-link-text`}>

					<span className={`${NAME_SPACE}-link-heading xui-heading-small`}>{name}</span>
					{description && <span className={`${NAME_SPACE}-link-description xui-heading-xsmall`}>{description}</span>}

				</div>

			</div>

		</button>
	);

};

export default StepperTab;

StepperTab.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string,
	handleClick: PropTypes.func,
	isError: PropTypes.bool,
	isComplete: PropTypes.bool,
	isActive: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isProgress: PropTypes.bool,
	totalProgress: PropTypes.number,
	currentProgress: PropTypes.number,
};
