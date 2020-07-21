import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-panel--section`;

const XUIPanelSection = ({
  children,
  className,
  headerClassName,
  heading,
  qaHook,
  ...spreadProps
}) => {
  const classes = cn(baseClass, className);
  const headerClasses = cn(`${baseClass}--header`, headerClassName);
  const header = heading && <div className={headerClasses}>{heading}</div>;

  return (
    <div {...spreadProps} className={classes} data-automationid={qaHook}>
      {header}
      {children}
    </div>
  );
};

export default XUIPanelSection;

XUIPanelSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * Text or node to be placed in a "xui-panel--section-header" node
   */
  heading: PropTypes.node,
  /**
   * Classes to add to the "xui-panel--section-header" node
   */
  headerClassName: PropTypes.string,
};
