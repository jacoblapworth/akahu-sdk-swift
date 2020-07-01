import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { baseClass, maxWidthDropdownSizes, fixedWidthDropdownSizes } from './private/constants';

/**
 * Presentational component that ensures the contents of a dropdown are rendered with the
 * correct CSS classes.  This component is also what adds the mask to the DOM when going into
 * narrow viewport.
 *
 * @function XUIDropDownLayout
 */
const XUIDropDownLayout = ({
  animateClosed = false,
  animateOpen = false,
  onOpenAnimationEnd,
  onCloseAnimationEnd,
  children,
  className,
  fixedWidth = false,
  forceDesktop = false,
  id,
  isHidden = false,
  style,
  size,
  qaHook,
  ariaRole,
}) => {
  const onAnimationEnd = event => {
    if (
      animateOpen &&
      onOpenAnimationEnd != null &&
      event.animationName === `${baseClass}-mobile-show`
    ) {
      onOpenAnimationEnd(event);
    }
    if (
      animateClosed &&
      onCloseAnimationEnd != null &&
      event.animationName === `${baseClass}-mobile-hide`
    ) {
      onCloseAnimationEnd(event);
    }
  };

  const dropdownSizes = fixedWidth ? fixedWidthDropdownSizes : maxWidthDropdownSizes;
  const sizeClass = size ? dropdownSizes[size] : null;
  const classNames = cn(
    `${baseClass}-layout`,
    sizeClass,
    className,
    !isHidden && `${baseClass}-is-open`,
    animateClosed && `${baseClass}-is-closing`,
    animateOpen && `${baseClass}-is-opening`,
    forceDesktop && `${baseClass}-force-desktop`,
  );

  return (
    <div
      className={classNames}
      data-automationid={qaHook}
      id={id}
      onAnimationEnd={onAnimationEnd}
      role={ariaRole}
      style={style}
    >
      <div className={`${baseClass}--mask`} data-automationid={qaHook && `${qaHook}--mask`} />
      {children}
    </div>
  );
};

XUIDropDownLayout.propTypes = {
  id: PropTypes.string,

  /** Whether or not the list box is hidden. */
  isHidden: PropTypes.bool,

  /** Callback for when animation has ended on open. */
  onOpenAnimationEnd: PropTypes.func,

  /** Callback for when animation has ended on close. */
  onCloseAnimationEnd: PropTypes.func,

  /** Will add the closing animation class */
  animateClosed: PropTypes.bool,

  /** Will add an opening animation class */
  animateOpen: PropTypes.bool,

  className: PropTypes.string,

  /** Applies the correct XUI class based on the chosen size. Default will
   * fit to children's width. */
  size: PropTypes.oneOf(Object.keys(fixedWidthDropdownSizes)),

  /** Whether the fixed width class variant should be used for the size prop.
   * Does nothing without the size prop. */
  fixedWidth: PropTypes.bool,

  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  style: PropTypes.object,

  children: PropTypes.node.isRequired,
  qaHook: PropTypes.string,
  /**
   * Aria role for dropdown layout
   */
  ariaRole: PropTypes.string,
};

export default React.memo(XUIDropDownLayout);
