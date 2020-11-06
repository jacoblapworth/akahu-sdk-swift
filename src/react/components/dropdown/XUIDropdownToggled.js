import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import verge from 'verge';
import { v4 as uuidv4 } from 'uuid';
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
import { isKeySpacebar, eventKeyValues } from '../helpers/reactKeyHandler';
import { baseClass, dropdownPositionOptions } from './private/constants';
import DropdownContext from './contexts/DropdownContext';

import EditableTableCellContext from '../../contexts/EditableTableCellContext';

import { lockScroll, unlockScroll, isScrollLocked } from '../helpers/lockScroll';

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
      activeDescendant: null,
      isNarrowViewport: checkIsNarrowViewport(),
      isOpening: false,
      isClosing: false,
    };

    this.wrapper = React.createRef();
    this.positioning = React.createRef();
  }

  dropdownId = (this.props.dropdown && this.props.dropdown.props.id) || uuidv4();

  /**
   * `openedDropdowns` is used to keep track of nested dropdowns that have been opened.
   *
   * Only root dropdown's `openedDropdowns` property will contain all opened child dropdowns.
   */
  openedDropdowns = [];

  /**
   * Attaches the event listeners based on state.
   * Listeners attached on keydown and mousedown to control the open/close keyboard
   * shortcuts of the list.
   */
  componentDidMount() {
    if (!this.state.isHidden) {
      addEventListeners(this);
      this.forceUpdate();
    }

    this.onResize = debounce(this.onResize, 250);
    this.onScroll = throttleToFrame(this.repositionDropdown);
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
    const {
      onCloseAnimationEnd,
      disableScrollLocking,
      repositionOnScroll,
      onClose,
      onOpen,
    } = this.props;
    const { isClosing, isHidden, shouldUnlockScroll, isNarrowViewport } = this.state;

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
        const { firstChild: trigger } = this.wrapper.current;
        focusTrigger(this.trigger, trigger);

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
  openDropdown = () => {
    this.setState(() => ({
      isHidden: false,
      isOpening: false,
      isNarrowViewport: checkIsNarrowViewport(),
    }));
  };

  /**
   * Hide the dropdown
   *
   * @public
   */
  closeDropdown = () => {
    this.setState(({ isHidden }) => ({
      isHidden: isHidden || !shouldAnimate(this),
      isClosing: !isHidden && shouldAnimate(this),
    }));
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
   * Will close the dropdown if the esc key is pressed within the dropdown.
   *
   * @param {KeyboardEvent} event key down event object
   */
  onDropdownKeyDown = event => {
    if (
      !this.state.isHidden &&
      (event.key === eventKeyValues.escape || event.key === eventKeyValues.tab)
    ) {
      if (event.key !== 'Tab' || this.props.closeOnTab) {
        this.closeDropdown();
      }
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
   * Fires when the window triggers a mouse down event
   *
   * @param {MouseEvent} event
   */
  onMouseDown = event => {
    const { isHidden } = this.state;
    const { firstChild: trigger } = this.wrapper.current;

    /*
		Summary of below checks:
		 - the dropdown isn't currently hidden
		 - AND the opened dropdowns have rendered and we can match the click target to the dropdowns
		 - AND trigger has also rendered and can match with target
     - OR if the click target is the mask
    */

    const openedDropdownsDoNotContainTarget = this.openedDropdowns.every(openedDropdown => {
      const dropdown =
        openedDropdown === undefined
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
      (trigger == null || !trigger.contains(event.target))
    ) {
      this.closeDropdown();
    }
  };

  /**
   * Sets the activeDescendant state to be the id of the item selected so this can be set in
   * the corresponding trigger attribute.
   *
   * @param {UIEvent} event
   * @param {ReactElement} item
   */
  onSelect = (event, item) => {
    this.setState({
      activeDescendant: item.props.id,
    });

    if (this.props.closeOnSelect) {
      this.closeDropdown();
    }
  };

  /**
   * Ensures that the activeDescendant aria attribute changes on the trigger when the highlighted
   * element changes.
   *
   * @param {ReactElement} item
   */
  onHighlightChange = item => {
    this.setState({
      activeDescendant: item.props.id,
    });
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
    this.dropdown.highlightInitial();
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
      if (this.props.restrictToViewPort) {
        this.positioning.current.calculateMaxHeight();
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

  render() {
    return (
      <EditableTableCellContext.Consumer>
        {({ cellRef }) => {
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
          const { isOpening, isClosing, isHidden, activeDescendant } = this.state;

          const clonedTrigger = React.cloneElement(trigger, {
            ref: compose(trigger.ref, c => (this.trigger = c)),
            onClick: this.handleOnClick,
            onKeyDown: this.handleOnKeyDown,
            onKeyUp: this.handleOnKeyUp,
            'aria-activedescendant': activeDescendant,
            'aria-haspopup': ariaPopupType,
            'aria-controls': (!isHidden && this.dropdownId) || undefined,
          });

          const clonedDropdown = React.cloneElement(dropdown, {
            isHidden,
            id: this.dropdownId,
            forceDesktop,
            animateOpen: isOpening,
            animateClosed: isClosing,
            // TODO: Memoize these props to avoid recreating functions
            ref: compose(dropdown.ref, c => (this.dropdown = c)),
            onSelect: compose(dropdown.props.onSelect, this.onSelect),
            onHighlightChange: compose(dropdown.props.onHighlightChange, this.onHighlightChange),
            onCloseAnimationEnd: compose(dropdown.onCloseAnimationEnd, this.onCloseAnimationEnd),
            onOpenAnimationEnd: compose(dropdown.onOpenAnimationEnd, this.onOpenAnimationEnd),
            onKeyDown: compose(dropdown.props.onKeyDown, this.onDropdownKeyDown),
            className: dropdown.props.className,
          });

          const commonPositioningProps = {
            maxHeight,
            isVisible: !isHidden,
            shouldRestrictMaxHeight: restrictToViewPort,
            isNotResponsive: forceDesktop,
            onVisible: shouldAnimate(this) ? null : this.onOpenAnimationEnd,
            ref: this.positioning,
            leaveRoomForValidationMessage: Boolean(cellRef.current),
            parentRef: cellRef.current || this.wrapper.current,
            isTriggerWidthMatched: matchTriggerWidth,
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
                preferredPosition={preferredPosition}
                qaHook={qaHook && `${qaHook}--positioning-inline`}
                useDropdownPositioning
              >
                {clonedDropdown}
              </PositioningInline>
            );

          const wrapperAria = {
            role: ariaRole || 'presentation',
            'aria-expanded': (ariaRole && !isHidden) || undefined,
            'aria-owns': (!isHidden && this.dropdownId) || undefined,
          };

          return (
            <DropdownContext.Consumer>
              {contextOpenDropdowns => {
                /**
                 * `currentOpenedDropdowns` is an array which contains all opened Dropdowns
                 * For child dropdown, it's an array contains it's parent Dropdown (contextOpenDropdowns)
                 * For parent dropdown, it's `undefined` and will get an empty array assigned (this.openedDropdowns)
                 */
                const currentOpenedDropdowns = contextOpenDropdowns || this.openedDropdowns;
                if (currentOpenedDropdowns.indexOf(this.dropdown) === -1) {
                  currentOpenedDropdowns.push(this.dropdown);
                }
                // For child dropdown, this.openedDropdowns will only contain itself
                this.openedDropdowns = contextOpenDropdowns
                  ? [this.dropdown]
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
        }}
      </EditableTableCellContext.Consumer>
    );
  }
}

XUIDropdownToggled.propTypes = {
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /** Whether the dropdown is hidden on initial render */
  isHidden: PropTypes.bool,

  /** Callback that gets triggered when the dropdown begins opening */
  onOpen: PropTypes.func,

  /** Callback that gets triggered when the dropdown has finished closing */
  onClose: PropTypes.func,

  /** Element used to trigger the dropdown opening/closing (typically a button) */
  trigger: PropTypes.element.isRequired,

  /** The dropdown that will be rendered when triggered */
  dropdown: PropTypes.element.isRequired,

  /** Whether or not the dropdown should be automatically hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  /** Whether or not the dropdown should be automatically hidden when the user hits the tab key.
   * Good to turn this off if you've got a date picker, nested dropd down, form, or other complex
   * component inside of a dropdown. */
  closeOnTab: PropTypes.bool,

  /** Whether or not we should set a maxHeight on the dropdown to restrict it to the window */
  restrictToViewPort: PropTypes.bool,

  /** Whether scroll locking behaviour should be disabled on mobile */
  disableScrollLocking: PropTypes.bool,

  /** Function to be called once the closing animation has finished */
  onCloseAnimationEnd: PropTypes.func,

  /** Callback for when animation has ended on open. */
  onOpenAnimationEnd: PropTypes.func,

  /** What action to take when the user clicks the trigger.  Default is to toggle the dropdown
   * open/close. Can just open ('open') or do nothing ('none'). */
  triggerClickAction: PropTypes.oneOf(['none', 'toggle', 'open']),

  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /** Use the "legacy" (portaled) display. Currently defaults to "true." */
  isLegacyDisplay: PropTypes.bool,

  /** Repositioning on scroll is usually just annoying.  However, if you have a fixed position
   * trigger, it's essential to make sure that the dropdown stays next to the trigger. */
  repositionOnScroll: PropTypes.bool,

  /**
   * Setting to true will for the dropdown to be as wide as the trigger. <br>
   * **Note:** *Setting this to true will override any size prop on `XUIDropdown`.* <br>
   * XUI design has also to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers.
   */
  matchTriggerWidth: PropTypes.bool,

  /**
   * Setting a number here will force the maximum height of the dropdown to be the number
   * provided (in pixels) if the viewport is too big. When the viewport is smaller than this
   * number, it still shrinks, but never grows beyond that number.
   */
  maxHeight: PropTypes.number,

  /**
   * This setting is only for non-legacy display. Whether to allow the dropdown to take the
   * full width of the wrapper (as `XUISelectBox`) or wrap with an inline block. Defaults to false.
   */
  isBlock: PropTypes.bool,
  /**
   * This setting is only for non-legacy display. Preferred position to display the dropdown,
   * relative to the trigger. Defaults to bottom-left.
   */
  preferredPosition: PropTypes.oneOf(dropdownPositionOptions),
  /**
   * This setting is only for non-legacy display. Space between trigger and dropdown, in pixels.
   * Defaults to 6.
   */
  triggerDropdownGap: PropTypes.number,
  /**
   * The "aria-haspopup" value. NOT just a boolean. Defaults to 'listbox' https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
   */
  ariaPopupType: PropTypes.oneOf(['listbox', 'menu', 'tree', 'grid', 'dialog', false]),
  /**
   * Aria role for dropdown wrapper
   */
  ariaRole: PropTypes.string,
};

XUIDropdownToggled.defaultProps = {
  isHidden: true,
  closeOnSelect: true,
  closeOnTab: true,
  restrictToViewPort: true,
  disableScrollLocking: false,
  triggerClickAction: 'toggle',
  forceDesktop: false,
  repositionOnScroll: false,
  matchTriggerWidth: false,
  preferredPosition: 'bottom-left',
  triggerDropdownGap: 6,
  isLegacyDisplay: true,
  isBlock: false,
  ariaPopupType: 'listbox',
};
