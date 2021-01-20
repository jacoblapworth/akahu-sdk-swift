import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIProgressCircular from '../../progressindicator/XUIProgressCircular';
import { NAME_SPACE } from '../helpers/constants';
import StepperIcon from './StepperIcon';

const StepperTab = ({
  currentProgress,
  description,
  handleClick,
  id,
  index,
  isActive,
  isComplete,
  isError,
  isHidden,
  isProgress,
  isTruncated,
  linkClasses,
  name,
  qaHook,
  step,
  tabIndex,
  totalProgress,
}) => {
  const onClick = () => {
    handleClick(step - 1);
  };

  const automationId = qaHook && `${qaHook}-tab-${index}-button${isHidden ? '-hidden' : ''}`;
  const isTabActive = isHidden ? false : isActive;

  return (
    <button
      className={linkClasses}
      data-automationid={automationId}
      data-istabactive={isTabActive}
      onClick={onClick}
      tabIndex={tabIndex}
      type="button"
    >
      <div className={`${NAME_SPACE}-link-wrapper`}>
        {isProgress && !isComplete ? (
          <div className={`${NAME_SPACE}-link-progress`}>
            <XUIProgressCircular
              ariaLabel={name}
              id={id}
              progress={currentProgress}
              total={totalProgress}
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

export default StepperTab;

StepperTab.propTypes = {
  currentProgress: PropTypes.number,
  description: PropTypes.node,
  handleClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  isError: PropTypes.bool,
  isHidden: PropTypes.bool,
  isProgress: PropTypes.bool,
  isTruncated: PropTypes.bool,
  linkClasses: PropTypes.string,
  name: PropTypes.string.isRequired,
  qaHook: PropTypes.string,
  step: PropTypes.number,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalProgress: PropTypes.number,
};
