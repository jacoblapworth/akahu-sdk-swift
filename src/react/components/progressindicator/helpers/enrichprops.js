import cn from 'classnames';
import { NAME_SPACE } from './constants';

const enrichBaseProps = props => {
  // "ariaMin", "ariaMax" and "ariaNow" must all be positive numbers.
  const ariaMin = 0;
  const ariaMax = Math.max(props.total, ariaMin);
  const ariaNow = Math.max(props.progress, ariaMin);

  // The ID that ARIA uses as a hook
  const toolTipId = props.hasToolTip && `${props.id}-progress--tooltip`;
  const toolTipMessage = props.toolTipMessage || `${ariaNow} of ${ariaMax}`;

  // Even if "isOverflow" is supplied we need to check if the current "ariaNow" and
  // "ariaMax" values are disproportionate so that an overflow event is actually relevant.
  const isDisproportionate = ariaNow > ariaMax;
  const isOverflow = props.isOverflow && isDisproportionate;

  // If in an "overflow" scenario the "now" and "ariaMax" values will be swapped
  // around for both "progress" and "total".
  const progress = isOverflow || isDisproportionate ? ariaMax : ariaNow;
  // If "isOverflow" is not active then we no not allow "ariaNow" to be larger than "ariaMax"
  const total = isOverflow ? ariaNow : ariaMax;

  // We only segment the track when there is more than one segment (otherwise there
  // will be a weird gap at the top of the track where the next segment would appear).
  const isSegmented = props.isSegmented && Boolean(total > 1);

  // A "soft" error will not be visible if the UI is currently in a "hard" error
  // or "overflow" scenario.
  const isSoftError = props.isSoftError && !props.isHardError && !isOverflow;

  const classes = cn(`${NAME_SPACE}`, {
    [`${NAME_SPACE}-grow`]: props.isGrow,
    [`${NAME_SPACE}-overflow`]: isOverflow,
    [`${NAME_SPACE}-error-soft`]: isSoftError,
  });

  return {
    ...props,
    ariaMin,
    ariaMax,
    ariaNow,
    progress,
    total,
    toolTipId,
    toolTipMessage,
    isOverflow,
    isSegmented,
    classes,
  };
};

const enrichLinearProps = props => {
  const base = enrichBaseProps(props);

  // A "soft" error will not be visible if the UI is currently in an "overflow" scenario.
  const isSoftError = base.isSoftError && !base.isOverflow;
  const classes = cn(base.classes, `${NAME_SPACE}-linear`);
  // Segment dots are only relevant if the configuration is also set to segments.
  const hasSegmentDots = base.hasSegmentDots && base.isSegmented;

  return {
    ...base,
    isSoftError,
    classes,
    hasSegmentDots,
  };
};

const enrichCircularProps = props => {
  const base = enrichBaseProps(props);
  const { isHardError, isOverflow, isAlertOnComplete, total, progress, children } = base;

  // A "soft" error will not be visible if the UI is currently in a "hard" error
  // or "overflow" scenario.
  const isSoftError = base.isSoftError && !isHardError && !isOverflow;

  // The "complete" alert is "circular" specific an will only show up when not in
  // an error scenario and the "total" and "progress" are equal.
  const isComplete = isAlertOnComplete && !(isSoftError || isHardError) && total === progress;

  const customContent = children;

  const classes = cn(base.classes, `${NAME_SPACE}-circular`, {
    [`${NAME_SPACE}-complete`]: isComplete,
    [`${NAME_SPACE}-error-hard`]: isHardError,
  });

  return {
    ...base,
    isSoftError,
    isComplete,
    customContent,
    classes,
  };
};

const enrichProps = { enrichLinearProps, enrichCircularProps };

export { enrichProps as default, enrichLinearProps, enrichCircularProps };
