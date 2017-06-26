import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDayPicker, { DateUtils } from 'react-day-picker';
import assign from 'object-assign';
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
} from './helpers/utils';

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
		'xui-datepicker--day-is-selected-middle xui-datepicker--day-is-in-range xui-datepicker--day-is-in-selected-range': day =>
			!isDayDisabled(day) && isRangeComplete(range) && DateUtils.isDayBetween(day, range.from, range.to),

		'xui-datepicker--day-is-selected-start xui-datepicker--day-is-in-range xui-datepicker--day-is-in-selected-range': day =>
			!isDayDisabled(day) && isRangeComplete(range) && DateUtils.isSameDay(day, range.from),

		'xui-datepicker--day-is-selected-end xui-datepicker--day-is-in-range xui-datepicker--day-is-in-selected-range': day =>
			!isDayDisabled(day) && isRangeComplete(range) && DateUtils.isSameDay(day, range.to),

		'xui-datepicker--day-is-hovered-middle xui-datepicker--day-is-in-range': day =>
			!isDayDisabled(day) && isPartialRange(range) && hoverDate != null && DateUtils.isDayBetween(day, range.from, hoverDate),

		'xui-datepicker--day-is-hovered-start xui-datepicker--day-is-in-range': day =>
			!isDayDisabled(day) && isPartialRange(range) && hoverDate != null && DateUtils.isSameDay(day, hoverDate) && DateUtils.isDayBefore(hoverDate, range.from),

		'xui-datepicker--day-is-hovered-end xui-datepicker--day-is-in-range': day =>
			!isDayDisabled(day) && isPartialRange(range) && hoverDate != null && DateUtils.isSameDay(day, hoverDate) && DateUtils.isDayAfter(hoverDate, range.from),

		'xui-datepicker--day-is-selected-hovered-end xui-datepicker--day-is-in-range': day =>
			!isDayDisabled(day) && isStartOfPartialRange(day, range) && hoverDate != null && DateUtils.isDayBefore(hoverDate, day),

		'xui-datepicker--day-is-selected-hovered-start xui-datepicker--day-is-in-range': day =>
			!isDayDisabled(day) && isStartOfPartialRange(day, range) && hoverDate != null && DateUtils.isDayAfter(hoverDate, day),

		'xui-datepicker--day-selectable': day =>
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
		'xui-datepicker--day-selectable': day =>
			!(DateUtils.isSameDay(day, selectedDate) || isDayDisabled(day)),
	};
}

export default class Calendar extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			hoverDate: null,
			currentMonth: normalizeDisplayedMonth(props.displayedMonth, props.minDate, props.maxDate),
		};

		this.dateRefs = {};
	}

	componentWillReceiveProps(nextProps) {
		const { displayedMonth } = nextProps;
		if (displayedMonth instanceof Date && !DateUtils.isSameDay(displayedMonth, this.props.displayedMonth)) {
			const nextDisplayedMonth = normalizeDisplayedMonth(displayedMonth, nextProps.minDate, nextProps.maxDate);
			if (
				nextDisplayedMonth.getFullYear() !== this.state.currentMonth.getFullYear() ||
				nextDisplayedMonth.getMonth() !== this.state.currentMonth.getMonth()
			) {
				this.setState({ currentMonth: nextDisplayedMonth });
			}
		}
	}

	isDayDisabled = day => {
		const { minDate, maxDate, isDateDisabled } = this.props;
		if (typeof isDateDisabled === 'function' && isDateDisabled(day)) {
			return true;
		}
		const minDateSet = minDate != null;
		const maxDateSet = maxDate != null;
		if (!minDateSet && !maxDateSet) {
			return false;
		}
		if (minDateSet && maxDateSet) {
			return DateUtils.isDayBefore(day, minDate) || DateUtils.isDayAfter(day, maxDate);
		}
		if (minDateSet) {
			return DateUtils.isDayBefore(day, minDate);
		}
		return DateUtils.isDayAfter(day, maxDate);
	}

	onDayFocus = (date, modifiers) => {
		const disabled = modifiers[customClassNames.disabled];

		// Determine if this date should get date range hover styles
		const shouldSetDay = isPartialRange(this.props.selectedRange) && !disabled;
		this.setState({
			hoverDate: shouldSetDay ? date : null,
		});
	}

	onDayMouseEnter = (date, modifiers) => {
		const disabled = modifiers[customClassNames.disabled];
		/*
		When the user navigates via the keyboard, focus is manually moved between elements.
		So, for the keyboard and mouse to have the same state, we need to manually set focus
		on the day that we're hovering.
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
	}

	onMonthChange = month => {
		this.dateRefs = {};
		this.setState({
			currentMonth: normalizeDisplayedMonth(month, this.props.minDate, this.props.maxDate),
		});
	}

	onSelectDate = (date, modifiers) => {
		const { onSelectDate } = this.props;
		if (!modifiers[customClassNames.disabled]) {
			if (onSelectDate) {
				onSelectDate(date);
			}
			if (modifiers[customClassNames.outside]) {
				this.setState({
					currentMonth: date,
				});
			}
		}
	}

	/**
	 * Method to render the contents of a single day cell in the datepicker.
	 *
	 * @private
	 * @param {Date} day
	 * @returns {Object}
	 */
	renderDay = day => {
		const dateTime = formatDateISO(day);
		return (
			<time ref={n => this.dateRefs[dateTime] = n} dateTime={dateTime} className="xui-datepicker--day--time">
				{day.getDate()}
			</time>
		);
	}

	render() {
		const {
			selectedDate,
			showFixedNumberOfWeeks,
			showDaysInOtherMonths,
			nextButtonLabel,
			prevButtonLabel,
			selectedRange,
			minDate,
			maxDate,
			isCompact,
			months,
			weekdaysLong,
			weekdaysShort,
			firstDayOfWeek,
			dir,
			locale,
		} = this.props;
		const normalizedRange = normalizeRange(selectedRange);
		const modifiers = selectedRange
			? getRangeModifiers(normalizedRange, this.state.hoverDate, this.isDayDisabled)
			: getSingleDayModifiers(selectedDate, this.state.hoverDate, this.isDayDisabled);
		const selectedDays = [];
		const customNavbarElement = (
			<CustomNavbar
				isCompact={isCompact}
				classNames={customClassNames}
				onMonthSelect={this.onMonthChange}
				minDate={minDate}
				maxDate={maxDate}
				months={months}
				locale={locale}
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
		let classes = customClassNames;
		if (isCompact) {
			classes = assign({}, customClassNames, {
				container: customClassNames.container + ' xui-datepicker-compact',
			});
		}

		return (
			<ReactDayPicker
				labels={{
					nextMonth: nextButtonLabel,
					previousMonth: prevButtonLabel,
				}}
				fromMonth={minDate}
				toMonth={maxDate}
				modifiers={modifiers}
				month={this.state.currentMonth}
				selectedDays={selectedDays}
				classNames={classes}
				disabledDays={this.isDayDisabled}
				onDayClick={this.onSelectDate}
				captionElement={customCaptionElement}
				navbarElement={customNavbarElement}
				weekdayElement={customWeekdayElement}
				renderDay={this.renderDay}
				onDayMouseEnter={this.onDayMouseEnter}
				onDayFocus={this.onDayFocus}
				onMonthChange={this.onMonthChange}
				enableOutsideDays={showDaysInOtherMonths}
				fixedWeeks={showFixedNumberOfWeeks}
				months={months}
				weekdaysLong={weekdaysLong}
				weekdaysShort={weekdaysShort}
				firstDayOfWeek={firstDayOfWeek}
				dir={dir}
				locale={locale}
			/>
		);
	}
}

Calendar.propTypes = {
	/** @prop {function(Date):void} Callback for when the user selects a date.  Will fire even if the date has already been selected.  Will not fire for disbled days. */
	onSelectDate: PropTypes.func.isRequired,

	/** @prop {Date|{month: Number, year: Number, day: Number}} If you only want to display a single selected day without allowing the user to select a date range, pass that Date in here. */
	selectedDate: PropTypes.instanceOf(Date),

	/** @prop {Date} If you want to disable every date before a given day, pass in the minimum enabled date here.  Can be used with the isDateDisabled function. */
	minDate: PropTypes.instanceOf(Date),

	/** @prop {Date} If you want to disable every date after a given day, pass in the maximum enabled date here.  Can be used with the isDateDisabled function. */
	maxDate: PropTypes.instanceOf(Date),

	/** @prop {Date} A date which represents the year and month that the calendar will display.  Could be any day in the given day and month. */
	displayedMonth: PropTypes.instanceOf(Date),

	/** @prop {String} An accessibility label for the next month button that will be read to users with a screen reader.  */
	nextButtonLabel: PropTypes.string,

	/** @prop {String} An accessibility label for the previous month button that will be read to users with a screen reader. */
	prevButtonLabel: PropTypes.string,

	/**
	 * @prop {{ from: Date|{month: Number, year: Number}, to: Date|{month: Number, year: Number} }}
	 * If the user is selecting a date range, this will contain the dates the user has selected "from" and "to".
	 * If the user has only selected the first date in the range, pass that in as the "from" property.
	 */
	selectedRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }),

	/** @prop {Boolean} If you need to render a calendar in a small amount of horizontal space, set this flag to shrink things down a bit. */
	isCompact: PropTypes.bool,

	/** @prop {function(Date):Boolean} A function that we can use to determine whether or not a day should be disabled.  */
	isDateDisabled: PropTypes.func,

	/** @prop {Boolean} Whether or not to display days that occur in months other than the one you're focused on */
	showDaysInOtherMonths: PropTypes.bool,

	/** @prop {Boolean} Whether or not to show six full weeks no matter how many days are in the month. */
	showFixedNumberOfWeeks: PropTypes.bool,

	/** @prop {String} The locale of the calendar */
	locale: PropTypes.string,

	/** @prop {String[]} An array of localized month names */
	months: PropTypes.arrayOf(PropTypes.string),

	/** @prop {String[]} An array of localized full weekday names (ex: ["Sunday", "Monday", ...]) */
	weekdaysLong: PropTypes.arrayOf(PropTypes.string),

	/** @prop {String[]} An array of localized short weeday names (ex: ["Su", "Mo", ...]) */
	weekdaysShort: PropTypes.arrayOf(PropTypes.string),

	/** @prop {Number} Which day of the week should be displayed as the first day of the week?  Sunday === 0 */
	firstDayOfWeek: PropTypes.number,

	/** @prop {'ltr'|'rtl'} Whether the language is right-to-left or left-to-right */
	dir: PropTypes.oneOf(['ltr', 'rtl']),
};

Calendar.defaultProps = {
	nextButtonLabel: 'Next Month',
	prevButtonLabel: 'Previous Month',
	isCompact: false,
	zeroPadDays: false,
	showDaysInOtherMonths: true,
	showFixedNumberOfWeeks: false,
	dir: 'ltr',
	locale: 'en',
};
