import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import XUIDropdown from '../dropdown/XUIDropdown';
import XUIDropdownToggled from '../dropdown/XUIDropdownToggled';
import SelectBoxTrigger from './private/SelectBoxTrigger';
import { selectBaseClass, sizes, widths } from './private/constants';
import XUIPicklist from '../picklist/XUIPicklist';
import qaHooks from './qaHooks';
import XUIControlWrapper from '../controlwrapper/XUIControlWrapper';
import generateIds, { getAriaAttributes } from '../helpers/ariaHelpers';
import { textButtonVariants } from '../button/private/constants';

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
  return propsQaHook ? `${propsQaHook}${suffix}` : null;
}

export default class XUISelectBox extends Component {
  selectId = this.props.id || `xui-${nanoid(10)}`;

  trigger = React.createRef();

  ddt = React.createRef();

  // This is an atypical use of generateIds, in which we are using the *dropdown* ID purely
  // as a root ID from which to generate the control and message IDs. If we one day allow
  // SelectBox to accept a labelId prop, this will need to be re-engineered.
  wrapperIds = generateIds({ labelId: this.selectId });

  isDropdownOpen = () => this.ddt.current?.isDropdownOpen();

  render() {
    return (
      <EditableTableCellContext.Consumer>
        {({ cellAttributes }) => {
          const selectBox = this;
          const {
            _useCellStyling,
            buttonClassName,
            buttonContent,
            buttonVariant,
            children,
            closeAfterSelection,
            containerClassName,
            caretTitle,
            hasDefaultLayout,
            dropdownClassName,
            forceDesktop,
            fullWidth,
            hintMessage,
            inputGroupClassName,
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
            useNewFocusBehaviour,
            validationMessage,
          } = this.props;

          const inputGroupClassNames = cn(
            `${selectBaseClass}`,
            hasDefaultLayout && `${selectBaseClass}-layout`,
            inputGroupClassName,
            !_useCellStyling && isInvalid && `${selectBaseClass}-is-invalid`,
          );

          const containerClassNames = cn(
            _useCellStyling && `${selectBaseClass}-cell`,
            containerClassName,
          );

          const ariaAttributes = cellAttributes || getAriaAttributes(this.wrapperIds, this.props);

          const trigger = (
            <SelectBoxTrigger
              _caretClassName={`${selectBaseClass}--caret`}
              _useCellStyling={_useCellStyling}
              buttonClassName={buttonClassName}
              buttonContent={buttonContent}
              buttonVariant={buttonVariant}
              {...ariaAttributes}
              fullWidth={fullWidth}
              id={this.wrapperIds.control}
              isDisabled={isDisabled}
              isTextTruncated={isTextTruncated}
              onBlur={onBlur}
              onFocus={onFocus}
              qaHook={setQaHook(qaHook, qaHooks.button)}
              ref={selectBox.trigger}
              size={size}
            />
          );

          const dropdown = (
            <XUIDropdown
              // These aria attributes currently go nowhere
              ariaAttributes={getAriaAttributes(this.wrapperIds.control, this.props)}
              className={dropdownClassName}
              id={selectBox.selectId}
              onSelect={onSelect}
              qaHook={setQaHook(qaHook, qaHooks.dropdown)}
              restrictFocus={useNewFocusBehaviour ? false : restrictFocus}
            >
              <XUIPicklist>{children}</XUIPicklist>
            </XUIDropdown>
          );

          return (
            <XUIControlWrapper
              fieldClassName={cn(containerClassNames, inputGroupClassNames)}
              isFieldLayout={isFieldLayout}
              qaHook={setQaHook(qaHook, '')} // label suffix is handled within controlwrapper
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
                  ref={selectBox.ddt}
                  trigger={trigger}
                  useNewFocusBehaviour={useNewFocusBehaviour}
                />
              )}
            </XUIControlWrapper>
          );
        }}
      </EditableTableCellContext.Consumer>
    );
  }
}

XUISelectBox.propTypes = {
  /**
   * @ignore
   * Internal use only, used to assist with styling a button to look like part of a table
   */
  _useCellStyling: PropTypes.bool,

  /** Additional classes to be applied to the button */
  buttonClassName: PropTypes.string,

  /** Display text to be rendered on the `XUISelectBox` button. */
  buttonContent: PropTypes.node.isRequired,

  /** The XUI button variant to use as a trigger for the select box */
  buttonVariant: PropTypes.oneOf(Object.keys(textButtonVariants)),

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
  containerClassName: PropTypes.string,

  /** Additional classes to be applied to the dropDown */
  dropdownClassName: PropTypes.string,

  /** Force the desktop experience, even if the viewport is narrow enough for mobile */
  forceDesktop: PropTypes.bool,

  /**
   * Modifier for the width of the XUISelectBox: `always`, `small-down`, or `never`.
   */
  fullWidth: PropTypes.oneOf(widths),

  /** Use XUI provided layout classes */
  hasDefaultLayout: PropTypes.bool,

  /** Hint message to show under the input */
  hintMessage: PropTypes.node,

  /** ID to apply to the dropdown. Used primarily to associate a label with it's matched content.
   * If none is provided it's automatically generated. */
  id: PropTypes.string,

  /** Additional classes to be applied to the inputGroup */
  inputGroupClassName: PropTypes.string,

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

  /** for adding automation ID to component as well as input and button sub-components */
  qaHook: PropTypes.string,

  /**
   * @deprecated This prop will be set to `false` and removed in XUI 21.
   * Whether focus should be restricted to the dropdown while it's open.
   * This is set to false if `useNewFocusBehaviour` is true.
   */
  restrictFocus: PropTypes.bool,

  /**
   * Modifier for the size of the select box: `medium`, `small`, or `xsmall`.
   *
   * If `XUISelectBoxOption` does not have a size set, it will inherit the size from `XUISelectBox`.
   */
  size: PropTypes.oneOf(sizes),

  /** Whether or not to use the new focus behaviour - which treats dropdown navigation
   * like a `combobox` role. Defaults to `false`.
   */
  useNewFocusBehaviour: PropTypes.bool,

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

XUISelectBox.defaultProps = {
  closeAfterSelection: true,
  forceDesktop: false,
  fullWidth: 'always',
  hasDefaultLayout: true,
  isOpen: false,
  isTextTruncated: true,
  matchTriggerWidth: true,
  restrictFocus: false,
};
