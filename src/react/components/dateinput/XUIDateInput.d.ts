import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';
import { baseSizeClasses } from '../textinput/private/constants';

interface Props {
  /** CSS class(es) to go on the wrapping DOM node */
  className?: string;

  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect?: boolean;

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

  /** The locale of the calendar. Defaults to En */
  locale?: string;

  /** If you want to disable every date after a given day, pass in the maximum enabled
   * date here.  Can be used with the isDateDisabled function. */
  maxDate?: Date;

  /** If you want to disable every date before a given day, pass in the minimum enabled
   * date here.  Can be used with the isDateDisabled function. */
  minDate?: Date;

  /** Callback for when the input changes */
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Callback for when the user selects a date */
  onSelectDate?: (day: Date) => void;

  qaHook?: string;

  /**
   * Icon displayed next to calendar selection in suggested dates dropdown.
   */
  selectDateIcon?: XUIIconData;

  /** Label for an item opening DatePicker (with suggested date mode) */
  selectDateLabel?: string;

  selectedDateDefaultValue?: Date;

  /** Value of the date input. Must be a Date object */
  selectedDateValue?: Date;

  /**
   * Size of the input.
   */
  size?: keyof typeof baseSizeClasses;

  /** Suggested dates */
  suggestedDates?: Array<{
    getDate: () => Date;
    id?: string;
    text?: string;
  }>;

  /** CSS class(es) to go on the trigger element which contains the input */
  triggerClassName?: string;

  /** Message to display below input when invalid date inputted */
  validationMessage?: React.ReactNode;
}

export default class XUIDateInput extends React.PureComponent<Props> {}
