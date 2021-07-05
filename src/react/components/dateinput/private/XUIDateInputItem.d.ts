import * as React from 'react';

import { XUIIconData } from '../../icon/XUIIcon';
import { baseSizeClasses } from '../../textinput/private/constants';

interface Props {
  /** Whether or not the dropdown should automatically be hidden when the user selects something */
  closeOnSelect?: boolean;

  /** A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month. */
  displayedMonth?: Date;

  /** Sets a ref for the input element */
  exposeInputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;

  /** Hint message to display below input */
  hintMessage?: React.ReactNode;

  /** Class names to be added to the input element */
  inputClassName?: string;

  /** Class names to be added to the input field wrapper element */
  inputFieldClassName?: string;

  /** Input label */
  inputLabel: React.ReactNode;

  /** Whether the input is disabled */
  isDisabled?: boolean;

  /** Whether to use the `parseDueDate` [API](https://github.dev.xero.com/A22N/blind-date#usage). */
  isDueDate?: boolean;

  /** Whether the current input value is invalid */
  isInvalid?: boolean;

  /** The locale of the calendar. */
  locale: string;

  /** If you want to disable every date after a given day, pass in the maximum enabled
   * date here.  Can be used with the isDateDisabled function. */
  maxDate?: Date;

  /** If you want to disable every date before a given day, pass in the minimum enabled
   * date here.  Can be used with the isDateDisabled function. */
  minDate?: Date;

  /**
   * An accessibility label for the previous month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Previous month*
   */
  nextButtonAriaLabel: string;

  /** Callback for when the input changes  */
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Callback for when the user selects a date */
  onSelectDate?: (day: Date) => void;

  /**
   * An accessibility label for the previous month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Previous month*
   */
  prevButtonAriaLabel: string;

  /** Prevents focusing input after selecting date - allows to focus the second input in date range without an infinite loop. */
  preventFocusOnSelect?: boolean;

  qaHook?: string;

  /**
   * Icon displayed next to calendar selection in suggested dates dropdown.
   */
  selectDateIcon?: XUIIconData;

  /** Label for an item opening DatePicker (with suggested date mode) */
  selectDateLabel?: string;

  /** Value of the date input. Must be a Date object */
  selectedDate?: Date;

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

export default class XUIDateInputItem extends React.PureComponent<Props> {}
