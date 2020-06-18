import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-panel--section`;

const XUIPanelSection = ({
  children,
  className,
  headerClassName,
  headerText,
  qaHook,
  ...spreadProps
}) => {
  const classes = cn(baseClass, className);
  const headerClasses = cn(`${baseClass}--header`, headerClassName);
  const header = headerText && <div className={headerClasses}>{headerText}</div>;

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
   * Text to be placed in a "xui-panel--section-header" node
   */
  headerText: PropTypes.string,
  /**
   * Classes to add to the "xui-panel--section-header" node
   */
  headerClassName: PropTypes.string,
};
