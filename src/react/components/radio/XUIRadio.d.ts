import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Hint message to show under the input.
   */
  hintMessage?: React.ReactNode;
  /**
   * Additional class names for the html input.
   */
  htmlClassName?: string;
  /**
   * The icon path to use for the radio.
   */
  iconMain?: XUIIconData;
  id?: string;
  /**
   * Props to be spread onto the radio type of the input element itself
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * The input is selected.
   */
  isChecked?: boolean;
  /**
   * Used to output an uncontrolled checkbox component. If a value is passed to the `isChecked`
   * prop, this prop will be ignored.
   */
  isDefaultChecked?: boolean;
  /**
   * The input is disabled.
   */
  isDisabled?: boolean;
  /**
   * Used by XUI components to state whether the radio is part of a group.
   */
  isGrouped?: boolean;
  /**
   * Whether the current input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Prevents the label element from being displayed on the page. Label is still accessible to
   * screen readers.
   */
  isLabelHidden?: boolean;
  /**
   * The input is required for form submission.
   */
  isRequired?: boolean;
  /**
   * The label and control are displayed in reverse order.
   */
  isReversed?: boolean;
  /**
   * Additional class names on the span (pseudo-label) element.
   */
  labelClassName?: string;
  /**
   * Provide a specific label ID which will be used as the "labelledby" aria property.
   */
  labelId?: string;
  /**
   * The name to use as a reference for the value.
   */
  name?: string;
  /**
   * The function to call when the control changes state.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  qaHook?: string;
  /**
   * Role to be applied for screen readers.
   */
  role?: string;
  /**
   * Size variant.
   *
   * Defaults to `medium`.
   */
  size?: 'medium' | 'small' | 'xsmall';
  /**
   * Additional class names on the svg element.
   */
  svgClassName?: string;
  /**
   * The `tabIndex` property to place on the radio input.
   */
  tabIndex?: number;
  /**
   * Validation message to show under the input if `isInvalid` is `true`.
   */
  validationMessage?: React.ReactNode;
  /**
   * The value to return on form submission.
   */
  value?: string;
}

declare const XUIRadio: React.FunctionComponent<Props>;
export default XUIRadio;
