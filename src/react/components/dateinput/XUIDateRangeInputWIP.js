import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { XUIDropdown, XUIDropdownToggled } from '../../dropdown';
import { XUISecondaryButton } from '../../button';
import XUIPicklist, { XUIPickitem } from '../../picklist';
import XUIDateInputItem from './private/XUIDateInputItem';
import { logWarning } from '../helpers/developmentConsole';

class XUIDateRangeInputWIP extends Component {
  state = {
    selectedStartDate: this.props.startDateInputConfig?.selectedDateDefaultValue,
    selectedEndDate: this.props.endDateInputConfig?.selectedDateDefaultValue,
    selectedConvenienceDateId: null,
  };

  secondaryButtonDdtRef = createRef(null);

  componentDidMount() {
    /** WIP flag logging */
    logWarning({ componentName: 'XUIDateRangeInputWIP', flagType: 'wip' });
  }

  onSelectStartDate = date => {
    this.setState({
      selectedStartDate: date,
    });

    this.props.startDateInputConfig?.onSelectDate?.(date);
  };

  onSelectEndDate = date => {
    this.setState({
      selectedEndDate: date,
    });

    this.props.endDateInputConfig?.onSelectDate?.(date);
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
      qaHook,
    } = this.props;

    const defaultStartDateInputConfig = {
      displayedMonth: new Date(),
    };
    const defaultEndDateInputConfig = {
      displayedMonth: new Date(),
    };

    const {
      displayedMonth: displayedStartMonth,
      hintMessage: startHintMessage,
      inputLabel: startInputLabel,
      isDisabled: isStartDisabled,
      isInvalid: isStartInvalid,
      maxDate: startMaxDate,
      minDate: startMinDate,
      onInputChange: onStartInputChange,
      selectedDateValue: selectedStateDateValue,
      triggerClassName: startTriggerClassName,
      validationMessage: startValidationMessage,
    } = { ...defaultStartDateInputConfig, ...startDateInputConfig };
    const {
      displayedMonth: displayedEndMonth,
      hintMessage: endHintMessage,
      inputLabel: endInputLabel,
      isDisabled: isEndDisabled,
      isInvalid: isEndInvalid,
      maxDate: endMaxDate,
      minDate: endMinDate,
      onInputChange: onEndInputChange,
      selectedDateValue: selectedEndDateValue,
      triggerClassName: endTriggerClassName,
      validationMessage: endValidationMessage,
    } = { ...defaultEndDateInputConfig, ...endDateInputConfig };

    const { selectedConvenienceDateId } = this.state;

    const selectedStartDate = selectedStateDateValue || this.state.selectedStartDate;
    const selectedEndDate = selectedEndDateValue || this.state.selectedEndDate;
    const hasNoLabel = !startInputLabel && !endInputLabel;
    const isDisabled = isStartDisabled || isEndDisabled;

    const dateInputDropdown = (
      <XUIDropdown className={`${ns}-daterangeinput--conveniencedatesdropdown`} size="small">
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
      </XUIDropdown>
    );

    return (
      <div className={cn(`${ns}-daterangeinput`, className)} data-automationid={qaHook}>
        <XUIDateInputItem
          closeOnSelect={closeOnSelect}
          displayedMonth={displayedStartMonth}
          hintMessage={startHintMessage}
          inputFieldClassName={cn(
            `${ns}-daterangeinput--firstinput`,
            // adjustment is needed when only one label is provided
            !startInputLabel && endInputLabel && `${ns}-daterangeinput--label-blank`,
          )}
          inputLabel={startInputLabel}
          isDateRangeInput
          isDisabled={isStartDisabled}
          isInvalid={isStartInvalid}
          locale={locale}
          maxDate={startMaxDate}
          minDate={startMinDate}
          onInputChange={onStartInputChange}
          onSelectDate={this.onSelectStartDate}
          qaHook={qaHook && `${qaHook}-daterangeinput-firstinput`}
          selectedDate={selectedStartDate}
          triggerClassName={startTriggerClassName}
          validationMessage={startValidationMessage}
        />
        <XUIDateInputItem
          closeOnSelect={closeOnSelect}
          displayedMonth={displayedEndMonth}
          hasRangeSecondaryButton
          hintMessage={endHintMessage}
          inputFieldClassName={cn(
            `${ns}-daterangeinput--secondinput`,
            // adjustment is needed when only one label is provided
            !endInputLabel && startInputLabel && `${ns}-daterangeinput--label-blank`,
          )}
          inputLabel={endInputLabel}
          isDateRangeInput
          isDisabled={isEndDisabled}
          isInvalid={isEndInvalid}
          locale={locale}
          maxDate={endMaxDate}
          minDate={endMinDate}
          onInputChange={onEndInputChange}
          onSelectDate={this.onSelectEndDate}
          qaHook={qaHook && `${qaHook}-daterangeinput-secondinput`}
          selectedDate={selectedEndDate}
          triggerClassName={endTriggerClassName}
          validationMessage={endValidationMessage}
        />

        <XUIDropdownToggled
          className={cn(
            `${ns}-daterangeinput--convenience`,
            hasNoLabel && `${ns}-daterangeinput--convenience--labels--blank`,
            isDisabled && `${ns}-daterangeinput--convenience-disabled`,
          )}
          closeOnSelect={closeOnSelect}
          closeOnTab={false}
          dropdown={dateInputDropdown}
          qaHook={qaHook && `${qaHook}-daterangeinput-conveniencedates`}
          ref={this.secondaryButtonDdtRef}
          restrictedToViewPort={false}
          trigger={
            <XUISecondaryButton
              isDisabled={isDisabled}
              onClick={() => this.secondaryButtonDdtRef.current.openDropdown()}
            />
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

  /** Convenience dates */
  convenienceDates: PropTypes.arrayOf(
    PropTypes.shape({
      getEndDate: PropTypes.func,
      getStartDate: PropTypes.func,
      id: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,

  endDateInputConfig: PropTypes.shape({
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

    /**
     * Callback for when the user selects a date. Will fire even if the date has
     * already been selected.
     */
    onSelectDate: PropTypes.func,

    selectedDateDefaultValue: PropTypes.instanceOf(Date),

    /** Value of the date input. Must be a Date object */
    selectedDateValue: PropTypes.instanceOf(Date),

    /** CSS class(es) to go on the trigger element which contains the input */
    triggerClassName: PropTypes.string,

    /** Message to display below input when invalid date inputted */
    validationMessage: PropTypes.string,
  }),

  /** The locale of the calendar. Defaults to En */
  locale: PropTypes.string,

  qaHook: PropTypes.string,

  startDateInputConfig: PropTypes.shape({
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

    /**
     * Callback for when the user selects a date. Will fire even if the date has
     * already been selected.
     */
    onSelectDate: PropTypes.func,

    selectedDateDefaultValue: PropTypes.instanceOf(Date),

    /** Value of the date input. Must be a Date object */
    selectedDateValue: PropTypes.instanceOf(Date),

    /** CSS class(es) to go on the trigger element which contains the input */
    triggerClassName: PropTypes.string,

    /** Message to display below input when invalid date inputted */
    validationMessage: PropTypes.string,
  }),
};

// Default values for `startDateInputConfig` and `endDateInputConfig` are defined in the class above.
XUIDateRangeInputWIP.defaultProps = {
  closeOnSelect: true,
  locale: 'en',
};

export default XUIDateRangeInputWIP;
