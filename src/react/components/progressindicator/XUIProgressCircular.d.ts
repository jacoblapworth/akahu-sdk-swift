import * as React from 'react';

import { COLORS } from './helpers/constants';

interface Props {
  /**
   * Specify an ARIA label for the progress indicator.
   */
  ariaLabel?: string;
  /**
   * The id of an element that provides an ARIA label for the progress indicator.
   */
  ariaLabelledBy?: string;
  /**
   * Content to place inside the "track" circle.
   */
  children?: React.ReactNode;
  /**
   * Customise the "error" content.
   */
  hardErrorAlert?: React.ReactNode;
  /**
   * Show a "tool tip" when the mouse "enters" the UI.
   */
  hasToolTip?: boolean;
  /**
   * A unique ID that is used to generate SVG mask references and "Tool Tip" Aria references.
   */
  id: string;
  /**
   * Show a "complete" icon when the "progress" and "total" units are equal.
   */
  isAlertOnComplete?: boolean;
  /**
   * Set the component to "grow" horizontally (with the height maintaining the proportions of the
   * circle) into its parent container and fill the space.
   */
  isGrow?: boolean;
  /**
   * Show an error icon.
   */
  isHardError?: boolean;
  /**
   * Allow the "progress" to be greater than the "total" and represent this discrepancy in the UI.
   */
  isOverflow?: boolean;
  /**
   * Change the "track" from solid to a set of evenly spaced "segments" (one for each "total" unit).
   */
  isSegmented?: boolean;
  /**
   * Show the "progress" in an error state.
   */
  isSoftError?: boolean;
  /**
   * The amount of "progress" "units" in respect to the "total" value.
   */
  progress?: number;
  /**
   * A "color" key that overrides the default "progress" blue track swatch.
   */
  progressColor?: typeof COLORS[number];
  qaHook?: string;
  /**
   * The "thickness" of the progress track in "px".
   */
  thickness?: number;
  /**
   * Customise the "tool tip" message.
   */
  toolTipMessage?: string;
  /**
   * The "total" amount of "units" to represent visually on the progress scale.
   */
  total?: number;
  /**
   * A "color" key that overrides the default "total" gray track swatch.
   */
  totalColor?: typeof COLORS[number];
}

declare const XUIProgressCircular: React.FunctionComponent<Props>;
export default XUIProgressCircular;
