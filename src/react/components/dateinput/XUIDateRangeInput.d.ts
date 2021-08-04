import * as React from 'react';

import { baseSizeClasses } from '../textinput/private/constants';

interface DateInputConfig {
  /** A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month. */
  displayedMonth?: Date;

  /** Hint message to display below input */
  hintMessage?: React.ReactNode;

  /** Label for an input. */
  inputLabel: React.ReactNode;

  /** Whether the input is disabled */
  isDisabled?: boolean;

  /** Whether to use the `parseDueDate` [API](https://github.dev.xero.com/A22N/blind-date#usage). */
  isDueDate?: boolean;

  /** Whether the current input value is invalid */
  isInvalid?: boolean;

  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isLabelHidden?: boolean;

  /** If you want to disable every date after a given day, pass in the maximum enabled
   * date here.  Can be used with the isDateDisabled function. */
  maxDate?: Date;

  /** If you want to disable every date before a given day, pass in the minimum enabled
   * date here.  Can be used with the isDateDisabled function. */
  minDate?: Date;

  /** Callback for when the input changes  */
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Callback for when the user selects a date */
  onSelectDate?: (day: Date) => void;

  /** Callback for when the user selects an invalid date */
  onValidationFailed?: (invalidDate: string) => string;

  selectedDateDefaultValue?: Date;

  /** Value of the date input. Must be a Date object */
  selectedDateValue?: Date;

  /** CSS class(es) to go on the trigger element which contains the input */
  triggerClassName?: string;

  /** Message to display below input when invalid date inputted */
  validationMessage?: React.ReactNode;
}

interface GroupConfig {
  /** Label to display for the entire date range group. Recommended for accessibility purposes. */
  groupLabel?: React.ReactNode;

  /** Hint message to display below range */
  hintMessage?: React.ReactNode;

  /** Whether the group is disabled */
  isDisabled?: boolean;

  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isGroupLabelHidden?: boolean;

  /** Whether the group is invalid. Will pass isInvalid down to both inputs */
  isInvalid?: boolean;

  /** Message to display below range when invalid */
  validationMessage?: React.ReactNode;
}

interface Props {
  /** CSS class(es) to go on the wrapping DOM node */
  className?: string;

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect?: boolean;

  endDateInputConfig: DateInputConfig;

  groupConfig: GroupConfig;

  /** The locale of the calendar. */
  locale: string;

  /**
   * An accessibility label for the next month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Next month*
   */
  nextButtonAriaLabel: string;

  /**
   * An accessibility label for the previous month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Previous month*
   */
  prevButtonAriaLabel: string;

  qaHook?: string;

  /**
   * Size of the input.
   */
  size?: keyof typeof baseSizeClasses;

  startDateInputConfig: DateInputConfig;

  /** Suggested dates */
  suggestedDates?: Array<{
    getEndDate: () => Date;
    getStartDate: () => Date;
    id?: string;
    text?: string;
  }>;
}

export default class XUIDateRangeInput extends React.PureComponent<Props> {}
