import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import autosize from 'autosize';

import compose from '../helpers/compose';
import { inputBaseClass, inputSizeClasses, baseSizeClasses } from './private/constants';
import { calculateMaxHeight } from './private/helpers';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds, { generateIdsFromControlId } from '../controlwrapper/helpers';
import { sizeShift } from '../helpers/sizes';
import EditableTableCellContext from '../../contexts/EditableTableCellContext';
import SizeContext from '../../contexts/SizeContext';
import DisabledStateContext from '../../contexts/DisabledStateContext';

// Deconstructs attributes from props to determine whether autoresizing should be enabled
const shouldAutomaticallyResize = ({ isMultiline, rows }) =>
  isMultiline && typeof rows !== 'number';

class XUITextInput extends PureComponent {
  state = {
    hasFocus: false,
  };

  wrapperIds = this.getWrapperIds();

  getWrapperIds() {
    const { inputProps, labelId } = this.props;
    return inputProps && inputProps.id
      ? generateIdsFromControlId(inputProps.id)
      : generateIds(labelId);
  }

  componentDidMount() {
    const { maxRows } = this.props;

    if (shouldAutomaticallyResize(this.props) && this.input) {
      if (maxRows != null) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          maxHeight: calculateMaxHeight({
            textArea: this.input,
            maxRows,
          }),
        });
      }

      autosize(this.input);
    }
  }

  componentWillUnmount() {
    autosize.destroy(this.input);
  }

  componentDidUpdate() {
    if (shouldAutomaticallyResize(this.props) && this.input) {
      const evt = document.createEvent('Event');
      evt.initEvent('autosize:update', true, false);
      this.input.dispatchEvent(evt);
    }
  }

  onFocus = e => {
    this.props.onFocus && this.props.onFocus(e);
    this.setState({
      hasFocus: true,
    });
  };

  onBlur = e => {
    this.props.onBlur && this.props.onBlur(e);
    this.setState({
      hasFocus: false,
    });
  };

  render() {
    return (
      <EditableTableCellContext.Consumer>
        {({ useCellStyling }) => {
          const input = this;
          const {
            value,
            type,
            size,
            isInvalid,
            isBorderlessTransparent,
            isBorderlessSolid,
            label,
            validationMessage,
            hintMessage,
            onChange,
            onKeyDown,
            leftElement,
            rightElement,
            qaHook,
            inputProps,
            inputRef,
            isFieldLayout,
            fieldClassName,
            containerClassName,
            labelClassName,
            inputClassName,
            defaultValue,
            placeholder,
            isInverted,
            isDisabled,
            isMultiline,
            isValueReverseAligned,
            isManuallyResizable,
            isLabelHidden,
            minRows,
            rows,
            // We want to remove these from the spread props, but they're not used in the render.
            /* eslint-disable no-unused-vars */
            maxRows,
            labelId,
            onFocus,
            onBlur,
            /* eslint-enable no-unused-vars */
            ...otherProps
          } = input.props;
          const { maxHeight, hasFocus } = this.state;

          const classes = cn(
            inputClassName,
            `${inputBaseClass}--input`,
            inputSizeClasses[size],
            isMultiline && !isManuallyResizable && `${inputBaseClass}--input-resize-none`,
            isMultiline && isManuallyResizable && `${inputBaseClass}--input-resize-vertical`,
            isValueReverseAligned && `${inputBaseClass}--input-reverse-align`,
          );

          const rootClasses = cn(fieldClassName, `${inputBaseClass}wrapper`);

          const baseClasses = cn(
            containerClassName,
            inputBaseClass,
            baseSizeClasses[size],
            isInvalid && `${inputBaseClass}-is-invalid`,
            (isBorderlessTransparent || isBorderlessSolid) && `${inputBaseClass}-borderless`,
            isBorderlessTransparent && `${inputBaseClass}-borderless-transparent`,
            isBorderlessSolid && `${inputBaseClass}-borderless-solid`,
            isInverted && `${inputBaseClass}-borderless-inverted`,
            hasFocus && `${inputBaseClass}-focus`,
            isDisabled && `${inputBaseClass}-is-disabled`,
            useCellStyling && `${inputBaseClass}-cell`,
          );

          const InputEl = isMultiline ? 'textarea' : 'input';

          inputProps.style = {
            ...inputProps.style,
            maxHeight, // used by autosize for textarea resizing http://www.jacklmoore.com/autosize/
          };

          return (
            <SizeContext.Provider value={sizeShift(size, -1)}>
              <DisabledStateContext.Provider value={{ isDisabled }}>
                <XUIControlWrapper
                  fieldClassName={rootClasses}
                  wrapperIds={this.wrapperIds}
                  {...{
                    qaHook,
                    onKeyDown,
                    label,
                    isInvalid,
                    validationMessage,
                    hintMessage,
                    isFieldLayout,
                    labelClassName,
                    isLabelHidden,
                  }}
                >
                  <div className={baseClasses} data-automationid={qaHook} {...otherProps}>
                    {leftElement}
                    <InputEl
                      {...inputProps}
                      className={classes}
                      data-automationid={qaHook && `${qaHook}--input`}
                      defaultValue={defaultValue}
                      disabled={isDisabled}
                      onBlurCapture={input.onBlur}
                      onChange={onChange}
                      onFocusCapture={input.onFocus}
                      placeholder={placeholder}
                      ref={compose(inputRef, i => (this.input = i))}
                      type={type}
                      value={value}
                      {...getAriaAttributes(this.wrapperIds, this.props)}
                      // used by autosize for textarea resizing http://www.jacklmoore.com/autosize/
                      rows={isMultiline ? rows || minRows : undefined}
                    />
                    {rightElement}
                  </div>
                </XUIControlWrapper>
              </DisabledStateContext.Provider>
            </SizeContext.Provider>
          );
        }}
      </EditableTableCellContext.Consumer>
    );
  }
}

XUITextInput.propTypes = {
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
  /** Size of the input - Can be `xsmall`, `small` or `medium` */
  size: PropTypes.oneOf(Object.keys(baseSizeClasses)),
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
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Props to be spread onto the input element itself */
  inputProps: PropTypes.object,
  /** Sets a ref for the input element */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Content to be added to the left of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding */
  leftElement: PropTypes.node,
  /** Content to be added to the right of the input element. It is recommended that you use
   * `XUITextInputSideElement` for correct padding */
  rightElement: PropTypes.node,
  /** Whether to use the field layout classes */
  isFieldLayout: PropTypes.bool,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Class names to add to the div wrapping the input and icons */
  containerClassName: PropTypes.string,
  /** Class names to add to the label */
  labelClassName: PropTypes.string,
  /** Class names to add to the input element */
  inputClassName: PropTypes.string,
  /** Placeholder text for the input */
  placeholder: PropTypes.string,
  /** Whether to render as a solid borderless input */
  isBorderlessSolid: PropTypes.bool,
  /** Whether to render as a transparent borderless input */
  isBorderlessTransparent: PropTypes.bool,
  /** Should be set to true when placing a borderless input on a dark background */
  isInverted: PropTypes.bool,
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
  /** Should label be applied as an aria-label, rather than being visibly displayed. */
  isLabelHidden(props, propName) {
    // If the label is hidden, the label value must be a string
    if (props[propName] && props.labelText && typeof props.labelText !== 'string') {
      return new Error(
        'XUITextInput labelText must be a string ' +
          'when isLabelHidden as it is applied as an attribute',
      );
    }
    return null;
  },
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
};

XUITextInput.defaultProps = {
  inputProps: {},
  minRows: 3,
  size: 'medium',
};

export default XUITextInput;
