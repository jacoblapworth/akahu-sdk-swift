import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDayPicker, { DateUtils } from 'react-day-picker';
import { getLangDir } from 'rtl-detect';
import { getWeekStartByLocale } from 'weekstart';

import '../helpers/xuiGlobalChecks';
import CustomNavbar from './customElements/CustomNavbar';
import CustomCaption from './customElements/CustomCaption';
import CustomWeekday from './customElements/CustomWeekday';
import { customClassNames } from './helpers/constants';
import {
  normalizeRange,
  formatDateISO,
  isRangeComplete,
  isPartialRange,
  isStartOfPartialRange,
  normalizeDisplayedMonth,
  getLocalisedDateTimeData,
  isDayOutsideRange,
} from './helpers/utils';
import { ns } from '../helpers/xuiClassNamespace';

const customCaptionElement = <CustomCaption />;
const customWeekdayElement = <CustomWeekday />;

/**
 * This is the collection of modifiers necessary when selecting a date range.
 *
 * Modifiers are key/value pairs where the key is a class name and the value is a function
 * which accepts a date and returns a boolean.  The value is executed against each visible
 * day and determines whether or not the class name key is added to the DOM for the given
 * date.
 *
 * @private
 * @param {{ from: Date, to: Date }} range
 * @param {?Date} hoverDate
 * @param {{ function(Date):Boolean }} isDayDisabled
 * @returns {Object}
 */
function getRangeModifiers(range, hoverDate, isDayDisabled) {
  return {
    [`${ns}-datepicker--day-is-selected-middle ${ns}-datepicker--day-is-in-range ${ns}-datepicker--day-is-in-selected-range`]:
      day =>
        !isDayDisabled(day) &&
        isRangeComplete(range) &&
        DateUtils.isDayBetween(day, range.from, range.to),

    [`${ns}-datepicker--day-is-selected-start ${ns}-datepicker--day-is-in-range ${ns}-datepicker--day-is-in-selected-range`]:
      day => !isDayDisabled(day) && isRangeComplete(range) && DateUtils.isSameDay(day, range.from),

    [`${ns}-datepicker--day-is-selected-end ${ns}-datepicker--day-is-in-range ${ns}-datepicker--day-is-in-selected-range`]:
      day => !isDayDisabled(day) && isRangeComplete(range) && DateUtils.isSameDay(day, range.to),

    [`${ns}-datepicker--day-is-hovered-middle ${ns}-datepicker--day-is-in-range`]: day =>
      !isDayDisabled(day) &&
      isPartialRange(range) &&
      hoverDate != null &&
      DateUtils.isDayBetween(day, range.from, hoverDate),

    [`${ns}-datepicker--day-is-hovered-start ${ns}-datepicker--day-is-in-range`]: day =>
      !isDayDisabled(day) &&
      isPartialRange(range) &&
      hoverDate != null &&
      DateUtils.isSameDay(day, hoverDate) &&
      DateUtils.isDayBefore(hoverDate, range.from),

    [`${ns}-datepicker--day-is-hovered-end ${ns}-datepicker--day-is-in-range`]: day =>
      !isDayDisabled(day) &&
      isPartialRange(range) &&
      hoverDate != null &&
      DateUtils.isSameDay(day, hoverDate) &&
      DateUtils.isDayAfter(hoverDate, range.from),

    [`${ns}-datepicker--day-is-selected-hovered-end ${ns}-datepicker--day-is-in-range`]: day =>
      !isDayDisabled(day) &&
      isStartOfPartialRange(day, range) &&
      hoverDate != null &&
      DateUtils.isDayBefore(hoverDate, day),

    [`${ns}-datepicker--day-is-selected-hovered-start ${ns}-datepicker--day-is-in-range`]: day =>
      !isDayDisabled(day) &&
      isStartOfPartialRange(day, range) &&
      hoverDate != null &&
      DateUtils.isDayAfter(hoverDate, day),

    [`${ns}-datepicker--day-selectable`]: day =>
      !isDayDisabled(day) && !isStartOfPartialRange(day, range),
  };
}

/**
 * This is the collection of modifiers necessary when selecting a single date.
 *
 * Modifiers are key/value pairs where the key is a class name and the value is a function
 * which accepts a date and returns a boolean.  The value is executed against each visible
 * day and determines whether or not the class name key is added to the DOM for the given
 * date.
 *
 * @private
 * @param {?Date} selectedDate
 * @param {?Date} hoverDate
 * @param {{ function(Date):Boolean }} isDayDisabled
 * @returns {Object}
 */
function getSingleDayModifiers(selectedDate, hoverDate, isDayDisabled) {
  return {
    [`${ns}-datepicker--day-selectable`]: day =>
      !(DateUtils.isSameDay(day, selectedDate) || isDayDisabled(day)),
  };
}

export default class XUIDatePicker extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hoverDate: null,
      currentMonth: normalizeDisplayedMonth(props.displayedMonth, props.minDate, props.maxDate),
      prevProps: props,
    };

    this.dateRefs = {};
    this.focus = this.focus.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentMonth !== this.state.currentMonth && this.props.onMonthChange != null) {
      const currentMonth = this.state.currentMonth.getMonth();
      const currentYear = this.state.currentMonth.getFullYear();
      const prevMonth = prevState.currentMonth.getMonth();
      const prevYear = prevState.currentMonth.getFullYear();
      if (currentMonth !== prevMonth || currentYear !== prevYear) {
        this.props.onMonthChange(this.state.currentMonth);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.displayedMonth && prevState.prevProps !== nextProps) {
      const { displayedMonth } = nextProps;
      if (displayedMonth instanceof Date) {
        const nextDisplayedMonth = normalizeDisplayedMonth(
          displayedMonth,
          nextProps.minDate,
          nextProps.maxDate,
        );
        /**
         * Ensure any new updates to 'currentMonth' state from outside of getDerivedStateFromProps() is not reverted prematurely.
         * This is essential as other methods resulting in the triggering of the 'componentDidUpdate' lifecycle will change the 'currentMonth' state.
         */
        const ensureCurrentMonthStateNotPreviouslyUpdated =
          prevState.currentMonth === prevState.prevProps.displayedMonth;

        if (
          ensureCurrentMonthStateNotPreviouslyUpdated &&
          (nextDisplayedMonth.getFullYear() !== prevState.currentMonth.getFullYear() ||
            nextDisplayedMonth.getMonth() !== prevState.currentMonth.getMonth())
        ) {
          return { currentMonth: nextDisplayedMonth, prevProps: nextProps };
        }
      }
    }
    return null;
  }

  /**
   * Focus the first date of the month, if the datepicker has been rendered.
   *
   * @public
   * @memberof XUIDatePicker
   */
  focus() {
    if (this.dayPicker != null) {
      this.dayPicker.focusFirstDayOfMonth();
    }
  }

  isDayDisabled = day => {
    const { minDate, maxDate, isDateDisabled } = this.props;
    if (typeof isDateDisabled === 'function' && isDateDisabled(day)) {
      return true;
    }

    return isDayOutsideRange(day, minDate, maxDate);
  };

  onDayFocus = (date, modifiers) => {
    const disabled = modifiers[customClassNames.disabled];

    // Determine if this date should get date range hover styles
    const shouldSetDay = isPartialRange(this.props.selectedRange) && !disabled;
    this.setState({
      hoverDate: shouldSetDay ? date : null,
    });
  };

  onDayMouseEnter = (date, modifiers) => {
    const disabled = modifiers[customClassNames.disabled];
    /*
     * When the user navigates via the keyboard, focus is manually moved between elements.
     * So, for the keyboard and mouse to have the same state, we need to manually set focus
     * on the day that we're hovering.
     */
    if (!disabled) {
      const dayNode = this.dateRefs[formatDateISO(date)];
      setTimeout(() => dayNode != null && dayNode.parentNode.focus(), 0);
    }

    // Determine if this date should get hover styles
    const shouldSetDay = isPartialRange(this.props.selectedRange) && !disabled;
    this.setState({
      hoverDate: shouldSetDay ? date : null,
    });
  };

  onMonthChange = month => {
    const hasMonthChanged = !DateUtils.isSameMonth(this.props.displayedMonth, month);

    if (hasMonthChanged) {
      this.props.onMonthChange && this.props.onMonthChange();
    }

    this.dateRefs = {};
    this.setState({
      currentMonth: normalizeDisplayedMonth(month, this.props.minDate, this.props.maxDate),
    });
  };

  onSelectDate = (date, modifiers) => {
    const { onSelectDate } = this.props;
    if (!modifiers[customClassNames.disabled]) {
      if (onSelectDate) {
        onSelectDate(date);
      }
    }
  };

  /**
   * Method to render the contents of a single day cell in the datepicker.
   *
   * @private
   * @param {Date} day
   * @returns {Object}
   */
  renderDay = day => {
    const dateTime = formatDateISO(day);
    const { qaHook } = this.props;
    return (
      <time
        className={`${ns}-datepicker--day--time`}
        data-automationid={qaHook && `${qaHook}--dayoption-${dateTime}`}
        dateTime={dateTime}
        ref={n => (this.dateRefs[dateTime] = n)}
      >
        {day.getDate()}
      </time>
    );
  };

  render() {
    const {
      firstDayOfWeek,
      locale,
      maxDate,
      minDate,
      nextButtonAriaLabel,
      prevButtonAriaLabel,
      qaHook,
      selectedDate,
      selectedRange,
      showDaysInOtherMonths,
      showFixedNumberOfWeeks,
    } = this.props;

    const computedFirstDayOfWeek = firstDayOfWeek || getWeekStartByLocale(locale);
    const dir = getLangDir(locale) || 'ltr';
    const { months, weekdaysLong, weekdaysShort } = getLocalisedDateTimeData(locale);

    const normalizedRange = normalizeRange(selectedRange);
    const modifiers = selectedRange
      ? getRangeModifiers(normalizedRange, this.state.hoverDate, this.isDayDisabled)
      : getSingleDayModifiers(selectedDate, this.state.hoverDate, this.isDayDisabled);
    const selectedDays = [];
    const customNavbarElement = (
      <CustomNavbar
        classNames={customClassNames}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        months={months}
        onMonthSelect={this.onMonthChange}
        qaHook={qaHook}
      />
    );
    if (selectedDate != null) {
      selectedDays.push(selectedDate);
    }
    if (isPartialRange(normalizedRange)) {
      selectedDays.push(normalizedRange.from);
    }
    if (isRangeComplete(normalizedRange)) {
      selectedDays.push(normalizedRange);
    }

    return (
      <ReactDayPicker
        captionElement={customCaptionElement}
        classNames={customClassNames}
        containerProps={{
          'data-automationid': qaHook,
        }}
        dir={dir}
        disabledDays={this.isDayDisabled}
        enableOutsideDaysClick={false}
        firstDayOfWeek={computedFirstDayOfWeek}
        fixedWeeks={showFixedNumberOfWeeks}
        fromMonth={minDate}
        labels={{
          nextMonth: nextButtonAriaLabel,
          previousMonth: prevButtonAriaLabel,
        }}
        locale={locale}
        modifiers={modifiers}
        month={this.state.currentMonth}
        months={months}
        navbarElement={customNavbarElement}
        onDayClick={this.onSelectDate}
        onDayFocus={this.onDayFocus}
        onDayMouseEnter={this.onDayMouseEnter}
        onMonthChange={this.onMonthChange}
        ref={c => (this.dayPicker = c)}
        renderDay={this.renderDay}
        selectedDays={selectedDays}
        showOutsideDays={showDaysInOtherMonths}
        tabIndex="-1"
        toMonth={maxDate}
        weekdayElement={customWeekdayElement}
        weekdaysLong={weekdaysLong}
        weekdaysShort={weekdaysShort}
      />
    );
  }
}

XUIDatePicker.propTypes = {
  /** A date which represents the year and month that the calendar will display. Could
   * be any day in the given day and month. */
  displayedMonth: PropTypes.instanceOf(Date),

  /** Which day of the week should be displayed as the first day of the week?  Sunday === 0 */
  firstDayOfWeek: PropTypes.number,

  /** A function that we can use to determine whether or not a day should be disabled.  */
  isDateDisabled: PropTypes.func,

  /** The locale of the calendar */
  locale: PropTypes.string.isRequired,

  /** If you want to disable every date after a given day, pass in the maximum enabled
   * date here.  Can be used with the isDateDisabled function. */
  maxDate: PropTypes.instanceOf(Date),

  /** If you want to disable every date before a given day, pass in the minimum enabled
   * date here.  Can be used with the isDateDisabled function. */
  minDate: PropTypes.instanceOf(Date),

  /** An accessibility label for the next month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Next month*
   */
  nextButtonAriaLabel: PropTypes.string.isRequired,

  /** Callback for when a user switches to a different month */
  onMonthChange: PropTypes.func,

  /** Callback for when the user selects a date.  Will fire even if the date has
   * already been selected.  Will not fire for disbled days. */
  onSelectDate: PropTypes.func.isRequired,

  /** An accessibility label for the previous month button that will be used
   * by assistive technologies.
   *
   * Recommended English value: *Previous month*
   */
  prevButtonAriaLabel: PropTypes.string.isRequired,

  qaHook: PropTypes.string,

  /** If you only want to display a single selected day without allowing the user
   * to select a date range, pass that Date in here. */
  selectedDate: PropTypes.instanceOf(Date),

  /**
   * If the user is selecting a date range, this will contain the dates the user has
   * selected "from" and "to". If the user has only selected the first date in the range,
   * pass that in as the "from" property.
   */
  selectedRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }),

  /** Whether or not to display days that occur in months other than the one you're focused on */
  showDaysInOtherMonths: PropTypes.bool,

  /** Whether or not to show six full weeks no matter how many days are in the month. */
  showFixedNumberOfWeeks: PropTypes.bool,
};

XUIDatePicker.defaultProps = {
  showDaysInOtherMonths: true,
  showFixedNumberOfWeeks: false,
};
