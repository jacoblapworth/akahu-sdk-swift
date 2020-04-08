import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import XUIAutocompleter from '../autocompleter/XUIAutocompleter';
import { tableName } from './private/constants';
import { fixedWidthDropdownSizes } from '../dropdown/private/constants';

const baseName = `${tableName}cellautocompleter`;

class XUIEditableTableCellAutocompleter extends Component {
  completer = React.createRef();

  /**
   * @public
   * Set the state as not hidden in order to toggle the list open.
   */
  openDropDown = () => {
    this.completer.current.openDropDown();
  };

  /**
   * @public
   * Set the state as hidden in order to toggle the list closed.
   */
  closeDropDown = () => {
    this.completer.current.closeDropDown();
  };

  render() {
    const { cellProps = {}, className, triggerClassName, ...spreadProps } = this.props;
    return (
      <XUIEditableTableCell {...cellProps} className={cn(baseName, cellProps.className)}>
        <XUIAutocompleter
          {...spreadProps}
          className={cn(`${baseName}--control`, className)}
          isInputLabelHidden
          ref={this.completer}
          triggerClassName={cn(`${baseName}--trigger`, triggerClassName)}
        />
      </XUIEditableTableCell>
    );
  }
}

XUIEditableTableCellAutocompleter.propTypes = {
  cellProps: PropTypes.object,
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** Callback to handle when an option has been selected from the dropdown */
  onOptionSelect: PropTypes.func,

  /** Callback to handle when a pill has been backspaced */
  onBackspacePill: PropTypes.func,

  /** When set to true a loader will be displayed instead of the picklist items.
   * State for this should be managed externally and it's defaulted to false.
   */
  loading: PropTypes.bool,

  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `loading` prop is set to `true`.
   * <br />
   * Recommended English value: *Loading*
   */
  loadingLabel: PropTypes.string,

  /** ID to be added to the root node of the completer */
  id: PropTypes.string,

  /** ID to be added to the dropdown element of the completer */
  dropdownId: PropTypes.string,

  /** Value that should be inside the input. */
  searchValue: PropTypes.string,

  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** CSS class(es) to go on the dropdown list */
  dropdownClassName: PropTypes.string,

  /** CSS class(es) to go on the input */
  inputClassName: PropTypes.string,

  /** CSS class(es) to go on the input container component */
  inputContainerClassName: PropTypes.string,

  /** Label to show above the input */
  inputLabel: PropTypes.node,

  /**
   * Attributes to set on the native input element. <br>
   * **Note:**
   * *It's not recommended to pass `autoFocus` to `inputProps` as it hijacks the focus on load to focus that specific element.*
   */
  inputProps: PropTypes.object,

  /** CSS class(es) to go on the trigger element which contains the input and pills */
  triggerClassName: PropTypes.string,

  /** Placeholder for the input */
  placeholder: PropTypes.string,

  /** Max length of the input */
  maxLength: PropTypes.number,

  /** A set of pills to show next to input. Useful for showing what was selected in a multi-select.
   * Can also be used similarly to `XUITextInput`'s `leftElement`. */
  pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

  /** Right element to render within the `XUITextInput` component */
  rightElement: PropTypes.node,

  /** Left element to render within the `XUITextInput` component. Should not be used together with
   * the `pills` prop */
  leftElement: PropTypes.node,

  /** Callback for when the list opens */
  onOpen: PropTypes.func,

  /** Callback for when the list closes */
  onClose: PropTypes.func,

  /** Callback for when the user types into the search box.
   * The first argument passed in is the search term value. */
  onSearch: PropTypes.func,

  /** The debounce timeout before onSearch is called. Set to 0 to disable debouncing */
  searchDebounceTimeout: PropTypes.number,

  /** Maps to the `size` property of the dropdown component. */
  dropdownSize: PropTypes.oneOf(Object.keys(fixedWidthDropdownSizes)),

  /** Maps to the `closeOnSelect` property of the DropDownToggled component. */
  closeOnSelect: PropTypes.bool,

  /** Maps to the `closeOnTab` property of the DropDownToggled component. Set to false, if you've
   * supplied a footer element with any links or interaction. */
  closeOnTab: PropTypes.bool,

  /** Callback for adding additional onKeyDown functionality */
  onKeyDown: PropTypes.func,

  /** When set to true the dropdown will automatically open when the input is given focus. */
  openOnFocus: PropTypes.bool,

  /** Force the desktop user experience, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /** If a size is set, this will force the dropdown to that size instead of setting it as a
   * max width. */
  dropdownFixedWidth: PropTypes.bool,

  /**
   * Setting to false will allow the dropdown's width to be set independent of the trigger width. <br>
   * **Note:** *Setting this to true will override any size prop on DropDown.* <br>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers. Defaults to true.
   */
  matchTriggerWidth: PropTypes.bool,

  /** Whether the pills should wrap instead of scroll on overflow */
  disableWrapPills: PropTypes.bool,

  /** Whether to render as disabled */
  isDisabled: PropTypes.bool,

  /** ID to apply to the input element. Useful for labels. */
  inputId: PropTypes.string,

  /** A footer element can be added. */
  footer: PropTypes.element,

  /** Callback for when the highlighted item changes. */
  onHighlightChange: PropTypes.func,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
};

export default XUIEditableTableCellAutocompleter;

XUIEditableTableCellAutocompleter.defaultProps = {
  matchTriggerWidth: true,
};
