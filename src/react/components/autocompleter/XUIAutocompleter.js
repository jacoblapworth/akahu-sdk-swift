import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';
import XUIPicklist from '../picklist/XUIPicklist';
import XUILoader from '../loader/XUILoader';
import XUIDropdown from '../dropdown/XUIDropdown';
import XUIDropdownToggled from '../dropdown/XUIDropdownToggled';
import XUITextInput from '../textInput/XUITextInput';
import { ns } from '../helpers/xuiClassNamespace';
import { fixedWidthDropdownSizes } from '../dropdown/private/constants';
import { eventKeyValues, isKeyClick } from '../helpers/reactKeyHandler';

/**
 * Keyboard bindings to ignore. Space doesn't select in an autocompleter; left and
 * right arrow keys should move cursor in the input
 *
 * @private
 * @type {Array}
 */
const ignoreKeyboardEvents = [32, 37, 39];

export default class XUIAutocompleter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: props.searchValue,
    };
    this.bindOnChange(props.searchDebounceTimeout);
    this.tg = React.createRef();
    this.placeholder = React.createRef();
    this.ddt = React.createRef();
    this.rootNode = React.createRef();
    this.noWrapPillContainer = React.createRef();
  }

  componentDidMount() {
    this.calculatePlaceholderWidth();
  }

  componentDidUpdate(prevProps) {
    const { pills, disableWrapPills, searchDebounceTimeout, searchValue, placeholder } = this.props;
    if (prevProps.searchDebounceTimeout !== searchDebounceTimeout) {
      this.bindOnChange(searchDebounceTimeout);
    }
    if (prevProps.searchValue !== searchValue) {
      // TODO: Investigate whether setState can be moved
      // eslint-disable-next-line
      this.setState({
        value: searchValue,
      });
    }
    if (prevProps.placeholder !== placeholder) {
      this.calculatePlaceholderWidth();
    }
    const morePillsExist = React.Children.count(pills) > React.Children.count(prevProps.pills);
    if (morePillsExist && disableWrapPills) {
      this.noWrapPillContainer.current.scrollLeft = this.noWrapPillContainer.current.scrollWidth;
    }
    if (React.Children.count(pills) < React.Children.count(prevProps.pills)) {
      this.ddt.current.repositionDropdown();
    }
  }

  /**
   * Bind an optionally debounced onSearch handler to the component instance.
   *
   * @private
   * @param {number} timeout
   */
  bindOnChange = timeout => {
    const { onSearch } = this.props;
    if (onSearch) {
      const debounced = timeout ? debounce(onSearch, timeout) : onSearch;
      this.debouncedOnChange = event => {
        event.persist();
        this.setState({
          value: event.target.value,
        });
        debounced(event.target.value);
      };
      this.flushDebounced = debounced.flush;
    } else {
      this.debouncedOnChange = undefined;
    }
  };

  calculatePlaceholderWidth = () => {
    if (this.placeholder.current != null) {
      const placeholderWidth = getComputedStyle(this.placeholder.current).width;
      const inputStyle = getComputedStyle(this.inputNode);
      const inputWidth = `${
        parseFloat(inputStyle.paddingLeft) +
        parseFloat(inputStyle.paddingRight) +
        parseFloat(placeholderWidth)
      }px`;
      if (this.state.inputWidth !== inputWidth) {
        this.setState({
          inputWidth,
        });
      }
    }
  };

  /**
   * @public
   * Set the state as not hidden in order to toggle the list open.
   */
  openDropdown = () => {
    this.ddt.current.openDropdown();
  };

  /**
   * @public
   * Set the state as hidden in order to toggle the list closed.
   */
  closeDropdown = () => {
    this.ddt.current.closeDropdown();
  };

  /**
   * @public
   * Manually highlight an item in the list for selection.
   */
  highlightItem = item => {
    this.dropdown.highlightItem(item);
  };

  /**
   * @public
   * Focuses the text input
   */
  focusInput = () => {
    this.inputNode && this.inputNode.focus();
  };

  /**
   * @public
   * If a onHighlightChange prop is passed to the completer, it's called passing
   * in the highlighted item.
   *
   * @param {item} Object
   */
  onHighlightChange = item => {
    this.props.onHighlightChange && this.props.onHighlightChange(item);
  };

  onInputKeyDown = event => {
    const { onBackspacePill, pills } = this.props;
    if (this.ddt.current.isDropdownOpen()) {
      if (isKeyClick(event)) {
        this.flushDebounced && this.flushDebounced();
      }
      event.persist();

      /**
       * Why use setTimeout():
       * The default setTimeout of 0ms will place the running of the callback function to the end of the callstack.
       * This will ensure that dropdown onKeyDown event occurs after the re-rendering of the picklist selection is complete.
       * This implementation has been chosen as it allows us to ensure the correct behaviour without invasive changes to Autocompletion/dropdown/statefulPicklist components.
       */
      setTimeout(() => this.dropdown && this.dropdown.onKeyDown && this.dropdown.onKeyDown(event));
    }

    if (
      event.key === eventKeyValues.backspace &&
      this.inputNode.value === '' &&
      onBackspacePill &&
      pills &&
      (pills.length > 0 || React.isValidElement(pills))
    ) {
      onBackspacePill();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  onInputFocus = () => {
    if (!this.state.focused) {
      this.openDropdown();
    }
  };

  onFocus = () => {
    if (!this.state.focused) {
      this.focusInput();
      this.setState({
        focused: true,
      });
    }
  };

  onBlur = () => {
    setTimeout(() => {
      if (this.rootNode.current && !this.rootNode.current.contains(document.activeElement)) {
        this.setState({
          focused: false,
        });
      }
    }, 333);
  };

  renderPills = () => {
    const { disableWrapPills, pills } = this.props;
    return disableWrapPills ? (
      <div className={`${ns}-autocompleter--pills-nopillwrap`} ref={this.noWrapPillContainer}>
        {pills}
      </div>
    ) : (
      pills
    );
  };

  // We explicitly need to tie the label to the input element in HTML for autocompleter,
  // so we'll ensure there is an ID with which to do so.
  generatedInputId =
    this.props.inputId || (this.props.inputProps && this.props.inputProps.id) || uuidv4();

  render() {
    const completer = this;
    const {
      qaHook,
      pills,
      leftElement,
      inputContainerClassName,
      disableWrapPills,
      inputClassName,
      openOnFocus,
      triggerClassName,
      placeholder,
      rightElement,
      isDisabled,
      inputLabel,
      isInputLabelHidden,
      inputProps,
      maxLength,
      dropdownId,
      onOptionSelect,
      dropdownClassName,
      dropdownSize,
      dropdownFixedWidth,
      footer,
      loading,
      loadingAriaLabel,
      children,
      className,
      id,
      onOpen,
      onClose,
      closeOnTab,
      closeOnSelect,
      forceDesktop,
      matchTriggerWidth,
      isInvalid,
      validationMessage,
      hintMessage,
      onKeyDown,
    } = this.props;
    const { value, focused, inputWidth } = this.state;
    let inputQaHook = null;
    let listQaHook = null;
    let containerQaHook = null;
    let dropdownQaHook = null;
    if (qaHook) {
      inputQaHook = `${qaHook}`; // TODO: Investigate whether we should add --input here
      listQaHook = `${qaHook}--list`;
      containerQaHook = `${qaHook}--container`;
      dropdownQaHook = `${qaHook}--dropdown`;
    }
    const hasPills = pills != null && (pills.length > 0 || React.isValidElement(pills));
    const textInputLeftElement = hasPills ? this.renderPills() : leftElement;

    const containerClassNames = cn(inputContainerClassName, {
      [`${ns}-autocompleter--trigger-pillwrap`]: hasPills && !disableWrapPills,
    });

    const inputClassNames = cn(inputClassName, `${ns}-autocompleter--textinput`);

    const trigger = (
      <div
        className={triggerClassName}
        onFocus={openOnFocus ? this.onInputFocus : null}
        ref={this.tg}
      >
        <div
          aria-hidden
          className={`${ns}-autocompleter--textinputplaceholder`}
          ref={this.placeholder}
        >
          {placeholder}
        </div>
        <XUITextInput
          containerClassName={containerClassNames}
          hintMessage={hintMessage}
          inputClassName={inputClassNames}
          inputProps={{
            ...inputProps,
            maxLength,
            id: this.generatedInputId,
            role: 'textbox',
            'aria-multiline': false,
            'aria-autocomplete': 'list',
            style: {
              flexBasis: inputWidth,
            },
          }}
          inputRef={i => (this.inputNode = i)}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isLabelHidden={isInputLabelHidden}
          label={inputLabel}
          leftElement={textInputLeftElement}
          onChange={this.debouncedOnChange}
          onKeyDown={this.onInputKeyDown}
          placeholder={placeholder}
          qaHook={inputQaHook}
          rightElement={rightElement}
          size="medium"
          validationMessage={validationMessage}
          value={value || ''}
        />
      </div>
    );

    const dropdown = (
      <XUIDropdown
        className={dropdownClassName}
        fixedWidth={dropdownFixedWidth}
        footer={footer}
        hasKeyboardEvents={false}
        id={dropdownId}
        ignoreKeyboardEvents={ignoreKeyboardEvents}
        onHighlightChange={completer.onHighlightChange}
        onSelect={onOptionSelect}
        qaHook={listQaHook}
        ref={c => (completer.dropdown = c)}
        restrictFocus={false}
        size={dropdownSize}
      >
        {loading ? (
          <XUIPicklist>
            <XUILoader ariaLabel={loadingAriaLabel} />
          </XUIPicklist>
        ) : (
          children
        )}
      </XUIDropdown>
    );

    const classNames = cn(className, focused && `${ns}-autocompleter--trigger-focus`);

    return (
      <div
        className={classNames}
        data-automationid={containerQaHook}
        id={id}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        ref={this.rootNode}
      >
        <XUIDropdownToggled
          ariaRole="combobox"
          closeOnSelect={closeOnSelect}
          closeOnTab={closeOnTab}
          dropdown={dropdown}
          forceDesktop={forceDesktop}
          isBlock
          matchTriggerWidth={matchTriggerWidth && !dropdownSize}
          onClose={onClose}
          onOpen={onOpen}
          qaHook={dropdownQaHook}
          ref={this.ddt}
          trigger={trigger}
          triggerClickAction="none"
        />
      </div>
    );
  }
}

XUIAutocompleter.propTypes = {
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
  loadingAriaLabel: PropTypes.string,

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

  /** Label to show above the input, or for accessibility when the input label is hidden */
  inputLabel: PropTypes.node,

  /** Whether to hide the label and apply it as an ARIA label instead. */
  isInputLabelHidden: PropTypes.bool,

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

  /** Maps to the `closeOnSelect` property of the `XUIDropdownToggled` component. */
  closeOnSelect: PropTypes.bool,

  /** Maps to the `closeOnTab` property of the `XUIDropdownToggled` component. Set to false, if you've
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
   * **Note:** *Setting this to true will override any size prop on `XUIDropdown`.* <br>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers.
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

  qaHook: PropTypes.string,
  children: PropTypes.node,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
};

XUIAutocompleter.defaultProps = {
  loading: false,
  searchDebounceTimeout: 200,
  openOnFocus: false,
  closeOnTab: true,
  forceDesktop: true,
  dropdownFixedWidth: false,
  matchTriggerWidth: true,
  disableWrapPills: false,
};
