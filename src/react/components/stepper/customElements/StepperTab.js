import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIProgressCircular from '../../progressindicator/XUIProgressCircular';
import { NAME_SPACE, NOOP } from '../helpers/constants';
import StepperIcon from './StepperIcon';

const enrichProps = (props) => {

	const currentProgress = props.currentProgress < 0
		? 0 : Math.min(props.currentProgress, props.totalProgress);

	const isActive = props.isActive && !props.isDisabled;

	const isComplete = props.isComplete || currentProgress === props.totalProgress;

	const isStandard = !(props.isError || isActive || props.isDisabled);

	const handleClick = props.isDisabled || isActive ? NOOP : props.handleClick;

	const tabIndex = props.isDisabled ? -1 : 0;

	return {
		...props,
		currentProgress,
		isActive,
		isComplete,
		isStandard,
		handleClick,
		tabIndex,
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
		isActive,
		isDisabled,
		isStandard,
		isProgress,
		totalProgress,
		currentProgress,
		tabIndex,
	} = enrichProps(props);

	const linkClasses = cn(
		`${NAME_SPACE}-link`, {
			[`${NAME_SPACE}-link-standard`]: isStandard,
			[`${NAME_SPACE}-link-active`]: isActive,
			[`${NAME_SPACE}-link-error`]: isError,
			[`${NAME_SPACE}-link-disabled`]: isDisabled
		}
	);

	return (
		<button
			className={linkClasses}
			onClick={handleClick}
			tabIndex={tabIndex}>

			<div className={`${NAME_SPACE}-link-wrapper`}>

				{isProgress && !isComplete

					? <div className={`${NAME_SPACE}-link-progress`}>
						<XUIProgressCircular id={id} total={totalProgress} progress={currentProgress} />
					</div>

					: <StepperIcon {...{ isComplete, isError }} />}

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
