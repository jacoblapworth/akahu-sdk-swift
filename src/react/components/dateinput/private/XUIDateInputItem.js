import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import dateStartIcon from '@xero/xui-icon/icons/date-start';
import { parseDate, parseDueDate, DateFormat } from '@xero/blind-date';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import { ns } from '../../helpers/xuiClassNamespace';

import XUIControlWrapper from '../../controlwrapper/XUIControlWrapper';
import {
  XUIDropdownFooter,
  XUIDropdownPanel,
  XUIDropdownToggled,
  XUINestedDropdown,
} from '../../../dropdown';
import XUIDatePicker from '../../../datepicker';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import { baseSizeClasses } from '../../textinput/private/constants';
import XUIIcon from '../../icon/XUIIcon';
import formatSelectedDateToString from './helpers/formatSelectedDateToString';
import { eventKeyValues } from '../../helpers/reactKeyHandler';
import generateIds from '../../helpers/ariaHelpers';
import { isDayOutsideRange } from '../../datepicker/helpers/utils';
import { suggestedDatesHeader, suggestedDatesSecondaryText } from './suggestedDateHelperComponents';
import getDateFormat from './helpers/getDateFormat';

/**
 * Keyboard bindings to ignore. Space doesn't select in an autocompleter; left and
 * right arrow keys should move cursor in the input
 *
 * @private
 * @type {Array}
 */
const ignoreKeyboardEvents = [32, 37, 39];
class XUIDateInputItem extends Component {
  state = {
    selectedSuggestedDate: null,
    activePanel: null,
    inputValue: null,
    isDateInvalid: null,
    pickitemInitialHighlight: true,
  };

  ddtRef = createRef(null);

  datepickerRef = createRef(null);

  suggestedDatePanelRef = createRef(null);

  inputRef = createRef(null);

  triggerRef = createRef(null);

  /** Generate id's for panels */
  customDatesId = `xui-${nanoid(10)}`;

  suggestedDatesId = nanoid();

  suggestedDatesFooterId = nanoid();

  wrapperIds = generateIds();

  componentDidMount() {
    this.setState({
      activePanel: this.props.suggestedDates ? this.suggestedDatesId : this.customDatesId,
    });

    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  /**
   * Add the global event listeners.
   */
  addListeners = () => {
    if (window) {
      window.addEventListener('keyup', this._keyUpHandler);
    }
  };

  /**
   * Remove any global event listeners associated with a given date input.
   */
  removeListeners = () => {
    if (window) {
      window.removeEventListener('keyup', this._keyUpHandler);
    }
  };

  /**
   * @param {Object} event - A keyUp event which is set to be listened to by componentDidMount.
   * For DatePicker to close when the user presses the esc key, we need to attach a key
   * listener to a parent (`window` by default) to catch this key press
   */
  _keyUpHandler = event => {
    if (event.key === eventKeyValues.escape && event.target === this.inputRef?.current) {
      this.closeDropdown();
      this.inputRef?.current?.focus();
    }

    if (event.key === eventKeyValues.tab && event.target === this.inputRef?.current) {
      this.handleInitialFocus();
    }
  };

  // Can't use this this because when you first interact with DI you open DP and focus DI,
  // but if you press down arrow, you open DP but focus DP instead of DI.
  // afterDdtOpens = focusDatePicker => {
  //   this.inputRef?.current.focus();
  // };

  closeDropdown = () => {
    this.ddtRef.current?.closeDropdown();
    this.setState({ pickitemInitialHighlight: true });
  };

  onInputChange = event => {
    this.props.onInputChange
      ? this.props.onInputChange(event)
      : (event.persist(), this.setState({ inputValue: event.target.value }));
  };

  focusDatePicker = () => {
    if (this.state.activePanel === this.customDatesId) {
      this.datepickerRef?.current?.focus();
    }
  };

  handleInitialFocus = () => {
    if (!this.props.isDisabled) {
      this.setState({ pickitemInitialHighlight: false });
      this.ddtRef?.current?.openDropdown();
      this.inputRef?.current?.select();
    }
  };

  // When focused with a down arrow, it should open DP but not focus DI back.
  // When pressing 'esc' you need to focus the input but don't open DP.
  // onInputFocus = event => {
  //   event.target.select();
  // };

  onIconFocus = () => {
    if (!this.props.isDisabled) {
      this.ddtRef?.current?.openDropdown();
    }
  };

  onInputKeyDown = event => {
    if (event.key === eventKeyValues.enter || event.key === eventKeyValues.tab) {
      this.ddtRef?.current?.closeDropdown();
      this.setDate();
    }

    if (event.key === eventKeyValues.down) {
      this.ddtRef.current.openDropdown();
      // Focus first item only after pressing down arrow (not when dropdown is visible during initial input focus).
      if (this.props.suggestedDates) {
        this.ddtRef?.current?.dropdown?.current?.highlightFirstItem();
      }

      this.datepickerRef?.current?.focus();

      // focus suggested panel for single input
      if (this.props.suggestedDates) {
        this.suggestedDatePanelRef?.current?.focus();
      }
    }
  };

  setDate = () => {
    if (!this.state.inputValue) {
      /**
       * When the user clears the input the date is saved as `null`
       * This has been set up separately to specifically segregate empty input behaviour
       */
      this.state.inputValue === '' && this.onSelectDate(null, true);
      return;
    }

    const { isDueDate, minDate, maxDate, onValidationFailed, locale } = this.props;
    const base = new Date();
    const now = new Date();
    const dateFormat = getDateFormat(locale);
    const parsedDate = isDueDate
      ? parseDueDate({ now, base, dateFormat }, this.state.inputValue)
      : parseDate({ now, base, dateFormat }, this.state.inputValue);

    if (parsedDate && !isDayOutsideRange(parsedDate, minDate, maxDate)) {
      this.onSelectDate(parsedDate, true);
    } else {
      onValidationFailed
        ? onValidationFailed(this.state.inputValue)
        : this.setState({
            isDateInvalid: true,
          });
    }
  };

  onSelectDate = (date, isFocusEvent) => {
    this.setState({
      inputValue: null,
      isDateInvalid: false,
      selectedSuggestedDate: 'custom',
    });

    if (!this.props.preventFocusOnSelect) {
      this.inputRef?.current.focus();
    }

    this.props.onSelectDate?.(date);

    if (!isFocusEvent) {
      this.props.closeOnSelect && this.closeDropdown();
    }
  };

  showDatepickerPanel = () => {
    this.setState({
      activePanel: this.customDatesId,
    });
  };

  onDropdownClose = () => {
    this.state.inputValue && this.setDate();
    this.setState({
      activePanel: this.props.suggestedDates ? this.suggestedDatesId : this.customDatesId,
    });
  };

  selectSuggestedDate = selectedSuggestedDateId => {
    const { suggestedDates } = this.props;
    const suggestedDate = suggestedDates.find(cd => cd.id === selectedSuggestedDateId);

    this.setState({
      selectedSuggestedDate: suggestedDate.id,
    });

    this.onSelectDate(suggestedDate.getDate());
  };

  onTriggerFocus = () => {
    // When the trigger wrapper is programmatically focused the inner TextInput is focused
    this.inputRef?.current?.focus();
  };

  render() {
    const {
      closeOnSelect,
      suggestedDates,
      displayedMonth,
      exposeInputRef,
      hintMessage,
      inputClassName,
      inputFieldClassName,
      inputIcon,
      inputLabel,
      _isDropdownHidden,
      isDisabled,
      isInvalid,
      isLabelHidden,
      isDueDate, // Destructured so as not to spread.
      locale,
      maxDate,
      minDate,
      nextButtonAriaLabel,
      onInputChange, // Destructured so as not to spread.
      onSelectDate, // Destructured so as not to spread.
      onValidationFailed, // Destructured so as not to spread.
      prevButtonAriaLabel,
      preventFocusOnSelect,
      selectedDate,
      selectDateLabel,
      selectDateIcon,
      size,
      triggerClassName,
      validationMessage,
      qaHook,
      ...spreadProps
    } = this.props;
    const { activePanel, selectedSuggestedDate, inputValue } = this.state;
    const isDateInvalid = isInvalid || this.state.isDateInvalid;
    const hasVisibleLabel = inputLabel && !isLabelHidden;

    /** Trigger where users focus to select date or type in a date shortcut */
    const trigger = (
      <div
        className={cn(
          `${ns}-dateinputitem`,
          triggerClassName,
          isDisabled && `${ns}-dateinputitem-is-disabled`,
        )}
        onFocus={this.onTriggerFocus}
        ref={this.triggerRef}
        tabIndex="-1"
      >
        <XUITextInput
          autoComplete="off"
          containerClassName={`${ns}-dateinputitem--input`}
          inputClassName={cn(`${ns}-dateinputitem--input`, inputClassName)}
          inputProps={{ id: this.wrapperIds.control }}
          inputRef={el => {
            if (exposeInputRef) {
              exposeInputRef(el);
            }

            this.inputRef.current = el;
          }}
          isDisabled={isDisabled}
          isInvalid={isDateInvalid}
          isLabelHidden={isLabelHidden}
          label={(isLabelHidden && inputLabel) || null}
          labelId={(hasVisibleLabel && this.wrapperIds.label) || null}
          leftElement={
            <XUITextInputSideElement onClick={this.onIconFocus}>
              <XUIIcon color="black" icon={inputIcon || dateStartIcon} isBoxed />
            </XUITextInputSideElement>
          }
          onBlur={this.setDate}
          onChange={this.onInputChange}
          onClick={this.handleInitialFocus}
          onKeyDown={this.onInputKeyDown}
          qaHook={qaHook && `${qaHook}-dateinputitem--input`}
          size={size}
          value={formatSelectedDateToString(selectedDate, inputValue, locale)}
          {...spreadProps}
        />
      </div>
    );

    /** Dropdown footer: */
    const dropdownFooter = (
      <XUIDropdownFooter
        className={`${ns}-dateinputitem-suggesteddates--footer`}
        pickItems={
          <XUIPickitem
            id={this.suggestedDatesFooterId}
            leftElement={<XUIIcon color="black" icon={selectDateIcon || dateStartIcon} isBoxed />}
            onClick={this.showDatepickerPanel}
            qaHook={qaHook && `${qaHook}-dateinputitem-suggesteddates--footer`}
          >
            {selectDateLabel}
          </XUIPickitem>
        }
      />
    );

    /** The main dropdown */
    const dateInputDropdown = (
      <XUINestedDropdown
        _skipFocusOnOpen
        currentPanelId={activePanel}
        ignoreKeyboardEvents={ignoreKeyboardEvents}
        onPanelChange={this.focusDatePicker}
        qaHook={qaHook && `${qaHook}-dateinputitem-dropdown`}
      >
        <XUIDropdownPanel
          allowNarrowViewportAutoHeight
          panelId={this.customDatesId}
          qaHook={qaHook && `${qaHook}-dateinputitem-datepicker`}
        >
          <XUIDatePicker
            displayedMonth={displayedMonth}
            locale={locale}
            maxDate={maxDate}
            minDate={minDate}
            nextButtonAriaLabel={nextButtonAriaLabel}
            onSelectDate={this.onSelectDate}
            prevButtonAriaLabel={prevButtonAriaLabel}
            ref={this.datepickerRef}
            selectedDate={selectedDate}
          />
        </XUIDropdownPanel>
        <XUIDropdownPanel
          allowNarrowViewportAutoHeight
          footer={dropdownFooter}
          panelId={this.suggestedDatesId}
          panelRef={el => (this.suggestedDatePanelRef.current = el)}
          qaHook={qaHook && `${qaHook}-dateinputitem-suggesteddates`}
          shouldManageInitialHighlight={this.state.pickitemInitialHighlight}
        >
          <XUIPicklist>
            {suggestedDatesHeader}
            {suggestedDates?.map(({ id, text, description }) => (
              <XUIPickitem
                id={id}
                isSelected={selectedSuggestedDate === id}
                key={id}
                onSelect={this.selectSuggestedDate}
                rightElement={suggestedDatesSecondaryText(description)}
                value={id}
              >
                {text}
              </XUIPickitem>
            ))}
          </XUIPicklist>
        </XUIDropdownPanel>
      </XUINestedDropdown>
    );

    return (
      <XUIControlWrapper
        fieldClassName={cn(`${ns}-dateinputitem`, inputFieldClassName)}
        isInvalid={isDateInvalid}
        label={(hasVisibleLabel && inputLabel) || null}
        labelRef={this.labelRef}
        wrapperIds={this.wrapperIds}
        {...{
          qaHook,
          hintMessage,
          validationMessage,
        }}
        ref={this.rootNode}
      >
        <XUIDropdownToggled
          closeOnSelect={closeOnSelect}
          closeOnTab={false}
          dropdown={dateInputDropdown}
          isHidden={_isDropdownHidden}
          onClose={this.onDropdownClose}
          ref={this.ddtRef}
          restrictedToViewPort={false}
          trigger={trigger}
          triggerClickAction="none"
          useNewFocusBehaviour
        />
      </XUIControlWrapper>
    );
  }
}

XUIDateInputItem.propTypes = {
  /**
   * @ignore
   * Internal use only, used to expose up `isHidden` prop from `DropdownToggled` for testing purposes
   */
  _isDropdownHidden: PropTypes.bool,

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  /**
   * A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month.
   */
  displayedMonth: PropTypes.instanceOf(Date),

  /** Sets a ref for the input element */
  exposeInputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /** Hint message to display below input */
  hintMessage: PropTypes.node,

  /** Class names to be added to the input element */
  inputClassName: PropTypes.string,

  /** Class names to be added to the input field wrapper element */
  inputFieldClassName: PropTypes.string,

  /**
   * Icon displayed to the left within the input.
   *
   * Defaults to date-start.
   */
  inputIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),

  /** Input label */
  inputLabel: PropTypes.node.isRequired,

  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,

  /** Whether to use the `parseDueDate` [API](https://github.dev.xero.com/A22N/blind-date#usage). */
  isDueDate: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** Whether the individual input label is hidden */
  isLabelHidden: PropTypes.bool,

  /** The locale of the calendar and the input. Use specific locale for english because `en` defaults to `en-US`. */
  locale: PropTypes.string.isRequired,

  /**
   * If you want to disable every date after a given day, pass in the maximum enabled
   * date here. Can be used with the isDateDisabled function.
   */
  maxDate: PropTypes.instanceOf(Date),

  /**
   * If you want to disable every date before a given day, pass in the minimum enabled
   * date here. Can be used with the isDateDisabled function.
   */
  minDate: PropTypes.instanceOf(Date),

  /** An accessibility label for the next month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Next month*
   */
  nextButtonAriaLabel: PropTypes.string.isRequired,

  /** Callback for when the input changes  */
  onInputChange: PropTypes.func,

  /**
   * Callback for when the user selects a date. Will fire even if the date has
   * already been selected.
   */
  onSelectDate: PropTypes.func,

  /** Callback for when the user selects an invalid date. Will not fire onSelectDate */
  onValidationFailed: PropTypes.func,

  /** An accessibility label for the previous month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Previous month*
   */
  prevButtonAriaLabel: PropTypes.string.isRequired,

  /** Prevents focusing input after selecting date - allows to focus the second input in date range without an infinite loop. */
  preventFocusOnSelect: PropTypes.bool,

  qaHook: PropTypes.string,

  /**
   * Icon displayed next to calendar selection in suggested dates dropdown.
   */
  selectDateIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),

  /** Label for an item opening DatePicker (with suggested date mode) */
  selectDateLabel: PropTypes.string,

  /** Value of the date input. Must be a Date object */
  selectedDate: PropTypes.instanceOf(Date),

  /** Size of the input - Can be `xsmall`, `small` or `medium` */
  size: PropTypes.oneOf(Object.keys(baseSizeClasses)),

  /**
   * An array of objects with suggested dates for users to select quickly.
   * Each object consists of an `id`, display `text` and `getDate` function returning the date to be selected.
   */
  suggestedDates: PropTypes.arrayOf(
    PropTypes.shape({
      getDate: PropTypes.func.isRequired,
      id: PropTypes.string,
      text: PropTypes.string,
    }),
  ),

  /** CSS class(es) to go on the trigger element which contains the input */
  triggerClassName: PropTypes.string,

  /** Message to display below input when invalid date inputted */
  validationMessage: PropTypes.node,
};

XUIDateInputItem.defaultProps = {
  closeOnSelect: true,
  displayedMonth: new Date(),
  isDueDate: false,
};

export default XUIDateInputItem;
