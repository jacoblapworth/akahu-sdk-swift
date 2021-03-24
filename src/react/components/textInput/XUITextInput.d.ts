import * as React from 'react';

import { baseSizeClasses } from './private/constants';

declare enum InputType {
  'text',
  'number',
  'password',
  'hidden',
  'email',
  'range',
  'search',
  'time',
  'tel',
  'url',
  'color',
}

type XUITextInputHTMLAttributes =
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface Props {
  /**
   * Class names to add to the div wrapping the input and icons.
   */
  containerClassName?: string;
  /**
   * Default value of the text input.
   */
  defaultValue?: string;
  /**
   * Class names to be added to the field wrapper element.
   */
  fieldClassName?: string;
  /** After rendering set focus at the end of the input */
  focusOnMount?: boolean;
  /**
   * Hint message to show under the input.
   */
  hintMessage?: React.ReactNode;
  /**
   * Class names to add to the input element.
   */
  inputClassName?: string;
  /**
   * Props to be spread onto the input element itself.
   */
  inputProps?: XUITextInputHTMLAttributes;
  /**
   * Sets a ref for the input element.
   */
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Whether to render as a solid borderless input.
   */
  isBorderlessSolid?: boolean;
  /**
   * Whether to render as a transparent borderless input.
   */
  isBorderlessTransparent?: boolean;
  /**
   * Whether the input is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether to use the field layout classes.
   */
  isFieldLayout?: boolean;
  /**
   * Whether the current input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Should be set to true when placing a borderless input on a dark background.
   */
  isInverted?: boolean;
  /**
   * Should label be applied as an `aria-label`, rather than being visibly displayed.
   */
  isLabelHidden?: boolean;
  /**
   * Whether the textarea should be manually resizable (should only be used with `isMultiline=true`
   * and `rightElement=undefined`).
   */
  isManuallyResizable?: boolean;
  /**
   * Whether this should be rendered as a multiline textarea.
   */
  isMultiline?: boolean;
  /**
   * Whether the input value is reverse-aligned.
   */
  isValueReverseAligned?: boolean;
  /**
   * Label to show above the input.
   */
  label?: React.ReactNode;
  /**
   * Class names to add to the label.
   */
  labelClassName?: string;
  /**
   * Provide a specific label ID which will be used as the "labelleby" aria property
   */
  labelId?: string;
  /**
   * Content to be added to the left of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding.
   */
  leftElement?: React.ReactNode;
  /**
   * Maximum number of rows to render in the textarea (should only be used with `isMultiline=true`).
   */
  maxRows?: number;
  /**
   * Minimum number of rows to render in the textarea (should only be used with `isMultiline=true`).
   */
  minRows?: number;
  /**
   * Function to call when focus leaves the input.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Function to call when the input value is changed.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Function to call when the input is focused (does not include side elements).
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Function to call on keydown inside the textinput.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  qaHook?: string;
  /**
   * Content to be added to the right of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding.
   */
  rightElement?: React.ReactNode;
  /**
   * Set number of rows to use as a size for the textarea (should only be used with
   * `isMultiline=true`).
   */
  rows?: number;
  /**
   * Size of the input.
   */
  size?: keyof typeof baseSizeClasses;
  /**
   * Type of the input - should not be used together with `isMultiline`.
   */
  type?: keyof typeof InputType;
  /**
   * Validation message to show under the input if `isInvalid` is `true`.
   */
  validationMessage?: React.ReactNode;
  /**
   * Value of the text input.
   */
  value?: string;
}

export default class XUITextInput extends React.PureComponent<Props> {
  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: React.MutableRefObject<HTMLElement>;
}
