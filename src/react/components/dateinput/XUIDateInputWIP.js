import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import XUIDateInputItem from './private/XUIDateInputItem';
import { logWarning } from '../helpers/developmentConsole';

class XUIDateInputWIP extends React.Component {
  state = {
    selectedDate: this.props.selectedDateDefaultValue,
  };

  componentDidMount() {
    /** WIP flag logging */
    logWarning({ componentName: 'XUIDateInputWIP', flagType: 'wip' });
  }

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
      convenienceDates,
      displayedMonth,
      hintMessage,
      inputLabel,
      isDisabled,
      isInvalid,
      locale,
      maxDate,
      minDate,
      onInputChange,
      onSelectDate, // Destructured so as not to spread.
      selectedDateValue, // Destructured so as not to spread.
      triggerClassName,
      validationMessage,
      qaHook,
      ...spreadProps
    } = this.props;

    const selectedDate = selectedDateValue || this.state.selectedDate;

    return (
      <div className={cn(`${ns}-dateinput`, className)} data-automationid={qaHook}>
        <XUIDateInputItem
          closeOnSelect={closeOnSelect}
          convenienceDates={convenienceDates}
          displayedMonth={displayedMonth}
          hintMessage={hintMessage}
          inputLabel={inputLabel}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          onInputChange={onInputChange}
          onSelectDate={this.onSelectDate}
          qaHook={qaHook && `${qaHook}-dateinput`}
          selectedDate={selectedDate}
          triggerClassName={triggerClassName}
          validationMessage={validationMessage}
          {...spreadProps}
        />
      </div>
    );
  }
}

XUIDateInputWIP.propTypes = {
  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  /** Convenience dates */
  convenienceDates: PropTypes.arrayOf(
    PropTypes.shape({
      getDate: PropTypes.func,
      id: PropTypes.string,
      text: PropTypes.string,
    }),
  ),

  /**
   * A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month.
   */
  displayedMonth: PropTypes.instanceOf(Date),

  /** Hint message to display below input */
  hintMessage: PropTypes.string,

  /** Input label */
  inputLabel: PropTypes.string,

  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** The locale of the calendar. Defaults to En */
  locale: PropTypes.string,

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

  /** Callback for when the input changes  */
  onInputChange: PropTypes.func,

  /** Callback for when the user selects a date */
  onSelectDate: PropTypes.func,

  qaHook: PropTypes.string,

  selectedDateDefaultValue: PropTypes.instanceOf(Date),

  /** Value of the date input. Must be a Date object */
  selectedDateValue: PropTypes.instanceOf(Date),

  /** CSS class(es) to go on the trigger element which contains the input */
  triggerClassName: PropTypes.string,

  /** Message to display below input when invalid date inputted */
  validationMessage: PropTypes.string,
};

XUIDateInputWIP.defaultProps = {
  closeOnSelect: true,
  displayedMonth: new Date(),
  inputLabel: 'Start date',
  locale: 'en',
};

export default XUIDateInputWIP;
