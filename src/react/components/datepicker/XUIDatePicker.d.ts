import * as React from 'react';
import { DayModifiers } from 'react-day-picker';

interface Props {
  /**
   * Whether the language is left-to-right or right-to-left.
   */
  dir?: 'ltr' | 'rtl';
  /**
   * A date which represents the year and month that the calendar will display. Could be any day in
   * the given day and month.
   */
  displayedMonth?: Date;
  /**
   * Which day of the week should be displayed as the first day of the week?  Sunday === 0
   */
  firstDayOfWeek?: number;
  /**
   * A function that we can use to determine whether or not a day should be disabled.
   */
  isDateDisabled?: (day: Date) => boolean;
  /**
   * The locale of the calendar.
   */
  locale?: string;
  /**
   * If you want to disable every date after a given day, pass in the maximum enabled date here.
   * Can be used with the `isDateDisabled` function.
   */
  maxDate?: Date;
  /**
   * If you want to disable every date before a given day, pass in the minimum enabled date here.
   * Can be used with the `isDateDisabled` function.
   */
  minDate?: Date;
  /**
   * An array of localised month names.
   */
  months?: string[];
  /**
   * An accessibility label for the next month button that will be read to users with a screen
   * reader.
   */
  nextButtonAriaLabel?: string;
  /**
   * Callback for when a user switches to a different month.
   */
  onMonthChange?: (month: Date) => void;
  /**
   * Callback for when the user selects a date. Will fire even if the date has already been
   * selected. Will not fire for disbled days.
   */
  onSelectDate: (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * An accessibility label for the previous month button that will be read to users with a screen
   * reader.
   */
  prevButtonAriaLabel?: string;
  qaHook?: string;
  /**
   * If you only want to display a single selected day without allowing the user to select a date
   * range, pass that Date in here.
   */
  selectedDate?: Date;
  /**
   * If the user is selecting a date range, this will contain the dates the user has selected "from"
   * and "to". If the user has only selected the first date in the range, pass that in as the "from"
   * property.
   */
  selectedRange?: {
    from?: Date;
    to?: Date;
  };
  /**
   * Whether or not to display days that occur in months other than the one you're focused on.
   */
  showDaysInOtherMonths?: boolean;
  /**
   * Whether or not to show six full weeks no matter how many days are in the month.
   */
  showFixedNumberOfWeeks?: boolean;
  /**
   * An array of localised full weekday names.
   *
   * e.g. `["Sunday", "Monday", ...]`
   */
  weekdaysLong?: WeekdaysTuple;
  /**
   * An array of localised short weeday names
   *
   * e.g. `["Su", "Mo", ...]`
   */
  weekdaysShort?: WeekdaysTuple;
}

type WeekdaysTuple = [string, string, string, string, string, string, string];

export default class XUIDatePicker extends React.PureComponent<Props> {
  /**
   * Focus the first date of the month, if the datepicker has been rendered.
   */
  focus(): void;
}
