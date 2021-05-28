import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { nanoid } from 'nanoid';
import XUIPicklist from '../picklist/XUIPicklist';
import XUILoader from '../loader/XUILoader';
import XUIDropdown from '../dropdown/XUIDropdown';
import XUIDropdownToggled from '../dropdown/XUIDropdownToggled';
import XUITextInput from '../textinput/XUITextInput';
import { ns } from '../helpers/xuiClassNamespace';
import { fixedWidthDropdownSizes } from '../dropdown/private/constants';
import { eventKeyValues, isKeyClick } from '../helpers/reactKeyHandler';
import { observe, unobserve } from '../helpers/resizeObserver';
import labelRequiredWarning, { loadingAriaLabelOnly } from '../helpers/labelRequiredWarning';

const baseClass = `${ns}-autocompleter`;

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
      placeholderWidth: 0,
      value: props.searchValue,
    };
    this.bindOnChange(props.searchDebounceTimeout);
    this._area = React.createRef();
    this.tg = React.createRef();
    this.ddt = React.createRef();
    this.rootNode = React.createRef();
    this.noWrapPillContainer = React.createRef();
    this.dropdown = React.createRef();
    this.inputNode = React.createRef();
  }

  _onResize({ width }) {
    this.setState({ placeholderWidth: width });

    this.scrollPillContainer();
  }

  componentDidMount() {
    this._area.current && observe(this);

    this.calculatePlaceholderWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      pills,
      disableWrapPills,
      searchDebounceTimeout,
      searchValue,
      placeholder,
      isLoading,
    } = this.props;

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

    if (
      prevProps.placeholder !== placeholder ||
      prevState.placeholderWidth !== this.state.placeholderWidth
    ) {
      this.calculatePlaceholderWidth();
    }

    if (React.Children.count(pills) > React.Children.count(prevProps.pills) && disableWrapPills) {
      this.scrollPillContainer();
    }

    if (React.Children.count(pills) < React.Children.count(prevProps.pills)) {
      this.ddt.current.repositionDropdown();
    }

    if (!prevProps.isLoading && isLoading) {
      labelRequiredWarning(XUIAutocompleter.name, loadingAriaLabelOnly, [
        isLoading && this.props.loadingAriaLabel,
      ]);
    }
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
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
    if (this._area.current != null) {
      const { placeholderWidth } = this.state;
      const inputStyle = getComputedStyle(this.inputNode.current);
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
    this.ddt.current?.openDropdown();
  };

  /**
   * @public
   * Set the state as hidden in order to toggle the list closed.
   */
  closeDropdown = () => {
    this.ddt.current?.closeDropdown();
  };

  /**
   * @public
   * Manually highlight an item in the list for selection.
   */
  highlightItem = item => {
    this.dropdown.current?.highlightItem(item);
  };

  /**
   * @public
   * Focuses the text input
   */
  focusInput = () => {
    this.inputNode.current?.focus();
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
      setTimeout(() => this.dropdown.current?.onKeyDown?.(event));
    }

    if (
      event.key === eventKeyValues.backspace &&
      this.inputNode.current.value === '' &&
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

  onFocus = e => {
    if (!this.state.focused && e.target.type !== 'button') {
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

  scrollPillContainer = () => {
    if (this.noWrapPillContainer.current) {
      const { scrollLeft, scrollWidth } = this.noWrapPillContainer.current;

      if (scrollLeft !== scrollWidth) {
        this.noWrapPillContainer.current.scrollLeft = scrollWidth;
      }
    }
  };

  // We explicitly need to tie the label to the input element in HTML for autocompleter,
  // so we'll ensure there is an ID with which to do so.
  generatedInputId =
    this.props.inputId ||
    (this.props.inputProps && this.props.inputProps.id) ||
    `xui-${nanoid(10)}`;

  render() {
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
      dropdownHasFixedWidth,
      footer,
      isLoading,
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
      isFieldLayout,
      validationMessage,
      hintMessage,
      isLegacyDisplay,
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
        <div aria-hidden className={`${ns}-autocompleter--textinputplaceholder`} ref={this._area}>
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
          inputRef={this.inputNode}
          isDisabled={isDisabled}
          isFieldLayout={isFieldLayout}
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
        footer={footer}
        hasFixedWidth={dropdownHasFixedWidth}
        hasKeyboardEvents={false}
        id={dropdownId}
        ignoreKeyboardEvents={ignoreKeyboardEvents}
        onHighlightChange={this.onHighlightChange}
        onSelect={onOptionSelect}
        qaHook={listQaHook}
        ref={this.dropdown}
        restrictFocus={false}
        size={dropdownSize}
      >
        {isLoading ? (
          <XUIPicklist>
            <XUILoader ariaLabel={loadingAriaLabel} />
          </XUIPicklist>
        ) : (
          children
        )}
      </XUIDropdown>
    );

    const classNames = cn(className, baseClass, focused && `${baseClass}--trigger-focus`);

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
          isLegacyDisplay={isLegacyDisplay}
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
  children: PropTypes.node,

  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Maps to the `closeOnSelect` property of the `XUIDropdownToggled` component. */
  closeOnSelect: PropTypes.bool,

  /** Maps to the `closeOnTab` property of the `XUIDropdownToggled` component. Set to false, if you've
   * supplied a footer element with any links or interaction. */
  closeOnTab: PropTypes.bool,

  /** Whether the pills should wrap instead of scroll on overflow */
  disableWrapPills: PropTypes.bool,

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

  /** Hint message to show under the input */
  hintMessage: PropTypes.node,

  /** ID to be added to the root node of the completer */
  id: PropTypes.string,

  /** CSS class(es) to go on the input */
  inputClassName: PropTypes.string,

  /** CSS class(es) to go on the input container component */
  inputContainerClassName: PropTypes.string,

  /** ID to apply to the input element. Useful for labels. */
  inputId: PropTypes.string,

  /** Label to show above the input, or for accessibility when the input label is hidden */
  inputLabel: PropTypes.node,

  /**
   * Attributes to set on the native input element. <br>
   * **Note:**
   * *It's not recommended to pass `autoFocus` to `inputProps` as it hijacks the focus on load to focus that specific element.*
   */
  inputProps: PropTypes.object,

  /** Whether to render as disabled */
  isDisabled: PropTypes.bool,

  /** Whether to use the field layout classes. Defaults to false. */
  isFieldLayout: PropTypes.bool,

  /** Whether to hide the label and apply it as an ARIA label instead. */
  isInputLabelHidden: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /**
   * Whether the underlying DropdownToggled component uses the "legacy" (portaled) display.
   * Defaults to "true."
   */
  isLegacyDisplay: PropTypes.bool,

  /** When set to true a loader will be displayed instead of the picklist items.
   * State for this should be managed externally and it's defaulted to false.
   */
  isLoading: PropTypes.bool,

  /** Left element to render within the `XUITextInput` component. Should not be used together with
   * the `pills` prop */
  leftElement: PropTypes.node,

  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `isLoading` prop is set to `true`.
   * <br />
   * Recommended English value: *Loading*
   */
  loadingAriaLabel: PropTypes.string,

  /**
   * Setting to false will allow the dropdown's width to be set independent of the trigger width. <br>
   * **Note:** *Setting this to true will override any size prop on `XUIDropdown`.* <br>
   * XUI design has also decided to keep a minimum width on the dropdown,
   * so dropdown may not match the width of narrow triggers.
   */
  matchTriggerWidth: PropTypes.bool,

  /** Max length of the input */
  maxLength: PropTypes.number,

  /** Callback to handle when a pill has been backspaced */
  onBackspacePill: PropTypes.func,

  /** Callback for when the list closes */
  onClose: PropTypes.func,

  /** Callback for when the highlighted item changes. */
  onHighlightChange: PropTypes.func,

  /** Callback for adding additional onKeyDown functionality */
  onKeyDown: PropTypes.func,

  /** Callback for when the list opens */
  onOpen: PropTypes.func,

  /** Callback to handle when an option has been selected from the dropdown */
  onOptionSelect: PropTypes.func,

  /** Callback for when the user types into the search box.
   * The first argument passed in is the search term value. */
  onSearch: PropTypes.func,

  /** When set to true the dropdown will automatically open when the input is given focus. */
  openOnFocus: PropTypes.bool,

  /** A set of pills to show next to input. Useful for showing what was selected in a multi-select.
   * Can also be used similarly to `XUITextInput`'s `leftElement`. */
  pills: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

  /** Placeholder for the input */
  placeholder: PropTypes.string,

  qaHook: PropTypes.string,

  /** Right element to render within the `XUITextInput` component */
  rightElement: PropTypes.node,

  /** The debounce timeout before onSearch is called. Set to 0 to disable debouncing */
  searchDebounceTimeout: PropTypes.number,

  /** Value that should be inside the input. */
  searchValue: PropTypes.string,

  /** CSS class(es) to go on the trigger element which contains the input and pills */
  triggerClassName: PropTypes.string,

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
};

XUIAutocompleter.defaultProps = {
  closeOnTab: true,
  disableWrapPills: false,
  dropdownHasFixedWidth: false,
  forceDesktop: true,
  isLegacyDisplay: true,
  isLoading: false,
  matchTriggerWidth: true,
  openOnFocus: false,
  searchDebounceTimeout: 200,
};
