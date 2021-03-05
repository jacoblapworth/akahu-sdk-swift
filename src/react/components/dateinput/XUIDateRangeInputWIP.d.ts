import * as React from 'react';

interface DateInputConfig {
  /** A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month. */
  displayedMonth?: Date;

  /** Hint message to display below input */
  hintMessage?: string;

  /** Input label */
  inputLabel?: string;

  /** Whether the input is disabled */
  isDisabled?: boolean;

  /** Whether the current input value is invalid */
  isInvalid?: boolean;

  /** If you want to disable every date after a given day, pass in the maximum enabled
   * date here.  Can be used with the isDateDisabled function. */
  maxDate?: Date;

  /** If you want to disable every date before a given day, pass in the minimum enabled
   * date here.  Can be used with the isDateDisabled function. */
  minDate?: Date;

  /** Callback for when the input changes  */
  onInputChange?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /** Callback for when the user selects a date */
  onSelectDate?: (day: Date) => void;

  selectedDateDefaultValue?: Date;

  /** Value of the date input. Must be a Date object */
  selectedDateValue?: Date;

  /** CSS class(es) to go on the trigger element which contains the input */
  triggerClassName?: string;

  /** Message to display below input when invalid date inputted */
  validationMessage?: string;
}

interface Props {
  /** CSS class(es) to go on the wrapping DOM node */
  className?: string;

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect?: boolean;

  /** Convenience dates */
  convenienceDates?: Array<{
    getEndDate: () => Date;
    getStartDate: () => Date;
    id?: string;
    text?: string;
  }>;

  endDateInputConfig: DateInputConfig;

  /** The locale of the calendar. Defaults to En */
  locale?: string;

  qaHook?: string;

  startDateInputConfig: DateInputConfig;
}

export default class XUIDateRangeInputWIP extends React.PureComponent<Props> {}
