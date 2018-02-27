import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';

class CompleteIcon extends PureComponent {

	render = () => (
		<svg
			className={ `${NAME_SPACE}-icon-complete` }
			viewBox="0 0 9 7">
			<polygon points="0 4 1 3 3 5 8 0 9 1 3 7" />
		</svg>
	);

}

class ErrorIcon extends PureComponent {

	render = () => (
		<svg
			className={ `${NAME_SPACE}-icon-error` }
			viewBox="0 0 2 7">
			<path d="M0,5 L1.99801961,5 L1.99801961,6.99797571 L0,6.99797571 L0,5 Z M0,0 L1.99801961,0 L1.99801961,4 L0,4 L0,0 Z" />
		</svg>
	);

}

class StepperIcon extends PureComponent {

	render = () => {

		const { isComplete, isError, children } = this.props;
		const content = isError
			? <ErrorIcon />
			: (isComplete ? <CompleteIcon /> : children);

		return (
			<div className={ `${NAME_SPACE}-link-icon` }>
				{ content }
			</div>
		);

	};

}

StepperIcon.propTypes = {
	children: PropTypes.node,
	isComplete: PropTypes.bool,
	isError: PropTypes.bool,
};

export default StepperIcon;