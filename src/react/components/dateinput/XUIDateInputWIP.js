import React from 'react';
import PropTypes from 'prop-types';

import XUIDateInputItem from './private/XUIDateInputItem';
import { logWarning } from '../helpers/developmentConsole';

class XUIDateInputWIP extends React.Component {
  state = {
    selectedDate: null,
  };

  componentDidMount() {
    /** WIP flag logging */
    logWarning({ componentName: 'XUIDateInputWIP', flagType: 'wip' });

    this.setState({ selectedDate: this.props.selectedDateDefaultValue });
  }

  onSelectDate = date => {
    this.setState({
      selectedDate: date,
    });

    this.props.onSelectDate?.(date);
    // TODO: deselect focus
  };

  render() {
    const {
      // TODO: classname
      className,
      closeOnSelect,
      convenienceDates,
      displayedMonth,
      hintMessage,
      inputLabel,
      isDisabled,
      locale,
      onInputChange,
      triggerClassName,
      validationMessage,
    } = this.props;

    const selectedDate = this.props.selectedDateValue || this.state.selectedDate;

    return (
      <XUIDateInputItem
        closeOnSelect={closeOnSelect}
        convenienceDates={convenienceDates}
        displayedMonth={displayedMonth}
        hintMessage={hintMessage}
        inputLabel={inputLabel}
        isDisabled={isDisabled}
        locale={locale}
        onInputChange={onInputChange}
        onSelectDate={this.onSelectDate}
        selectedDate={selectedDate}
        triggerClassName={triggerClassName}
        validationMessage={validationMessage}
      />
    );
  }
}

XUIDateInputWIP.propTypes = {
  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  /** A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month. */
  displayedMonth: PropTypes.instanceOf(Date),

  /** Hint message to display below input */
  hintMessage: PropTypes.string,

  /** Input label */
  inputLabel: PropTypes.string,

  /** Whether the input is disabled */
  isDisabled: PropTypes.bool,

  /** The locale of the calendar. Defaults to En */
  locale: PropTypes.string,

  /** Callback for when the input changes  */
  onInputChange: PropTypes.func,

  /** Callback for when the user selects a date */
  onSelectDate: PropTypes.func,

  /** Value of the date input. Must be a Date object */
  selectedDateValue: PropTypes.instanceOf(Date),

  selectedDateDefaultValue: PropTypes.instanceOf(Date),

  /** CSS class(es) to go on the trigger element which contains the input */
  triggerClassName: PropTypes.string,

  /** Message to display below input when invalid date inputted */
  validationMessage: PropTypes.string,

  /** Convenience dates */
  convenienceDates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      getDate: PropTypes.func,
    }),
  ),
};

XUIDateInputWIP.defaultProps = {
  closeOnSelect: true,
  displayedMonth: new Date(),
  inputLabel: 'Start date',
  locale: 'en',
};

export default XUIDateInputWIP;
