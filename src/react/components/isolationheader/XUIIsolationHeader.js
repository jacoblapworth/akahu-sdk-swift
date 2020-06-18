import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const XUIIsolationHeader = ({
  actions,
  avatar,
  children,
  className,
  contentClassName,
  hasLayout,
  isPositionFixed,
  navigationButton,
  qaHook,
  secondary,
  supplementary,
  tags,
  title,
  ...spreadProps
}) => {
  const baseClass = `${ns}-isolationheader`;

  const classes = cn(className, baseClass, isPositionFixed && `${baseClass}-fixed`);
  const layoutClass = hasLayout ? `${baseClass}--content-layout` : '';
  const divClasses = cn(`${baseClass}--content`, layoutClass, contentClassName);
  const titleWrapperClasses = cn(
    `${baseClass}--titlewrapper`,
    avatar && `${baseClass}--titlewrapper-has-avatar`,
    tags && `${baseClass}--titlewrapper-has-tags`,
  );

  const controlContent = (
    <div className={`${baseClass}--controlcontent`}>
      {navigationButton}
      {avatar}
    </div>
  );
  const titleWrapper = (title || secondary || supplementary || tags) && (
    <div className={titleWrapperClasses}>
      {title && (
        <h1 className={`${baseClass}--title`} data-automationid={qaHook && `${qaHook}--title`}>
          {title}
        </h1>
      )}
      {secondary && (
        <div
          className={`${baseClass}--secondarytitle`}
          data-automationid={qaHook && `${qaHook}--secondarytitle`}
        >
          {secondary}
        </div>
      )}
      {tags && <div className={`${baseClass}--tags`}>{tags}</div>}
      {supplementary && (
        <div
          className={`${baseClass}--supplementarytext`}
          data-automationid={qaHook && `${qaHook}--supplementarytext`}
        >
          {supplementary}
        </div>
      )}
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
};

export default XUIIsolationHeader;

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
   * Supplementary text to appear after the headings and tags
   */
  supplementary: PropTypes.string,
  /**
   * Navigation button
   */
  navigationButton: PropTypes.node.isRequired,
  /**
   * Avatar
   */
  avatar: PropTypes.node,
  /**
   * Applies fixed positioning so the isolation mode header scrolls with the page
   */
  isPositionFixed: PropTypes.bool,
};

XUIIsolationHeader.defaultProps = {
  hasLayout: true,
};
