import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import { sizeClassNames, baseClass } from './private/constants';

const dot = <div className={`${baseClass}--dot`} />;

const XUILoader = props => {
  const className = cn(
    baseClass,
    sizeClassNames[props.size],
    props.className,
    props.hasDefaultLayout && !props.retainLayout && `${baseClass}-layout`,
    props.isInverted && `${baseClass}-inverted`,
    props.retainLayout && `${baseClass}-retain-layout`,
  );

  return (
    <div
      aria-label={props.ariaLabel}
      className={className}
      data-automationid={props.qaHook}
      role="progressbar"
    >
      {dot}
      {dot}
      {dot}
    </div>
  );
};

XUILoader.propTypes = {
  /**
   * Adds aria-label to the loader wrapping div
   * <br />
   * Recommended English value: *Loading*
   */
  ariaLabel: PropTypes.string.isRequired,
  /** Add additional classes to the loader wrapping div */
  className: PropTypes.string,
  /** Defaults to `true`. Sets the default layout class on the loader wrapping div */
  hasDefaultLayout: PropTypes.bool,
  /** Sets the loader to the inverted colour scheme */
  isInverted: PropTypes.bool,
  /** Adds data-automationid attribute with qaHook contents to the loader wrapping div */
  qaHook: PropTypes.string,
  /** Adds the retain layout class, used in combination with buttons. Applying this prop
   * will cause `hasDefaultLayout` prop to be ignored. */
  retainLayout: PropTypes.bool,
  /** Sets the size of the loader to be, medium (default), small, or xsmall */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),
};

XUILoader.defaultProps = {
  hasDefaultLayout: true,
  size: 'medium',
};

export default XUILoader;
