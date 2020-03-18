import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import XUITextInput from '../textInput/XUITextInput';
import { tableName } from './private/constants';

const baseName = `${tableName}celltextinput`;

const XUIEditableTableCellTextInput = ({ cellProps = {}, containerClassName, ...spreadProps }) => {
  return (
    <XUIEditableTableCell {...cellProps} className={cn(baseName, cellProps.className)}>
      <XUITextInput
        {...spreadProps}
        containerClassName={cn(`${baseName}--control`, containerClassName)}
        isLabelHidden
      />
    </XUIEditableTableCell>
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
