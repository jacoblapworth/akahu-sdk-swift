import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import dateIcon from '@xero/xui-icon/icons/date-end';
import { parseDate, DateFormat } from '@xero/blind-date';
import { v4 as uuidv4 } from 'uuid';
import { ns } from '../../helpers/xuiClassNamespace';

import {
  XUIDropdownFooter,
  XUIDropdownPanel,
  XUIDropdownToggled,
  XUINestedDropdown,
} from '../../../dropdown';
import XUIDatePicker from '../../../datepicker';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import XUIIcon from '../../icon/XUIIcon';
import formatSelectedDateToString from './helpers/formatSelectedDateToString';

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
    selectedConvenienceDate: null,
    activePanel: null,
    inputValue: null,
    isDateInvalid: null,
  };

  ddtRef = createRef(null);

  datepickerRef = createRef(null);

  inputRef = createRef(null);

  triggerRef = createRef(null);

  secondaryButtonDdtRef = createRef(null);

  /** Generate id's for panels */
  customDatesId = uuidv4();

  convenienceDatesId = uuidv4();

  componentDidMount() {
    this.setState({
      activePanel: this.convenienceDatesId,
    });
  }

  afterDdtOpens = () => {
    this.inputRef?.current.focus();
  };

  closeDropdown = () => {
    this.ddtRef?.current.closeDropdown();
  };

  onInputChange = event => {
    this.props.onInputChange
      ? this.props.onInputChange(event)
      : (event.persist(), this.setState({ inputValue: event.target.value }));
  };

  focusDatePicker = () => {
    if (this.state.activePanel === this.customDatesId) {
      this.datepickerRef.current.focus();
    }
  };

  onInputFocus = event => {
    event.target.select();
    this.ddtRef.current.openDropdown();
  };

  onInputKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      this.ddtRef.current.closeDropdown();
      this.inputRef.current.blur();
      this.setDate();
    }
  };

  setDate = () => {
    if (!this.state.inputValue) return;

    const base = new Date();
    const now = new Date();
    const dateFormat = DateFormat.DMY;
    const parsedDate = parseDate({ now, base, dateFormat }, this.state.inputValue);

    if (parsedDate) {
      this.onSelectDate(parsedDate);
    } else {
      this.setState({
        isDateInvalid: true,
      });
    }
  };

  onSelectDate = date => {
    this.setState({
      inputValue: null,
      isDateInvalid: false,
      selectedConvenienceDate: 'custom',
    });

    this.props.onSelectDate?.(date);

    this.props.closeOnSelect && this.closeDropdown();
  };

  showDatepickerPanel = () => {
    this.setState({
      activePanel: this.customDatesId,
    });
  };

  onDropdownClose = () => {
    this.state.inputValue && this.setDate();
    this.setState({
      activePanel: this.convenienceDatesId,
    });
  };

  selectConvenienceDate = selectedConvenienceDateId => {
    const { convenienceDates } = this.props;
    const convenienceDate = convenienceDates.find(cd => cd.id === selectedConvenienceDateId);

    this.setState({
      selectedConvenienceDate: convenienceDate.id,
    });
    this.onSelectDate(convenienceDate.getDate());
  };

  render() {
    const {
      // TODO: className
      className,
      closeOnSelect,
      convenienceDates,
      displayedMonth,
      hintMessage,
      inputClassName,
      inputFieldClassName,
      inputLabel,
      isDisabled,
      locale,
      selectedDate,
      triggerClassName,
      validationMessage,
    } = this.props;

    const { activePanel, selectedConvenienceDate, inputValue, isDateInvalid } = this.state;

    /** Trigger where users focus to select date or type in a date shortcut */
    const trigger = (
      <div className={triggerClassName} ref={this.triggerRef}>
        <XUITextInput
          containerClassName={`${ns}-dateinput`}
          fieldClassName={inputFieldClassName}
          hintMessage={hintMessage}
          inputClassName={inputClassName}
          inputRef={el => (this.inputRef.current = el)}
          isDisabled={isDisabled}
          isInvalid={isDateInvalid}
          label={inputLabel}
          leftElement={
            <XUITextInputSideElement>
              <XUIIcon color="black-faint" icon={dateIcon} isBoxed />
            </XUITextInputSideElement>
          }
          onBlur={this.setDate}
          onChange={this.onInputChange}
          onFocus={this.onInputFocus}
          onKeyDown={this.onInputKeyDown}
          validationMessage={validationMessage}
          value={formatSelectedDateToString(selectedDate, inputValue)}
        />
      </div>
    );

    /** Dropdown footer: */
    const dropdownFooter = (
      <XUIDropdownFooter
        pickItems={
          <XUIPickitem id="custom" key="custom" onClick={this.showDatepickerPanel}>
            Select Date
          </XUIPickitem>
        }
      />
    );

    /** The main dropdown */
    const dateInputDropdown = (
      <XUINestedDropdown
        currentPanelId={convenienceDates ? activePanel : this.customDatesId}
        ignoreKeyboardEvents={ignoreKeyboardEvents}
        onPanelChange={this.focusDatePicker}
      >
        <XUIDropdownPanel panelId={this.customDatesId}>
          <XUIDatePicker
            displayedMonth={displayedMonth}
            locale={locale}
            onSelectDate={this.onSelectDate}
            ref={this.datepickerRef}
            selectedDate={selectedDate}
          />
        </XUIDropdownPanel>
        <XUIDropdownPanel footer={dropdownFooter} panelId={this.convenienceDatesId}>
          <XUIPicklist>
            {convenienceDates?.map(({ id, text }) => (
              <XUIPickitem
                id={id}
                isSelected={selectedConvenienceDate === id}
                key={id}
                onSelect={this.selectConvenienceDate}
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
      <XUIDropdownToggled
        closeOnSelect={closeOnSelect}
        closeOnTab={false}
        dropdown={dateInputDropdown}
        onClose={this.onDropdownClose}
        onOpenAnimationEnd={this.afterDdtOpens}
        ref={this.ddtRef}
        restrictedToViewPort={false}
        trigger={trigger}
        triggerClickAction="none"
      />
    );
  }
}

XUIDateInputItem.propTypes = {
  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** TODO: Fill this out */
  convenienceDates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      getDate: PropTypes.func,
    }),
  ),

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  /** A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month. */
  displayedMonth: PropTypes.instanceOf(Date),

  /** Hint message to display below input */
  hintMessage: PropTypes.string,

  /** Class names to be added to the input element */
  inputClassName: PropTypes.string,

  /** Class names to be added to the input field wrapper element */
  inputFieldClassName: PropTypes.string,

  /** Input label */
  inputLabel: PropTypes.string,

  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,

  /** The locale of the calendar. Defaults to En */
  locale: PropTypes.string,

  /** Callback for when the input changes  */
  onInputChange: PropTypes.func,

  /** Callback for when the user selects a date.  Will fire even if the date has
   * already been selected. */
  onSelectDate: PropTypes.func,

  /** Value of the date input. Must be a Date object */
  selectedDate: PropTypes.instanceOf(Date),

  /** CSS class(es) to go on the trigger element which contains the input */
  triggerClassName: PropTypes.string,

  /** Message to display below input when invalid date inputted */
  validationMessage: PropTypes.string,
};

XUIDateInputItem.defaultProps = {
  closeOnSelect: true,
  displayedMonth: new Date(),
  locale: 'en',
  selectedDate: new Date(),
  validationMessage: 'Invalid date',
};

export default XUIDateInputItem;
