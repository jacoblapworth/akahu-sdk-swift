import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCellControl from './XUIEditableTableCellControl';
import XUITextInput from '../textinput/XUITextInput';
import { tableVariantClassNames } from './private/constants';
import combineRefs from '../helpers/combineRefs';

const baseName = `${tableVariantClassNames.editable}celltextinput`;

const XUIEditableTableCellTextInput = ({
  cellProps = {},
  containerClassName,
  onBlur,
  onFocus,
  inlineAlignment,
  isDisabled,
  isInvalid,
  isValueReverseAligned,
  validationMessage,
  inputProps,
  inputRef,
  ...spreadProps
}) => {
  const innerRef = React.useRef();
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

    const { target } = event;
    // Timeout must be used to avoid a synchronisation issue with Safari
    window.setTimeout(() => target.select(), 0);

    onFocus && onFocus(event);
  };

  /**
   * @public
   * Focus the input inside the cell.
   */
  const focusInput = () => {
    getSelection().toString().length === 0 && innerRef?.current?.input?.focus?.();
  };

  return (
    <XUIEditableTableCellControl
      {...cellProps}
      cellIds={{
        wrapper: spreadProps.id,
        control: inputProps?.id,
      }}
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
        inputProps={inputProps}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isLabelHidden
        isValueReverseAligned={isValueReverseAligned || inlineAlignment === 'end'}
        onBlur={composedOnBlur}
        onFocus={composedOnFocus}
        ref={combineRefs(innerRef, inputRef)}
      />
    </XUIEditableTableCellControl>
  );
};

XUIEditableTableCellTextInput.propTypes = {
  cellProps: PropTypes.object,
  className: PropTypes.string,
  /** Class names to add to the div wrapping the input and icons */
  containerClassName: PropTypes.string,
  /** Default value of the text input */
  defaultValue: PropTypes.string,
  /** After rendering set focus at the end of the input */
  focusOnMount: PropTypes.bool,
  /** Aligns the content of the cell on the inline (horizontal) axis. */
  inlineAlignment: PropTypes.oneOf(['end', 'start']),
  /** Class names to add to the input element */
  inputClassName: PropTypes.string,
  /** Props to be spread onto the input element itself */
  inputProps: PropTypes.object,
  /** Sets a ref for the input element */
  inputRef: PropTypes.object,
  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Whether the textarea should be manually resizable (should only be used with
   * `isMultiline=true` and `rightElement=undefined`) */
  isManuallyResizable: PropTypes.bool,
  /** Whether this should be rendered as a multiline textarea */
  isMultiline: PropTypes.bool,
  /** Whether the input value is reverse-aligned */
  isValueReverseAligned: PropTypes.bool,
  /** Label to show above the input */
  label: PropTypes.node,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  /** Content to be added to the left of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding */
  leftElement: PropTypes.node,
  /** Maximum number of rows to render in the textarea (should only be used with
   * `isMultiline=true`) */
  maxRows: PropTypes.number,
  /** Minimum number of rows to render in the textarea (should only be used with
   * `isMutliline=true`) */
  minRows: PropTypes.number,
  /** Function to call when focus leaves the input */
  onBlur: PropTypes.func,
  /** Function to call when the input value is changed */
  onChange: PropTypes.func,
  /** Function to call when the input is focused (does not include side elements) */
  onFocus: PropTypes.func,
  /** Function to call on keydown inside the textinput */
  onKeyDown: PropTypes.func,
  /** Placeholder text for the input */
  placeholder: PropTypes.string,
  qaHook: PropTypes.string,
  /** Content to be added to the right of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding */
  rightElement: PropTypes.node,
  /** Set number of rows to use as a size for the textarea (should only be used
   * with `isMultiline=true`) */
  rows: PropTypes.number,
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
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
  /** Value of the text input */
  value: PropTypes.string,
};

export default XUIEditableTableCellTextInput;

XUIEditableTableCellTextInput.defaultProps = {
  inlineAlignment: 'start',
};
