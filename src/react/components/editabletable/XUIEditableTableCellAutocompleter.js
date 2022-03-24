import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCellControl from './XUIEditableTableCellControl';
import XUIAutocompleter from '../autocompleter/XUIAutocompleter';
import { tableVariantClassNames } from './private/constants';
import { fixedWidthDropdownSizes } from '../dropdown/private/constants';
import { ns } from '../helpers/xuiClassNamespace';

const baseName = `${tableVariantClassNames.editable}cellautocompleter`;

class XUIEditableTableCellAutocompleter extends Component {
  completerRef = React.createRef();

  state = {
    isFocused: false,
  };

  /**
   * Records the focus state onBlur, before calling any user-supplied handlers.
   * @param {event} event
   */
  composedOnBlur = event => {
    this.setState({ isFocused: false });
    this.props.inputProps && this.props.inputProps.onBlur && this.props.inputProps.onBlur(event);
  };

  /**
   * Records the focus state onFocus, before calling any user-supplied handlers.
   * @param {event} event
   */
  composedOnFocus = event => {
    this.setState({ isFocused: true });
    this.props.inputProps && this.props.inputProps.onFocus && this.props.inputProps.onFocus(event);
  };

  /**
   * @public
   * Set the state as not hidden in order to toggle the list open.
   */
  openDropdown = () => {
    this.completerRef.current.openDropdown();
  };

  /**
   * @public
   * Set the state as hidden in order to toggle the list closed.
   */
  closeDropdown = () => {
    this.completerRef.current.closeDropdown();
  };

  /**
   * Focuses the input inside the cell, before calling any user-supplied handlers.
   */
  composedOnClick = event => {
    const selection = getSelection();
    (selection.toString().length === 0 || !event.target?.contains(selection.focusNode)) &&
      this.focusInput();

    this.props.cellProps?.onClick?.(event);
  };

  /**
   * Focuses the input inside the cell, before calling any user-supplied handlers.
   */
  composedOnMouseDown = event => {
    if (event.target.classList.contains(`${ns}-editabletablecell--validation`)) {
      // Close the dropdown when interacting with validation
      this.closeDropdown();
    }
    if (event.target === event.currentTarget) {
      // Don't lose focus when interacting with the table cell
      event.preventDefault();

      // DDT closes its dropdown when the window receives an onMouseDown from outside the dropdown.
      // When the dropdown is closed the trigger gains focus, so we need to send the focus to this
      // cell's input after other dropdowns have closed.
      setTimeout(this.focusInput);
    }

    this.props.cellProps?.onMouseDown?.(event);
  };

  /**
   * @public
   * Focus the input inside the cell.
   */
  focusInput = () => {
    this.completerRef.current?.focusInput();
  };

  render() {
    const {
      cellProps = {},
      className,
      inputProps,
      isDisabled,
      isInvalid,
      forceStatefulPicklist,
      triggerClassName,
      useNewFocusBehaviour,
      validationMessage,
      ...spreadProps
    } = this.props;

    return (
      <XUIEditableTableCellControl
        {...cellProps}
        cellIds={{
          wrapper: spreadProps.id,
          control: inputProps?.id,
        }}
        className={cn(baseName, cellProps.className)}
        isDisabled={isDisabled}
        isFocused={this.state.isFocused}
        isInvalid={isInvalid}
        onClick={this.composedOnClick}
        onMouseDown={this.composedOnMouseDown}
        validationMessage={validationMessage}
      >
        <XUIAutocompleter
          {...spreadProps}
          _useCellStyling
          className={cn(`${baseName}--control`, className)}
          forceStatefulPicklist={forceStatefulPicklist}
          inputProps={{
            ...inputProps,
            onBlur: this.composedOnBlur,
            onFocus: this.composedOnFocus,
          }}
          isDisabled={isDisabled}
          isInputLabelHidden
          isInvalid={isInvalid}
          ref={this.completerRef}
          triggerClassName={cn(`${baseName}--trigger`, triggerClassName)}
          useNewFocusBehaviour={useNewFocusBehaviour}
        />
      </XUIEditableTableCellControl>
    );
  }
}

XUIEditableTableCellAutocompleter.propTypes = {
  cellProps: PropTypes.object,
  children: PropTypes.node,

  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Maps to the `closeOnSelect` property of the DropdownToggled component. */
  closeOnSelect: PropTypes.bool,

  /** Maps to the `closeOnTab` property of the DropdownToggled component. Set to false, if you've
   * supplied a footer element with any links or interaction. */
  closeOnTab: PropTypes.bool,

  /** Whether the pills should wrap instead of scroll on overflow */
  disableWrapPills: PropTypes.bool,

  /** CSS class(es) to go on the dropdown list */
  dropdownClassName: PropTypes.string,

  /** If a size is set, this will force the dropdown to that size instead of setting it as a
   * max width. */
  dropdownHasFixedWidth: PropTypes.bool,

  /** ID to be added to the dropdown element of the completer */
  dropdownId: PropTypes.string,

  /** Maps to the `size` property of the dropdown component. */
  dropdownSize: PropTypes.oneOf(Object.keys(fixedWidthDropdownSizes)),

  /** A footer element can be added. */
  footer: PropTypes.element,

  /** Force the desktop user experience, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /** Force wrapping `XUIDropdownPanel` children in a `XUIStatefulPicklist` */
  forceStatefulPicklist: PropTypes.bool,

  /** ID to be added to the root node of the completer */
  id: PropTypes.string,

  /** CSS class(es) to go on the input */
  inputClassName: PropTypes.string,

  /** CSS class(es) to go on the input container component */
  inputContainerClassName: PropTypes.string,

  /** ID to apply to the input element. Useful for labels. */
  inputId: PropTypes.string,

  /** Label to show above the input */
  inputLabel: PropTypes.node,

  /**
   * Attributes to set on the native input element. <br>
   * **Note:**
   * *It's not recommended to pass `autoFocus` to `inputProps` as it hijacks the focus on load to focus that specific element.*
   */
  inputProps: PropTypes.object,

  /** Whether to render as disabled */
  isDisabled: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** When set to true a loader will be displayed instead of the picklist items.
   * State for this should be managed externally and it's defaulted to false.
   */
  isLoading: PropTypes.bool,

  /** Left element to render within the `XUITextInput` component. Should not be used together with
   * the `pills` prop */
  leftElement: PropTypes.node,

  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `isLoading` prop is set to `true`.
   * <br />
   * Recommended English value: *Loading*
   */
  loadingAriaLabel: PropTypes.string,

  /**
   * Setting this to `true` makes the dropdown as wide as the trigger (defaults to `true`). <br>
   * **Note:** *Setting this to `true` will override any `size` prop on Dropdown.* <br>
   * Setting this to `false` will allow the dropdown's width to be set independent of the trigger width. <br>
   * Setting this to `'min'` will set the dropdown's `min-width` to be the trigger width. <br/>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers (setting this to `'min'` will not override this).
   */
  matchTriggerWidth: PropTypes.oneOf([true, false, 'min']),

  /** Max length of the input */
  maxLength: PropTypes.number,

  /** Callback to handle when a pill has been backspaced */
  onBackspacePill: PropTypes.func,

  /** Callback for when the list closes */
  onClose: PropTypes.func,

  /** Callback for when the highlighted item changes. */
  onHighlightChange: PropTypes.func,

  /** Callback for adding additional onKeyDown functionality */
  onKeyDown: PropTypes.func,

  /** Callback for when the list opens */
  onOpen: PropTypes.func,

  /** Callback to handle when an option has been selected from the dropdown */
  onOptionSelect: PropTypes.func,

  /** Callback for when the user types into the search box.
   * The first argument passed in is the search term value. */
  onSearch: PropTypes.func,

  /** When set to true the dropdown will automatically open when the input is given focus. */
  openOnFocus: PropTypes.bool,

  /** A set of pills to show next to input. Useful for showing what was selected in a multi-select.
   * Can also be used similarly to `XUITextInput`'s `leftElement`. */
  pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

  /** Placeholder for the input */
  placeholder: PropTypes.string,

  qaHook: PropTypes.string,

  /** Right element to render within the `XUITextInput` component */
  rightElement: PropTypes.node,

  /** The debounce timeout before onSearch is called. Set to 0 to disable debouncing */
  searchDebounceTimeout: PropTypes.number,

  /** Value that should be inside the input. */
  searchValue: PropTypes.string,

  /** CSS class(es) to go on the trigger element which contains the input and pills */
  triggerClassName: PropTypes.string,

  /** Whether or not to use the new focus behaviour - which treats dropdown navigation
   * like a `combobox` role. Defaults to `false`.
   */
  useNewFocusBehaviour: PropTypes.bool,

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

export default XUIEditableTableCellAutocompleter;

XUIEditableTableCellAutocompleter.defaultProps = {
  forceStatefulPicklist: false,
  matchTriggerWidth: true,
};
