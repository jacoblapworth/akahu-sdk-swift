import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import SelectBox from '../select-box/SelectBox';
import { sizes, widths } from '../select-box/private/constants';
import { tableName } from './private/constants';

const baseName = `${tableName}cellselectbox`;

const XUIEditableTableCellSelectBox = ({
  cellProps = {},
  children,
  containerClasses,
  ...spreadProps
}) => {
  return (
    <XUIEditableTableCell {...cellProps} className={cn(baseName, cellProps.className)}>
      <SelectBox
        {...spreadProps}
        containerClasses={cn(`${baseName}--control`, containerClasses)}
        defaultLayout={false}
        isLabelHidden
      >
        {children}
      </SelectBox>
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellSelectBox.propTypes = {
  cellProps: PropTypes.object,
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** Input Label */
  label: PropTypes.node.isRequired,

  /** When a selection is made, close the dropdown */
  closeAfterSelection: PropTypes.bool,

  /** Additional classes to be applied to the button */
  buttonClasses: PropTypes.string,

  /** Additional classes to be applied to the container */
  containerClasses: PropTypes.string,

  /** Additional classes to be applied to the dropDown */
  dropDownClasses: PropTypes.string,

  /** Additional classes to be applied to the inputGroup */
  inputGroupClasses: PropTypes.string,

  /**
   * Title for the button caret
   * <br />
   * Recommended English value: *Toggle list*
   */
  caretTitle: PropTypes.string,

  /** Optional callback to be executed when dropdown closes */
  onDropdownHide: PropTypes.func,

  /** Display text to be rendered on SelectBox button. */
  buttonContent: PropTypes.node.isRequired,

  /** Selection callback */
  onSelect: PropTypes.func,

  /** The XUI button variant to use as a trigger for the select box */
  buttonVariant: PropTypes.string,

  /** Whether the button trigger and functionality are disabled */
  isDisabled: PropTypes.bool,

  /** Whether or not the list should be forced open */
  isOpen: PropTypes.bool,

  /** Optionally toggles the text truncation */
  isTextTruncated: PropTypes.bool,

  /** Force the desktop experience, even if the viewport is narrow enough for mobile */
  forceDesktop: PropTypes.bool,

  /**
   * Setting to false will allow the dropdown's width to be set independent of the trigger width. <br>
   * **Note:** *Setting this to true will override any size prop on DropDown.* <br>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers.
   */
  matchTriggerWidth: PropTypes.bool,

  /** Whether focus should be restricted to the dropdown while it's open. */
  restrictFocus: PropTypes.bool,

  /** ID to apply to the dropdown. Used primarily to associate a label with it's matched content.
   * If none is provided it's automatically generated. */
  id: PropTypes.string,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
};

export default XUIEditableTableCellSelectBox;

XUIEditableTableCellSelectBox.defaultProps = {
  matchTriggerWidth: true,
};
