import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NAME_SPACE, NOOP } from '../helpers/constants';
import StepperIcon from './StepperIcon';

const StepperTab = ({ name, description, handleClick, isError, isComplete, isActive, isDisabled }) => {

	const linkClasses = cn(
		`${NAME_SPACE}-link`, {
			[`${NAME_SPACE}-link-standard`]: !(isActive || isError || isDisabled),
			[`${NAME_SPACE}-link-active`]: isActive,
			[`${NAME_SPACE}-link-error`]: isError,
			[`${NAME_SPACE}-link-disabled`]: isDisabled
		}
	);
	const buttonClickHandler = (isDisabled || isActive) ? NOOP : handleClick;

	return (
		<button
			className={linkClasses}
			onClick={buttonClickHandler}>

			<div className={`${NAME_SPACE}-link-wrapper`}>

				<StepperIcon {...{ isComplete, isError }} />

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

	name: PropTypes.string.isRequired,

	description: PropTypes.string,

	handleClick: PropTypes.func,

	isError: PropTypes.bool,

	isComplete: PropTypes.bool,

	isActive: PropTypes.bool,

	isDisabled: PropTypes.bool,

};
