import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIDropdown from './XUIDropdown';
import XUIDropdownLayout from './XUIDropdownLayout';
import compose from '../helpers/compose';
import { baseClass, fixedWidthDropdownSizes } from './private/constants';

/**
 * <strong>BETA</strong> This component is still under active development and its API may change.
 *
 * `XUINestedDropdown` is a `XUIDropdown` replacement used when a user workflow will take place inside of the
 * dropdown.  Multiple panels are added as children and the active panel's ID is a prop on this
 * component.
 *
 * @export
 * @class XUINestedDropdown
 * @extends {XUIDropdown}
 */
export default class XUINestedDropdown extends XUIDropdown {
  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    const { currentPanelId, onPanelChange } = this.props;
    if (onPanelChange && prevProps.currentPanelId !== currentPanelId) {
      onPanelChange(currentPanelId, prevProps.currentPanelId);
    }
  }

  render() {
    const dropdown = this;
    const {
      size,
      className,
      isHidden,
      children,
      qaHook,
      style,
      onSelect,
      currentPanelId,
      fixedWidth,
      onCloseAnimationEnd,
      onOpenAnimationEnd,
      animateClosed,
      animateOpen,
      forceDesktop,
    } = dropdown.props;

    const dropdownClasses = cn(`${baseClass}-fullheight`, className);

    const childrenToRender = React.Children.map(children, child => {
      const isCurrentPanel = child.props && child.props.panelId === currentPanelId;

      return (
        <div className={isCurrentPanel ? '' : `${baseClass}-nested-is-hidden`}>
          {isCurrentPanel
            ? React.cloneElement(child, {
                ref: oc => (dropdown.panel.current = oc),
                onSelect: compose(child.props.onSelect, onSelect),
                onHighlightChange: compose(
                  child.props.onHighlightChange,
                  dropdown.onHighlightChange,
                ),
                onKeyDown: dropdown.keyDownHandler,
                ignoreKeyboardEvents: [
                  ...dropdown.props.ignoreKeyboardEvents,
                  ...child.props.ignoreKeyboardEvents,
                ],
                style: {
                  maxHeight: style && style.maxHeight,
                },
              })
            : child}
        </div>
      );
    });

    return (
      <XUIDropdownLayout
        animateClosed={animateClosed}
        animateOpen={animateOpen}
        className={dropdownClasses}
        fixedWidth={fixedWidth}
        forceDesktop={forceDesktop}
        id={dropdown.props.id}
        isHidden={isHidden}
        onCloseAnimationEnd={onCloseAnimationEnd}
        onOpenAnimationEnd={onOpenAnimationEnd}
        qaHook={qaHook}
        size={size}
        style={style}
      >
        {childrenToRender}
      </XUIDropdownLayout>
    );
  }
}

XUINestedDropdown.propTypes = {
  /** Will add the closing animation class */
  animateClosed: PropTypes.bool,

  /** Will add an opening animation class */
  animateOpen: PropTypes.bool,

  children: PropTypes.node,
  className: PropTypes.string,

  /** The `panelId` property of the panel which should currently be open */
  currentPanelId: PropTypes.string,

  /** Whether the fixed width class variant should be used for the size prop.  Does nothing if
   * no size is provided. */
  fixedWidth: PropTypes.bool,

  /** Items to be added to the menu's footer */
  footer: PropTypes.element,

  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /** Whether or not the dropdown should take focus and handle keyboard events automatically */
  hasKeyboardEvents: PropTypes.bool,

  /** DOM ID of the list */
  id: PropTypes.string,

  /** Pass in an array of KeyboardEvent keycodes to be ignored from dropdown behaviour. */
  ignoreKeyboardEvents: PropTypes.array,

  /** Whether or not the dropdown is hidden */
  isHidden: PropTypes.bool,

  /** Callback for when the closing animation has stopped. */
  onCloseAnimationEnd: PropTypes.func,

  /** Callback for when the highlighted item in the dropdown changes. */
  onHighlightChange: PropTypes.func,

  /** Callback for when animation has ended on open. */
  onOpenAnimationEnd: PropTypes.func,

  /** Callback for when the open `XUIDropdownPanel` changes. Receives the name of the selected panel,
   * and the previously selected panel. */
  onPanelChange: PropTypes.func,

  /** Enable a generalised callback when an item has been selected. */
  onSelect: PropTypes.func,

  qaHook: PropTypes.string,

  /** Applies correct XUI class based on prop value. Default will fits to children's width. */
  size: PropTypes.oneOf(Object.keys(fixedWidthDropdownSizes)),

  /** Style attribute on the dropdown node */
  style: PropTypes.object,
};

XUINestedDropdown.defaultProps = {
  animateClosed: false,
  animateOpen: false,
  fixedWidth: true,
  forceDesktop: false,
  hasKeyboardEvents: true,
  ignoreKeyboardEvents: [],
  isHidden: false,
  size: 'medium',
};
