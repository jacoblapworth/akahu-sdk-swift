import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-panel`;

const XUIPanelHeading = ({ qaHook, children, className, hasLayout, tagName, ...spreadProps }) => {
  const classes = cn(
    className,
    `${baseClass}--heading`,
    `${baseClass}--header`,
    hasLayout && `${baseClass}--heading-layout`,
  );
  const Tag = tagName;
  return (
    <Tag {...spreadProps} className={classes} data-automationid={qaHook}>
      {children}
    </Tag>
  );
};

XUIPanelHeading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * Whether to include standard styles on a panel heading. Defaults to true.
   */
  hasLayout: PropTypes.bool,
  /**
   * Main element tag type. Defaults to "header"
   */
  tagName: PropTypes.string,
};

XUIPanelHeading.defaultProps = {
  hasLayout: true,
  tagName: 'header',
};

export { XUIPanelHeading as default };
