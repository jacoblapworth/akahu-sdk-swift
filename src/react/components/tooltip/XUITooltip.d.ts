import * as React from 'react';

import { positionOptions } from '../positioning/private/constants';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Delay in ms for closing the tooltip.
   *
   * Defaults to `100`.
   */
  closeDelay?: number;
  /**
   * Limit `width` of tooltip's trigger to `100%`.
   */
  hasLimitedWidth?: boolean;
  /**
   * DOM ID of the tooltip.
   */
  id?: string;
  /**
   * Force the wrapping element to be a `div`, instead of a `span`.
   */
  isBlock?: boolean;
  /**
   * Allow the tooltip to be disabled, for cases of disabled inputs, narrow viewport etc.
   */
  isDisabled?: boolean;
  /**
   * Whether or not this component is hidden on initial render.
   */
  isHidden?: boolean;
  /**
   * Force the desktop UI, even if the viewport is narrow enough for mobile.
   */
  isNotResponsive?: boolean;
  /**
   * The target that should listen to key presses. Defaults to the window.
   */
  keyListenerTarget?: HTMLElement;
  /**
   * Setting a number here will force the maximum height of the tooltip to be the number provided
   * (in pixels).
   */
  maxHeight?: number;
  /**
   * Setting a number here will force the maximum width of the tooltip to be the number provided (in
   * pixels).
   */
  maxWidth?: number;
  /**
   * Callback that gets triggered when the tooltip has finished closing.
   */
  onClose?: () => void;
  /**
   * Callback that gets triggered when the tooltip begins opening.
   */
  onOpen?: () => void;
  /**
   * Delay in ms for opening the tooltip.
   *
   * Defaults to `500`.
   */
  openDelay?: number;
  /**
   * Preferred side of the trigger and alignment in relation to the trigger for showing the tip.
   *
   * This will potentially be overridden by dimensions of the viewport and tip contents.
   *
   * Providing only the side (`top`, `right`, `bottom`, `left`) will default to a center-aligned
   * tip.
   */
  preferredPosition?: typeof positionOptions[number];
  qaHook?: string;
  /**
   * Element used to trigger the tooltip opening/closing.
   */
  trigger: React.ReactElement;
  /**
   * Whether focusing off the trigger should change the tooltip to closed.
   *
   * Defaults to `true`.
   */
  triggerOnBlur?: boolean;
  /**
   * Whether clicking on the trigger should toggle the tooltip open/closed.
   *
   * Defaults to `false`.
   */
  triggerOnClick?: boolean;
  /**
   * Whether giving focus to the trigger should toggle the tooltip open/closed.
   *
   * Defaults to `false`.
   */
  triggerOnFocus?: boolean;
  /**
   * Whether hovering over the trigger should toggle the tooltip open/closed.
   *
   * Defaults to `true`.
   */
  triggerOnHover?: boolean;
  /**
   * When tooltip is hidden, set `display` to `inline-flex` instead of `inline-block`.
   */
  useInlineFlex?: boolean;
  wrapperClassName?: string;
}

export default class XUITooltip extends React.PureComponent<Props> {
  /**
   * Show the tooltip.
   */
  openTooltip(isClick: boolean): void;

  /**
   * Hide the tooltip.
   */
  closeTooltip(isClick: boolean): void;

  /**
   * A convenience method to toggle the visibility of the tooltip.
   */
  toggle(): void;
}
