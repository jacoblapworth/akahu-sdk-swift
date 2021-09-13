import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIAutocompleterSecondarySearch from '../autocompleter/XUIAutocompleterSecondarySearch';
import { fixedWidthDropdownSizes } from '../dropdown/private/constants';
import XUIPickitem from '../picklist/XUIPickitem';
import SelectBoxTrigger from '../selectbox/private/SelectBoxTrigger';
import { tableVariantClassNames } from './private/constants';
import XUIEditableTableCellControl from './XUIEditableTableCellControl';

const baseName = `${tableVariantClassNames.editable}cellsecondarysearch`;

interface BaseProps {
  buttonContent?: React.ReactNode;
  buttonContentPlaceholder?: string;
  cellProps?: React.ComponentProps<typeof XUIEditableTableCellControl>;
  dropdownId?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  triggerClassName?: string;
  triggerProps?: React.ComponentProps<typeof SelectBoxTrigger>;
  validationMessage?: string;
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof XUIAutocompleterSecondarySearch>,
    'isInputLabelHidden' | 'trigger'
  >;

type FocusEvent = React.FocusEvent<HTMLAnchorElement> & React.FocusEvent<HTMLButtonElement>;

class XUIEditableTableCellAutocompleterSecondarySearch extends React.Component<Props> {
  completerRef = React.createRef<XUIAutocompleterSecondarySearch>();

  state = {
    isFocused: false,
  };

  static defaultProps = { dropdownHasFixedWidth: true, dropdownSize: 'medium' };

  /**
   * Records the focus state onBlur, before calling any user-supplied handlers.
   * @param {event} event
   */
  composedOnBlur = (event: FocusEvent) => {
    this.setState({ isFocused: false });
    this.props.triggerProps?.onBlur?.(event);
  };

  /**
   * Records the focus state onFocus, before calling any user-supplied handlers.
   * @param {event} event
   */
  composedOnFocus = (event: FocusEvent) => {
    this.setState({ isFocused: true });
    this.props.triggerProps?.onFocus?.(event);
  };

  /**
   * Clears the value in the search box.
   *
   * @public
   */
  clearValue = () => {
    this.completerRef.current?.clearValue();
  };

  /**
   * Set the state as not hidden in order to open the list
   *
   * @public
   */
  openDropdown = () => {
    this.completerRef.current?.openDropdown();
  };

  /**
   * Set the state as hidden in order to close the list.
   *
   * @public
   */
  closeDropdown = () => {
    this.completerRef.current?.closeDropdown();
  };

  /**
   * Highlights a specified item in the list
   *
   * @public
   */
  highlightItem = (item: XUIPickitem) => {
    this.completerRef.current?.highlightItem(item);
  };

  /**
   * Highlights the first item in the list
   *
   * @public
   */
  highlightFirstItem = () => {
    this.completerRef.current?.highlightFirstItem();
  };

  /**
   * Focuses the autocompleter input before calling onOpen
   *
   * @public
   */
  onOpen = () => {
    this.completerRef.current?.onOpen();
  };

  /**
   * Focus the input element, if visible.
   *
   * @public
   */
  focusInput = () => {
    this.completerRef.current?.focusInput();
  };

  render() {
    const {
      buttonContent,
      buttonContentPlaceholder,
      cellProps = {},
      className,
      dropdownId,
      qaHook,
      id,
      inputProps,
      isDisabled,
      isInvalid,
      triggerProps,
      triggerClassName,
      validationMessage,
      ...spreadProps
    } = this.props;

    return (
      <XUIEditableTableCellControl
        {...cellProps}
        cellIds={{
          wrapper: id,
          control: inputProps?.id,
        }}
        className={cn(baseName, cellProps.className)}
        isDisabled={isDisabled}
        isFocused={this.state.isFocused}
        isInvalid={isInvalid}
        validationMessage={validationMessage}
      >
        <XUIAutocompleterSecondarySearch
          {...spreadProps}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _useCellStyling
          className={cn(`${baseName}--control`, className)}
          id={dropdownId}
          inputProps={inputProps}
          isInputLabelHidden
          qaHook={qaHook}
          ref={this.completerRef}
          trigger={
            <SelectBoxTrigger
              {...triggerProps}
              _useCellStyling
              buttonClassName={cn(`${baseName}--trigger`, triggerClassName)}
              buttonContent={buttonContent}
              buttonContentPlaceholder={buttonContentPlaceholder}
              fullWidth="always"
              isDisabled={isDisabled}
              onBlur={this.composedOnBlur}
              onFocus={this.composedOnFocus}
            />
          }
        />
      </XUIEditableTableCellControl>
    );
  }

  static propTypes = {
    /** Display text to be rendered on the SelectBox button. */
    buttonContent: PropTypes.node,

    /** Placeholder for the SelectBox button */
    buttonContentPlaceholder: PropTypes.string,
    cellProps: PropTypes.object,
    children: PropTypes.node,

    /** CSS class(es) to go on the wrapping DOM node */
    className: PropTypes.string,

    /** Maps to the `closeOnSelect` property of the DropdownToggled component. */
    closeOnSelect: PropTypes.bool,

    /** Maps to the `closeOnTab` property of the DropdownToggled component. Set to false, if you've
     * supplied a footer element with any links or interaction. */
    closeOnTab: PropTypes.bool,

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

    /** Whether to allow the dropdown to take the full width of the wrapper (as `XUISelectBox`)
     * or wrap with an inline block. */
    isBlock: PropTypes.bool,

    /** Whether to render as disabled */
    isDisabled: PropTypes.bool,

    /** Whether the current input value is invalid */
    isInvalid: PropTypes.bool,

    /**
     * Whether the underlying DropdownToggled component uses the "legacy" (portaled) display.
     * Defaults to "true."
     */
    isLegacyDisplay: PropTypes.bool,

    /**
     * Setting to false will allow the dropdown's width to be set independent of the trigger width. <br>
     * **Note:** *Setting this to true will override any size prop on Dropdown.* <br>
     * XUI design has also decided to keep a minimum width on the dropdown,
     * so dropdown may not match the width of narrow triggers. Defaults to true.
     */
    matchTriggerWidth: PropTypes.bool,

    /** Callback for when the list closes */
    onClose: PropTypes.func,

    /** Callback for adding additional onKeyDown functionality */
    onKeyDown: PropTypes.func,

    /** Callback for when the list opens */
    onOpen: PropTypes.func,

    /** Callback to handle when an option has been selected from the dropdown */
    onOptionSelect: PropTypes.func,

    /** Callback for when the user types into the search box */
    onSearch: PropTypes.func.isRequired,

    /** Placeholder for the input */
    placeholder: PropTypes.string,

    qaHook: PropTypes.string,

    /** Whether focus should be restricted to the dropdown while it's open. */
    restrictFocus: PropTypes.bool,

    /** If you want to throttle the input's onChange handler, put the throttle interval here */
    searchThrottleInterval: PropTypes.number,

    /** Value that should be inside the input. */
    searchValue: PropTypes.string,

    /** CSS class(es) to go on the trigger button */
    triggerClassName: PropTypes.string,

    /** Attributes to set on the trigger button. */
    triggerProps: PropTypes.object,

    /** Validation message to show under the input if `isInvalid` is true */
    validationMessage: PropTypes.node,
  };
}

export default XUIEditableTableCellAutocompleterSecondarySearch;
