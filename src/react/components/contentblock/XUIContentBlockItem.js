import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import { isKeyClick } from '../helpers/reactKeyHandler';

export default class XUIContentBlockItem extends PureComponent {
  render() {
    const {
      _ariaControls,
      _ariaExpanded,
      qaHook,
      onClick,
      onKeyDown,
      action,
      leftContent,
      children,
      className,
      hasLayout,
      hasTopRadius,
      hasBottomRadius,
      isRowLink,
      _isAccordionTrigger,
      href,
      overflow,
      pinnedValue,
      secondaryHeading,
      primaryHeading,
      description,
      tags,
      tagPosition,
    } = this.props;

    const baseClass = _isAccordionTrigger ? `${ns}-accordiontrigger` : `${ns}-contentblockitem`;

    const clonedAction =
      action &&
      React.cloneElement(action, {
        className: cn(action.props.className, `${baseClass}--actions`),
      });

    const tagPositionInline = tagPosition === 'inline';

    const builtHeadings = primaryHeading && (
      <div className={`${baseClass}--headings`}>
        <span className={`${baseClass}--primaryheading`}>{primaryHeading}</span>
        {secondaryHeading && (
          <span className={`${baseClass}--secondaryheading`}>{secondaryHeading}</span>
        )}
        {tagPositionInline && tags}
      </div>
    );

    const tagPositionDescription = tagPosition === 'description';

    let builtDescriptionArea = description && (
      <div className={`${baseClass}--description`}>
        <span className={`${baseClass}--description--text`}>{description}</span>
        {tagPositionDescription && tags}
      </div>
    );

    if (!description && tags && tagPositionDescription) {
      builtDescriptionArea = <div className={`${baseClass}--description`}>{tags}</div>;
    }

    const builtPinnedValue = pinnedValue && (
      <div className={`${baseClass}--pinnedvalue`}>{pinnedValue}</div>
    );

    const leftContentClasses = cn(
      `${baseClass}--leftcontent`,
      description && `${baseClass}--leftcontent-layout`,
    );

    const builtLeftContent = leftContent && <div className={leftContentClasses}>{leftContent}</div>;

    const builtMainContent = (builtHeadings || builtDescriptionArea) && (
      <div className={`${baseClass}--maincontent`}>
        {builtHeadings}
        {builtDescriptionArea}
      </div>
    );

    const tagPositionRight = tagPosition === 'right';

    const builtRightContent = (builtPinnedValue ||
      action ||
      overflow ||
      (tags && tagPositionRight)) && (
      <div
        className={`${baseClass}--rightcontent`}
        onClick={event => {
          href && event.preventDefault();
          event.stopPropagation();
        }}
        onKeyDown={event => {
          if (isKeyClick(event)) {
            href && event.preventDefault();
            event.stopPropagation();
          }
        }}
        role="presentation"
      >
        {tagPositionRight && tags}
        {builtPinnedValue}
        {clonedAction}
        {overflow}
      </div>
    );

    const divClasses = cn(
      `${baseClass}`,
      hasLayout && `${baseClass}-layout`,
      isRowLink && `${baseClass}-rowlink`,
      hasTopRadius && `${baseClass}-has-top-radius`,
      hasBottomRadius && `${baseClass}-has-bottom-radius`,
      className,
    );

    const Tag = href ? 'a' : 'div';
    const role = (onClick || onKeyDown) && !href ? 'button' : undefined;

    return (
      <Tag
        aria-controls={_ariaControls}
        aria-expanded={_ariaExpanded}
        className={divClasses}
        data-automationid={qaHook}
        href={href}
        onClick={onClick}
        onKeyDown={onKeyDown}
        role={role}
        tabIndex={onClick || onKeyDown || href ? 0 : undefined}
      >
        {builtLeftContent}
        {children}
        {builtMainContent}
        {builtRightContent}
      </Tag>
    );
  }
}

XUIContentBlockItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /**
   * For accordion: identifies content associated with the trigger
   * @ignore
   */
  _ariaControls: PropTypes.string,
  /**
   * For accordion: denotes whether content associated with the trigger is expanded
   * @ignore
   */
  _ariaExpanded: PropTypes.bool,
  /**
   * Optional actions to be right aligned. Use the XUIActions component.
   */
  action: PropTypes.element,
  /**
   * Callback to fire when content block item is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Callback to fire on keyDown for each content block item
   */
  onKeyDown: PropTypes.func,
  /**
   * Left most component option, typically an `avatar`, `checkbox` or `rollover checkbox` component
   */
  leftContent: PropTypes.element,
  /**
   * Determines whether to apply hover styling on the entire content block item
   */
  isRowLink: PropTypes.bool,
  /**
   * Gives accordion items the proper name for styling and semantics
   * @ignore
   */
  _isAccordionTrigger: PropTypes.bool,
  /**
   * Determines whether to apply top left and top right border radius on the content block item
   */
  hasTopRadius: PropTypes.bool,
  /**
   * Determines whether to apply bottom left and bottom right border radius on the content block item
   */
  hasBottomRadius: PropTypes.bool,
  /**
   * Determines whether to apply default layout styling or not
   */
  hasLayout: PropTypes.bool,
  /**
   * The `href` attribute to use on the anchor element
   */
  href: PropTypes.string,
  /**
   * Any component passed as right most content, typically a `dropdown toggled` component
   */
  overflow: PropTypes.element,
  /**
   * Text pinned to right side of content block
   */
  pinnedValue: PropTypes.node,
  /**
   * Primary heading for the content block
   */
  primaryHeading: PropTypes.node,
  /**
   * Secondary heading for the content block
   */
  secondaryHeading: PropTypes.node,
  /**
   * Description to be placed under the heading
   */
  description: PropTypes.node,
  /**
   * Tag or other user determined node to go to right of primary heading
   */
  tags: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  /**
   * Repositions the tags in other places around the component
   */
  tagPosition: PropTypes.oneOf(['description', 'right', 'inline']),
};

XUIContentBlockItem.defaultProps = {
  hasLayout: true,
  _isAccordionTrigger: false,
  tagPosition: 'description',
};
