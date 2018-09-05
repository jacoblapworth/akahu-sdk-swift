import React from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';

const CompleteIcon = () => (
	<svg
		className={`${NAME_SPACE}-icon-complete`}
		viewBox="0 0 9 7"
	>
		<polygon points="0 4 1 3 3 5 8 0 9 1 3 7" />
	</svg>
);
// TODO: Re-enable rule when icons are added to xui-icon
/* eslint-disable max-len */
const ErrorIcon = () => (
	<svg
		className={`${NAME_SPACE}-icon-error`}
		viewBox="0 0 2 7"
	>
		<path d="M0,5 L1.99801961,5 L1.99801961,6.99797571 L0,6.99797571 L0,5 Z M0,0 L1.99801961,0 L1.99801961,4 L0,4 L0,0 Z" />
	</svg>
);

const CircularIcon = ({ isComplete, isHardError, hardErrorAlert }) => (
	<div className={`${NAME_SPACE}-icon`}>

		{isComplete && <CompleteIcon />}
		{isHardError ? (hardErrorAlert || <ErrorIcon />) : null}

	</div>
);

CircularIcon.propTypes = {
	isComplete: PropTypes.bool,
	isHardError: PropTypes.bool,
	hardErrorAlert: PropTypes.node,
};

export default CircularIcon;
