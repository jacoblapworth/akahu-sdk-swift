import * as React from 'react';

import { userBreakpoints } from '../helpers/breakpoints';

interface Props {
  /**
   * Role to be applied for screen readers.
   *
   * Defaults to "group"
   */
  ariaRole?: string;
  children?: React.ReactNode;
  /**
   * Column widths, expressed a CSS grid-template-columns string
   */
  columnWidths?: string;
  /**
   * Classes to go on the outermost wrapping div that contains the label and the group
   */
  fieldClassName?: string;
  /**
   * Classes to go on the group element
   */
  groupClassName?: string;
  /**
   * Hint message to show under the input
   */
  hintMessage?: React.ReactNode;
  /**
   * Whether to use the field layout classes. Defaults to false
   */
  isFieldLayout?: boolean;
  /**
   * Whether the current control group is invalid, as a whole
   */
  isInvalid?: boolean;
  /**
   * Whether to hide the label and apply it as an ARIA label instead. Defaults to visible
   */
  isLabelHidden?: boolean;
  /**
   * Whether the group is permanently grouped as a column, rather than a row. Defaults to false.
   */
  isLockedVertical?: boolean;
  /**
   * Label to show above the group, or for accessibility when the group label is hidden. Highly recommended
   */
  label?: React.ReactNode;
  /**
   * Class names to add to the label text element
   */
  labelClassName?: string;
  /**
   * Provide a specific label ID which will be used as the "labelleby" aria property
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
   * Validation message to show under the group if `isInvalid` is true
   */
  validationMessage?: React.ReactNode;
}

declare const XUIControlGroup: React.FunctionComponent<Props>;
export default XUIControlGroup;
