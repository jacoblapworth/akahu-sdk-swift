import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import verge from 'verge';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import PositioningInline from '../positioning/PositioningInline';
import Positioning from '../positioning/Positioning';
import {
  addEventListeners,
  checkIsNarrowViewport,
  removeEventListeners,
  throttleToFrame,
} from './private/helpers';
import compose from '../helpers/compose';
import combineRefs from '../helpers/combineRefs';
import { isKeySpacebar, eventKeyValues } from '../helpers/reactKeyHandler';
import { baseClass, dropdownPositionOptions } from './private/constants';
import DropdownContext from './contexts/DropdownContext';
import PortalFocusHelper from '../helpers/PortalFocusHelper/PortalFocusHelper';
import Element from '../helpers/polyfills/Element';

import EditableTableCellContext from '../../contexts/EditableTableCellContext';

import { lockScroll, unlockScroll, isScrollLocked } from '../helpers/lockScroll';
import isRunningInJest from '../helpers/isRunningInJest';
import getTriggerElementRef from '../helpers/getTriggerElementRef';
import { logWarning } from '../helpers/developmentConsole';

/**
 * If the given DOM node isn't on screen, scroll it into view.
 *
 * @private
 * @param {HTMLElement} node
 */
function scrollIntoViewIfNecessary(node) {
  if (!verge.inViewport(node)) {
    node.scrollIntoView();
  }
}

/**
 * Attempt to set focus onto the trigger either via native DOM APIs or
 * React component APIs (when available).
 *
 * @private
 * @param {React.Component} virtualTrigger
 * @param {HTMLElement} triggerDOM
 */
function focusTrigger(virtualTrigger, triggerDOM) {
  // if there is a focus API, use it, else set focus to the given trigger
  if (virtualTrigger && typeof virtualTrigger.focus === 'function') {
    virtualTrigger.focus();
  } else if (triggerDOM != null && typeof triggerDOM.focus === 'function') {
    triggerDOM.focus();
  }
}

/**
 * Predicate function to determine whether or not the dropdown should animate open
 * and closed based on state/props.
 *
 * @private
 * @param {XUIDropdownToggled} ddt
 * @returns {Boolean}
 */
function shouldAnimate(ddt) {
  return !ddt.props.forceDesktop && ddt.state.isNarrowViewport;
}

/**
 * Scroll locking is only useful in a narrow set of circumstances.  Determine if we should
 * do that right now.
 *
 * @private
 * @param {XUIDropdownToggled} ddt
 * @returns {Boolean}
 */
function shouldLockScroll(ddt) {
  return (
    !ddt.props.disableScrollLocking &&
    !ddt.props.forceDesktop &&
    !isScrollLocked() &&
    ddt.state.isNarrowViewport
  );
}

/**
 * HOC to wrap the passed in Dropdown & TriggerComponent elements. Adds functionality
 * to toggle the list open/closed based on click of the TriggerComponent.
 *
 * @export
 * @class XUIDropdownToggled
 * @extends {PureComponent}
 */
export default class XUIDropdownToggled extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: props.isHidden,
      isNarrowViewport: checkIsNarrowViewport(),
      isOpening: false,
      isClosing: false,
    };

    this.wrapper = React.createRef();
    this.positioning = React.createRef();
    this.trigger = React.createRef();
    this.dropdown = React.createRef();
  }

  dropdownId = this.props.dropdown?.props.id || `xui-${nanoid(10)}`;

  /**
   * If dropdown width is not limited by size prop or trigger width, max width will be calculated dynamically.
   */
  isDynamicWidth = !this.props?.dropdown?.props?.size && !this.props.matchTriggerWidth;

  /**
   * `openedDropdowns` is used to keep track of nested dropdowns that have been opened.
   *
   * Only root dropdown's `openedDropdowns` property will contain all opened child dropdowns.
   */
  openedDropdowns = [];

  /**
   * Attaches the event listeners based on state.
   * Listeners attached on keydown and click to control the open/close keyboard
   * shortcuts of the list.
   */
  componentDidMount() {
    if (!this.state.isHidden) {
      addEventListeners(this);
      this.forceUpdate();
    }

    this.onResize = debounce(this.onResize, 250);
    this.onScroll = throttleToFrame(this.repositionDropdown);

    /** @todo to remove in XUI 21 */
    const { closeOnTab, isLegacyDisplay, useNewFocusBehaviour } = this.props;
    closeOnTab &&
      logWarning({
        componentName: XUIDropdownToggled.name,
        message: '`closeOnTab` is now deprecated and will be removed in XUI 21',
      });
    !isLegacyDisplay &&
      logWarning({
        componentName: XUIDropdownToggled.name,
        message: '`isLegacyDisplay` is now deprecated and will be removed in XUI 21',
      });
    !useNewFocusBehaviour &&
      logWarning({
        componentName: XUIDropdownToggled.name,
        message: '`useNewFocusBehaviour` is now deprecated and will be removed in XUI 21',
      });
  }

  /**
   * Remove the event listeners attached in componentDidMount.
   */
  componentWillUnmount() {
    removeEventListeners(this);
  }

  /**
   * Call onOpen and onClosed callbacks based on hidden state.
   * We're doing this here as we should call these after they've actually
   * rendered open or closed, not just with the state change.
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const { onCloseAnimationEnd, disableScrollLocking, repositionOnScroll, onClose, onOpen } =
      this.props;
    const { isClosing, isHidden, shouldUnlockScroll, isNarrowViewport } = this.state;

    // Call onAnimationEnd for Jest because it is not called automatically
    if (isRunningInJest() && this.state.isClosing) {
      this.onCloseAnimationEnd();
    }

    // If an animation state has just changed, we need to fire the passed animation
    // end callback
    if (!isClosing && prevState.isClosing && onCloseAnimationEnd != null) {
      onCloseAnimationEnd();
    }

    if (!disableScrollLocking) {
      if ((isHidden || isClosing) && shouldUnlockScroll) {
        unlockScroll();
      }
      if (!isHidden) {
        if (shouldUnlockScroll && !isNarrowViewport) {
          if (prevState.isNarrowViewport) {
            unlockScroll();
          }
          scrollIntoViewIfNecessary(this.wrapper.current.firstChild);
        }
        // Checking for the wrapper confirms that component is fully mounted
        if (shouldLockScroll(this) && this.wrapper.current) {
          /* eslint-disable react/no-did-update-set-state */
          this.setState({
            shouldUnlockScroll: lockScroll(),
          });
          /* eslint-enable react/no-did-update-set-state */
        }
      }
    }

    // It's possible for this prop to change while the dropdown remains open.  Make sure
    // to handle that.
    if (!isHidden && repositionOnScroll !== prevProps.repositionOnScroll) {
      if (repositionOnScroll) {
        window.addEventListener('scroll', this.onScroll);
      } else {
        window.removeEventListener('scroll', this.onScroll);
      }
    }

    if (isHidden !== prevState.isHidden) {
      // Just closed
      if (isHidden) {
        if (!this.props.useNewFocusBehaviour) {
          const { firstChild: trigger } = this.wrapper.current;
          focusTrigger(this.trigger.current, trigger);
        }

        // Remove window event listeners for performance gains.
        removeEventListeners(this);

        // If we didn't animate close, we need to call the close animation callback
        // for API consistency between the two.  After all, the animation here is
        // just "hide".
        if (!shouldAnimate(this) && onCloseAnimationEnd != null) {
          onCloseAnimationEnd();
        }

        // onClose callback
        if (onClose != null) {
          onClose();
        }
      } else {
        // onOpen callback
        if (onOpen != null) {
          onOpen();
        }
        // Add window event listeners to make sure things still look good on browser resize
        addEventListeners(this);

        // If we are animating, add the animation class, after checking that the component is mounted
        if (shouldAnimate(this) && this.wrapper.current) {
          /* eslint-disable react/no-did-update-set-state */
          this.setState(() => ({
            isOpening: true,
          }));
          /* eslint-enable react/no-did-update-set-state */
        }
      }
    }
  }

  /**
   * Show the dropdown.
   *
   * @public
   */
  openDropdown = onOpenSetState => {
    this.setState(
      () => ({
        isHidden: false,
        isOpening: false,
        isNarrowViewport: checkIsNarrowViewport(),
      }),
      () => {
        if (onOpenSetState) {
          onOpenSetState();
        }
      },
    );
  };

  /**
   * Hide the dropdown
   *
   * @public
   */
  closeDropdown = shouldFocusTrigger => {
    this.setState(({ isHidden }) => ({
      isHidden: isHidden || !shouldAnimate(this),
      isClosing: !isHidden && shouldAnimate(this),
    }));

    if (shouldFocusTrigger) {
      const { firstChild: trigger } = this.wrapper.current;
      focusTrigger(this.trigger.current, trigger);
    }
  };

  /**
   * Determine if the dropdown is currently open.
   *
   * @public
   * @returns {Boolean}
   */
  isDropdownOpen = () => !this.state.isHidden;

  /**
   * A convenience method to toggle the visibility of the dropdown.
   *
   * @public
   */
  toggle = () => {
    this.state.isHidden ? this.openDropdown() : this.closeDropdown();
  };

  /**
   * If user clicks on the trigger, we may want to open and/or toggle the dropdown.
   *
   * @private
   * @memberof XUIDropdownToggled
   */
  triggerClickHandler = () => {
    switch (this.props.triggerClickAction) {
      case 'toggle':
        this.toggle();
        break;
      case 'open':
        this.openDropdown();
        break;
      default:
        break;
    }
  };

  /**
   * Will close the dropdown if the esc, enter, space or tab key is pressed within the dropdown.
   *
   * @param {KeyboardEvent} event key down event object
   */
  onDropdownKeyDown = event => {
    if (
      !this.state.isHidden &&
      (event.key === eventKeyValues.escape ||
        (event.key === eventKeyValues.tab &&
          this.props.closeOnTab &&
          !this.props.useNewFocusBehaviour))
    ) {
      const shouldFocusTrigger = event.key === eventKeyValues.escape;
      this.closeDropdown(shouldFocusTrigger);
    }
  };

  /**
   * Will open the list if the down arrow is pressed on keydown.
   *
   * @param {KeyboardEvent} event key down event object
   */
  onTriggerKeyDown = event => {
    if (event.key === eventKeyValues.down && this.state.isHidden) {
      this.preventDefaultIEHandler(event);
      this.openDropdown();
    } else if (
      !this.state.isHidden &&
      (event.key === eventKeyValues.escape || event.key === eventKeyValues.tab)
    ) {
      // If the user doesn't want to close when the tab key is hit, don't
      if (!event.key === eventKeyValues.tab || this.props.closeOnTab) {
        this.closeDropdown();
      }
    }
  };

  /**
   * Both spacebarKeyHandler and onTriggerKeyUp were developed to resolve a firefox accessibility
   * issue regarding the spacebar having keydown/keypress/keyup/onclick all occuring.
   * SpacebarKeyHandler ensures the right action (open/close) is occuring on the dropdown.
   * As well as ensuring that the spacebar key isn't meant to be ignored.
   * @param {KeyboardEvent} event key down event object
   */
  spacebarKeyHandler = event => {
    const { firstChild: trigger } = this.wrapper.current;

    if (
      isKeySpacebar(event) &&
      //  The space event is ignored in autocompleter
      (this.props.dropdown.props.ignoreKeyboardEvents.indexOf(32) === -1 ||
        //  Space should still be able to open the dropdown in autocompleterSecondarySeach (button as a trigger)
        event.target.contains(trigger))
    ) {
      this.preventDefaultIEHandler(event);
      if (this.state.isHidden) {
        this.openDropdown();
        return;
      }
      this.closeDropdown();
    }
  };

  onTriggerKeyUp = event => {
    if (isKeySpacebar(event) && this.state.isHidden) {
      this.preventDefaultIEHandler(event);
    }
  };

  /**
   *IE has issues with event.preventdefault and works with returnValue instead.
   *https://stackoverflow.com/questions/1000597/event-preventdefault-function-not-working-in-ie
   * @param {MouseEvent} event
   */
  preventDefaultIEHandler = event => {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false); // eslint-disable-line no-param-reassign
  };

  /**
   * Fires when the window triggers an onMouseDown event
   *
   * @param {MouseEvent} event
   */
  onMouseDown = event => {
    const { isHidden } = this.state;
    const { firstChild: trigger } = this.wrapper.current;
    const { cellRef } = this.context;

    /*
		Summary of below checks:
		 - the dropdown isn't currently hidden
		 - AND the opened dropdowns have rendered and we can match the click target to the dropdowns
		 - AND trigger has also rendered and can match with target
     - OR if the click target is the mask
    */

    const openedDropdownsDoNotContainTarget = this.openedDropdowns.every(openedDropdown => {
      const dropdown = !openedDropdown
        ? /** Where the opened dropdown is the top level dropdown */
          document.getElementById(this.dropdownId)
        : /** Where the opened dropdown are the inner dropdowns */
          openedDropdown && document.getElementById(openedDropdown.props.id);

      return dropdown == null || !dropdown.contains(event.target);
    });

    if (
      !isHidden &&
      (openedDropdownsDoNotContainTarget ||
        event.target.classList.contains(`${baseClass}--mask`)) &&
      (trigger == null || !trigger.contains(event.target)) &&
      // We consider the entire table cell to be the trigger, this check could be removed if DDT
      // allowed custom wrapping element tags and editable table used the table cell as the trigger
      !cellRef.current?.contains(event.target)
    ) {
      this.closeDropdown();
    }
  };

  /**
   * Closes the dropdown when an item is selected if `closeOnSelect` is truthy.
   */
  onSelect = () => {
    if (this.props.closeOnSelect) {
      this.closeDropdown(true);
    }
  };

  /**
   * Will fire when the animation is complete on the dropdown so we can tell the portal
   * to remove itself from the DOM.
   */
  onCloseAnimationEnd = () => {
    this.setState(() => ({
      isClosing: false,
      isHidden: true,
    }));
  };

  /**
   * When the opening animation finishes, we need to remove the class that causes it
   * to prevent a change in the child DOM nodes from causing another animation.
   *
   * @memberof XUIDropdownToggled
   */
  onOpenAnimationEnd = () => {
    this.setState(() => ({
      isOpening: false,
    }));

    // Tell the dropdown to ensure that an element is highlighted, if appropriate
    this.dropdown.current.highlightInitial();
    if (this.props.onOpenAnimationEnd != null) {
      this.props.onOpenAnimationEnd();
    }
  };

  /**
   * When the browser resizes in desktop mode, we need to do a couple of things to
   * ensure that the dropdown still looks correct:
   * 1. Scroll the trigger back into view if we need to.
   * 2. Check to see if we're in a mobile context.
   * 3. Reposition the dropdown.  Could be fullscreen if resized to mobile.
   *
   * @memberof XUIDropdownToggled
   */
  onResize = () => {
    this.setState(prevState => {
      const isNarrow = checkIsNarrowViewport();
      if (!isNarrow || (isNarrow && !prevState.isNarrowViewport)) {
        scrollIntoViewIfNecessary(this.wrapper.current.firstChild);
        this.repositionDropdown();
      }
      return { isNarrowViewport: isNarrow };
    });
  };

  /**
   * Force the dropdown to reposition itself relative to the current position of the trigger.
   *
   * @public
   * @memberof XUIDropdownToggled
   */
  repositionDropdown = () => {
    if (this.positioning.current != null) {
      // Only need to recheck dimensions if we're dynamically sizing the height or width.
      if (this.props.restrictToViewPort || this.isDynamicWidth) {
        this.positioning.current.calculateMaxDimensions();
      }
      this.positioning.current.positionComponent();
    }
  };

  handleOnClick = event => {
    const { props, triggerClickHandler } = this;
    const { onClick } = props.trigger.props;
    const handler = compose(onClick, triggerClickHandler);

    handler(event);
  };

  handleOnKeyDown = event => {
    const { props, onTriggerKeyDown, spacebarKeyHandler } = this;
    const { onKeyDown } = props.trigger.props;
    const handler = compose(onKeyDown, onTriggerKeyDown, spacebarKeyHandler);

    handler(event);
  };

  handleOnKeyUp = event => {
    const { props, onTriggerKeyUp } = this;
    const { onKeyUp } = props.trigger.props;
    const handler = compose(onKeyUp, onTriggerKeyUp);

    handler(event);
  };

  onReturnFocus = event => {
    this.closeDropdown();
  };

  render() {
    const {
      className,
      trigger,
      dropdown,
      restrictToViewPort,
      forceDesktop,
      qaHook,
      maxHeight,
      preferredPosition,
      ariaPopupType,
      ariaRole,
      isLegacyDisplay,
      matchTriggerWidth,
      ...otherProps
    } = this.props;
    const { isOpening, isClosing, isHidden } = this.state;
    const { cellRef } = this.context;

    const clonedTrigger = React.cloneElement(trigger, {
      ref: combineRefs(trigger.ref, this.trigger),
      onClick: this.handleOnClick,
      onKeyDown: this.handleOnKeyDown,
      onKeyUp: this.handleOnKeyUp,
      'aria-haspopup': ariaPopupType,
      'aria-controls': (!isHidden && this.dropdownId) || undefined,
    });

    const focusPortalRef = this.props.useNewFocusBehaviour && getTriggerElementRef(this.trigger);

    const clonedDropdown = React.cloneElement(dropdown, {
      isHidden,
      id: this.dropdownId,
      forceDesktop,
      animateOpen: isOpening,
      animateClosed: isClosing,
      ref: combineRefs(dropdown.ref, this.dropdown),
      // TODO: Memoize these props to avoid recreating functions
      onSelect: compose(dropdown.props.onSelect, this.onSelect),
      onHighlightChange: compose(dropdown.props.onHighlightChange, this.onHighlightChange),
      onCloseAnimationEnd: compose(dropdown.onCloseAnimationEnd, this.onCloseAnimationEnd),
      onOpenAnimationEnd: compose(dropdown.onOpenAnimationEnd, this.onOpenAnimationEnd),
      onKeyDown: compose(dropdown.props.onKeyDown, this.onDropdownKeyDown),
      className: dropdown.props.className,
      restrictFocus: this.props.useNewFocusBehaviour ? false : dropdown.props.restrictFocus,
      _wrappingElement: children =>
        this.props.useNewFocusBehaviour &&
        (this.props.isLegacyDisplay || (this.state.isNarrowViewport && !forceDesktop)) ? (
          <PortalFocusHelper
            focusPortalRef={focusPortalRef}
            onReturnFocus={this.onReturnFocus}
            triggerElementRef={this.props._triggerElementRef}
          >
            {children}
          </PortalFocusHelper>
        ) : (
          children
        ),
    });

    const commonPositioningProps = {
      maxHeight,
      preferredPosition,
      isVisible: !isHidden,
      shouldRestrictMaxHeight: restrictToViewPort,
      isNotResponsive: forceDesktop,
      onVisible: shouldAnimate(this) ? null : this.onOpenAnimationEnd,
      ref: this.positioning,
      leaveRoomForValidationMessage: Boolean(cellRef.current),
      parentRef: cellRef.current || this.wrapper.current,
      matchTriggerWidth,
      isDynamicWidth: this.isDynamicWidth,
    };

    const positionedDropdown =
      isLegacyDisplay || (this.state.isNarrowViewport && !forceDesktop) ? (
        <Positioning {...commonPositioningProps} qaHook={qaHook && `${qaHook}--positioning`}>
          {clonedDropdown}
        </Positioning>
      ) : (
        <PositioningInline
          {...otherProps}
          {...commonPositioningProps}
          maxWidth={-1}
          qaHook={qaHook && `${qaHook}--positioning-inline`}
          useDropdownPositioning
        >
          {clonedDropdown}
        </PositioningInline>
      );

    const wrapperAria = {
      role: ariaRole || undefined,
      'aria-expanded': ariaRole ? !isHidden : undefined,
      'aria-owns': (!isHidden && this.dropdownId) || undefined,
    };

    return (
      <DropdownContext.Consumer>
        {contextOpenDropdowns => {
          /**
           * `currentOpenedDropdowns` is an array which contains all opened Dropdowns
           * For child dropdown, it's an array contains it's parent Dropdown (contextOpenDropdowns)
           * For parent dropdown, it's `null` and will get an empty array assigned (this.openedDropdowns)
           */
          const currentOpenedDropdowns = contextOpenDropdowns || this.openedDropdowns;
          if (currentOpenedDropdowns.indexOf(this.dropdown.current) === -1) {
            currentOpenedDropdowns.push(this.dropdown.current);
          }
          // For child dropdown, this.openedDropdowns will only contain itself
          this.openedDropdowns = contextOpenDropdowns
            ? [this.dropdown.current]
            : currentOpenedDropdowns;

          return (
            <DropdownContext.Provider value={currentOpenedDropdowns}>
              <div
                {...wrapperAria}
                className={cn(className, `${baseClass}--toggledwrapper`)}
                data-automationid={qaHook}
                data-ref="toggled-wrapper"
                ref={this.wrapper}
              >
                {clonedTrigger}
                {positionedDropdown}
              </div>
            </DropdownContext.Provider>
          );
        }}
      </DropdownContext.Consumer>
    );
  }
}

XUIDropdownToggled.contextType = EditableTableCellContext;

XUIDropdownToggled.propTypes = {
  /**
   * This internal prop allows dropdowns with more complex triggers (e.g. `XUIAutocompleter`,
   * where the trigger component contains multiple focusable elements) to specify which
   * element should be used to calculate the correct navigtion behaviour inside `PortalFocusHelper`.
   * @ignore
   */
  _triggerElementRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),

  /**
   * The "aria-haspopup" value. NOT just a boolean. Defaults to 'listbox' https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
   */
  ariaPopupType: PropTypes.oneOf(['listbox', 'menu', 'tree', 'grid', 'dialog', false]),

  /**
   * Aria role for dropdown wrapper
   */
  ariaRole: PropTypes.string,

  className: PropTypes.string,

  /** Whether or not the dropdown should be automatically hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  /**
   * @deprecated This prop will be set to `false` and removed in XUI 21.
   * Whether or not the dropdown should be automatically hidden when the user hits the tab key.
   * Good to turn this off if you've got a date picker, nested dropd down, form, or other complex
   * component inside of a dropdown.
   */
  closeOnTab: PropTypes.bool,

  /** Whether scroll locking behaviour should be disabled on mobile */
  disableScrollLocking: PropTypes.bool,

  /** The dropdown that will be rendered when triggered */
  dropdown: PropTypes.element.isRequired,

  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /**
   * This setting is only for non-legacy display. Whether to allow the dropdown to take the
   * full width of the wrapper (as `XUISelectBox`) or wrap with an inline block. Defaults to false.
   */
  isBlock: PropTypes.bool,

  /** Whether the dropdown is hidden on initial render */
  isHidden: PropTypes.bool,

  /**
   * @deprecated This prop will be set to `true` and removed in XUI 21.
   * Use the "legacy" (portaled) display. Currently defaults to "true."
   */
  isLegacyDisplay: PropTypes.bool,

  /**
   * Setting this to `true` makes the dropdown as wide as the trigger. <br>
   * **Note:** *Setting this to `true` will override any `size` prop on Dropdown.* <br>
   * Setting this to `false` will allow the dropdown's width to be set independent of the trigger width (defaults to `false`). <br>
   * Setting this to `'min'` will set the dropdown's `min-width` to be the trigger width. <br/>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers (setting this to `'min'` will not override this).
   */
  matchTriggerWidth: PropTypes.oneOf([true, false, 'min']),

  /**
   * Setting a number here will force the maximum height of the dropdown to be the number
   * provided (in pixels) if the viewport is too big. When the viewport is smaller than this
   * number, it still shrinks, but never grows beyond that number.
   */
  maxHeight: PropTypes.number,

  /** Callback that gets triggered when the dropdown has finished closing */
  onClose: PropTypes.func,

  /** Function to be called once the closing animation has finished */
  onCloseAnimationEnd: PropTypes.func,

  /** Callback that gets triggered when the dropdown begins opening */
  onOpen: PropTypes.func,

  /** Callback for when animation has ended on open. */
  onOpenAnimationEnd: PropTypes.func,

  /**
   * Preferred position to display the dropdown,
   * relative to the trigger. Defaults to bottom-left.
   */
  preferredPosition: PropTypes.oneOf(dropdownPositionOptions),

  qaHook: PropTypes.string,

  /** Repositioning on scroll is usually just annoying.  However, if you have a fixed position
   * trigger, it's essential to make sure that the dropdown stays next to the trigger. */
  repositionOnScroll: PropTypes.bool,

  /** Whether or not we should set a maxHeight on the dropdown to restrict it to the window */
  restrictToViewPort: PropTypes.bool,

  /** Element used to trigger the dropdown opening/closing (typically a button) */
  trigger: PropTypes.element.isRequired,

  /** What action to take when the user clicks the trigger.  Default is to toggle the dropdown
   * open/close. Can just open ('open') or do nothing ('none'). */
  triggerClickAction: PropTypes.oneOf(['none', 'toggle', 'open']),

  /**
   * This setting is only for non-legacy display. Space between trigger and dropdown, in pixels.
   * Defaults to 6.
   */
  triggerDropdownGap: PropTypes.number,

  /**
   * @deprecated This prop will be set to `true` and removed in XUI 21.
   * Whether or not to use the new focus behaviour - which treats dropdown navigation
   * like a `combobox` role. Defaults to `false`.
   */
  useNewFocusBehaviour: PropTypes.bool,
};

XUIDropdownToggled.defaultProps = {
  ariaPopupType: 'listbox',
  closeOnSelect: true,
  closeOnTab: false,
  disableScrollLocking: false,
  forceDesktop: false,
  isBlock: false,
  isHidden: true,
  isLegacyDisplay: true,
  matchTriggerWidth: false,
  preferredPosition: 'bottom-left',
  repositionOnScroll: false,
  restrictToViewPort: true,
  triggerClickAction: 'toggle',
  triggerDropdownGap: 6,
  useNewFocusBehaviour: true,
};
