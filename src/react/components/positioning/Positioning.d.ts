import * as React from 'react';

import { positionOptions } from './private/constants';

interface Props {
  children?: React.ReactNode;
  /**
   * If dropdown width is not limited by other props and max should be set dynamically.
   */
  isDynamicWidth?: boolean;
  /**
   * Force the desktop UI, even if the viewport is narrow enough for mobile.
   */
  isNotResponsive?: boolean;
  /**
   * Setting to true will for the dropdown to be as wide as the trigger.
   */
  isTriggerWidthMatched?: boolean;
  /**
   * True when the component is rendered but not displayed.
   */
  isVisible?: boolean;
  /**
   * Setting a number here will force the maximum height of the child to be the number provided (in
   * pixels) if the viewport is too big. When the viewport is smaller than this number, it still
   * shrinks, but never grows beyond that number.
   */
  maxHeight?: number;
  /**
   * Callback for when the positioned element becomes visible.
   */
  onVisible?: () => void;
  /**
   * A DOM object of the parent node.
   */
  parentRef?: React.Ref<HTMLElement>;
  /**
   * Preferred side of the trigger and alignment in relation to the trigger for showing the tip.
   * This will potentially be overridden by dimensions of the viewport and tip contents.
   */
  preferredPosition?: typeof positionOptions[number];
  qaHook?: string;
  /**
   * A max height will mean an overflowed popup will scroll for the user rather than render outside
   * of the viewport.
   *
   * Defaults to `true`.
   */
  shouldRestrictMaxHeight?: boolean;
  /**
   * The amount of space to put between the trigger and the dropdown.
   */
  triggerDropdownGap?: number;
  /**
   * A buffer value added to measure between the edge of the viewport and the component before flipping its position.
   */
  viewportGutter?: number;
}

export default class Positioning<P = Props> extends React.PureComponent<P> {}
