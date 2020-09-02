import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import { sizeClassNames, baseClass } from './private/constants';

const dot = <div className={`${baseClass}--dot`} />;

const XUILoader = props => {
  const {
    size,
    className: propClassName,
    defaultLayout,
    retainLayout,
    isInverted,
    ariaLabel,
    qaHook,
  } = props;
  const className = cn(
    baseClass,
    sizeClassNames[size],
    propClassName,
    defaultLayout && !retainLayout && `${baseClass}-layout`,
    isInverted && `${baseClass}-inverted`,
    retainLayout && `${baseClass}-retain-layout`,
  );

  return (
    <div aria-label={ariaLabel} className={className} data-automationid={qaHook} role="progressbar">
      {dot}
      {dot}
      {dot}
    </div>
  );
};

XUILoader.propTypes = {
  /** Add additional classes to the loader wrapping div */
  className: PropTypes.string,

  /** Adds data-automationid attribute with qaHook contents to the loader wrapping div */
  qaHook: PropTypes.string,

  /**
   * Adds aria-label to the loader wrapping div
   * <br />
   * Recommended English value: *Loading*
   */
  ariaLabel: PropTypes.string.isRequired,

  /** Defaults to `true`. Sets the default layout class on the loader wrapping div */
  defaultLayout: PropTypes.bool,

  /** Sets the size of the loader to be, medium (default), small, or xsmall */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** Sets the loader to the inverted colour scheme */
  isInverted: PropTypes.bool,

  /** Adds the retain layout class, used in combination with buttons. Applying this prop
   * will cause `defaultLayout` prop to be ignored. */
  retainLayout: PropTypes.bool,
};

XUILoader.defaultProps = {
  defaultLayout: true,
  size: 'medium',
};

export default XUILoader;
