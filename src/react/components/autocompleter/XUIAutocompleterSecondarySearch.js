import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import searchPath from '@xero/xui-icon/icons/search';

import XUIDropdown from '../dropdown/XUIDropdown';
import XUIDropdownToggled from '../dropdown/XUIDropdownToggled';
import XUITextInput from '../textinput/XUITextInput';
import XUITextInputSideElement from '../textinput/XUITextInputSideElement';
import XUIIcon from '../icon/XUIIcon';

import compose from '../helpers/compose';
import { ns } from '../helpers/xuiClassNamespace';

import { intervalRunner, isVisible } from './private/helpers';
import { fixedWidthDropdownSizes } from '../dropdown/private/constants';

export default class XUIAutocompleterSecondarySearch extends PureComponent {
  constructor(props) {
    super(props);
    this.bindOnChange(props.searchThrottleInterval);
    this.state = {
      value: props.searchValue,
    };
    this.rootNode = React.createRef();
    this.dropdown = React.createRef();
    this.ddt = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { searchThrottleInterval, searchValue } = this.props;
    if (prevProps.searchThrottleInterval !== searchThrottleInterval) {
      this.bindOnChange(searchThrottleInterval);
    }
    if (prevProps.searchValue !== searchValue) {
      // TODO: Lint - try remove setState
      // eslint-disable-next-line
      this.setState({
        value: searchValue,
      });
    }
    this.highlightFirstItem();
  }

  /**
   * Bind an optionally throttled onSearch handler to the component instance.
   *
   * @private
   * @param {number} interval
   */
  bindOnChange = interval => {
    const { onSearch } = this.props;
    if (onSearch) {
      const throttled = interval ? throttle(onSearch, interval, { trailing: true }) : onSearch;
      this.debouncedOnChange = event => {
        event.persist();
        this.setState({
          value: event.target.value,
        });
        throttled(event.target.value);
      };
    } else {
      this.debouncedOnChange = undefined;
    }
  };

  /**
   * Clears the value in the search box.
   *
   * @public
   */
  clearValue = () => {
    this.setState({ value: '' });
  };

  /**
   * Set the state as not hidden in order to open the list
   *
   * @public
   */
  openDropdown = () => {
    this.ddt.current?.openDropdown();
  };

  /**
   * Set the state as hidden in order to close the list.
   *
   * @public
   */
  closeDropdown = () => {
    this.ddt.current?.closeDropdown();
  };

  /**
   * Highlights a specified item in the list
   *
   * @public
   */
  highlightItem = item => {
    if (this.dropdown.current) {
      this.dropdown.current?.highlightItem(item);
    }
  };

  /**
   * Highlights the first item in the list
   *
   * @public
   */
  highlightFirstItem = () => {
    if (this.dropdown.current) {
      this.dropdown.current.highlightFirstItem();
    }
  };

  /**
   * Focuses the autocompleter input before calling onOpen
   *
   * @public
   */
  onOpen = () => {
    this.setState({ value: this.props.searchValue });
    this.focusInput();
    this.props.onOpen && this.props.onOpen();
  };

  /**
   * Focus the input element, if visible.
   *
   * @public
   */
  focusInput = () => {
    const inputDOM = this.input;
    const isInputRendered = () => isVisible(inputDOM);
    const setter = () => {
      inputDOM.focus();
    };
    intervalRunner(isInputRendered, setter);
  };

  render() {
    const {
      qaHook,
      dropdownSize,
      dropdownClassName,
      inputClassName,
      inputContainerClassName,
      placeholder,
      inputLabel,
      isInputLabelHidden,
      isLegacyDisplay,
      inputProps,
      inputId,
      onOptionSelect,
      id,
      dropdownHasFixedWidth,
      footer,
      restrictFocus,
      children,
      className,
      trigger,
      onClose,
      closeOnSelect,
      closeOnTab,
      matchTriggerWidth,
      isBlock,
      forceDesktop,
      onKeyDown,
    } = this.props;
    const { value } = this.state;

    let listQaHook = null;
    let containerQaHook = null;
    if (qaHook) {
      listQaHook = `${qaHook}--list`;
      containerQaHook = `${qaHook}--container`;
    }

    const searchItem = (
      <div className={`${ns}-dropdown--header-container`}>
        <XUITextInput
          containerClassName={inputContainerClassName}
          inputClassName={inputClassName}
          inputProps={{
            ...inputProps,
            id: inputId,
            role: 'textbox',
            'aria-multiline': false,
            'aria-autocomplete': 'list',
          }}
          inputRef={c => (this.input = c)}
          isBorderlessSolid
          isFieldLayout={false}
          isLabelHidden={isInputLabelHidden}
          label={inputLabel}
          leftElement={
            <XUITextInputSideElement>
              <XUIIcon icon={searchPath} isBoxed />
            </XUITextInputSideElement>
          }
          onChange={this.debouncedOnChange}
          placeholder={placeholder}
          value={value || ''}
        />
      </div>
    );
    const dropdownClasses = cn(!dropdownSize && `${ns}-dropdown-fullwidth`, dropdownClassName);
    const dropdownToggledClasses = !dropdownSize ? `${ns}-dropdown-fullwidth` : null;
    const dropdown = (
      <XUIDropdown
        ariaRole="combobox"
        className={dropdownClasses}
        footer={footer}
        forceStatefulPicklist
        hasFixedWidth={dropdownHasFixedWidth}
        hasKeyboardEvents={false}
        header={searchItem}
        // Space doesn't select in an autocompleter; left and right arrow keys should move cursor in the input
        id={id}
        ignoreKeyboardEvents={[32, 37, 39]}
        onKeyDown={onKeyDown}
        onSelect={onOptionSelect}
        qaHook={listQaHook}
        ref={this.dropdown}
        restrictFocus={restrictFocus}
        shouldManageInitialHighlight={false}
        size={dropdownSize}
      >
        {children}
      </XUIDropdown>
    );

    return (
      <div className={className} data-automationid={containerQaHook} ref={this.rootNode}>
        <XUIDropdownToggled
          className={dropdownToggledClasses}
          closeOnSelect={closeOnSelect}
          closeOnTab={closeOnTab}
          dropdown={dropdown}
          forceDesktop={forceDesktop}
          isBlock={isBlock}
          isLegacyDisplay={isLegacyDisplay}
          matchTriggerWidth={matchTriggerWidth}
          onClose={compose(onClose, this.clearValue)}
          onOpen={this.onOpen}
          ref={this.ddt}
          trigger={trigger}
        />
      </div>
    );
  }
}

XUIAutocompleterSecondarySearch.propTypes = {
  children: PropTypes.node,

  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Maps to the `closeOnSelect` property of the `XUIDropdownToggled` component. */
  closeOnSelect: PropTypes.bool,

  /** Maps to the `closeOnTab` property of the `XUIDropdownToggled` component. Set to false,
   * if you've supplied a footer element with any links or interaction. */
  closeOnTab: PropTypes.bool,

  /** CSS class(es) to go on the dropdown list */
  dropdownClassName: PropTypes.string,

  /** If a size is set, this will force the dropdown to that size instead of setting it
   * as a max width. */
  dropdownHasFixedWidth: PropTypes.bool,

  /** Maps to the 'size' property of the dropdown component. */
  dropdownSize: PropTypes.oneOf(Object.keys(fixedWidthDropdownSizes)),

  /** A Footer element can be added. */
  footer: PropTypes.element,

  /** Force the desktop user experience, even if the viewport is narrow enough for mobile. */
  forceDesktop: PropTypes.bool,

  /** ID to be added to the dropdown element of the completer */
  id: PropTypes.string,

  /** CSS class(es) to go on the input */
  inputClassName: PropTypes.string,

  /** CSS class(es) to go on the input container */
  inputContainerClassName: PropTypes.string,

  /** ID to be applied to the input element. */
  inputId: PropTypes.string,

  /** Label to show above the input */
  inputLabel: PropTypes.node,

  /** Attributes to set on the native input element */
  inputProps: PropTypes.object,

  /** Whether to allow the dropdown to take the full width of the wrapper (as `XUISelectBox`)
   * or wrap with an inline block. */
  isBlock: PropTypes.bool,

  /** Should label be applied as an aria-label, rather than being visibly displayed. */
  isInputLabelHidden: PropTypes.bool,

  /**
   * Whether the underlying DropdownToggled component uses the "legacy" (portaled) display.
   * Defaults to "true."
   */
  isLegacyDisplay: PropTypes.bool,

  // TODO: Implement loading pattern
  // /**
  //  * When set to true a loader will be displayed instead of the picklist items.
  //  * State for this should be managed externally and it's defaulted to false.
  //  */
  // isLoading: PropTypes.bool,

  /**
   * Setting this to `true` makes the dropdown as wide as the trigger. <br>
   * **Note:** *Setting this to `true` will override any `size` prop on Dropdown.* <br>
   * Setting this to `false` will allow the dropdown's width to be set independent of the trigger width (defaults to `false`). <br>
   * Setting this to `'min'` will set the dropdown's `min-width` to be the trigger width. <br/>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers (setting this to `'min'` will not override this).
   */
  matchTriggerWidth: PropTypes.oneOf([true, false, 'min']),

  /** Callback for when the list closes */
  onClose: PropTypes.func,

  /** Callback for adding additional onKeyPress functionality */
  onKeyDown: PropTypes.func,

  /** Callback for when the list opens */
  onOpen: PropTypes.func,

  /** Callback to handle when an option has been selected from the dropdown */
  onOptionSelect: PropTypes.func,

  /** Callback for when the user types into the search box */
  onSearch: PropTypes.func.isRequired,

  // /** A set of pills to show above the input.  Useful for showing what was selected
  //  * in a multi-select */
  // pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

  /** Placeholder for the input */
  placeholder: PropTypes.string,

  qaHook: PropTypes.string,

  /** Whether focus should be restricted to the dropdown while it's open. */
  restrictFocus: PropTypes.bool,

  /** If you want to throttle the input's onChange handler, put the throttle interval here */
  searchThrottleInterval: PropTypes.number,

  /** Value that should be inside the input. */
  searchValue: PropTypes.string,

  /** Will be passed directly down to the `XUIDropdownToggled` component as the main trigger. */
  trigger: PropTypes.element.isRequired,
};

XUIAutocompleterSecondarySearch.defaultProps = {
  // isLoading: false,
  isLegacyDisplay: true,
  restrictFocus: true,
  searchThrottleInterval: 0,
};
