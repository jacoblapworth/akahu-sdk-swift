import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIProgressCircular from '../../progressindicator/XUIProgressCircular';
import { NAME_SPACE } from '../helpers/constants';
import StepperIcon from './StepperIcon';

export default class StepperTab extends PureComponent {
  handleClick = () => {
    const { handleClick, step } = this.props;

    handleClick(step - 1);
  };

  render = () => {
    const {
      id,
      name,
      description,
      step,
      isError,
      isComplete,
      isProgress,
      totalProgress,
      currentProgress,
      tabIndex,
      linkClasses,
      isTruncated,
      isActive,
      isHidden,
      qaHook,
      index,
    } = this.props;

    const automationId = qaHook && `${qaHook}-tab-${index}-button${isHidden ? '-hidden' : ''}`;
    const isTabActive = isHidden ? false : isActive;

    return (
      <button
        type="button"
        className={linkClasses}
        onClick={this.handleClick}
        data-automationid={automationId}
        data-istabactive={isTabActive}
        tabIndex={tabIndex}
      >
        <div className={`${NAME_SPACE}-link-wrapper`}>
          {isProgress && !isComplete ? (
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
          )}

          <div
            className={cn(
              `${NAME_SPACE}-link-text`,
              isTruncated && `${NAME_SPACE}-link-text-truncated`,
            )}
          >
            <span className={`${NAME_SPACE}-link-heading`}>{name}</span>

            {description && <span className={`${NAME_SPACE}-link-description`}>{description}</span>}
          </div>
        </div>
      </button>
    );
  };
}

StepperTab.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.node,
  linkClasses: PropTypes.string,
  step: PropTypes.number,
  index: PropTypes.number.isRequired,
  tabIndex: PropTypes.number,
  handleClick: PropTypes.func,
  isError: PropTypes.bool,
  isHidden: PropTypes.bool,
  isComplete: PropTypes.bool,
  isActive: PropTypes.bool,
  isProgress: PropTypes.bool,
  totalProgress: PropTypes.number,
  currentProgress: PropTypes.number,
  isTruncated: PropTypes.bool,
  qaHook: PropTypes.string,
};
