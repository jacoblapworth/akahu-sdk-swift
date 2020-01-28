import React from 'react';

import { baseSizeClasses } from './private/constants';

interface BaseProps {
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
  /**
   * Hint message to show under the input.
   */
  hintMessage?: React.ReactNode;
  /**
   * Class names to add to the input element.
   */
  inputClassName?: string;
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
   * Whether the input value is reverse-aligned.
   */
  isValueReverseAligned?: boolean;
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
   * Size of the input.
   */
  size?: keyof typeof baseSizeClasses;
  /**
   * Validation message to show under the input if `isInvalid` is `true`.
   */
  validationMessage?: React.ReactNode;
  /**
   * Value of the text input.
   */
  value?: string;
}
interface InputProps
  extends ElementProps<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>> {
  /**
   * Whether this should be rendered as a multiline textarea.
   */
  isMultiline?: false;
  /**
   * Type of the input - should not be used together with `isMultiline`.
   */
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'hidden'
    | 'email'
    | 'range'
    | 'search'
    | 'time'
    | 'tel'
    | 'url'
    | 'color';
}
interface TextareaProps
  extends ElementProps<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>> {
  /**
   * Whether the textarea should be manually resizable (should only be used with `isMultiline=true`
   * and `rightElement=undefined`).
   */
  isManuallyResizable?: boolean;
  /**
   * Whether this should be rendered as a multiline textarea.
   */
  isMultiline: true;
  /**
   * Maximum number of rows to render in the textarea (should only be used with `isMultiline=true`).
   */
  maxRows?: number;
  /**
   * Minimum number of rows to render in the textarea (should only be used with `isMultiline=true`).
   */
  minRows?: number;
  /**
   * Set number of rows to use as a size for the textarea (should only be used with
   * `isMultiline=true`).
   */
  rows?: number;
}
interface VisibleLabelProps {
  /**
   * Should label be applied as an `aria-label`, rather than being visibly displayed.
   */
  isLabelHidden?: false;
  /**
   * Label to show above the input.
   */
  label?: React.ReactNode;
}
interface HiddenLabelProps {
  /**
   * Should label be applied as an `aria-label`, rather than being visibly displayed.
   */
  isLabelHidden: true;
  /**
   * Label to show above the input.
   */
  label?: string;
}

type MultilineProps = InputProps | TextareaProps;
type LabelProps = VisibleLabelProps | HiddenLabelProps;
type Props = BaseProps & MultilineProps & LabelProps;

export default class XUITextInput extends React.PureComponent<Props> {}

interface ElementProps<ElementType, AttributesType> {
  /**
   * Props to be spread onto the input element itself.
   */
  inputProps?: AttributesType;
  /**
   * Sets a ref for the input element.
   */
  inputRef?: React.Ref<ElementType>;
  /**
   * Function to call when focus leaves the input.
   */
  onBlur?: React.FocusEventHandler<ElementType>;
  /**
   * Function to call when the input value is changed.
   */
  onChange?: React.ChangeEventHandler<ElementType>;
  /**
   * Function to call when the input is focused (does not include side elements).
   */
  onFocus?: React.FocusEventHandler<ElementType>;
  /**
   * Function to call on keydown inside the textinput.
   */
  onKeyDown?: React.KeyboardEventHandler<ElementType>;
}
