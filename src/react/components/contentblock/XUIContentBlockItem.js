import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import { isKeyClick } from '../helpers/reactKeyHandler';
import shouldRender from '../helpers/shouldRender';

const XUIContentBlockItem = ({
  _ariaControls,
  _ariaExpanded,
  _isAccordionTrigger,
  action,
  children,
  className,
  description,
  hasBottomRadius,
  hasLayout,
  hasTopRadius,
  href,
  isRowLink,
  leftContent,
  onClick,
  onKeyDown,
  overflow,
  pinnedValue,
  primaryHeading,
  qaHook,
  secondaryHeading,
  tagPosition,
  tags,
}) => {
  const baseClass = _isAccordionTrigger ? `${ns}-accordiontrigger` : `${ns}-contentblockitem`;

  const clonedAction =
    action &&
    React.cloneElement(action, {
      className: cn(action.props.className, `${baseClass}--actions`),
    });

  const tagPositionInline = tagPosition === 'inline';

  const builtHeadings = shouldRender(primaryHeading) && (
    <div className={`${baseClass}--headings`}>
      <span className={`${baseClass}--primaryheading`}>{primaryHeading}</span>
      {shouldRender(secondaryHeading) && (
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
};

export default XUIContentBlockItem;

XUIContentBlockItem.propTypes = {
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
   * Gives accordion items the proper name for styling and semantics
   * @ignore
   */
  _isAccordionTrigger: PropTypes.bool,

  /**
   * Optional actions to be right aligned. Use the XUIActions component.
   */
  action: PropTypes.element,

  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Description to be placed under the heading
   */
  description: PropTypes.node,

  /**
   * Determines whether to apply bottom left and bottom right border radius on the content block item
   */
  hasBottomRadius: PropTypes.bool,

  /**
   * Determines whether to apply default layout styling or not
   */
  hasLayout: PropTypes.bool,

  /**
   * Determines whether to apply top left and top right border radius on the content block item
   */
  hasTopRadius: PropTypes.bool,

  /**
   * The `href` attribute to use on the anchor element
   */
  href: PropTypes.string,

  /**
   * Determines whether to apply hover styling on the entire content block item
   */
  isRowLink: PropTypes.bool,

  /**
   * Left most component option, typically an `avatar`, `checkbox` or `rollover checkbox` component
   */
  leftContent: PropTypes.element,

  /**
   * Callback to fire when content block item is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Callback to fire on keyDown for each content block item
   */
  onKeyDown: PropTypes.func,

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

  qaHook: PropTypes.string,

  /**
   * Secondary heading for the content block
   */
  secondaryHeading: PropTypes.node,

  /**
   * Repositions the tags in other places around the component
   */
  tagPosition: PropTypes.oneOf(['description', 'right', 'inline']),

  /**
   * Tag or other user determined node to go to right of primary heading
   */
  tags: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

XUIContentBlockItem.defaultProps = {
  _isAccordionTrigger: false,
  hasLayout: true,
  tagPosition: 'description',
};
