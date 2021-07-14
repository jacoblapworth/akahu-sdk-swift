import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { XUIDropdown, XUIDropdownToggled } from '../../dropdown';
import { XUISecondaryButton } from '../../button';
import XUIPicklist, { XUIPickitem } from '../../picklist';
import XUIDateInputItem from './private/XUIDateInputItem';
import XUIControlGroup from '../controlgroup/XUIControlGroup';
import { baseSizeClasses } from '../textinput/private/constants';

const baseClass = `${ns}-daterangeinput`;

class XUIDateRangeInput extends Component {
  state = {
    selectedStartDate: this.props.startDateInputConfig?.selectedDateDefaultValue,
    selectedEndDate: this.props.endDateInputConfig?.selectedDateDefaultValue,
    selectedSuggestedDateId: null,
  };

  secondaryButtonDdtRef = createRef(null);

  startDateComponentRef = createRef(null);

  endDateComponentRef = createRef(null);

  endInputRef = createRef(null);

  onSelectStartDate = date => {
    this.setState({
      selectedStartDate: date,
    });

    this.props.startDateInputConfig?.onSelectDate?.(date);
    this.endDateComponentRef?.current?.handleInitialFocus();
    this.endInputRef?.current?.select();
  };

  onSelectEndDate = date => {
    this.setState({
      selectedEndDate: date,
    });

    this.props.endDateInputConfig?.onSelectDate?.(date);
  };

  onSelectSuggestedDateRange = selectedSuggestedDateId => {
    const { suggestedDates } = this.props;
    const suggestedDate = suggestedDates.find(cd => cd.id === selectedSuggestedDateId);
    const selectedStartDate = suggestedDate.getStartDate();
    const selectedEndDate = suggestedDate.getEndDate();

    this.setState({ selectedSuggestedDateId: suggestedDate.id });

    this.startDateComponentRef?.current.onSelectDate(selectedStartDate);
    this.onSelectStartDate(selectedStartDate);
    this.endDateComponentRef?.current.onSelectDate(selectedEndDate);
    this.onSelectEndDate(selectedEndDate);
  };

  render() {
    const {
      className,
      closeOnSelect,
      suggestedDates,
      endDateInputConfig,
      groupConfig,
      size,
      startDateInputConfig,
      locale,
      nextButtonAriaLabel,
      prevButtonAriaLabel,
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
      isLabelHidden: isStartLabelHidden,
      maxDate: startMaxDate,
      minDate: startMinDate,
      onInputChange: onStartInputChange,
      selectedDateValue: selectedStateDateValue,
      selectedDateDefaultValue: selectedStartDateDefaultValue,
      triggerClassName: startTriggerClassName,
      validationMessage: startValidationMessage,
      ...spreadStartProps
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
      selectedDateDefaultValue: selectedEndDateDefaultValue,
      triggerClassName: endTriggerClassName,
      validationMessage: endValidationMessage,
      ...spreadEndProps
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

    const { selectedSuggestedDateId } = this.state;

    const selectedStartDate = selectedStateDateValue || this.state.selectedStartDate;
    const selectedEndDate = selectedEndDateValue || this.state.selectedEndDate;
    const needsMessageSpace =
      startHintMessage || endHintMessage || startValidationMessage || endValidationMessage;
    const isAnyDisabled = isStartDisabled || isEndDisabled || isGroupDisabled;

    const dateInputDropdown = suggestedDates && (
      <XUIDropdown className={`${baseClass}--suggesteddatesdropdown`}>
        <XUIPicklist>
          {suggestedDates.map(({ id, text, description }) => (
            <XUIPickitem
              id={id}
              isSelected={selectedSuggestedDateId === id}
              key={id}
              onSelect={this.onSelectSuggestedDateRange}
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
        columnWidths={`1fr 1fr ${!suggestedDates ? '' : '40px'}`}
        fieldClassName={cn(
          `${baseClass}`,
          className,
          !suggestedDates && `${baseClass}--onlyinputs`,
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
          {...spreadStartProps}
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
          preventFocusOnSelect
          qaHook={qaHook && `${qaHook}-daterangeinput-firstinput`}
          ref={this.startDateComponentRef}
          selectedDate={selectedStartDate}
          size={size}
          triggerClassName={startTriggerClassName}
          validationMessage={startValidationMessage}
        />
        <XUIDateInputItem
          {...spreadEndProps}
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
          ref={this.endDateComponentRef}
          selectedDate={selectedEndDate}
          size={size}
          triggerClassName={endTriggerClassName}
          validationMessage={endValidationMessage}
        />
        {suggestedDates && (
          <XUIDropdownToggled
            className={cn(
              `${baseClass}--suggested`,
              needsMessageSpace && `${baseClass}--suggested-withspace`,
              isAnyDisabled && `${baseClass}--suggested-disabled`,
            )}
            closeOnSelect={closeOnSelect}
            closeOnTab={false}
            dropdown={dateInputDropdown}
            qaHook={qaHook && `${qaHook}-daterangeinput-suggesteddates`}
            ref={this.secondaryButtonDdtRef}
            restrictedToViewPort={false}
            trigger={
              <XUISecondaryButton
                isDisabled={isAnyDisabled}
                onClick={() => this.secondaryButtonDdtRef.current.openDropdown()}
                size={size}
              />
            }
            triggerClickAction="none"
          />
        )}
      </XUIControlGroup>
    );
  }
}

XUIDateRangeInput.propTypes = {
  /** CSS class(es) to go on the wrapping DOM node */
  className: PropTypes.string,

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect: PropTypes.bool,

  endDateInputConfig: PropTypes.shape({
    /**
     * A date which represents the year and month that the calendar will display. Could
     * be any day in the given day and month.
     */
    displayedMonth: PropTypes.instanceOf(Date),

    /** Hint message to display below input */
    hintMessage: PropTypes.node,

    /** Label for the second input.
     *
     * Recommended English value: *End date*
     */
    inputLabel: PropTypes.node.isRequired,

    /** Whether the input is disabled */
    isDisabled: PropTypes.bool,

    /** Whether to use the `parseDueDate` [API](https://github.dev.xero.com/A22N/blind-date#usage). */
    isDueDate: PropTypes.bool,

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
    validationMessage: PropTypes.node,
  }),
  groupConfig: PropTypes.shape({
    /** Label to display for the entire date range group. Recommended for accessibility purposes. */
    groupLabel: PropTypes.node,

    /** Hint message to display below range */
    hintMessage: PropTypes.node,

    /** Whether the group is disabled */
    isDisabled: PropTypes.bool,

    /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
    isGroupLabelHidden: PropTypes.bool,

    /** Whether the group is invalid. Will pass isInvalid down to both inputs */
    isInvalid: PropTypes.bool,

    /** Message to display below range when invalid */
    validationMessage: PropTypes.node,
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

  /** Size of the input - Can be `xsmall`, `small` or `medium` */
  size: PropTypes.oneOf(Object.keys(baseSizeClasses)),

  startDateInputConfig: PropTypes.shape({
    /**
     * A date which represents the year and month that the calendar will display. Could
     * be any day in the given day and month.
     */
    displayedMonth: PropTypes.instanceOf(Date),

    /** Hint message to display below input */
    hintMessage: PropTypes.node,

    /** Label for the first input.
     *
     * Recommended English value: *Start date*
     */
    inputLabel: PropTypes.node.isRequired,

    /** Whether the input is disabled */
    isDisabled: PropTypes.bool,

    /** Whether to use the `parseDueDate` [API](https://github.dev.xero.com/A22N/blind-date#usage). */
    isDueDate: PropTypes.bool,

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
    validationMessage: PropTypes.node,
  }),

  /** Suggested dates */
  suggestedDates: PropTypes.arrayOf(
    PropTypes.shape({
      getEndDate: PropTypes.func.isRequired,
      getStartDate: PropTypes.func.isRequired,
      id: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
};

// Default values for `startDateInputConfig` and `endDateInputConfig` are defined in the class above.
XUIDateRangeInput.defaultProps = {
  closeOnSelect: true,
  groupConfig: {},
};

export default XUIDateRangeInput;
