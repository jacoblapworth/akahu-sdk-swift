import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUICheckbox from '../../checkbox/XUICheckbox';
import { sizeShift } from '../../helpers/sizes';
import { pickitemClassName, itemTextClassName, itemBodyClassName } from './constants';

const NOOP = () => {};

/**
 * INTERNAL USE ONLY
 *
 * This presentation component is used internally in the XUI library to display the
 * contents of a multiselect Pickitem.
 *
 * @param {Object} props
 */
const PickitemMultiselect = ({
  onClick,
  onKeyDown,
  shouldTruncate,
  onMouseOver,
  onBlur,
  onFocus,
  isSelected,
  children,
  checkboxClassName,
  qaHook,
  primaryElement,
  secondaryElement,
  pinnedElement,
  rightElement,
  isDisabled,
}) => {
  const mainContent = shouldTruncate ? (
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

  const checkboxClasses = cn(
    checkboxClassName,
    shouldTruncate && `${pickitemClassName}-text-truncated`,
    `${pickitemClassName}-multiselect--checkbox`,
  );

  const labelClasses = cn(
    itemTextClassName,
    `${pickitemClassName}-multiselect--label`,
    shouldTruncate && `${pickitemClassName}-text-truncated`,
  );

  return (
    <div
      className={itemBodyClassName}
      data-automationid={qaHook}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus || onMouseOver}
      onKeyDown={onKeyDown}
      onMouseOver={onMouseOver}
      role="presentation"
    >
      <XUICheckbox
        className={checkboxClasses}
        htmlClassName={`${pickitemClassName}--input`}
        isChecked={isSelected}
        isDisabled={isDisabled}
        labelClassName={labelClasses}
        onChange={NOOP}
        qaHook={qaHook && `${qaHook}--checkbox`}
        size={sizeShift('medium', -1)}
        tabIndex={-1}
      >
        {pinnedElement}
        <span
          className={shouldTruncate ? `${pickitemClassName}-text-truncated` : ''}
          data-automationid={qaHook && `${qaHook}--label`}
        >
          {mainContent}
          {secondaryElement}
        </span>
      </XUICheckbox>
      {rightElement}
    </div>
  );
};

PickitemMultiselect.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool,
  checkboxClassName: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseOver: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  shouldTruncate: PropTypes.bool,
  qaHook: PropTypes.string,
  /** Standard text */
  primaryElement: PropTypes.node,
  /** Less important text to appear beside primary. */
  secondaryElement: PropTypes.node,
  /** Less important text to appear pinned at the right. */
  pinnedElement: PropTypes.node,
  /** Content to be added to the right of the pickitem. */
  rightElement: PropTypes.node,
  /** The disabled behaviour and styles are applied when this is true. */
  isDisabled: PropTypes.bool,
};

export default PickitemMultiselect;
