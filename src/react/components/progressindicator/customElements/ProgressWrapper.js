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
  children: PropTypes.func.isRequired,
  qaHook: PropTypes.string,
  classes: PropTypes.string.isRequired,
  ariaNow: PropTypes.number.isRequired,
  ariaMin: PropTypes.number.isRequired,
  ariaMax: PropTypes.number.isRequired,
  totalColor: PropTypes.string,
  progressColor: PropTypes.string,
  hasToolTip: PropTypes.bool,
  toolTipId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toolTipMessage: PropTypes.string.isRequired,
  thickness: PropTypes.number,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
};

export default ProgressWrapper;
