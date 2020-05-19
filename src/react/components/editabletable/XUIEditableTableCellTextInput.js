import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCellControl from './XUIEditableTableCellControl';
import XUITextInput from '../textInput/XUITextInput';
import { tableName } from './private/constants';

const baseName = `${tableName}celltextinput`;

const XUIEditableTableCellTextInput = ({
  cellProps = {},
  containerClassName,
  onBlur,
  onFocus,
  isDisabled,
  isInvalid,
  validationMessage,
  ...spreadProps
}) => {
  const inputRef = React.useRef();
  const [isFocused, setIsFocused] = React.useState();

  /**
   * Records the focus state onBlur, before calling any user-supplied handlers.
   * @param {event} event
   */
  const composedOnBlur = event => {
    setIsFocused(false);

    onBlur && onBlur(event);
  };

  /**
   * Records the focus state and selects all content onFocus, before calling any user-supplied
   * handlers.
   * @param {event} event
   */
  const composedOnFocus = event => {
    setIsFocused(true);

    const input = event.target;
    input && input.setSelectionRange && input.setSelectionRange(0, input.value.length);

    onFocus && onFocus(event);
  };

  /**
   * @public
   * Focus the input inside the cell.
   */
  const focusInput = () => {
    getSelection().toString().length === 0 &&
      inputRef.current &&
      inputRef.current.input &&
      inputRef.current.input.focus &&
      inputRef.current.input.focus();
  };

  return (
    <XUIEditableTableCellControl
      {...cellProps}
      className={cn(baseName, cellProps.className)}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isInvalid={isInvalid}
      onClick={focusInput}
      validationMessage={validationMessage}
    >
      <XUITextInput
        {...spreadProps}
        containerClassName={cn(`${baseName}--control`, containerClassName)}
        isDisabled={isDisabled}
        isLabelHidden
        onBlur={composedOnBlur}
        onFocus={composedOnFocus}
        ref={inputRef}
      />
    </XUIEditableTableCellControl>
  );
};

XUIEditableTableCellTextInput.propTypes = {
  cellProps: PropTypes.object,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /** Value of the text input */
  value: PropTypes.string,
  /** Default value of the text input */
  defaultValue: PropTypes.string,
  /** Type of the input - should not be used together with `isMultiline` */
  type: PropTypes.oneOf([
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
  ]),
  /** Function to call when the input value is changed */
  onChange: PropTypes.func,
  /** Function to call when the input is focused (does not include side elements) */
  onFocus: PropTypes.func,
  /** Function to call when focus leaves the input */
  onBlur: PropTypes.func,
  /** Function to call on keydown inside the textinput */
  onKeyDown: PropTypes.func,
  /** Label to show above the input */
  label: PropTypes.node,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
  /** Props to be spread onto the input element itself */
  inputProps: PropTypes.object,
  /** Sets a ref for the input element */
  inputRef: PropTypes.func,
  /** Content to be added to the left of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding */
  leftElement: PropTypes.node,
  /** Content to be added to the right of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding */
  rightElement: PropTypes.node,
  /** Class names to add to the div wrapping the input and icons */
  containerClassName: PropTypes.string,
  /** Class names to add to the input element */
  inputClassName: PropTypes.string,
  /** Placeholder text for the input */
  placeholder: PropTypes.string,
  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,
  /** Whether this should be rendered as a multiline textarea */
  isMultiline: PropTypes.bool,
  /** Whether the input value is reverse-aligned */
  isValueReverseAligned: PropTypes.bool,
  /** Minimum number of rows to render in the textarea (should only be used with
   * `isMutliline=true`) */
  minRows: PropTypes.number,
  /** Maximum number of rows to render in the textarea (should only be used with
   * `isMultiline=true`) */
  maxRows: PropTypes.number,
  /** Set number of rows to use as a size for the textarea (should only be used
   * with `isMultiline=true`) */
  rows: PropTypes.number,
  /** Whether the textarea should be manually resizable (should only be used with
   * `isMultiline=true` and `rightElement=undefined`) */
  isManuallyResizable: PropTypes.bool,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
};

export default XUIEditableTableCellTextInput;
