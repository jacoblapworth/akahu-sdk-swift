import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-panel`;

const XUIPanel = ({
  children,
  className,
  footer,
  heading,
  qaHook,
  sidebar,
  tagName,
  ...spreadProps
}) => {
  const classes = cn(baseClass, className, sidebar && `${baseClass}-has-sidebar`);
  const Tag = tagName;
  if (!sidebar) {
    return (
      <Tag {...spreadProps} className={classes} data-automationid={qaHook}>
        {heading}
        {children}
        {footer}
      </Tag>
    );
  }
  return (
    <Tag {...spreadProps} className={classes} data-automationid={qaHook}>
      <div className={`${baseClass}--sidebar`}>{sidebar}</div>
      <div className={`${baseClass}--main`}>
        {heading}
        {children}
        {footer}
      </div>
    </Tag>
  );
};

export default XUIPanel;

XUIPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * The header for a panel. We recommend XUIPanelHeading.
   */
  heading: PropTypes.node,
  /**
   * The footer for a panel. We recommend XUIPanelFooter.
   */
  footer: PropTypes.node,
  /**
   * A node which will be wrapped and rendered as a panel sidebar.
   */
  sidebar: PropTypes.node,
  /**
   * Main element tag type, for semantic purposes (eg. main or aside). Defaults to "div"
   */
  tagName: PropTypes.string,
};

XUIPanel.defaultProps = {
  tagName: 'div',
};
