import * as React from 'react';

interface DateInputConfig {
  /** A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month. */
  displayedMonth?: Date;

  /** Hint message to display below input */
  hintMessage?: string;

  /** Label for an input. Recommended for accessibility purposes. */
  inputLabel?: string;

  /** Whether the input is disabled */
  isDisabled?: boolean;

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

interface GroupConfig {
  /** Label to display for the entire date range group. Recommended for accessibility purposes. */
  groupLabel?: string;

  /** Hint message to display below range */
  hintMessage?: string;

  /** Whether the group is disabled */
  isDisabled?: boolean;

  /** Whether to hide the label and apply it as an ARIA label instead. Defaults to visible */
  isGroupLabelHidden?: boolean;

  /** Whether the group is invalid. Will pass isInvalid down to both inputs */
  isInvalid?: boolean;

  /** Message to display below range when invalid */
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

  groupConfig: GroupConfig;

  /** The locale of the calendar. Defaults to En */
  locale?: string;

  qaHook?: string;

  startDateInputConfig: DateInputConfig;
}

export default class XUIDateRangeInputWIP extends React.PureComponent<Props> {}
