import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import { observe, unobserve } from '../helpers/resizeObserver';
import WidthContext from '../../contexts/WidthContext';

const baseClass = `${ns}-pageheading`;

export default class XUIPageHeader extends PureComponent {
  _area = React.createRef();

  state = {};

  componentDidMount() {
    this._area.current && observe(this);
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

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
      tags,
      secondary,
      supplementary,
      ...spreadProps
    } = this.props;

    const classes = cn(className, baseClass);
    const layoutClass = hasLayout ? `${baseClass}--content-layout` : '';
    const divClasses = cn(
      `${baseClass}--content`,
      !tabs && `${baseClass}--content-no-tabs`,
      layoutClass,
      contentClassName,
    );
    const rightClasses = cn(
      `${baseClass}--rightcontent`,
      !tabs && `${baseClass}--rightcontent-no-tabs`,
    );

    const clonedBreadcrumb =
      breadcrumb &&
      React.cloneElement(breadcrumb, {
        // Add the necessary pagehead class to the provided breadcrumb.
        className: cn(breadcrumb.props.className, `${baseClass}--breadcrumbtrail`),
      });
    const clonedTabs =
      tabs &&
      React.cloneElement(tabs, {
        // Make sure this is horizontal in the pagehead
        isHorizontal: true,
        className: cn(tabs.props.className, `${baseClass}--tabs`),
      });

    const titleTags = (title || secondary || supplementary || tags) && (
      <div
        className={cn(`${baseClass}--titlewrapper`, tags && `${baseClass}--titlewrapper-has-tags`)}
      >
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
    const leftContent = (titleTags || clonedBreadcrumb) && (
      <div className={`${baseClass}--leftcontent`}>
        {clonedBreadcrumb}
        {titleTags}
      </div>
    );
    const rightContent = (clonedTabs || actions) && (
      <div className={rightClasses}>
        {clonedTabs}
        {actions && <div className={`${baseClass}--actions`}>{actions}</div>}
      </div>
    );
    return (
      <WidthContext.Provider value={this.state}>
        <header {...spreadProps} className={classes} data-automationid={qaHook}>
          <div className={divClasses} ref={this._area}>
            {leftContent}
            {children}
            {rightContent}
          </div>
        </header>
      </WidthContext.Provider>
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
   * Title text or node. Should almost certainly be present.
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
    // eslint-disable-next-line react/destructuring-assignment
    if (props[propName] && !props.title) {
      return new Error('Breadcrumb in a page header is to be used with a title');
    }
    return null;
  },
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
  supplementary: PropTypes.node,
};

XUIPageHeader.defaultProps = {
  hasLayout: true,
};
