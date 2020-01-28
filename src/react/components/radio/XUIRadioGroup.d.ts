import React from 'react';

interface Props {
  children?: React.ReactNode;
  /**
   * Class names to be added to bordered grouping element.
   */
  className?: string;
  /**
   * Class names to be added to the field wrapper element.
   */
  fieldClassName?: string;
  /**
   * Hint message to show under the input.
   */
  hintMessage?: string;
  /**
   * Whether to use the field layout classes.
   *
   * Defaults to `true`.
   */
  isFieldLayout?: boolean;
  /**
   * Whether the current input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the label should be visible or hidden.
   *
   * Defaults to `false` (visible).
   */
  isLabelHidden?: boolean;
  /**
   * Label the radio group for accessibility. Highly recommended.
   */
  label?: React.ReactNode;
  /**
   * Class names to add to the label text element.
   */
  labelClassName?: string;
  /**
   * Provide a specific label ID which will be used as the "labelledby" aria property.
   */
  labelId?: string;
  qaHook?: string;
  /**
   * Validation message to show under the input if `isInvalid` is `true`.
   */
  validationMessage?: string;
}

export default class XUIRadioGroup extends React.PureComponent<Props> {}
