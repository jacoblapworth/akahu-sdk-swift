import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-filepreview`;

const XUIFilePreview = ({ children, className, footer, header, qaHook, ...spreadProps }) => {
  const classes = cn(baseClass, className);

  return (
    <div {...spreadProps} className={classes} data-automationid={qaHook}>
      {header}
      <div className={`${baseClass}--body`} data-automationid={qaHook && `${qaHook}-body}`}>
        {children}
      </div>
      {footer}
    </div>
  );
};

export default XUIFilePreview;

XUIFilePreview.propTypes = {
  /**
   * Content to go in the grey body area
   */
  children: PropTypes.node,
  /**
   * Classes to be applied to the filepreview wrapping element
   */
  className: PropTypes.string,
  /**
   * Footer component
   */
  footer: PropTypes.node,
  /**
   * Header component
   */
  header: PropTypes.node,
  qaHook: PropTypes.string,
};

XUIFilePreview.defaultProps = {};
