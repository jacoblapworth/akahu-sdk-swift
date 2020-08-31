import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { pickitemClassName, itemBodyClassName, itemTextClassName } from './constants';
import { XUIButtonCaret } from '../../../button';

/**
 * INTERNAL USE ONLY
 *
 * This presentation component is used internally in the XUI library to display the
 * contents of a Pickitem, when not multiselect.
 *
 * @param {Object} props
 */
const PickitemBody = ({
  onClick,
  onKeyDown,
  shouldTruncate,
  onMouseOver,
  onBlur,
  onFocus,
  href,
  children,
  target,
  qaHook,
  tabIndex,
  primaryElement,
  secondaryElement,
  pinnedElement,
  leftElement,
  rightElement,
  headingElement,
  showButtonCaret,
}) => {
  const rel = target ? 'noopener noreferrer' : null;
  const childProps = {
    className: itemBodyClassName,
    onClick,
    onKeyDown,
    onMouseOver,
    onBlur,
    onFocus,
    rel,
    tabIndex,
  };

  const textClassName = cn(
    itemTextClassName,
    shouldTruncate && `${pickitemClassName}-text-truncated`,
  );

  const Tag = href ? 'a' : 'button';
  const elementSettings = href ? { ...{ href, target } } : { type: 'button' };

  const mainContent =
    (children || primaryElement) && shouldTruncate ? (
      <span className={`${pickitemClassName}-text-truncated`}>
        {primaryElement}
        {children}
      </span>
    ) : (
      <Fragment>
        {primaryElement}
        {children}
      </Fragment>
    );

  return (
    <Tag {...elementSettings} data-automationid={qaHook} {...childProps}>
      {leftElement}
      <span className={textClassName}>
        {headingElement}
        {mainContent}
        {secondaryElement}
      </span>
      {pinnedElement}
      {rightElement}
      {showButtonCaret && <XUIButtonCaret />}
    </Tag>
  );
};

PickitemBody.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  checkboxClassName: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseOver: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  target: PropTypes.string,
  shouldTruncate: PropTypes.bool,
  qaHook: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Standard text */
  primaryElement: PropTypes.node,
  /** Less important text to appear beside primary. */
  secondaryElement: PropTypes.node,
  /** Less important text to appear pinned at the right. */
  pinnedElement: PropTypes.node,
  /** Content to be added to the left of the pickitem. */
  leftElement: PropTypes.node,
  /** Content to be added to the right of the pickitem. */
  rightElement: PropTypes.node,
  headingElement: PropTypes.node,
  /** Show button caret. Used in TabDropDown */
  showButtonCaret: PropTypes.bool,
};

export default PickitemBody;
