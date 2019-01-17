import React from 'react';
import PropTypes from 'prop-types';
import suggestion from '@xero/xui-icon/icons/suggestion';
import { NAME_SPACE } from '../helpers/constants';
import XUIIcon from '../../icon/XUIIcon';

const CompleteIcon = () => (
	<svg
		className={`${NAME_SPACE}-icon-complete`}
		viewBox="0 0 9 7"
	>
		<polygon points="0 4 1 3 3 5 8 0 9 1 3 7" />
	</svg>
);

const ErrorIcon = () => (
	<XUIIcon className={`${NAME_SPACE}-icon-error`} icon={suggestion} />
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
