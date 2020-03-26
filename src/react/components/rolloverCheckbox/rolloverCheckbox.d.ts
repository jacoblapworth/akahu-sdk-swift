import React from 'react';

interface Props {
  /**
   * Optionally provide the id of an element that provides a label for the checkbox.
   */
  ariaLabelledBy?: string;
  /**
   * Set the size of the checkbox revealed on rollover.
   *
   * Defaults to `medium`.
   */
  checkboxSize?: 'medium' | 'small' | 'xsmall';
  className?: string;
  /**
   * Id to apply to the wrapping `div`.
   */
  id?: string;
  /**
   * Whether to show the checkbox instead of the rollover component.
   */
  isCheckboxHidden?: boolean;
  /**
   * Whether the checkbox is currently checked.
   */
  isChecked?: boolean;
  /**
   * Applies disabled styling when `true`.
   */
  isDisabled?: boolean;
  /**
   * Input label for accessibility purposes. Will not be visibly displayed.
   */
  label?: React.ReactNode;
  /**
   * Callback for when checkbox is selected.
   */
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>, control: Props) => void;
  qaHook?: string;
  /**
   * Component to render when `isCheckboxHidden` is `true` and mouse is not over the component.
   */
  rolloverComponent?: React.ReactNode;
}

export default class XUIRolloverCheckbox extends React.PureComponent<Props> {
  /**
   * Method to allow for programmatic triggering of the click event on the checkbox
   */
  triggerCheckboxClick(): void;
}
