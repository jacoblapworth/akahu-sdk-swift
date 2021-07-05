import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import autosize from 'autosize';

import combineRefs from '../helpers/combineRefs';
import { inputBaseClass, inputSizeClasses, baseSizeClasses } from './private/constants';
import { calculateMaxHeight } from './private/helpers';
import XUIControlWrapper from '../controlwrapper/XUIControlWrapper';
import generateIds, { generateIdsFromControlId, getAriaAttributes } from '../helpers/ariaHelpers';
import { sizeShift } from '../helpers/sizes';
import EditableTableCellContext from '../../contexts/EditableTableCellContext';
import SizeContext from '../../contexts/SizeContext';
import DisabledStateContext from '../../contexts/DisabledStateContext';
import labelRequiredWarning from '../helpers/labelRequiredWarning';

// Deconstructs attributes from props to determine whether autoresizing should be enabled
const shouldAutomaticallyResize = ({ isMultiline, rows }) =>
  isMultiline && typeof rows !== 'number';

class XUITextInput extends PureComponent {
  rootNode = React.createRef();

  labelRef = React.createRef();

  state = {
    charCount: null,
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
    const {
      maxRows,
      focusOnMount,
      characterCounter,
      value,
      defaultValue,
      leftElement,
      rightElement,
    } = this.props;

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

    if (focusOnMount) {
      this.input && this.input.focus();

      // Only highlight the value when the type supports setSelectionRange
      if (
        this.input &&
        ['text', 'search', 'url', 'tel', 'password'].indexOf(this.input.type) > -1
      ) {
        this.input.setSelectionRange(this.input.value.length, this.input.value.length);
      }
    }

    if (characterCounter?.maxCharCount) {
      this.setState({
        charCount: value?.length || defaultValue?.length || 0,
      });
    }
    const { placeholder, label, labelId, isLabelHidden } = this.props;
    labelRequiredWarning(
      XUITextInput.name,
      [
        'includes a label with text',
        'placeholder provided',
        'labelId provided',
        "includes a sideElement of type='text'",
      ],
      [
        this.labelRef.current?.innerText && !isLabelHidden,
        typeof label?.[0] === 'string',
        placeholder,
        labelId,
        leftElement?.props?.type === 'text',
        rightElement?.props?.type === 'text',
      ],
    );
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

  onChange = e => {
    // Ensures the character counter displays for both controlled and uncontrolled scenarios
    this.setState({
      charCount: e.target.value?.length,
    });
    this.props.onChange && this.props.onChange(e);
  };

  render() {
    return (
      <EditableTableCellContext.Consumer>
        {({ useCellStyling, cellAttributes }) => {
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
            characterCounter,
            // We want to remove these from the spread props, but they're not used in the render.
            /* eslint-disable no-unused-vars */
            maxRows,
            labelId,
            onFocus,
            onBlur,
            focusOnMount,
            /* eslint-enable no-unused-vars */
            ...otherProps
          } = input.props;
          const { maxHeight, hasFocus } = this.state;

          const charCount = this.state.charCount >= 0 ? this.state.charCount : defaultValue?.length;

          const isOverCharacterLimit =
            characterCounter?.maxCharCount && charCount > characterCounter?.maxCharCount;

          const classes = cn(
            inputClassName,
            `${inputBaseClass}--input`,
            inputSizeClasses[size],
            isMultiline && !isManuallyResizable && `${inputBaseClass}--input-resize-none`,
            isMultiline && isManuallyResizable && `${inputBaseClass}--input-resize-vertical`,
            isValueReverseAligned && `${inputBaseClass}--input-reverse-align`,
          );

          const rootClasses = cn(
            fieldClassName,
            `${inputBaseClass}wrapper`,
            isInvalid && `${inputBaseClass}wrapper-is-invalid`,
          );

          const baseClasses = cn(
            containerClassName,
            inputBaseClass,
            baseSizeClasses[size],
            (isInvalid || isOverCharacterLimit) && `${inputBaseClass}-is-invalid`,
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

          const ariaAttributes = cellAttributes || getAriaAttributes(this.wrapperIds, this.props);

          let isLabelInSideEl;
          if (
            !label &&
            !labelId &&
            (leftElement?.props?.type === 'text' || rightElement?.props?.type === 'text')
          ) {
            isLabelInSideEl = true;
          }
          const InnerWrapEl = isLabelInSideEl ? 'label' : 'div';

          return (
            <SizeContext.Provider value={sizeShift(size, -1)}>
              <DisabledStateContext.Provider value={{ isDisabled }}>
                <XUIControlWrapper
                  characterCounter={{
                    currentCharCount: charCount,
                    ...characterCounter,
                  }}
                  fieldClassName={rootClasses}
                  isInvalid={isOverCharacterLimit || isInvalid}
                  labelRef={this.labelRef}
                  validationMessage={
                    isOverCharacterLimit ? characterCounter?.validationMessage : validationMessage
                  }
                  wrapperIds={this.wrapperIds}
                  {...{
                    qaHook,
                    onKeyDown,
                    label,
                    hintMessage,
                    isFieldLayout,
                    labelClassName,
                    isLabelHidden,
                  }}
                  ref={this.rootNode}
                >
                  <InnerWrapEl className={baseClasses} data-automationid={qaHook} {...otherProps}>
                    {leftElement}
                    <InputEl
                      {...inputProps}
                      className={classes}
                      data-automationid={qaHook && `${qaHook}--input`}
                      defaultValue={defaultValue}
                      disabled={isDisabled}
                      onBlurCapture={input.onBlur}
                      // Conditional logic to ensure that the onChange function is only added to the DOM when needed
                      onChange={(onChange || characterCounter?.maxCharCount) && input.onChange}
                      onFocusCapture={input.onFocus}
                      placeholder={placeholder}
                      ref={combineRefs(inputRef, i => (this.input = i))}
                      type={type}
                      value={value}
                      {...ariaAttributes}
                      // used by autosize for textarea resizing http://www.jacklmoore.com/autosize/
                      rows={isMultiline ? rows || minRows : undefined}
                    />
                    {rightElement}
                  </InnerWrapEl>
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
  /** Character counter props */
  characterCounter: PropTypes.shape({
    /** Current character count of user input */
    currentCharCount: PropTypes.number,
    /** Whether to always show the character counter if `maxCharCount` is provided */
    forceShowCharacterCounter: PropTypes.bool,
    /** The character limit of the input value to convey to the user. This is a soft-limit. */
    maxCharCount: PropTypes.number.isRequired,
    /** The minimum character count when the character counter will show. Defaults to `maxCharCount * 0.9 - 5`. */
    minCharCountToShowCounter: PropTypes.number,
    /** Validation message to show when the user input length passes the maxCharCount.
     * Recommended English value: "Username can't be longer than {character limit #} characters" */
    validationMessage: PropTypes.node.isRequired,
  }),
  /** Default value of the text input */
  defaultValue: PropTypes.string,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** After rendering set focus at the end of the input */
  focusOnMount: PropTypes.bool,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Class names to add to the input element */
  inputClassName: PropTypes.string,
  /** Props to be spread onto the input element itself */
  inputProps: PropTypes.object,
  /** Sets a ref for the input element */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Whether to render as a solid borderless input */
  isBorderlessSolid: PropTypes.bool,
  /** Whether to render as a transparent borderless input */
  isBorderlessTransparent: PropTypes.bool,
  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,
  /** Whether to use the field layout classes */
  isFieldLayout: PropTypes.bool,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Should be set to true when placing a borderless input on a dark background */
  isInverted: PropTypes.bool,
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
  /** Whether the textarea should be manually resizable (should only be used with
   * `isMultiline=true` and `rightElement=undefined`) */
  isManuallyResizable: PropTypes.bool,
  /** Whether this should be rendered as a multiline textarea */
  isMultiline: PropTypes.bool,
  /** Whether the input value is reverse-aligned */
  isValueReverseAligned: PropTypes.bool,
  /** Label to show above the input */
  label: PropTypes.node,
  /** Class names to add to the label */
  labelClassName: PropTypes.string,
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
  /** Size of the input - Can be `xsmall`, `small` or `medium` */
  size: PropTypes.oneOf(Object.keys(baseSizeClasses)),
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

XUITextInput.defaultProps = {
  inputProps: {},
  minRows: 3,
  size: 'medium',
};

export default XUITextInput;
