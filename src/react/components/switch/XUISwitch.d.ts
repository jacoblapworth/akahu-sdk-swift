import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Hint message to show under the input.
   */
  hintMessage?: React.ReactNode;
  /**
   * Determines whether the switch is checked or unchecked. This makes the switch a controlled
   * component. Omitting the `isChecked` prop will make it an uncontrolled component.
   */
  isChecked?: boolean;
  /**
   * Used to provide an uncontrolled switch component. If a value is passed to the `isChecked` prop,
   * this prop will be ignored.
   */
  isDefaultChecked?: boolean;
  /**
   * Determines whether the switch is enabled or disabled.
   */
  isDisabled?: boolean;
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
   * Name attribute for the input.
   */
  name?: string;
  /**
   * Fires when the switch is turned on or off. No longer required.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  qaHook?: string;
  /**
   * Validation message to show under the input if `isInvalid` is `true`.
   */
  validationMessage?: React.ReactNode;
  /**
   * Value attribute for the input.
   */
  value?: string;
}

export default class XUISwitch extends React.PureComponent<Props> {}
