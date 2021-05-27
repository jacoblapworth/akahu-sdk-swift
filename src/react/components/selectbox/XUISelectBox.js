import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import XUIDropdown from '../dropdown/XUIDropdown';
import XUIDropdownToggled from '../dropdown/XUIDropdownToggled';
import XUIButton from '../button/XUIButton';
import { sizes, widths } from './private/constants';
import XUIPicklist from '../picklist/XUIPicklist';
import qaHooks from './qaHooks';
import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapper from '../controlwrapper/XUIControlWrapper';
import generateIds, { getAriaAttributes } from '../helpers/ariaHelpers';

import EditableTableCellContext from '../../contexts/EditableTableCellContext';

/**
 * If a qaHook is supplied in component props this helper provides a suffix for
 * sub-components
 *
 * @private
 * @param {String} propsQaHook The qaHook prop supplied to the component
 * @param {String} suffix      The suffix to add. This should be a constant from
 *                             the QA_HOOKS property of constants object.
 * @return {String | null}						 QA_HOOK + Suffix or null if qaHook is undefined
 */
function setQaHook(propsQaHook, suffix) {
  return propsQaHook ? `${propsQaHook}-${suffix}` : null;
}

const selectBaseClass = `${ns}-select`;

export default class XUISelectBox extends Component {
  selectId = this.props.id || uuidv4();

  wrapperIds = generateIds(this.selectId);

  isDropdownOpen = () => !!this.ddt && this.ddt.isDropdownOpen();

  render() {
    return (
      <EditableTableCellContext.Consumer>
        {({ useCellStyling, cellAttributes }) => {
          const selectBox = this;
          const {
            buttonClasses,
            buttonContent,
            buttonVariant,
            caretTitle,
            children,
            closeAfterSelection,
            containerClasses,
            defaultLayout,
            dropDownClasses,
            forceDesktop,
            fullWidth,
            hintMessage,
            inputGroupClasses,
            isDisabled,
            isFieldLayout,
            isInvalid,
            isLabelHidden,
            isOpen,
            isTextTruncated,
            label,
            labelClassName,
            matchTriggerWidth,
            onBlur,
            onDropdownHide,
            onFocus,
            onSelect,
            qaHook,
            restrictFocus,
            size,
            validationMessage,
          } = this.props;

          const buttonClassNames = cn(
            `${selectBaseClass}--button`,
            !buttonVariant && `${selectBaseClass}--button-no-variant`,
            buttonClasses,
          );
          const inputGroupClassNames = cn(
            defaultLayout && `${selectBaseClass}-layout`,
            inputGroupClasses,
            !useCellStyling && isInvalid && `${selectBaseClass}-is-invalid`,
          );

          const containerClassNames = cn(
            useCellStyling && `${selectBaseClass}-cell`,
            containerClasses,
          );

          const ariaAttributes = cellAttributes || getAriaAttributes(this.wrapperIds, this.props);

          const trigger = (
            <XUIButton
              _caretClassName={`${selectBaseClass}--caret`}
              _useCellStyling={useCellStyling}
              {...ariaAttributes}
              className={buttonClassNames}
              fullWidth={fullWidth}
              hasCaret
              id={this.wrapperIds.control}
              isDisabled={isDisabled}
              onBlur={onBlur}
              onFocus={onFocus}
              qaHook={setQaHook(qaHook, qaHooks.button)}
              ref={c => (selectBox.trigger = c)}
              size={size}
              type="button"
              variant={buttonVariant}
            >
              <span
                className={cn(
                  `${selectBaseClass}--content`,
                  isTextTruncated && `${selectBaseClass}--content-truncated`,
                )}
              >
                {buttonContent}
              </span>
            </XUIButton>
          );

          const dropdown = (
            <XUIDropdown
              // These aria attributes currently go nowhere
              ariaAttributes={getAriaAttributes(this.wrapperIds.control, this.props)}
              className={dropDownClasses}
              id={selectBox.selectId}
              onSelect={onSelect}
              qaHook={setQaHook(qaHook, qaHooks.dropdown)}
              restrictFocus={restrictFocus}
            >
              <XUIPicklist>{children}</XUIPicklist>
            </XUIDropdown>
          );

          return (
            <div className={containerClassNames} data-automationid={qaHook}>
              <XUIControlWrapper
                isFieldLayout={isFieldLayout}
                qaHook={setQaHook(qaHook, qaHooks.label)}
                wrapperIds={this.wrapperIds}
                {...{
                  isLabelHidden,
                  label,
                  isInvalid,
                  validationMessage,
                  hintMessage,
                  labelClassName,
                }}
              >
                <div
                  className={inputGroupClassNames}
                  data-automationid={setQaHook(qaHook, qaHooks.inputGroup)}
                >
                  {React.Children.count(children) === 0 ? (
                    trigger
                  ) : (
                    <XUIDropdownToggled
                      closeOnSelect={closeAfterSelection}
                      dropdown={dropdown}
                      forceDesktop={forceDesktop}
                      isBlock
                      isHidden={!isOpen}
                      matchTriggerWidth={matchTriggerWidth}
                      onClose={onDropdownHide}
                      qaHook={setQaHook(qaHook, qaHooks.dropdownToggled)}
                      ref={c => (selectBox.ddt = c)}
                      trigger={trigger}
                    />
                  )}
                </div>
              </XUIControlWrapper>
            </div>
          );
        }}
      </EditableTableCellContext.Consumer>
    );
  }
}

XUISelectBox.propTypes = {
  /** Additional classes to be applied to the button */
  buttonClasses: PropTypes.string,

  /** Display text to be rendered on the `XUISelectBox` button. */
  buttonContent: PropTypes.node.isRequired,

  /** The XUI button variant to use as a trigger for the select box */
  buttonVariant: PropTypes.string,

  /**
   * Title for the button caret
   * <br />
   * Recommended English value: *Toggle list*
   */
  caretTitle: PropTypes.string,

  children: PropTypes.node,

  /** When a selection is made, close the dropdown */
  closeAfterSelection: PropTypes.bool,

  /** Additional classes to be applied to the container */
  containerClasses: PropTypes.string,

  /** Use XUI provided layout classes */
  defaultLayout: PropTypes.bool,

  /** Additional classes to be applied to the dropDown */
  dropDownClasses: PropTypes.string,

  /** Force the desktop experience, even if the viewport is narrow enough for mobile */
  forceDesktop: PropTypes.bool,

  /**
   * Modifier for the width of the XUISelectBox: `always`, `small-down`, or `never`.
   */
  fullWidth: PropTypes.oneOf(widths),

  /** Hint message to show under the input */
  hintMessage: PropTypes.node,

  /** ID to apply to the dropdown. Used primarily to associate a label with it's matched content.
   * If none is provided it's automatically generated. */
  id: PropTypes.string,

  /** Additional classes to be applied to the inputGroup */
  inputGroupClasses: PropTypes.string,

  /** Whether the button trigger and functionality are disabled */
  isDisabled: PropTypes.bool,

  /** Whether to use the field layout classes  */
  isFieldLayout: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** Input Label visibility */
  isLabelHidden: PropTypes.bool,

  /** Whether or not the list should be forced open */
  isOpen: PropTypes.bool,

  /** Optionally toggles the text truncation */
  isTextTruncated: PropTypes.bool,

  /** Input Label */
  label: PropTypes.node.isRequired,

  /** Additional classes to be applied to the label */
  labelClassName: PropTypes.string,

  /**
   * Setting to false will allow the dropdown's width to be set independent of the trigger width. <br>
   * **Note:** *Setting this to true will override any size prop on `XUIDropdown`.* <br>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers.
   */
  matchTriggerWidth: PropTypes.bool,

  /** Optional callback to be executed when the trigger loses focus */
  onBlur: PropTypes.func,

  /** Optional callback to be executed when dropdown closes */
  onDropdownHide: PropTypes.func,

  /** Optional callback to be executed when the trigger gains focus */
  onFocus: PropTypes.func,

  /** Selection callback */
  onSelect: PropTypes.func,

  /** for adding automation ID to component as well as input and button sub-components */
  qaHook: PropTypes.string,

  /** Whether focus should be restricted to the dropdown while it's open. */
  restrictFocus: PropTypes.bool,

  /**
   * Modifier for the size of the select box: `medium`, `small`, or `xsmall`.
   *
   * If `XUISelectBoxOption` does not have a size set, it will inherit the size from `XUISelectBox`.
   */
  size: PropTypes.oneOf(sizes),

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

XUISelectBox.defaultProps = {
  closeAfterSelection: true,
  defaultLayout: true,
  forceDesktop: false,
  fullWidth: 'always',
  isOpen: false,
  isTextTruncated: true,
  matchTriggerWidth: true,
  restrictFocus: true,
};
