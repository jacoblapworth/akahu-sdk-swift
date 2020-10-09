import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import XUIAutocompleterSecondarySearch from '../autocompleter/XUIAutocompleterSecondarySearch';
import { tableName } from './private/constants';
import { fixedWidthDropdownSizes } from '../dropdown/private/constants';

const baseName = `${tableName}cellsecondarysearch`;

const XUIEditableTableCellSecondarySearch = ({ cellProps = {}, className, ...spreadProps }) => {
  return (
    <XUIEditableTableCell {...cellProps} className={cn(baseName, cellProps.className)}>
      <XUIAutocompleterSecondarySearch
        {...spreadProps}
        className={cn(`${baseName}--control`, className)}
        isInputLabelHidden
      />
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellSecondarySearch.propTypes = {
  cellProps: PropTypes.object,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /** Callback to handle when an option has been selected from the dropdown */
  onOptionSelect: PropTypes.func,

  /** ID to be added to the dropdown element of the completer */
  id: PropTypes.string,

  /** Value that should be inside the input. */
  searchValue: PropTypes.string,

  /** CSS class(es) to go on the dropdown list */
  dropdownClassName: PropTypes.string,

  /** CSS class(es) to go on the input */
  inputClassName: PropTypes.string,

  /** CSS class(es) to go on the input container */
  inputContainerClassName: PropTypes.string,

  /** Attributes to set on the native input element */
  inputProps: PropTypes.object,

  /** Placeholder for the input */
  placeholder: PropTypes.string,

  /** Callback for when the list opens */
  onOpen: PropTypes.func,

  /** Callback for when the list closes */
  onClose: PropTypes.func,

  /** Callback for when the user types into the search box */
  onSearch: PropTypes.func.isRequired,

  /** If you want to throttle the input's onChange handler, put the throttle interval here */
  searchThrottleInterval: PropTypes.number,

  /** Maps to the 'size' property of the dropdown component. */
  dropdownSize: PropTypes.oneOf(Object.keys(fixedWidthDropdownSizes)),

  /** Maps to the `closeOnSelect` property of the DropdownToggled component. */
  closeOnSelect: PropTypes.bool,

  /** Maps to the `closeOnTab` property of the DropdownToggled component. Set to false,
   * if you've supplied a footer element with any links or interaction. */
  closeOnTab: PropTypes.bool,

  /** Callback for adding additional onKeyPress functionality */
  onKeyDown: PropTypes.func,

  /** Will be passed directly down to the DropdownToggled component as the main trigger. */
  trigger: PropTypes.element.isRequired,

  /** ID to be applied to the input element. */
  inputId: PropTypes.string,

  /** Label to show above the input */
  inputLabel: PropTypes.node,

  /** Whether to allow the dropdown to take the full width of the wrapper (as SelectBox)
   * or wrap with an inline block. */
  isBlock: PropTypes.bool,

  /** Should label be applied as an aria-label, rather than being visibly displayed. */
  isInputLabelHidden: PropTypes.bool,

  /** Force the desktop user experience, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /** If a size is set, this will force the dropdown to that size instead of setting it
   * as a max width. */
  dropdownFixedWidth: PropTypes.bool,

  /** Whether focus should be restricted to the dropdown while it's open. */
  restrictFocus: PropTypes.bool,

  /**
   * Setting to true will allow the dropdown's width to be set dependent of the trigger width. <br>
   * **Note:** *Setting this to true will override any size prop on Dropdown.* <br>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers. Defaults to true.
   */
  matchTriggerWidth: PropTypes.bool,

  /** A Footer element can be added. */
  footer: PropTypes.element,
};

export default XUIEditableTableCellSecondarySearch;

XUIEditableTableCellSecondarySearch.defaultProps = {
  matchTriggerWidth: true,
};
