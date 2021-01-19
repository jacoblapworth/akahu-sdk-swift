import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { sizeClassNames, classNames, variantClassNames } from './constants';

const XUIAvatarCounter = ({ count, size = 'medium', variant = 'standard', qaHook, className }) => {
  const counterClassNames = cn(
    classNames.base,
    classNames.counter,
    sizeClassNames[size],
    variantClassNames[variant],
    className,
  );

  let value;

  if (typeof count === 'string') {
    value = count;
  } else if (count > 0) {
    value = `+${count}`;
  } else {
    value = `${count}`;
  }

  return value ? (
    <span className={counterClassNames} data-automationid={qaHook}>
      {value}
    </span>
  ) : null;
};

XUIAvatarCounter.propTypes = {
  className: PropTypes.string,

  /** The count to display. If this is a string, it is passed through transparently. If it is
   * a number, it will render with a + prefix */
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  qaHook: PropTypes.string,

  /** The size of the counter. Can be small, medium, large or xlarge */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** The type counter to display. Can be standard or business */
  variant: PropTypes.oneOf(['standard', 'business']),
};

export default React.memo(XUIAvatarCounter);
