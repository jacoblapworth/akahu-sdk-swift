import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCellControl from './XUIEditableTableCellControl';
import XUISelectBox from '../selectbox/XUISelectBox';
import { tableVariantClassNames } from './private/constants';

const baseName = `${tableVariantClassNames.editable}cellselectbox`;

const XUIEditableTableCellSelectBox = ({
  cellProps = {},
  children,
  containerClassName,
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
    selectBoxRef.current && selectBoxRef.current.isDropdownOpen() && event.stopPropagation();
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
      <XUISelectBox
        {...spreadProps}
        _useCellStyling
        containerClassName={cn(`${baseName}--control`, containerClassName)}
        hasDefaultLayout={false}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isLabelHidden
        isTextTruncated={false}
        onBlur={composedOnBlur}
        onFocus={composedOnFocus}
        ref={selectBoxRef}
      >
        {children}
      </XUISelectBox>
    </XUIEditableTableCellControl>
  );
};

XUIEditableTableCellSelectBox.propTypes = {
  /** Additional classes to be applied to the button */
  buttonClassName: PropTypes.string,

  /** Display text to be rendered on XUISelectBox button. */
  buttonContent: PropTypes.node.isRequired,

  /**
   * Title for the button caret
   * <br />
   * Recommended English value: *Toggle list*
   */
  caretTitle: PropTypes.string,

  cellProps: PropTypes.object,
  children: PropTypes.node,

  /** When a selection is made, close the dropdown */
  closeAfterSelection: PropTypes.bool,

  /** Additional classes to be applied to the container */
  containerClassName: PropTypes.string,

  /** Additional classes to be applied to the dropDown */
  dropdownClassName: PropTypes.string,

  /** Force the desktop experience, even if the viewport is narrow enough for mobile */
  forceDesktop: PropTypes.bool,

  /** ID to apply to the dropdown. Used primarily to associate a label with it's matched content.
   * If none is provided it's automatically generated. */
  id: PropTypes.string,

  /** Additional classes to be applied to the inputGroup */
  inputGroupClassName: PropTypes.string,

  /** Whether the button trigger and functionality are disabled */
  isDisabled: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** Whether or not the list should be forced open */
  isOpen: PropTypes.bool,

  /** Input Label */
  label: PropTypes.node.isRequired,

  /**
   * Setting this to `true` makes the dropdown as wide as the trigger (defaults to `true`). <br>
   * **Note:** *Setting this to true will override any size prop on Dropdown.* <br>
   * Setting this to `false` will allow the dropdown's width to be set independent of the trigger width. <br>
   * Setting this to `'min'` will set the dropdown's `min-width` to be the trigger width. <br/>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers (setting this to `'min'` will not override this).
   */
  matchTriggerWidth: PropTypes.oneOf([true, false, 'min']),

  /** Optional callback to be executed when the trigger loses focus */
  onBlur: PropTypes.func,

  /** Optional callback to be executed when dropdown closes */
  onDropdownHide: PropTypes.func,

  /** Optional callback to be executed when the trigger gains focus */
  onFocus: PropTypes.func,

  /** Selection callback */
  onSelect: PropTypes.func,

  qaHook: PropTypes.string,

  /** Whether focus should be restricted to the dropdown while it's open. */
  restrictFocus: PropTypes.bool,

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

export default XUIEditableTableCellSelectBox;

XUIEditableTableCellSelectBox.defaultProps = {
  matchTriggerWidth: true,
};
