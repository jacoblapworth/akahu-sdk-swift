import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-pageheading`;

const buildTitleAndTabs = (title, tabs) => {
  const builtTitle = title && <h1 className={`${baseClass}--title`}>{title}</h1>;
  if (builtTitle && !tabs) {
    return builtTitle;
  } else if (tabs) {
    // Allows for title + tabs or tabs only
    const clonedTabs = React.cloneElement(tabs, {
      // Make sure this is horizontal in the pagehead
      isHorizontal: true,
    });
    return (
      <div className={`${baseClass}--tabs`}>
        {builtTitle}
        {clonedTabs}
      </div>
    );
  }
  return null;
};

export default class XUIPageHeader extends PureComponent {
  render() {
    const {
      qaHook,
      title,
      tabs,
      breadcrumb,
      className,
      children,
      actions,
      hasLayout,
      contentClassName,
      ...spreadProps
    } = this.props;
    const classes = cn(className, baseClass);
    const clonedBreadcrumb =
      breadcrumb &&
      React.cloneElement(breadcrumb, {
        // Add the necessary pagehead class to the provided breadcrumb.
        className: cn(breadcrumb.props.className, `${baseClass}--breadcrumbs`),
      });
    const builtTitleAndTabs = buildTitleAndTabs(title, tabs);
    const builtActions = actions && <div className={`${baseClass}--actions`}>{actions}</div>;
    const layoutClass = hasLayout ? `${baseClass}--content-layout` : '';
    const divClasses = cn(`${baseClass}--content`, layoutClass, contentClassName);

    return (
      <header {...spreadProps} className={classes} data-automationid={qaHook}>
        <div className={divClasses}>
          {clonedBreadcrumb}
          {builtTitleAndTabs}
          {children}
          {builtActions}
        </div>
      </header>
    );
  }
}

XUIPageHeader.propTypes = {
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
   * Title text or node. Not to be combined with breadcrumbs
   */
  title: PropTypes.node,
  /**
   * Horizontal picklist to act as tabs. XUIPicklist
   */
  tabs: PropTypes.element,
  /**
   * Instantiated breadcrumb component. Use in conjunction with a title.
   */
  breadcrumb(props, propName) {
    if (props[propName] && !props.title) {
      return new Error('Breadcrumb in a page header is to be used with a title');
    }
    return null;
  },
  /**
   * Components or html to be right-aligned in the pageheading
   */
  actions: PropTypes.node,
};

XUIPageHeader.defaultProps = {
  hasLayout: true,
};
