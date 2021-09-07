import * as React from 'react';

import Positioning from './Positioning';
import { positionOptions } from './private/constants';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Force the desktop UI, even if the viewport is narrow enough for mobile.
   */
  isNotResponsive?: boolean;
  /**
   * Setting this to `true` makes the dropdown as wide as the trigger.
   *
   * Setting this to `false` will allow the dropdown's width to be set independent of the trigger width.
   *
   * Setting this to `'min'` will set the dropdown's `min-width` to be the trigger width.
   */
  isTriggerWidthMatched?: boolean | true | false | 'min';
  /**
   * True when the component is rendered but not displayed.
   */
  isVisible?: boolean;
  /**
   * Setting a number here will force the maximum size of the child to be the number provided (in
   * pixels). When the viewport is smaller than this number, it still shrinks, but never grows
   * beyond that number. Setting either to `-1` will set the value to `null`.
   */
  maxHeight?: number;
  maxWidth?: number;
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
   * This will potentially be overridden by dimensions of the viewport and tip contents. Providing
   * only the side (top, right, bottom, left) will default to a center-aligned tip.
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
   * Limit positioning to standard dropdown behaviour. The positioned element will only show above
   * or below the trigger (never to the side), and will be flush to the left or right of the trigger
   * (never centered).
   */
  useDropdownPositioning?: boolean;
  /**
   * A buffer value added to measure between the edge of the viewport and the component before
   * flipping its position.
   */
  viewportGutter?: number;
}

export default class PositioningInline extends Positioning<Props> {}
