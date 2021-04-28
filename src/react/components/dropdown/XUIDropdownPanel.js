import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import compose from '../helpers/compose';
// eslint-disable-next-line import/no-cycle
import XUIPicklist from '../picklist/XUIPicklist';
import XUIStatefulPicklist from '../picklist/XUIStatefulPicklist';
import { baseClass, maxWidthDropdownSizes } from './private/constants';
import {
  isVisible,
  intervalRunner,
  scrollTopPosition,
  checkIsNarrowViewport,
} from './private/helpers';
import { ns } from '../helpers/xuiClassNamespace';

/**
 * Utilize the intervalRunner to execute a callback when the list box and its children
 * become visible to the user.
 *
 * @private
 * @param {XUIDropdownPanel} panel
 * @param {Function} callback
 */
function whenVisible(panel, callback) {
  intervalRunner(() => isVisible(panel.rootNode.current), callback);
}

/**
 * Presentational component that ensures the contents of a dropdown are rendered with the
 * correct CSS classes.  This component is also what adds the mask to the DOM when going into
 * narrow viewport.
 *
 * @class XUIDropdownPanel
 * @extends {PureComponent}
 */
class XUIDropdownPanel extends PureComponent {
  rootNode = React.createRef();

  list = React.createRef();

  _scrollableContent = React.createRef();

  /**
   * When -webkit-overflow-scrolling: touch is set in iOS, scrolling elements inside of a fixed
   * position div have a decent (aka > 75%) chance of simply not updating when clicking on a
   * checkbox after scrolling the content.  However, divs without this property don't have this
   * problem.  I experimented with some CSS solutions, but didn't find anything that helped.
   * That's why I've gone with this approach.  It's simple, -webkit-overflow-scrolling: touch
   * causes the problem, so get rid of it while DOM updates happen, then add it back.
   *
   * I've added some simple safety checks to prevent JS errors and prevent this code from running
   * in non-iOS browsers.  After all, creating a timer does actually affect performance...
   *
   * @author dev-johnsanders
   *
   * @memberof XUIDropdownPanel
   */
  iOSHack = () => {
    const content = this._scrollableContent.current;
    if (
      content != null &&
      Object.prototype.hasOwnProperty.call(content.style, 'webkitOverflowScrolling') &&
      navigator != null &&
      navigator.userAgent.indexOf('Edge/') === -1
    ) {
      content.style.webkitOverflowScrolling = 'auto';
      // This timeout is cleared in componentWillUnmount to prevent errors.
      this._iosHackTimeout = setTimeout(() => {
        content.style.webkitOverflowScrolling = '';
      }, 600);
    }
  };

  /**
   * Attempts to focus this element. If the element either doesn't exist yet or is set to
   * "visibility: isHidden", the component will try to focus the element again several times
   * over five seconds. If it still can't after that component will try to focus the element
   * again several times over a half second. If it still can't after that amount of time,
   * then it'll stop trying. This is to ensure that the dropdown can set focus on this panel
   * while the dropdown is going from isHidden to visible. An intermediate stage where the
   * panel's parent is set to "visibility: isHidden" is necessary to ensure that accurate
   * measurements of the DOM nodes can take place and the dropdown can be properly positioned.
   * This will basically attempt to wait that process out and set focus after everything is done.
   *
   * @public
   */
  focus() {
    whenVisible(this, () => this.rootNode.current.focus());
  }

  /**
   * Removes the iOS hack timeout to prevent errors
   */
  componentWillUnmount() {
    if (this._iosHackTimeout) {
      clearTimeout(this._iosHackTimeout);
    }
  }

  /**
   * Public API that can be used to simulate a keydown event on the panel. Useful
   * if you want to allow keyboard navigation of a child picklist while keeping
   * the focus elsewhere in the DOM.
   *
   * @public
   * @param {KeyboardEvent} event
   * @memberof XUIDropdownPanel
   */
  onKeyDown(event) {
    if (this.list.current != null) {
      this.list.current.onKeyDown(event);
    }
  }

  keyDownHandler = event => {
    if (this.list.current != null) {
      const header = this.rootNode.current.querySelector(`.${ns}-dropdown--header`);
      const footer = this.rootNode.current.querySelector(`.${ns}-dropdown--footer`);
      if (
        (header == null || !header.contains(document.activeElement)) &&
        (footer == null || !footer.contains(document.activeElement))
      ) {
        this.list.current.onKeyDown(event);
      }
    }
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }
  };

  /**
   * Get the React virtual DOM representation of the currently highlighted element in the child `XUIStatefulPicklist` (if applicable).
   *
   * @public
   * @returns {React.element} null if nothing is highlighted or no child `XUIStatefulPicklist` exists
   * @memberof XUIDropdownPanel
   */
  getHighlighted = () => (this.list.current !== null ? this.list.current.getHighlighted() : null);

  /**
   * Get the ID of the currently highlighted item in the child `XUIStatefulPicklist` (if applicable).
   *
   * @public
   * @returns {String} null if nothing is highlighted or no child `XUIStatefulPicklist` exists
   * @memberof XUIDropdownPanel
   */
  getHighlightedId = () =>
    this.list.current !== null ? this.list.current.getHighlightedId() : null;

  /**
   * Selects the highlighted list item, in the child `XUIStatefulPicklist` (if applicable).
   *
   * @public
   * @memberof XUIDropdownPanel
   */
  selectHighlighted() {
    this.list.current != null &&
      this.list.current.selectHighlighted(this.list.current.getHighlighted());
  }

  /**
   * Highlight a specific item in the child `XUIStatefulPicklist` (if applicable).
   *
   * @public
   * @param {React.element} item
   * @param {UIEvent} event
   * @memberof XUIDropdownPanel
   */
  highlightItem(item, event) {
    this.list.current != null && this.list.current.highlightItem(item, event);
  }

  /**
   * Used to highlight an item immediately after a dropdown opens.
   *
   * @public
   * @memberof XUIDropdownPanel
   */
  highlightInitial() {
    if (this.list.current != null) {
      this.list.current.highlightInitial();
    }
  }

  /**
   * Used to programmatically highlight the first item.
   *
   * @public
   * @memberof XUIDropdownPanel
   */
  highlightFirstItem = () => {
    if (this.list.current != null) {
      this.list.current.highlightFirst();
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
   * @memberof XUIDropdownPanel
   */
  clearHighlightedItem = () => {
    if (this.list.current != null) {
      this.list.current.clearHighlightedItem();
    }
  };

  /**
   * Find the child DOM node with given ID and adjust the list box's scroll position to
   * ensure that it's in view.
   *
   * @public
   * @param {String} id
   */
  scrollIdIntoView(id) {
    whenVisible(this, () => {
      const element = document.getElementById(id);
      // Don't try to scroll into view unless the ID is not of something not in the
      // scrollable div is passed
      const content = this._scrollableContent.current;
      if (element != null && content != null && content.contains(element)) {
        const newScrollTop = scrollTopPosition(element, content);
        // If you don't do this inside a setTimeout 0, it won't happen.  Not sure why
        // yet...
        setTimeout(() => {
          if (content) {
            content.scrollTop = newScrollTop;
          }
        }, 0);
      }
    });
  }

  /**
   * Determine if the currently focused DOM node is a child of this component.
   *
   * @public
   * @returns {Boolean}
   * @memberof XUIDropdownPanel
   */
  hasFocus() {
    return this.rootNode && this.rootNode.current.contains(document.activeElement);
  }

  containsPicklist() {
    const { children } = this.props;
    const checkType = child => child && child.type === XUIPicklist;
    return children != null && React.Children.map(children, checkType).some(Boolean);
  }

  render() {
    const {
      allowNarrowViewportAutoHeight,
      children,
      footer,
      forceStatefulPicklist,
      header,
      ignoreKeyboardEvents,
      isHidden,
      onHighlightChange,
      onScroll,
      onSelect,
      panelId,
      panelRef,
      qaHook,
      style,
      bodyClassName,
      shouldManageInitialHighlight,
    } = this.props;

    const bodyStyle = {
      maxHeight: style?.maxHeight,
    };

    if (checkIsNarrowViewport()) {
      bodyStyle.maxHeight = !header ? '80vh' : '100vh';

      if (allowNarrowViewportAutoHeight) {
        bodyStyle.height = 'auto';
      }
    }

    const shouldAddStatefulPicklist = forceStatefulPicklist || this.containsPicklist();
    const scrollableContainerClasses = `${baseClass}--scrollable-container`;

    const newChildren = React.Children.map(
      children,
      child =>
        child &&
        React.cloneElement(
          child,
          child.type === XUIPicklist && {
            secondaryProps: { role: child.props?.secondaryProps?.role || 'listbox' },
          },
        ),
    );

    return (
      // The <div> element is being used to capture bubbled events from child elements
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        aria-hidden={isHidden}
        className={`${baseClass}--panel`}
        data-automationid={qaHook}
        id={panelId}
        onKeyDown={this.keyDownHandler}
        ref={compose(panelRef, i => (this.rootNode.current = i))}
        style={style}
        tabIndex={-1}
      >
        <div
          className={cn(`${baseClass}--body`, bodyClassName)}
          data-automationid={qaHook && `${qaHook}--body`}
          onMouseUp={this.iOSHack}
          role="presentation"
          style={bodyStyle}
        >
          {header}
          {shouldAddStatefulPicklist ? (
            <>
              <XUIStatefulPicklist
                className={scrollableContainerClasses}
                ignoreKeyboardEvents={ignoreKeyboardEvents}
                onHighlightChange={onHighlightChange}
                onSelect={onSelect}
                qaHook={qaHook && `${qaHook}--scrollable-container`}
                ref={this.list}
                shouldManageInitialHighlight={shouldManageInitialHighlight}
              >
                <div
                  className={`${baseClass}--scrollable-content`}
                  data-automationid={qaHook && `${qaHook}--scrollable-content`}
                  onScroll={onScroll}
                  ref={this._scrollableContent}
                >
                  {newChildren}
                </div>
              </XUIStatefulPicklist>
              {footer}
            </>
          ) : (
            <div
              className={scrollableContainerClasses}
              data-automationid={qaHook && `${qaHook}--scrollable-container`}
            >
              <div
                className={`${baseClass}--scrollable-content`}
                data-automationid={qaHook && `${qaHook}--scrollable-content`}
                onScroll={onScroll}
                ref={this._scrollableContent}
              >
                {newChildren}
              </div>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
}

XUIDropdownPanel.propTypes = {
  /**
   * @ignore
   * Internal use only. Allows options in a dropdown panel to take least amount of height needed, when viewed on a narrow screen.
   * */
  allowNarrowViewportAutoHeight: PropTypes.bool,

  /** Class name to apply to the body element */
  bodyClassName: PropTypes.string,

  children: PropTypes.node,

  /** Items to be added to the menu's footer. */
  footer: PropTypes.element,

  /** Force wrapping Panel children in a `XUIStatefulPicklist` */
  forceStatefulPicklist: PropTypes.bool,

  /** Items to be added to the menu's header. */
  header: PropTypes.element,

  /** An array of keydown keycodes to be ignored from dropdown behaviour. */
  ignoreKeyboardEvents: PropTypes.array,

  /** Whether or not this component is hidden. */
  isHidden: PropTypes.bool,

  /** Callback for when the highlighted item in the dropdown changes. */
  onHighlightChange: PropTypes.func,

  /** keydown event handler */
  onKeyDown: PropTypes.func,

  /** Callback for adding additional onScroll functionality. */
  onScroll: PropTypes.func,

  /** A generalised callback when an item has been selected. */
  onSelect: PropTypes.func,

  /** Used by `XUINestedDropdown` to identify each panel. */
  panelId: PropTypes.string,

  /** Sets a ref for the input element */
  panelRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  qaHook: PropTypes.string,

  /** Whether the `XUIStatefulPicklist` manages highlighting of list elements */
  shouldManageInitialHighlight: PropTypes.bool,

  /** Inline CSS styles to add to the root DOM node of this component. */
  style: PropTypes.object,
};

XUIDropdownPanel.defaultProps = {
  forceStatefulPicklist: false,
  ignoreKeyboardEvents: [],
  isHidden: false,
  shouldManageInitialHighlight: true,
};

export { XUIDropdownPanel as default, maxWidthDropdownSizes as dropdownSizes };
