import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import XUIDateInputItem from './private/XUIDateInputItem';
import { baseSizeClasses } from '../textinput/private/constants';

class XUIDateInput extends React.Component {
  state = {
    selectedDate: this.props.selectedDateDefaultValue,
  };

  onSelectDate = date => {
    this.setState({
      selectedDate: date,
    });

    this.props.onSelectDate?.(date);
  };

  render() {
    const {
      className,
      closeOnSelect,
      suggestedDates,
      displayedMonth,
      hintMessage,
      inputLabel,
      _isDropdownHidden,
      isDisabled,
      isDueDate,
      isInvalid,
      locale,
      maxDate,
      minDate,
      nextButtonAriaLabel,
      onInputChange,
      onSelectDate, // Destructured so as not to spread.
      onValidationFailed,
      prevButtonAriaLabel,
      selectedDateValue, // Destructured so as not to spread.
      selectedDateDefaultValue,
      selectDateIcon,
      selectDateLabel,
      size,
      triggerClassName,
      validationMessage,
      qaHook,
      ...spreadProps
    } = this.props;

    const selectedDate = selectedDateValue || this.state.selectedDate;

    return (
      <div className={cn(`${ns}-dateinput`, className)} data-automationid={qaHook}>
        <XUIDateInputItem
          _isDropdownHidden={_isDropdownHidden}
          closeOnSelect={closeOnSelect}
          displayedMonth={displayedMonth}
          hintMessage={hintMessage}
          inputLabel={inputLabel}
          isDisabled={isDisabled}
          isDueDate={isDueDate}
          isInvalid={isInvalid}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          nextButtonAriaLabel={nextButtonAriaLabel}
          onInputChange={onInputChange}
          onSelectDate={this.onSelectDate}
          onValidationFailed={onValidationFailed}
          prevButtonAriaLabel={prevButtonAriaLabel}
          qaHook={qaHook && `${qaHook}-dateinput`}
          selectDateIcon={selectDateIcon}
          selectDateLabel={selectDateLabel}
          selectedDate={selectedDate}
          size={size}
          suggestedDates={suggestedDates}
          triggerClassName={triggerClassName}
          validationMessage={validationMessage}
          {...spreadProps}
        />
      </div>
    );
  }
}

XUIDateInput.propTypes = {
  /**
   * @ignore
   * Internal use only, used to expose up `isHidden` prop from `DropdownToggled` for testing purposes
   */
  _isDropdownHidden: PropTypes.bool,

  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  /**
   * A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month.
   */
  displayedMonth: PropTypes.instanceOf(Date),

  /** Hint message to display below input */
  hintMessage: PropTypes.node,

  /** Input label */
  inputLabel: PropTypes.node.isRequired,

  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,

  /** Whether to use the `parseDueDate` [API](https://github.dev.xero.com/A22N/blind-date#usage). */
  isDueDate: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** The locale of the calendar. */
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

  /** Callback for when the user selects a date */
  onSelectDate: PropTypes.func,

  /** Callback for when the user selects an invalid date. Will not fire onSelectDate */
  onValidationFailed: PropTypes.func,

  /** An accessibility label for the previous month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Previous month*
   */
  prevButtonAriaLabel: PropTypes.string.isRequired,

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

  selectedDateDefaultValue: PropTypes.instanceOf(Date),

  /** Value of the date input. Must be a Date object */
  selectedDateValue: PropTypes.instanceOf(Date),

  /** Size of the input - Can be `xsmall`, `small` or `medium` */
  size: PropTypes.oneOf(Object.keys(baseSizeClasses)),

  /** Suggested dates */
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

XUIDateInput.defaultProps = {
  closeOnSelect: true,
  displayedMonth: new Date(),
  isDueDate: false,
};

export default XUIDateInput;
