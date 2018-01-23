import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { BASE_CLASS, NOOP } from '../helpers/constants';

const StepperTab = ({ name, description, handleClick, isError, isComplete, isActive, isDisabled }) => {

	const linkClasses = cn(
		`${BASE_CLASS}-link`, {
			[`${BASE_CLASS}-link-standard`]: !(isActive || isError || isDisabled),
			[`${BASE_CLASS}-link-active`]: isActive,
			[`${BASE_CLASS}-link-error`]: isError, // !isActive && isError,
			[`${BASE_CLASS}-link-complete`]: isComplete,
			[`${BASE_CLASS}-link-disabled`]: isDisabled
		}
	);
	const buttonClickHandler = (isDisabled || isActive) ? NOOP : handleClick;

	return (
		<button
			className={linkClasses}
			onClick={buttonClickHandler}>

			<div className={`${BASE_CLASS}-link-wrapper`}>

				<div className={`${BASE_CLASS}-link-icon`}>

					{/* <path d="M15.5,23 C19.6421356,23 23,19.6421356 23,15.5 C23,11.3578644 19.6421356,8 15.5,8 C11.3578644,8 8,11.3578644 8,15.5 C8,19.6421356 11.3578644,23 15.5,23 Z M15,11 L16.9980196,11 L16.9980196,12.9979757 L15,12.9979757 L15,11 Z M14,14 L17,14 L17,18 L18,18 L18,19 L14,19 L14,18 L15,18 L15,15 L14,15 L14,14 Z"></path> */}

					<svg viewBox="0 0 30 30">
						<circle cx="15" cy="15" r="8" />
					</svg>

				</div>

				<div className={`${BASE_CLASS}-link-text`}>

					<span className={`${BASE_CLASS}-link-heading xui-heading-small`}>{name}</span>
					{description && <span className={`${BASE_CLASS}-link-description xui-heading-xsmall`}>{description}</span>}

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
