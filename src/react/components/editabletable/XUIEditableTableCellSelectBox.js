import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCellControl from './XUIEditableTableCellControl';
import SelectBox from '../select-box/SelectBox';
import { tableName } from './private/constants';

const baseName = `${tableName}cellselectbox`;

const XUIEditableTableCellSelectBox = ({
  cellProps = {},
  children,
  containerClasses,
  onBlur,
  onFocus,
  isDisabled,
  isInvalid,
  validationMessage,
  ...spreadProps
}) => {
  const selectBoxRef = React.useRef();
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
   * Records the focus state onFocus, before calling any user-supplied handlers.
   * @param {event} event
   */
  const composedOnFocus = event => {
    setIsFocused(true);
    onFocus && onFocus(event);
  };

  /**
   * @public
   * Prevent the dropdown from closing onMouseDown (because otherwise it will re-open onClick).
   */
  const preventDropdownFromClosing = event => {
    /**
     * Stopping propagation is not ideal because it prevents other elements from knowing when the
     * user clicked on the page (like a modal that needs to know if you clicked outside the modal).
     *
     * To minimise this impact, we only stop propagation when we know the dropdown of this cell is
     * currently open.
     */
    selectBoxRef.current && selectBoxRef.current.isDropDownOpen() && event.stopPropagation();
  };

  /**
   * @public
   * Click the input inside the cell.
   */
  const clickInput = () => {
    !isDisabled &&
      getSelection().toString().length === 0 &&
      selectBoxRef.current &&
      selectBoxRef.current.ddt &&
      selectBoxRef.current.ddt.toggle &&
      selectBoxRef.current.ddt.toggle();
  };

  return (
    <XUIEditableTableCellControl
      {...cellProps}
      cellIds={{
        wrapper: spreadProps.id,
      }}
      className={cn(baseName, cellProps.className)}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isInvalid={isInvalid}
      onClick={clickInput}
      onMouseDown={preventDropdownFromClosing}
      validationMessage={validationMessage}
    >
      <SelectBox
        {...spreadProps}
        containerClasses={cn(`${baseName}--control`, containerClasses)}
        defaultLayout={false}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isLabelHidden
        isTextTruncated={false}
        onBlur={composedOnBlur}
        onFocus={composedOnFocus}
        ref={selectBoxRef}
      >
        {children}
      </SelectBox>
    </XUIEditableTableCellControl>
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

  /** Optional callback to be executed when the trigger loses focus */
  onBlur: PropTypes.func,

  /** Optional callback to be executed when the trigger gains focus */
  onFocus: PropTypes.func,

  /** Display text to be rendered on SelectBox button. */
  buttonContent: PropTypes.node.isRequired,

  /** Selection callback */
  onSelect: PropTypes.func,

  /** The XUI button variant to use as a trigger for the select box */
  buttonVariant: PropTypes.string,

  /** Whether the button trigger and functionality are disabled */
  isDisabled: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,

  /** Whether or not the list should be forced open */
  isOpen: PropTypes.bool,

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
};

export default XUIEditableTableCellSelectBox;

XUIEditableTableCellSelectBox.defaultProps = {
  matchTriggerWidth: true,
};
