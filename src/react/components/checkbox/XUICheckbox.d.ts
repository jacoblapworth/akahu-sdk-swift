import React from 'react';

import { XUIIconData } from '../icon/XUIIcon';

interface Props {
  /**
   * Whether this checkbox was generated as part of a rollover checkbox.
   */
  _isRollOver?: boolean;
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
   * The icon path to use for the checkbox.
   */
  iconMain?: XUIIconData;
  /**
   * Props to be spread onto the checkbox type of the input element itself
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
   * Used by XUI components to state whether the checkbox is part of a group.
   */
  isGrouped?: boolean;
  /**
   * The input is indeterminate. In order for this prop value to stick, you MUST pass in
   * `isChecked={false}` or a user clicking on this will cause React to clear the indeterminate
   * state.
   */
  isIndeterminate?: boolean;
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
   * Size variant. Defaults to `medium`.
   */
  size?: 'medium' | 'small' | 'xsmall';
  /**
   * Additional class names on the svg element.
   */
  svgClassName?: string;
  /**
   * The `tab-index` property to place on the checkbox.
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

export default class XUICheckbox extends React.PureComponent<Props> {}
