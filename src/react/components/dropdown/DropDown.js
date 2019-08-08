import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import DropDownLayout from './DropDownLayout';
import DropDownPanel from './DropDownPanel';
import { lockScroll, unlockScroll } from '../helpers/lockScroll';
import { ns } from '../helpers/xuiClassNamespace';
import { fixedWidthDropdownSizes } from './private/constants';

/**
 * Wrapper for all content which will go inside of a dropdown.  It ensures the correct
 * presentational components are used to output content, scrolling is managed properly,
 * and keyboard events are handled properly for the Picklist use case.  An instance of
 * this should be passed to the DropDownToggled's dropdown prop.
 *
 * @export
 * @class DropDown
 * @extends {PureComponent}
 */
export default class DropDown extends PureComponent {
  panel = React.createRef();

  componentDidMount() {
    const { isHidden, restrictFocus } = this.props;
    if (!isHidden && restrictFocus) {
      window.addEventListener('focus', this._restrictFocus, true);
    }
  }

  componentDidUpdate(prevProps) {
    const dropdown = this;
    const currentPanel = dropdown.panel.current;
    const { isHidden, hasKeyboardEvents, restrictFocus } = dropdown.props;
    if (!isHidden) {
      if (hasKeyboardEvents && currentPanel && !currentPanel.hasFocus()) {
        currentPanel.focus();
      }
      const id = currentPanel && currentPanel.getHighlightedId();
      if (id) {
        currentPanel.scrollIdIntoView(id);
      }
    }
    if (isHidden !== prevProps.isHidden || restrictFocus !== prevProps.restrictFocus) {
      window.removeEventListener('focus', this._restrictFocus, true);
      if (!isHidden && restrictFocus) {
        window.addEventListener('focus', this._restrictFocus, true);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this._restrictFocus, true);
  }

  /**
   * Keydown handler for the DropDown.  If `hasKeyboardEvents` is true, then this component will
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
   * @memberof DropDown
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
   * Highlight a specific React element in the DropDown list.
   *
   * @public
   * @param {Component} item
   * @param {UIEvent} event
   * @memberof DropDown
   */
  highlightItem = (item, event) => {
    this.panel.current.highlightItem(item, event);
  };

  /**
   * Select the currently-highlighted list item.
   *
   * @public
   * @memberof DropDown
   */
  selectHighlighted = () => {
    this.panel.current.selectHighlighted();
  };

  /**
   * Used to highlight an item immediately after a dropdown opens.
   *
   * @public
   * @memberof DropDownPanel
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

  highlightFirstItem = () => {
    if (this.panel.current != null) {
      this.panel.current.highlightFirstItem();
    }
  };

  unlockScroll = () => {
    unlockScroll();
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
      <DropDownLayout
        animateClosed={animateClosed}
        animateOpen={animateOpen}
        className={dropdownClasses}
        fixedWidth={fixedWidth}
        forceDesktop={forceDesktop}
        id={this.props.id} // This will be generated, if necessary, at a higher level
        isHidden={isHidden}
        onCloseAnimationEnd={onCloseAnimationEnd}
        onOpenAnimationEnd={onOpenAnimationEnd}
        size={size}
        style={style}
        qaHook={qaHook && `${qaHook}--layout`}
        ariaRole={ariaRole}
      >
        <DropDownPanel
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
          bodyClassName={bodyClassName}
        >
          {children}
        </DropDownPanel>
      </DropDownLayout>
    );
  }
}

DropDown.propTypes = {
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

  /** Force wrapping Panel children in a StatefulPicklist  */
  forceStatefulPicklist: PropTypes.bool,

  /** Class to apply to the body element of the dropdown */
  bodyClassName: PropTypes.string,

  /** Whether the StatefulPicklist manages highlighting of list elements */
  shouldManageInitialHighlight: PropTypes.bool,

  /**
   * Aria role for dropdown layout element
   */
  ariaRole: PropTypes.string,
};

DropDown.defaultProps = {
  fixedWidth: false,
  forceDesktop: false,
  forceStatefulPicklist: false,
  hasKeyboardEvents: true,
  ignoreKeyboardEvents: [],
  isHidden: false,
  restrictFocus: true,
  shouldManageInitialHighlight: true,
};
