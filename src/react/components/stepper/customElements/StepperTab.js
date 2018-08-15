import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIProgressCircular from '../../progressindicator/XUIProgressCircular';
import { NAME_SPACE } from '../helpers/constants';
import { enrichTabProps } from '../helpers/enrichprops';
import StepperIcon from './StepperIcon';
import { ns } from '../../helpers/xuiClassNamespace';

export default class StepperTab extends PureComponent {
	render = () => {
		const {
			id,
			name,
			description,
			step,
			handleClick,
			isError,
			isComplete,
			isProgress,
			totalProgress,
			currentProgress,
			tabIndex,
			linkClasses,
		} = enrichTabProps(this.props);

		return (
			<button
				type="button"
				className={linkClasses}
				onClick={handleClick}
				tabIndex={tabIndex}
			>

				<div className={`${NAME_SPACE}-link-wrapper`}>

					{isProgress && !isComplete
						? (
							<div className={`${NAME_SPACE}-link-progress`}>
								<XUIProgressCircular
									id={id}
									total={totalProgress}
									progress={currentProgress}
									ariaLabel={name}
								/>
							</div>
						) : (
							<StepperIcon {...{ isComplete, isError, step }}>
								<span className={`${NAME_SPACE}-link-step`}>{step}</span>
							</StepperIcon>
						)
					}

					<div className={`${NAME_SPACE}-link-text`}>

						<span className={`${NAME_SPACE}-link-heading ${ns}-heading-small`}>
							{name}
						</span>

						{description && (
							<span className={`${NAME_SPACE}-link-description`}>
								{description}
							</span>
						)}

					</div>

				</div>

			</button>
		);
	};
}

StepperTab.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string,
	step: PropTypes.number,
	handleClick: PropTypes.func,
	isError: PropTypes.bool,
	isComplete: PropTypes.bool,
	isActive: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isProgress: PropTypes.bool,
	totalProgress: PropTypes.number,
	currentProgress: PropTypes.number,
};
