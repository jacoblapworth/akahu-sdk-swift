import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import cn from 'classnames';
import XUIDropdownLayout from './XUIDropdownLayout';
// eslint-disable-next-line import/no-cycle
import XUIDropdownPanel from './XUIDropdownPanel';
import { lockScroll, unlockScroll, isScrollLocked } from '../helpers/lockScroll';
import { ns } from '../helpers/xuiClassNamespace';
import { fixedWidthDropdownSizes } from './private/constants';
import { openedModals } from '../helpers/modalManager';

/**
 * Wrapper for all content which will go inside of a dropdown. It ensures the correct
 * presentational components are used to output content, scrolling is managed properly,
 * and keyboard events are handled properly for the picklist use case. An instance of
 * this should be passed to the `XUIDropdownToggled`'s dropdown prop.
 *
 * @export
 * @class XUIDropdown
 * @extends {PureComponent}
 */
export default class XUIDropdown extends PureComponent {
  panel = React.createRef();

  componentDidMount() {
    const { isHidden, restrictFocus } = this.props;
    if (!isHidden && restrictFocus) {
      window.addEventListener('focus', this._restrictFocus, true);
    }
  }

  componentDidUpdate(prevProps) {
    const { isHidden, hasKeyboardEvents, restrictFocus } = this.props;

    this.memoizedComponentDidUpdate(
      isHidden,
      hasKeyboardEvents,
      restrictFocus,
      prevProps.isHidden,
      prevProps.restrictFocus,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this._restrictFocus, true);
    isScrollLocked && this.unlockScroll();
  }

  memoizedComponentDidUpdate = memoizeOne(
    (isHidden, hasKeyboardEvents, restrictFocus, prevIsHidden, prevRestrictFocus) => {
      const currentPanel = this.panel.current;

      if (!isHidden) {
        if (hasKeyboardEvents && currentPanel && !currentPanel.hasFocus()) {
          currentPanel.focus();
        }
        const id = currentPanel && currentPanel.getHighlightedId();
        if (id) {
          currentPanel.scrollIdIntoView(id);
        }
      }
      if (isHidden !== prevIsHidden || restrictFocus !== prevRestrictFocus) {
        window.removeEventListener('focus', this._restrictFocus, true);
        if (!isHidden && restrictFocus) {
          window.addEventListener('focus', this._restrictFocus, true);
        }
      }
    },
  );

  /**
   * Keydown handler for the dropdown.  If `hasKeyboardEvents` is true, then this component will
   * automatically handle list navigation keyboard events because the root node will have
   * focus.  However, if you want to keep the focus on the trigger by setting `hasKeyboardEvents`
   * to false, you need to manually call this method if you want arrow key handlers to actually
   * navigate the list for users.  A heuristic is applied, so the only time you shouldn't call this
   * on trigger keydown is when you know for a fact that you don't want a default action to happen
   * (e.g. Down arrow should not open the list).  It doesn't hurt to call this for keyboard events
   * that the component doesn't actually do anything with.
   *
   * @public
   * @param {KeyboardEvent} event
   * @memberof XUIDropdown
   */
  onKeyDown = event => {
    if (this.panel.current != null) {
      this.panel.current.onKeyDown(event);
    }
  };

  keyDownHandler = event => {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }
  };

  // TODO: Extract this into a separate consumable when we figure out how to do tab key management
  /**
   * @private
   * @param {Object} event - A focus change event which is set to be listened to by the window
   * Limits the focusable elements to those within the dropdown
   * */
  _restrictFocus = event => {
    const currentPanel = this.panel.current;
    if (currentPanel != null && currentPanel.rootNode.current != null) {
      const { rootNode } = currentPanel;
      const targetIsWindow = event.target === window;
      if (targetIsWindow || !rootNode.current.contains(event.target)) {
        event.stopPropagation();
        rootNode.current.focus();
      }
    }
  };

  onHighlightChange = item => {
    if (item != null && this.panel.current) {
      const { onHighlightChange } = this.props;
      this.panel.current.scrollIdIntoView(item.props.id);
      onHighlightChange && onHighlightChange(item);
    }
  };

  /**
   * Highlight a specific React element in the dropdown list.
   *
   * @public
   * @param {Component} item
   * @param {UIEvent} event
   * @memberof XUIDropdown
   */
  highlightItem = (item, event) => {
    this.panel.current.highlightItem(item, event);
  };

  /**
   * Get the React virtual DOM representation of the currently highlighted element.
   *
   * @public
   * @returns {React.element} null if nothing is highlighted
   * @memberof XUIDropdown
   */
  getHighlighted = () => (this.panel.current !== null ? this.panel.current.getHighlighted() : null);

  /**
   * Get the ID of the currently highlighted item.
   *
   * @public
   * @returns {String} null if nothing is highlighted
   * @memberof XUIDropdown
   */
  getHighlightedId = () =>
    this.panel.current !== null ? this.panel.current.getHighlightedId() : null;

  /**
   * Select the currently-highlighted list item.
   *
   * @public
   * @memberof XUIDropdown
   */
  selectHighlighted = () => {
    this.panel.current.selectHighlighted();
  };

  /**
   * Used to highlight an item immediately after a dropdown opens.
   *
   * @public
   * @memberof XUIDropdown
   */
  highlightInitial = () => {
    const currentPanel = this.panel.current;
    if (currentPanel != null) {
      currentPanel.highlightInitial();
      const highlightedId = currentPanel.getHighlightedId();
      if (highlightedId != null) {
        currentPanel.scrollIdIntoView(highlightedId);
      }
    }
  };

  /**
   * Used to programmatically highlight the first item.
   *
   * @public
   * @memberof XUIDropdown
   */
  highlightFirstItem = () => {
    if (this.panel.current != null) {
      this.panel.current.highlightFirstItem();
    }
  };

  /**
   * Used to programmatically clear the highlighted item.
   *
   * If shouldManageInitialHighlight is set to false, the highlighted item will be cleared.
   *
   * If shouldManageInitialHighlight is set to true (default), the first item will be highlighted.
   *
   * @public
   * @memberof XUIDropdown
   */
  clearHighlightedItem = () => {
    if (this.panel.current != null) {
      this.panel.current.clearHighlightedItem();
    }
  };

  unlockScroll = () => {
    // If it's inside a modal, should not unlock
    if (!openedModals?.length) {
      unlockScroll();
    }
  };

  lockScroll = () => {
    lockScroll();
  };

  render() {
    const {
      size,
      footer,
      className,
      isHidden,
      children,
      qaHook,
      onSelect,
      ignoreKeyboardEvents,
      style,
      header,
      fixedWidth,
      onCloseAnimationEnd,
      onOpenAnimationEnd,
      animateClosed,
      animateOpen,
      forceDesktop,
      forceStatefulPicklist,
      bodyClassName,
      shouldManageInitialHighlight,
      ariaRole,
    } = this.props;

    const dropdownClasses = cn(className, header && `${ns}-dropdown-fullheight`);

    return (
      <XUIDropdownLayout
        animateClosed={animateClosed}
        animateOpen={animateOpen}
        ariaRole={ariaRole}
        className={dropdownClasses}
        fixedWidth={fixedWidth}
        forceDesktop={forceDesktop}
        id={this.props.id} // This will be generated, if necessary, at a higher level
        isHidden={isHidden}
        onCloseAnimationEnd={onCloseAnimationEnd}
        onOpenAnimationEnd={onOpenAnimationEnd}
        qaHook={qaHook && `${qaHook}--layout`}
        size={size}
        style={style}
      >
        <XUIDropdownPanel
          bodyClassName={bodyClassName}
          footer={footer}
          forceStatefulPicklist={forceStatefulPicklist}
          header={header}
          ignoreKeyboardEvents={ignoreKeyboardEvents}
          onHighlightChange={this.onHighlightChange}
          onKeyDown={this.keyDownHandler}
          onSelect={onSelect}
          qaHook={qaHook}
          ref={this.panel}
          shouldManageInitialHighlight={shouldManageInitialHighlight}
          style={{
            maxHeight: style && style.maxHeight,
          }}
        >
          {children}
        </XUIDropdownPanel>
      </XUIDropdownLayout>
    );
  }
}

XUIDropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /** Inline styles to apply to this component's root node. */
  style: PropTypes.object,

  /** Whether or not this component is hidden. */
  isHidden: PropTypes.bool,

  /** Applies the correct XUI class based on the chosen size. Default will
   * fit to children's width. */
  size: PropTypes.oneOf(Object.keys(fixedWidthDropdownSizes)),

  /** An array of keydown keycodes to be ignored from dropdown behaviour. */
  ignoreKeyboardEvents: PropTypes.array,

  /** DOM ID of the list */
  id: PropTypes.string,

  /** The header element. */
  header: PropTypes.element,

  /** Items to be added to the menu's footer. */
  footer: PropTypes.element,

  /** A generalised callback when an item has been selected. */
  onSelect: PropTypes.func,

  /** Whether or not the dropdown should take focus and handle keyboard events automatically */
  hasKeyboardEvents: PropTypes.bool,

  /** Callback for adding additional onKeyPress functionality */
  onKeyDown: PropTypes.func,

  /** Whether focus should be restricted to the dropdown while it's open. */
  restrictFocus: PropTypes.bool,

  /** Callback for when the highlighted item in the dropdown changes. */
  onHighlightChange: PropTypes.func,

  /** Will cause the dropdown to animate when closing. */
  animateClosed: PropTypes.bool,

  /** Will cause the dropdown to animate when opening. */
  animateOpen: PropTypes.bool,

  /** Callback for when the animation that closes the dropdown ends. */
  onCloseAnimationEnd: PropTypes.func,

  /** Callback for when animation has ended on open. */
  onOpenAnimationEnd: PropTypes.func,

  /** Whether the fixed width class variant should be used for the size prop */
  fixedWidth: PropTypes.bool,

  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /** Force wrapping `XUIDropdownPanel` children in a `XUIStatefulPicklist` */
  forceStatefulPicklist: PropTypes.bool,

  /** Class to apply to the body element of the dropdown */
  bodyClassName: PropTypes.string,

  /** Whether the stateful picklist manages highlighting of list elements */
  shouldManageInitialHighlight: PropTypes.bool,

  /**
   * Aria role for dropdown layout element
   */
  ariaRole: PropTypes.string,
};

XUIDropdown.defaultProps = {
  fixedWidth: false,
  forceDesktop: false,
  forceStatefulPicklist: false,
  hasKeyboardEvents: true,
  ignoreKeyboardEvents: [],
  isHidden: false,
  restrictFocus: true,
  shouldManageInitialHighlight: true,
};
