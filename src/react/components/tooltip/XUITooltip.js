import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import compose from '../helpers/compose';
import { eventKeyValues } from '../helpers/reactKeyHandler';
import PositioningInline from '../positioning/PositioningInline';
import { positionOptions } from '../positioning/private/constants';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-tooltip`;

export default class XUITooltip extends PureComponent {
  state = {
    isHidden: this.props.isHidden,
    isFocused: false,
    isAnimating: false,
    hasBeenDismissed: false,
  };

  tooltipId = this.props.id || `xui-${nanoid(10)}`;

  /**
   * Show the tooltip.
   *
   * @public
   * @param {Boolean} isClick
   */
  openTooltip = isClick => {
    const { isDisabled, openDelay, onOpen } = this.props;

    if (isDisabled) {
      return;
    }
    // No delay for click open/close or if it's already animating.
    const delay = isClick === true || this.state.isAnimating ? 0 : openDelay;
    this.handleOpenClose(delay, true, onOpen);
  };

  /**
   * Hide the tooltip
   *
   * @public
   * @param {Boolean} isClick
   */
  closeTooltip = isClick => {
    const { closeDelay, onClose } = this.props;
    // No delay for click open/close or if it's already animating.
    const delay = isClick === true || this.state.isAnimating ? 0 : closeDelay;

    this.handleOpenClose(delay, false, onClose);
  };

  /**
   * Handle the animating delay on open/close
   *
   * @param {Number} delay
   * @param {Boolean} isOpening // false for a close action
   * @param {Function} callBack // If provided by the consumer, a function to call on open/close.
   */
  handleOpenClose = (delay, isOpening, callBack) => {
    window.clearTimeout(this.animationStartTimer);
    this.animationStartTimer = setTimeout(() => {
      window.clearTimeout(this.animationFinishTimer);
      callBack && callBack();
      this.setState({
        isHidden: !isOpening,
        isAnimating: true,
      });
      this.animationFinishTimer = setTimeout(() => {
        this.setState({
          isAnimating: false,
        });
      }, 100); // 100ms is the current animation time.
    }, delay);
  };

  /**
   * A convenience method to toggle the visibility of the tooltip.
   *
   * @public
   */
  toggle = () => {
    this.state.isHidden ? this.openTooltip(true) : this.closeTooltip(true);
  };

  /**
   * If user hits enter on the trigger, we may want to open and/or toggle the tooltip.
   *
   * @private
   * @memberof XUITooltip
   */
  onTriggerKeyDown = event => {
    if (event.key === eventKeyValues.enter) {
      this.toggle();
    }
  };

  componentDidMount = () => {
    const { trigger } = this;
    const rootNode = (trigger && (trigger.rootNode || trigger.input)) || trigger;
    if (!rootNode) {
      return;
    }
    const { display } = window.getComputedStyle(rootNode.current || rootNode);
    this.triggerIsInline = /inline/.test(display);
    this.addListeners();
  };

  componentDidUpdate(prevProps, prevState) {
    const { isFocused, isHidden } = this.state;
    if (this.props.triggerOnFocus) {
      if (!prevState.isFocused && isFocused && isHidden) {
        this.openTooltip();
      } else if (prevState.isFocused && !isFocused && !isHidden) {
        this.closeTooltip();
      }
    }
    if (this.shouldUpdateListeners(this.props, prevProps)) {
      this.removeListeners(prevProps.keyListenerTarget);
      this.addListeners();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.animationStartTimer);
    clearTimeout(this.animationFinishTimer);
    this.removeListeners(this.props.keyListenerTarget);
  }

  /**
   * Dismisses any active tooltips when escape is pressed.
   * @private
   * @param {KeyboardEvent} event
   */
  _keyDownHandler = event => {
    const { isHidden } = this.state;
    if (event.key === eventKeyValues.escape) {
      /**  This `hasBeenDismissed` state is only required due to an unusual behaviour from Firefox,
       * where it will continually trigger the `mouseOver` event without the pointer being moved. */
      if (!isHidden) {
        this.setState({ hasBeenDismissed: true });
      }
      this.closeTooltip(true);
    }
  };

  /**
   * Opens the tooltip, if it has not already been dismissed.
   * @private
   */
  handleMouseOver = () => {
    const { hasBeenDismissed } = this.state;
    const { triggerOnHover } = this.props;
    if (hasBeenDismissed || !triggerOnHover) {
      return;
    }
    this.openTooltip();
  };

  /**
   * Dismisses the tooltip and resets the manually dismissed state.
   * @private
   */
  handleMouseOut = () => {
    const { triggerOnHover, triggerOnFocus } = this.props;
    const ignoreFocus = !this.state.isFocused || !triggerOnFocus;
    if (triggerOnHover && ignoreFocus) {
      this.setState({ hasBeenDismissed: false });
      this.closeTooltip();
    }
  };

  addListeners = () => {
    const { keyListenerTarget } = this.props;
    const listenerTarget = keyListenerTarget || window;

    listenerTarget?.addEventListener('keydown', this._keyDownHandler);
  };

  removeListeners = keyListenerTarget => {
    const listenerTarget = keyListenerTarget || window;

    listenerTarget?.removeEventListener('keydown', this._keyDownHandler);
  };

  shouldUpdateListeners = (props, otherProps) =>
    props.keyListenerTarget !== otherProps.keyListenerTarget;

  render() {
    const {
      children,
      qaHook,
      className,
      trigger,
      wrapperClassName,
      isDisabled,
      triggerOnFocus,
      triggerOnBlur,
      triggerOnClick,
      isBlock,
      useInlineFlex,
      hasLimitedWidth,
    } = this.props;
    const { isHidden, isAnimating } = this.state;
    const ignoreFocus = !this.state.isFocused || !triggerOnFocus;

    const wrapperClasses = cn(
      wrapperClassName,
      baseClass,
      this.state.isFocused && `${ns}-has-focused-trigger`,
      this.triggerIsInline && `${ns}-has-inline-trigger`,
      isDisabled && `${ns}-is-disabled`,
      !isHidden && `${baseClass}-tipopen`,
      isAnimating && `${baseClass}-tipanimating`,
      isBlock && `${baseClass}-is-block`,
      useInlineFlex && `${baseClass}-inline-flex`,
      hasLimitedWidth && `${baseClass}-limitwidth`,
    );

    const tipClasses = cn(
      className,
      `${baseClass}--tip`,
      !isHidden && `${baseClass}--tip-open`,
      isAnimating && `${baseClass}--tip-animating`,
    );
    const triggerHasOwnHandlers = trigger.props.onClick || trigger.props.onKeyDown;

    const clonedTrigger = React.cloneElement(trigger, {
      ref: compose(trigger.ref, c => (this.trigger = c)),
      // NB: We'll defer to any handlers attached to the trigger, cancelling tooltip behavior.
      // TODO: Properly handle click and keydown behavior that isn't from a prop (eg. anchors).
      onClick: triggerHasOwnHandlers
        ? trigger.props.onClick
        : (triggerOnClick && ignoreFocus && this.toggle) || undefined,
      onKeyDown: triggerHasOwnHandlers
        ? trigger.props.onKeyDown
        : (triggerOnClick && this.onTriggerKeyDown) || undefined,
      onFocus: compose(trigger.props.onFocus, () => this.setState({ isFocused: true })),
      onBlur: triggerOnBlur
        ? compose(trigger.props.onBlur, () => this.setState({ isFocused: false }))
        : undefined,
      'aria-describedby': this.tooltipId,
    });

    const WrappingElement = isBlock ? 'div' : 'span';

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <WrappingElement
        className={wrapperClasses}
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
        ref={c => this.setState({ wrapper: c })}
      >
        {clonedTrigger}
        <PositioningInline
          {...this.props}
          // When isVisible is true, there will be a negative margin (influence the width of the tooltip) set in .xui-tooltip--tip
          // Without the negative margin, the width will change once isVisible changes, and caused a bug (XUI-854) in Safari
          // And setting isVisible to true will not actually determine the tooltip's render/display
          isVisible
          parentRef={this.state.wrapper}
        >
          <span
            aria-hidden={this.state.isHidden}
            className={tipClasses}
            data-automationid={qaHook && `${qaHook}--tooltip`}
            id={this.tooltipId}
            role="tooltip"
          >
            {children}
          </span>
        </PositioningInline>
      </WrappingElement>
    );
  }
}

XUITooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /** Delay in ms for closing the tooltip. Defaults to 100 */
  closeDelay: PropTypes.number,

  /**
   * Limit width of tooltip's trigger to 100%.
   */
  hasLimitedWidth: PropTypes.bool,

  /** DOM ID of the tooltip */
  id: PropTypes.string,

  /** Force the wrapping element to be a div, instead of a span */
  isBlock: PropTypes.bool,

  /** Allow the tooltip to be disabled, for cases of disabled inputs, narrow viewport etc. */
  isDisabled: PropTypes.bool,

  /** Whether or not this component is hidden on initial render. */
  isHidden: PropTypes.bool,

  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  isNotResponsive: PropTypes.bool,

  /** The target that should listen to key presses. Defaults to the window. */
  keyListenerTarget: PropTypes.object,

  /** Setting a number here will force the maximum height of the tooltip to be the
   * number provided (in pixels). */
  maxHeight: PropTypes.number,

  /** Setting a number here will force the maximum width of the tooltip to be the
   * number provided (in pixels). */
  maxWidth: PropTypes.number,

  /** Callback that gets triggered when the tooltip has finished closing */
  onClose: PropTypes.func,

  /** Callback that gets triggered when the tooltip begins opening */
  onOpen: PropTypes.func,

  /** Delay in ms for opening the tooltip. Defaults to 500 */
  openDelay: PropTypes.number,

  /**
   * Preferred side of the trigger and alignment in relation to the trigger for showing the tip.
   * This will potentially be over-ridden by dimensions of the viewport and tip contents.
   * Providing only the side (top, right, bottom, left) will default to a center-aligned tip.
   */
  preferredPosition: PropTypes.oneOf(positionOptions),

  qaHook: PropTypes.string,

  /** Element used to trigger the tooltip opening/closing */
  trigger: PropTypes.element.isRequired,

  /** Whether focusing off the trigger should change the tooltip to closed. Defaults to true. */
  triggerOnBlur: PropTypes.bool,

  /** Whether clicking on the trigger should toggle the tooltip open/closed. Defaults to false. */
  triggerOnClick: PropTypes.bool,

  /** Whether giving focus to the trigger should toggle the tooltip open/closed.
   * Defaults to false. */
  triggerOnFocus: PropTypes.bool,

  /** Whether hovering over the trigger should toggle the tooltip open/closed.
   * Defaults to true. */
  triggerOnHover: PropTypes.bool,

  /** When tooltip is hidden, use display inline-flex instead of inline-block. */
  useInlineFlex: PropTypes.bool,

  wrapperClassName: PropTypes.string,
};

XUITooltip.defaultProps = {
  closeDelay: 100,
  isDisabled: false,
  isHidden: true,
  maxWidth: 220,
  openDelay: 500,
  preferredPosition: 'top',
  triggerOnBlur: true,
  triggerOnClick: false,
  triggerOnFocus: false,
  triggerOnHover: true,
};
