import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { XUIDropdown, XUIDropdownPanel, XUIDropdownToggled } from '../../dropdown';
import { XUISecondaryButton } from '../../button';
import XUIPicklist, { XUIPickitem } from '../../picklist';
import XUIDateInputItem from './private/XUIDateInputItem';
import { logWarning } from '../helpers/developmentConsole';

class XUIDateRangeInputWIP extends Component {
  state = {
    selectedStartDate: null,
    selectedEndDate: null,
    selectedConvenienceDateId: null,
  };

  secondaryButtonDdtRef = createRef(null);

  componentDidMount() {
    /** WIP flag logging */
    logWarning({ componentName: 'XUIDateRangeInputWIP', flagType: 'wip' });

    this.setState({
      selectedStartDate: this.props.startDateInputConfig.selectedDateDefaultValue,
      selectedEndDate: this.props.endDateInputConfig.selectedDateDefaultValue,
    });
  }

  onSelectStartDate = date => {
    this.setState({
      selectedStartDate: date,
    });

    this.props.startDateInputConfig.onSelectDate?.(date);
    // TODO: deselect focus
  };

  onSelectEndDate = date => {
    this.setState({
      selectedEndDate: date,
    });

    this.props.endDateInputConfig.onSelectDate?.(date);
    // TODO: deselect focus
  };

  onSelectConvenienceDateRange = selectedConvenienceDateId => {
    const { convenienceDates } = this.props;
    const convenienceDate = convenienceDates.find(cd => cd.id === selectedConvenienceDateId);
    const selectedStartDate = convenienceDate.getStartDate();
    const selectedEndDate = convenienceDate.getEndDate();

    this.setState({ selectedConvenienceDateId: convenienceDate.id });
    this.onSelectStartDate(selectedStartDate);
    this.onSelectEndDate(selectedEndDate);
  };

  render() {
    const {
      className,
      closeOnSelect,
      convenienceDates,
      endDateInputConfig,
      startDateInputConfig,
      locale,
    } = this.props;

    const {
      displayedMonth: displayedStartMonth,
      hintMessage: startHintMessage,
      inputLabel: startInputLabel,
      isDisabled: isStartDisabled,
      onInputChange: onStartInputChange,
      selectedDateValue: selectedStateDateValue,
      triggerClassName: startTriggerClassName,
      validationMessage: startValidationMessage,
    } = startDateInputConfig;
    const {
      displayedMonth: displayedEndMonth,
      hintMessage: endHintMessage,
      inputLabel: endInputLabel,
      isDisabled: isEndDisabled,
      onInputChange: onEndInputChange,
      selectedDateValue: selectedEndDateValue,
      triggerClassName: endTriggerClassName,
      validationMessage: endValidationMessage,
    } = endDateInputConfig;

    const { selectedConvenienceDateId } = this.state;

    const selectedStartDate = selectedStateDateValue || this.state.selectedStartDate;
    const selectedEndDate = selectedEndDateValue || this.state.selectedEndDate;

    const dateInputDropdown = (
      <XUIDropdown
        className={`${ns}-dateinput-rangedropdown--panel`}
        currentPanelId="convenienceDates"
        size="small"
      >
        <XUIDropdownPanel panelId="convenienceDates">
          <XUIPicklist>
            {convenienceDates.map(({ id, text, description }) => (
              <XUIPickitem
                id={id}
                isSelected={selectedConvenienceDateId === id}
                key={id}
                onSelect={this.onSelectConvenienceDateRange}
                value={id}
              >
                {text} {description}
              </XUIPickitem>
            ))}
          </XUIPicklist>
        </XUIDropdownPanel>
      </XUIDropdown>
    );

    return (
      <div className={cn(`${ns}-dateinput-item--daterange`, className)}>
        <XUIDateInputItem
          closeOnSelect={closeOnSelect}
          displayedMonth={displayedStartMonth}
          hintMessage={startHintMessage}
          inputLabel={startInputLabel}
          isDateRangeInput
          isDisabled={isStartDisabled}
          locale={locale}
          onInputChange={onStartInputChange}
          onSelectDate={this.onSelectStartDate}
          selectedDate={selectedStartDate}
          triggerClassName={startTriggerClassName}
          validationMessage={startValidationMessage}
        />
        <XUIDateInputItem
          closeOnSelect={closeOnSelect}
          displayedMonth={displayedEndMonth}
          hasRangeSecondaryButton
          hintMessage={endHintMessage}
          inputFieldClassName={cn(`${ns}-dateinput-item--daterange--secondinput`)}
          inputLabel={endInputLabel}
          isDateRangeInput
          isDisabled={isEndDisabled}
          locale={locale}
          onInputChange={onEndInputChange}
          onSelectDate={this.onSelectEndDate}
          selectedDate={selectedEndDate}
          triggerClassName={endTriggerClassName}
          validationMessage={endValidationMessage}
        />

        <XUIDropdownToggled
          closeOnSelect={closeOnSelect}
          closeOnTab={false}
          dropdown={dateInputDropdown}
          ref={this.secondaryButtonDdtRef}
          restrictedToViewPort={false}
          trigger={
            <XUISecondaryButton onClick={() => this.secondaryButtonDdtRef.current.openDropdown()} />
          }
          triggerClickAction="none"
        />
      </div>
    );
  }
}

XUIDateRangeInputWIP.propTypes = {
  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  startDateInputConfig: PropTypes.shape({
    /** A date which represents the year and month that the calendar will display. Could
     * be any day in the given day and month. */
    displayedMonth: PropTypes.instanceOf(Date),

    /** Hint message to display below input */
    hintMessage: PropTypes.string,

    /** Input label */
    inputLabel: PropTypes.string,

    /** Whether the input is disabled */
    isDisabled: PropTypes.bool,

    /** Callback for when the user selects a date.  Will fire even if the date has
     * already been selected. */
    onSelectDate: PropTypes.func,

    /** Callback for when the input changes  */
    onInputChange: PropTypes.func,

    /** Value of the date input. Must be a Date object */
    selectedDateValue: PropTypes.instanceOf(Date),

    selectedDateDefaultValue: PropTypes.instanceOf(Date),

    /** CSS class(es) to go on the trigger element which contains the input */
    triggerClassName: PropTypes.string,

    /** Message to display below input when invalid date inputted */
    validationMessage: PropTypes.string,
  }),

  endDateInputConfig: PropTypes.shape({
    /** A date which represents the year and month that the calendar will display. Could
     * be any day in the given day and month. */
    displayedMonth: PropTypes.instanceOf(Date),

    /** Hint message to display below input */
    hintMessage: PropTypes.string,

    /** Input label */
    inputLabel: PropTypes.string,

    /** Whether the input is disabled */
    isDisabled: PropTypes.bool,

    /** Callback for when the user selects a date.  Will fire even if the date has
     * already been selected. */
    onSelectDate: PropTypes.func,

    /** Callback for when the input changes  */
    onInputChange: PropTypes.func,

    /** Value of the date input. Must be a Date object */
    selectedDateValue: PropTypes.instanceOf(Date),

    selectedDateDefaultValue: PropTypes.instanceOf(Date),

    /** CSS class(es) to go on the trigger element which contains the input */
    triggerClassName: PropTypes.string,

    /** Message to display below input when invalid date inputted */
    validationMessage: PropTypes.string,
  }),

  /** The locale of the calendar. Defaults to En */
  locale: PropTypes.string,

  /** Convenience dates */
  convenienceDates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      getStartDate: PropTypes.func,
      getEndDate: PropTypes.func,
    }),
  ).isRequired,
};

XUIDateRangeInputWIP.defaultProps = {
  closeOnSelect: true,
  startDateInputConfig: {
    displayedMonth: new Date(),
    inputLabel: 'Start date',
  },
  endDateInputConfig: {
    displayedMonth: new Date(),
    inputLabel: 'End date',
  },
  locale: 'en',
};

export default XUIDateRangeInputWIP;
