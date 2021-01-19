import React from 'react';
import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';
import { NAME_SPACE, COLORS } from '../helpers/constants';

const createColorOverride = (color, type) =>
  COLORS.indexOf(color) >= 0 && { [`data-${NAME_SPACE}-${type}-color`]: color };

const ProgressWrapper = props => {
  const {
    children,
    qaHook,
    classes,
    ariaNow,
    ariaMin,
    ariaMax,
    totalColor,
    progressColor,
    hasToolTip,
    toolTipId,
    toolTipMessage,
    ariaLabel,
    ariaLabelledBy,
  } = props;

  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuemax={ariaMax}
      aria-valuemin={ariaMin}
      aria-valuenow={ariaNow}
      aria-valuetext={toolTipMessage}
      className={classes}
      data-automationid={qaHook}
      role="progressbar"
      {...createColorOverride(totalColor, 'total')}
      {...createColorOverride(progressColor, 'current')}
    >
      {hasToolTip ? (
        <XUITooltip
          id={toolTipId}
          qaHook={qaHook && `${qaHook}-tooltip`}
          trigger={children(props)}
          triggerOnClick
          wrapperClassName={`${NAME_SPACE}--tooltip`}
        >
          {toolTipMessage}
        </XUITooltip>
      ) : (
        children(props)
      )}
    </div>
  );
};

ProgressWrapper.propTypes = {
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  ariaMax: PropTypes.number.isRequired,
  ariaMin: PropTypes.number.isRequired,
  ariaNow: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
  classes: PropTypes.string.isRequired,
  hasToolTip: PropTypes.bool,
  progressColor: PropTypes.string,
  qaHook: PropTypes.string,
  thickness: PropTypes.number,
  toolTipId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toolTipMessage: PropTypes.string.isRequired,
  totalColor: PropTypes.string,
};

export default ProgressWrapper;
