import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import searchPath from '@xero/xui-icon/icons/search';

import XUIDropDown from '../dropdown/XUIDropDown';
import XUIDropDownToggled from '../dropdown/XUIDropDownToggled';
import XUITextInput from '../textInput/XUITextInput';
import XUITextInputSideElement from '../textInput/XUITextInputSideElement';
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
  openDropDown = () => {
    this.ddt.openDropDown();
  };

  /**
   * Set the state as hidden in order to close the list.
   *
   * @public
   */
  closeDropDown = () => {
    this.ddt.closeDropDown();
  };

  /**
   * Highlights a specified item in the list
   *
   * @public
   */
  highlightItem = item => {
    if (this.dropdown) {
      this.dropdown.highlightItem(item);
    }
  };

  /**
   * Highlights the first item in the list
   *
   * @public
   */
  highlightFirstItem = () => {
    if (this.dropdown) {
      this.dropdown.highlightFirstItem();
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
      inputProps,
      inputId,
      onOptionSelect,
      id,
      dropdownFixedWidth,
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
      <XUIDropDown
        ariaRole="combobox"
        className={dropdownClasses}
        fixedWidth={dropdownFixedWidth}
        footer={footer}
        forceStatefulPicklist
        hasKeyboardEvents={false}
        header={searchItem}
        id={id}
        // Space doesn't select in an autocompleter; left and right arrow keys should move cursor in the input
        ignoreKeyboardEvents={[32, 37, 39]}
        onKeyDown={onKeyDown}
        onSelect={onOptionSelect}
        qaHook={listQaHook}
        ref={d => (this.dropdown = d)}
        restrictFocus={restrictFocus}
        shouldManageInitialHighlight={false}
        size={dropdownSize}
      >
        {children}
      </XUIDropDown>
    );

    return (
      <div className={className} data-automationid={containerQaHook} ref={this.rootNode}>
        <XUIDropDownToggled
          className={dropdownToggledClasses}
          closeOnSelect={closeOnSelect}
          closeOnTab={closeOnTab}
          dropdown={dropdown}
          forceDesktop={forceDesktop}
          isBlock={isBlock}
          matchTriggerWidth={matchTriggerWidth}
          onClose={compose(onClose, this.clearValue)}
          onOpen={this.onOpen}
          ref={c => (this.ddt = c)}
          trigger={trigger}
        />
      </div>
    );
  }
}

XUIAutocompleterSecondarySearch.propTypes = {
  /** Callback to handle when an option has been selected from the dropdown */
  onOptionSelect: PropTypes.func,

  // TODO: Implement loading pattern
  // /**
  //  * When set to true a loader will be displayed instead of the picklist items.
  //  * State for this should be managed externally and it's defaulted to false.
  //  */
  // loading: PropTypes.bool,

  /** ID to be added to the dropdown element of the completer */
  id: PropTypes.string,

  /** Value that should be inside the input. */
  searchValue: PropTypes.string,

  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

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

  // /** A set of pills to show above the input.  Useful for showing what was selected
  //  * in a multi-select */
  // pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

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

  /** Maps to the `closeOnSelect` property of the `XUIDropDownToggled` component. */
  closeOnSelect: PropTypes.bool,

  /** Maps to the `closeOnTab` property of the `XUIDropDownToggled` component. Set to false,
   * if you've supplied a footer element with any links or interaction. */
  closeOnTab: PropTypes.bool,

  /** Callback for adding additional onKeyPress functionality */
  onKeyDown: PropTypes.func,

  /** Will be passed directly down to the `XUIDropDownToggled` component as the main trigger. */
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
   * **Note:** *Setting this to true will override any size prop on `XUIDropDown`.* <br>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers.
   */
  matchTriggerWidth: PropTypes.bool,

  /** A Footer element can be added. */
  footer: PropTypes.element,

  qaHook: PropTypes.string,
  children: PropTypes.node,
};

XUIAutocompleterSecondarySearch.defaultProps = {
  // loading: false,
  searchThrottleInterval: 0,
  restrictFocus: true,
};
