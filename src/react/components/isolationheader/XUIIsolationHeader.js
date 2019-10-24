import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIIsolationHeader({
  actions,
  avatar,
  children,
  className,
  contentClassName,
  hasLayout,
  navigationButton,
  qaHook,
  secondary,
  tags,
  title,
  ...spreadProps
}) {
  const baseClass = `${ns}-isolationheader`;

  const classes = cn(className, baseClass);
  const layoutClass = hasLayout ? `${baseClass}--content-layout` : '';
  const divClasses = cn(`${baseClass}--content`, layoutClass, contentClassName);

  const controlContent = (
    <div className={`${baseClass}--controlcontent`}>
      {navigationButton}
      {avatar}
    </div>
  );
  const titleWrapper = (title || secondary || tags) && (
    <div className={`${baseClass}--titlewrapper`}>
      {title && <h1 className={`${baseClass}--title`}>{title}</h1>}
      {secondary && <div className={`${baseClass}--secondarytitle`}>{secondary}</div>}
      {tags && <div className={`${baseClass}--tags`}>{tags}</div>}
    </div>
  );
  const leftContent = (
    <div className={`${baseClass}--leftcontent`}>
      {controlContent}
      {titleWrapper}
    </div>
  );
  const rightContent = actions && (
    <div className={`${baseClass}--rightcontent`}>
      {actions && <div className={`${baseClass}--actions`}>{actions}</div>}
    </div>
  );

  return (
    <header {...spreadProps} className={classes} data-automationid={qaHook}>
      <div className={divClasses}>
        {leftContent}
        {children}
        {rightContent}
      </div>
    </header>
  );
}

XUIIsolationHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * CSS class(es) to add to the the pageheading--content element. xui-page-width-standard
   * would go here
   */
  contentClassName: PropTypes.string,
  /**
   * Applies default layout styling.
   */
  hasLayout: PropTypes.bool,
  /**
   * Title text or node
   */
  title: PropTypes.node,
  /**
   * Components or html to be right-aligned in the pageheading
   */
  actions: PropTypes.node,
  /**
   * Array of XUITags
   */
  tags: PropTypes.arrayOf(PropTypes.element),
  /**
   * Secondary title
   */
  secondary: PropTypes.node,
  /**
   * Navigation button
   */
  navigationButton: PropTypes.node.isRequired,
  /**
   * Avatar
   */
  avatar: PropTypes.node,
};

XUIIsolationHeader.defaultProps = {
  hasLayout: true,
};
