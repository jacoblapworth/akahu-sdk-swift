import React from 'react';

interface Props {
  /**
   * Additional classes to be applied to the container.
   */
  containerClasses?: string;
  /**
   * Default value of the `XUIRange` component.
   */
  defaultValue?: number | string;
  /**
   * Hint string to be passed into the `XUIControlWrapper`.
   */
  hintMessage?: React.ReactNode;
  /**
   * Id of Range Component.
   */
  id?: string;
  /**
   * Additional classes to be applied to the input.
   */
  inputClasses?: string;
  /**
   * Disables the `XUIRange` component.
   */
  isDisabled?: boolean;
  /**
   * Displays that the `XUIRange` component is invalid.
   */
  isInvalid?: boolean;
  /**
   * Boolean to hide/show input label.
   */
  isLabelHidden?: React.ReactNode;
  /**
   * Input label.
   */
  label?: React.ReactNode;
  /**
   * Element on the left of the `XUIRange` component.
   */
  leftElement?: React.ReactNode;
  /**
   * Maximum value of the `XUIRange` component.
   */
  max?: number | string;
  /**
   * Minimum value of the `XUIRange` component.
   */
  min?: number | string;
  /**
   * Name to be consumed by form objects etc.
   */
  name?: string;
  /**
   * Define a function for the `onClick` event of the slider being clicked.
   */
  onClick?: React.MouseEventHandler<React.MouseEvent<HTMLInputElement>>;
  /**
   * Define a function for the `onInput` event of when the value of the slider is set/changed.
   */
  onInput?: React.FormEventHandler<React.FormEvent<HTMLInputElement>>;
  qaHook?: string;
  /**
   * Element on the right of the `XUIRange` component.
   */
  rightElement?: React.ReactNode;
  /**
   * Sizing of the circle touch object.
   */
  size?: 'medium' | 'small' | 'xsmall';
  /**
   * The incremement of the XUIRange slider value.
   */
  step?: number | string;
  /**
   * The message to show in validation.
   */
  validationMessage?: React.ReactNode;
}

export default class XUIRange extends React.PureComponent<Props> {}