import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  findFirstMenuItem,
  findInitialHighlightedItem,
  findPreviousItem,
  findNextItem,
  cloneChildren,
  getId,
  walk,
  isNestedListTrigger,
  findParentGroupContainer,
  isMenuItem,
  getInstanceForChild,
  isSplitMenuItem,
} from './private/helpers';
import XUIStatefulPicklistWrapper from './XUIStatefulPicklistWrapper';
import { isKeyClick, isKeyArrow, eventKeyValues } from '../helpers/reactKeyHandler';

/**
 * Manages the arrow key events, checks the event is valid and based on the current
 * highlighted element will decide which action to take next to find the next item to highlight.
 *
 * @private
 * @param {Event} event
 * @param {XUIStatefulPicklist} spl
 */
function handleArrowKeyEvents(event, spl) {
  const highlighted = spl.getHighlighted();
  const { isHorizontal } = spl.props;

  if (event.key === eventKeyValues.left) {
    const container = findParentGroupContainer(spl.list.current, highlighted);
    if (isHorizontal) {
      spl.highlightPrevious(highlighted);
    } else if (container) {
      if (isNestedListTrigger(highlighted)) {
        const containerInstance = getInstanceForChild(spl.idCache, container);

        // If the nested list is open, close it
        if (containerInstance.isOpen()) {
          getInstanceForChild(spl.idCache, container).close();
        } else {
          // If the nested list is closed, check to see if the previous item is a split menu item.  If
          // it is, highlight that
          const prev = findPreviousItem(spl.list.current, highlighted, spl.idCache);
          if (isSplitMenuItem(prev)) {
            spl.highlightItem(prev);
          }
        }
      } else if (isMenuItem(highlighted)) {
        spl.highlightItem(container.props.children.find(isNestedListTrigger));
      }
    }
  } else if (event.key === eventKeyValues.up) {
    spl.highlightPrevious(highlighted);
  } else if (event.key === eventKeyValues.right) {
    if (isHorizontal) {
      spl.highlightNext(highlighted);
    } else if (isSplitMenuItem(highlighted)) {
      spl.highlightNext(highlighted);
    } else if (isNestedListTrigger(highlighted)) {
      const container = findParentGroupContainer(spl.list.current, highlighted);
      if (container) {
        getInstanceForChild(spl.idCache, container).open();
      }
    }
  } else if (event.key === eventKeyValues.down) {
    spl.highlightNext(highlighted);
  }
}

/**
 * A Picklist that keeps track of the currently highlighted menu item.  APIs exist
 * to change the highlighted item, and a keydown event handler exists to either
 * automatically handle keyboard events (down arrow selects next item, etc) or
 * simulate that if the focus is elsewhere.
 *
 * @export
 * @class XUIStatefulPicklist
 * @extends {React.element}
 */
class XUIStatefulPicklist extends Component {
  constructor(props) {
    super(props);

    const spl = this;

    spl.state = {
      highlightedElement: null,
    };
    spl.idCache = {};
    spl.onKeyDown = spl.onKeyDown.bind(spl);
    spl.selectHighlighted = spl.selectHighlighted.bind(spl);
    spl.highlightNext = spl.highlightNext.bind(spl);
    spl.highlightPrevious = spl.highlightPrevious.bind(spl);
    spl.highlightInitial = spl.highlightInitial.bind(spl);
    spl.findItemById = spl.findItemById.bind(spl);
    spl.onClick = spl.onClick.bind(spl);
    spl.onMouseOver = spl.onMouseOver.bind(spl);
    spl.list = React.createRef();
  }

  componentDidUpdate() {
    /**
     * We could be in two scenarios here. We've opened the list and no item is
     * highlighted so lets highlight it
     * OR
     * We're an inline open list and we've click on an item to force the list
     * in focus, it doesn't have a highlighted item, but we also need to check
     * there isn't a selected item at this stage too. If not, lets force the
     * first item to be our highlightedElement.
     */
    this.highlightInitial();
  }

  /**
   * Get the React virtual DOM representation of the currently highlighted element.
   *
   * @public
   * @returns {React.element}
   * @memberof XUIStatefulPicklist
   */
  getHighlighted() {
    return this.state.highlightedElement;
  }

  /**
   * Get the ID of the currently highlighted element.
   *
   * @public
   * @returns {String} null if nothing is highlighted
   * @memberof XUIStatefulPicklist
   */
  getHighlightedId() {
    return getId(this.getHighlighted());
  }

  /**
   * onClick of each item in the list we should select that item.
   *
   * @param {Event} [event]
   * @param {String} itemId id of the item
   */
  onClick(event, itemId) {
    this.selectHighlighted(this.findItemById(itemId), event.isTrusted);
  }

  /**
   * Fired when either the enter key or space bar is pressed and calls onclick of the menu item
   * before closing the list.
   *
   * @public
   * @param {React.element} item to be selected
   * @param {Boolean} isTrusted should be set to false when the event triggering the select is
   * called programatically
   */
  selectHighlighted(item, isTrusted = true) {
    const spl = this;
    const { value } = item.props;

    if (isTrusted) {
      spl.setState({
        highlightedElement: item,
      });
    }

    item.props.onSelect && item.props.onSelect(value, item);
    spl.props.onSelect && spl.props.onSelect(value, item);
  }

  /**
   * Highlights the previous item in the list.
   *
   * @public
   * @param {React.element} currentItem - Current item highlighted
   */
  highlightPrevious(currentItem) {
    const prevItem = findPreviousItem(this.list.current, currentItem, this.idCache);
    this.highlightItem(prevItem);
  }

  /**
   * Highlights the next item in the list.
   *
   * @public
   * @param {React.element} currentItem - Current item highlighted
   */
  highlightNext(currentItem) {
    const nextItem = findNextItem(this.list.current, currentItem, this.idCache);
    this.highlightItem(nextItem);
  }

  /**
   * Highlights the first item in the list.
   *
   * @public
   */
  highlightFirst() {
    const firstItem = findFirstMenuItem(this.list.current, this.idCache);
    this.highlightItem(firstItem);
  }

  /**
   * Highlights the item passed in and fires the onHighlightChange callback.
   *
   * @public
   * @param {React.element} item - Item to highlight
   * @param {Event} [event]
   */
  highlightItem(item, event) {
    const spl = this;
    spl.setState({
      highlightedElement: item,
    });

    spl.props.onHighlightChange && spl.props.onHighlightChange(item, event);
  }

  /**
   * Clears the highlighted element and fires the onHighlightChange callback.
   *
   * If shouldManageInitialHighlight is set to false, the highlighted item will be cleared.
   *
   * If shouldManageInitialHighlight is set to true (default), the first item will be highlighted.
   *
   * @public
   */
  clearHighlightedItem() {
    const spl = this;
    spl.setState({
      highlightedElement: null,
    });

    spl.props.onHighlightChange && spl.props.onHighlightChange(null);
  }

  /**
   * This API is used to ensure that something appropriate is highlighted. Here's
   * the logical ordering of operations:
   *
   * 1. If something's already highlighted, leave it alone.
   * 2. Try and highlight the first selected item.
   * 3. Highlight the first item in the list.
   *
   * If these rules don't apply to you - for example, if you're a search box - you
   * can get the shouldManageInitialHighlight prop to false
   *
   * @public
   * @memberof XUIStatefulPicklist
   */
  highlightInitial() {
    if (this.props.shouldManageInitialHighlight === false) {
      return;
    }
    const highlightedEl = this.getHighlighted();
    const canFindHighlightedEl =
      highlightedEl &&
      // eslint-disable-next-line no-prototype-builtins
      this.idCache.hasOwnProperty(highlightedEl.props.id) &&
      this.idCache[highlightedEl.props.id];
    if (!canFindHighlightedEl) {
      const firstItem = findInitialHighlightedItem(this.list.current, this.idCache);
      if (firstItem) {
        this.setState({
          highlightedElement: firstItem,
        });
      }
    }
  }

  /**
   * Find a child element by its ID. Used so we have access to the keys of that item.
   *
   * @public
   * @param {String} id of the item you want to find the instance of.
   */
  findItemById(id) {
    let foundItem = null;

    const findItem = node => {
      if (getId(node) === id) {
        foundItem = node;
        return true;
      }
      return false;
    };

    walk(this.list.current, findItem);
    return foundItem;
  }

  /**
   * Handles a keydown event and tells the list which action to take
   * next based on they key pressed.  Public API that can be used to simulate
   * keydown events if the DOM focus is elsewhere.
   *
   * @public
   * @param {KeyboardEvent} event Event
   */
  onKeyDown(event) {
    const spl = this;
    const { ignoreKeyboardEvents } = spl.props;

    if (ignoreKeyboardEvents.indexOf(event.keyCode) === -1) {
      if (isKeyClick(event)) {
        event.preventDefault();
        const el = spl.getHighlighted();
        if (el) {
          if (isNestedListTrigger(el)) {
            const container = findParentGroupContainer(spl.list.current, el);
            if (container) {
              getInstanceForChild(spl.idCache, container).toggle();
            }
          } else {
            spl.selectHighlighted(spl.findItemById(el.props.id));

            // Wait for the checkbox state to update before dispatching our custom onChange
            setTimeout(() => {
              const checkbox = getInstanceForChild(spl.idCache, el)?.checkboxRef.current?._input
                .current;

              if (!checkbox) {
                return;
              }

              /**
               * XUIStatefulPicklist doesn't trigger an onChange event when toggling the state of
               * a checkbox with the keyboard. To work around this we fire a custom event that
               * XUICheckboxRangeSelector can then listen for.
               */
              const customOnChange = new CustomEvent('xui-checkbox-onChange', {
                bubbles: true,
                detail: { isTrusted: true },
                target: checkbox,
              });
              checkbox.dispatchEvent(customOnChange);
            });
          }
        }
      } else if (isKeyArrow(event)) {
        event.preventDefault();
        handleArrowKeyEvents(event, spl);
      }
    }
  }

  /**
   * Removes any previously highlighted elements and sets the class on the next one.
   *
   * @param {MouseEvent} event
   * @param {String} itemId  id of item
   */
  onMouseOver(event, itemId) {
    const spl = this;
    const currentItem = spl.findItemById(itemId);

    if (currentItem !== spl.state.highlightedElement) {
      spl.highlightItem(currentItem, event);
    }
  }

  render() {
    const spl = this;
    const { children, qaHook, className, isFocusable, id, secondaryProps } = spl.props;

    return (
      <XUIStatefulPicklistWrapper
        {...secondaryProps}
        aria-activedescendant={spl.getHighlightedId()}
        className={className}
        data-automationid={qaHook}
        id={id}
        onKeyDown={spl.onKeyDown}
        /** TODO: Figure out why this is needed */
        onMouseDown={e => e.preventDefault()}
        ref={spl.list}
        tabIndex={isFocusable ? 0 : null}
      >
        {cloneChildren(children, spl)}
      </XUIStatefulPicklistWrapper>
    );
  }
}

XUIStatefulPicklist.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /** ID of the list */
  id: PropTypes.string,

  /** AN array of keydown keycodes to be ignored from dropdown behaviour. */
  ignoreKeyboardEvents: PropTypes.array,

  /** Whether or not the user should be allowed to tab to this component */
  isFocusable: PropTypes.bool,

  /** Whether to use left/right arrow keys to move between pickitems as opposed to up/down */
  isHorizontal: PropTypes.bool,

  /** Callback when the highlighted element has changed. */
  onHighlightChange: PropTypes.func,

  /** Enables a generalised callback when an item has been selected. */
  onSelect: PropTypes.func,

  qaHook: PropTypes.string,

  /** An object of props that can be spread on the stateful picklist, useful for aria attributes. */
  secondaryProps: PropTypes.object,

  /** Whether the StatefulPicklist manages highlighting of list elements */
  shouldManageInitialHighlight: PropTypes.bool,
};

XUIStatefulPicklist.defaultProps = {
  ignoreKeyboardEvents: [],
  isFocusable: false,
  shouldManageInitialHighlight: true,
};

export { XUIStatefulPicklist as default, findPreviousItem, findNextItem };
