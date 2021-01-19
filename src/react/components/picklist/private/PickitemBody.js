import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import caret from '@xero/xui-icon/icons/caret';
import { pickitemClassName, itemBodyClassName, itemTextClassName } from './constants';
import XUIIcon from '../../icon/XUIIcon';

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
    className: cn(itemBodyClassName, showButtonCaret && `${itemBodyClassName}-has-icon`),
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
      <>
        {primaryElement}
        {children}
      </>
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
      {showButtonCaret && (
        <XUIIcon className={`${pickitemClassName}--caret`} icon={caret} isBoxed />
      )}
    </Tag>
  );
};

PickitemBody.propTypes = {
  checkboxClassName: PropTypes.string,
  children: PropTypes.node,
  headingElement: PropTypes.node,
  href: PropTypes.string,
  /** Content to be added to the left of the pickitem. */
  leftElement: PropTypes.node,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseOver: PropTypes.func,
  /** Less important text to appear pinned at the right. */
  pinnedElement: PropTypes.node,
  /** Standard text */
  primaryElement: PropTypes.node,
  qaHook: PropTypes.string,
  /** Content to be added to the right of the pickitem. */
  rightElement: PropTypes.node,
  /** Less important text to appear beside primary. */
  secondaryElement: PropTypes.node,
  shouldTruncate: PropTypes.bool,
  /** Show button caret. Used in `TabDropdown` */
  showButtonCaret: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  target: PropTypes.string,
};

export default PickitemBody;
