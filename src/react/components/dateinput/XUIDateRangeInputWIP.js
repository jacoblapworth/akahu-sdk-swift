import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { XUIDropdown, XUIDropdownToggled } from '../../dropdown';
import { XUISecondaryButton } from '../../button';
import XUIPicklist, { XUIPickitem } from '../../picklist';
import XUIDateInputItem from './private/XUIDateInputItem';
import XUIControlGroup from '../controlgroup/XUIControlGroup';
import { logWarning } from '../helpers/developmentConsole';

const baseClass = `${ns}-daterangeinput`;

class XUIDateRangeInputWIP extends Component {
  state = {
    selectedStartDate: this.props.startDateInputConfig?.selectedDateDefaultValue,
    selectedEndDate: this.props.endDateInputConfig?.selectedDateDefaultValue,
    selectedConvenienceDateId: null,
  };

  secondaryButtonDdtRef = createRef(null);

  endInputRef = createRef(null);

  componentDidMount() {
    /** WIP flag logging */
    logWarning({ componentName: 'XUIDateRangeInputWIP', flagType: 'wip' });
  }

  onSelectStartDate = date => {
    this.setState({
      selectedStartDate: date,
    });

    this.endInputRef?.current.focus();

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
      groupConfig,
      locale,
      nextButtonAriaLabel,
      prevButtonAriaLabel,
      qaHook,
      startDateInputConfig,
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
      isLabelHidden: isStartLabelHidden,
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
      isLabelHidden: isEndLabelHidden,
      maxDate: endMaxDate,
      minDate: endMinDate,
      onInputChange: onEndInputChange,
      selectedDateValue: selectedEndDateValue,
      triggerClassName: endTriggerClassName,
      validationMessage: endValidationMessage,
    } = { ...defaultEndDateInputConfig, ...endDateInputConfig };
    const {
      hintMessage: groupHintMessage,
      groupLabel,
      isDisabled: isGroupDisabled,
      isInvalid: isGroupInvalid,
      isGroupLabelHidden,
      validationMessage: groupValidationMessage,
      ...groupSpread
    } = groupConfig;

    const { selectedConvenienceDateId } = this.state;

    const selectedStartDate = selectedStateDateValue || this.state.selectedStartDate;
    const selectedEndDate = selectedEndDateValue || this.state.selectedEndDate;
    const needsMessageSpace =
      startHintMessage || endHintMessage || startValidationMessage || endValidationMessage;
    const isAnyDisabled = isStartDisabled || isEndDisabled || isGroupDisabled;

    const dateInputDropdown = convenienceDates && (
      <XUIDropdown className={`${baseClass}--conveniencedatesdropdown`}>
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
      <XUIControlGroup
        columnWidths="1fr 1fr 40px"
        fieldClassName={cn(
          `${baseClass}`,
          className,
          !convenienceDates && `${baseClass}--onlyinputs`,
        )}
        hintMessage={groupHintMessage}
        isBottomAligned // This can be overridden via groupSpread
        isDisabled={isGroupDisabled}
        isInvalid={isGroupInvalid}
        isLabelHidden={isGroupLabelHidden}
        label={groupLabel}
        qaHook={qaHook}
        validationMessage={groupValidationMessage}
        {...groupSpread}
      >
        <XUIDateInputItem
          closeOnSelect={closeOnSelect}
          displayedMonth={displayedStartMonth}
          hintMessage={startHintMessage}
          inputFieldClassName={cn(
            `${baseClass}--firstinput`,
            needsMessageSpace &&
              !startHintMessage &&
              !startValidationMessage &&
              `${baseClass}--firstinput-withspace`,
          )}
          inputLabel={startInputLabel}
          isDisabled={isStartDisabled || isGroupDisabled}
          isInvalid={isStartInvalid || isGroupInvalid}
          isLabelHidden={isStartLabelHidden}
          locale={locale}
          maxDate={startMaxDate}
          minDate={startMinDate}
          nextButtonAriaLabel={nextButtonAriaLabel}
          onInputChange={onStartInputChange}
          onSelectDate={this.onSelectStartDate}
          prevButtonAriaLabel={prevButtonAriaLabel}
          qaHook={qaHook && `${qaHook}-daterangeinput-firstinput`}
          selectedDate={selectedStartDate}
          triggerClassName={startTriggerClassName}
          validationMessage={startValidationMessage}
        />
        <XUIDateInputItem
          closeOnSelect={closeOnSelect}
          displayedMonth={displayedEndMonth}
          exposeInputRef={el => (this.endInputRef.current = el)}
          hintMessage={endHintMessage}
          inputFieldClassName={cn(
            `${baseClass}--secondinput`,
            needsMessageSpace &&
              !endHintMessage &&
              !endValidationMessage &&
              `${baseClass}--secondinput-withspace`,
          )}
          inputLabel={endInputLabel}
          isDisabled={isEndDisabled || isGroupDisabled}
          isInvalid={isEndInvalid || isGroupInvalid}
          isLabelHidden={isEndLabelHidden}
          locale={locale}
          maxDate={endMaxDate}
          minDate={endMinDate}
          nextButtonAriaLabel={nextButtonAriaLabel}
          onInputChange={onEndInputChange}
          onSelectDate={this.onSelectEndDate}
          prevButtonAriaLabel={prevButtonAriaLabel}
          qaHook={qaHook && `${qaHook}-daterangeinput-secondinput`}
          selectedDate={selectedEndDate}
          triggerClassName={endTriggerClassName}
          validationMessage={endValidationMessage}
        />
        {convenienceDates && (
          <XUIDropdownToggled
            className={cn(
              `${baseClass}--convenience`,
              needsMessageSpace && `${baseClass}--convenience-withspace`,
              isAnyDisabled && `${baseClass}--convenience-disabled`,
            )}
            closeOnSelect={closeOnSelect}
            closeOnTab={false}
            dropdown={dateInputDropdown}
            qaHook={qaHook && `${qaHook}-daterangeinput-conveniencedates`}
            ref={this.secondaryButtonDdtRef}
            restrictedToViewPort={false}
            trigger={
              <XUISecondaryButton
                isDisabled={isAnyDisabled}
                onClick={() => this.secondaryButtonDdtRef.current.openDropdown()}
              />
            }
            triggerClickAction="none"
          />
        )}
      </XUIControlGroup>
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
  ),

  endDateInputConfig: PropTypes.shape({
    /**
     * A date which represents the year and month that the calendar will display. Could
     * be any day in the given day and month.
     */
    displayedMonth: PropTypes.instanceOf(Date),

    /** Hint message to display below input */
    hintMessage: PropTypes.string,

    /** Label for the second input.
     *
     * Recommended English value: *End date*
     */
    inputLabel: PropTypes.string.isRequired,

    /** Whether the input is disabled */
    isDisabled: PropTypes.bool,

    /** Whether the current input value is invalid */
    isInvalid: PropTypes.bool,

    /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
    isLabelHidden: PropTypes.bool,

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
  groupConfig: PropTypes.shape({
    /** Label to display for the entire date range group. Recommended for accessibility purposes. */
    groupLabel: PropTypes.string,

    /** Hint message to display below range */
    hintMessage: PropTypes.string,

    /** Whether the group is disabled */
    isDisabled: PropTypes.bool,

    /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
    isGroupLabelHidden: PropTypes.bool,

    /** Whether the group is invalid. Will pass isInvalid down to both inputs */
    isInvalid: PropTypes.bool,

    /** Message to display below range when invalid */
    validationMessage: PropTypes.string,
  }),

  /** The locale of the calendar. */
  locale: PropTypes.string.isRequired,

  /** An accessibility label for the next month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Next month*
   */
  nextButtonAriaLabel: PropTypes.string.isRequired,

  /** An accessibility label for the previous month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Previous month*
   */
  prevButtonAriaLabel: PropTypes.string.isRequired,

  qaHook: PropTypes.string,

  startDateInputConfig: PropTypes.shape({
    /**
     * A date which represents the year and month that the calendar will display. Could
     * be any day in the given day and month.
     */
    displayedMonth: PropTypes.instanceOf(Date),

    /** Hint message to display below input */
    hintMessage: PropTypes.string,

    /** Label for the first input.
     *
     * Recommended English value: *Start date*
     */
    inputLabel: PropTypes.string.isRequired,

    /** Whether the input is disabled */
    isDisabled: PropTypes.bool,

    /** Whether the current input value is invalid */
    isInvalid: PropTypes.bool,

    /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
    isLabelHidden: PropTypes.bool,

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
  groupConfig: {},
};

export default XUIDateRangeInputWIP;
