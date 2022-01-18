import * as React from 'react';

import { userBreakpoints } from '../helpers/breakpoints';

interface Props {
  children?: React.ReactNode;
  /**
   * Class names to be added to bordered grouping element
   */
  className?: string;
  /**
   * Column widths, expressed a CSS grid-template-columns string
   */
  columnWidths?: string;
  /**
   * Class names to be added to the field wrapper element
   */
  fieldClassName?: string;
  /**
   * Hint message to show under the input
   */
  hintMessage?: React.ReactNode;
  /**
   * Whether to use the field layout classes. Defaults to false
   */
  isFieldLayout?: boolean;
  /**
   * Whether the current input value is invalid
   */
  isInvalid?: boolean;
  /**
   * Whether to hide the label and apply it as an ARIA label instead. Defaults to visible
   */
  isLabelHidden?: boolean;
  /**
   * Whether the group is permanently grouped as a column, rather than a row. Defaults to true.
   */
  isLockedVertical?: boolean;
  /**
   * Label to show above the switch group, or for accessibility when the switch group label is hidden. Highly recommended.
   */
  label?: React.ReactNode;
  /**
   * Class names to add to the label text element
   */
  labelClassName?: string;
  /**
   * Provide a specific label ID which will be used as the "labelledby" aria property
   */
  labelId?: string;
  /**
   * String to be used as a data-automationid on the group and (with suffixes) on related elements
   */
  qaHook?: string;
  /**
   * Defines the swap breakpoint (container width) between horizontal (single-row) group and vertical (single-column) group.
   * Supported breakpoints are `small` (600px), `medium` (800px), `large` (1000px), and `xlarge` (1200px).
   */
  swapAtBreakpoint?: keyof typeof userBreakpoints;
  /**
   * Validation message to show under the input if `isInvalid` is true
   */
  validationMessage?: React.ReactNode;
}

declare const XUISwitchGroup: React.FunctionComponent<Props>;
export default XUISwitchGroup;
