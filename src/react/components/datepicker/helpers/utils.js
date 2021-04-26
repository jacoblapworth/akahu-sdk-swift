import { DateUtils } from 'react-day-picker';

/**
 * Prefix numbers less than ten with a zero.
 *
 * @export
 * @param {Number} number
 * @returns {String}
 */
export function zeroPad(number) {
  return number < 10 ? `0${number}` : number.toString();
}

/**
 * Make sure that date range objects at least have the right shape.
 *
 * @export
 * @param {{from: ?Date, to: ?Date}} range
 * @returns {Boolean}
 */
export function normalizeRange(range) {
  if (!range) {
    return null;
  }
  return {
    from: range.from == null ? null : range.from,
    to: range.to == null ? null : range.to,
  };
}

/**
 * Format a date object as an ISO compliant string
 * YYYY-MM-DD
 *
 * @export
 * @param {Date} date
 * @returns {String}
 */
export function formatDateISO(date) {
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
}

/**
 * Determine if argument is a date range object with a start and end date.
 *
 * @export
 * @param {{ from: Date, to: Date }} range
 * @returns {Boolean}
 */
export function isRangeComplete(range) {
  return range != null && range.from != null && range.to != null;
}

/**
 * Determine if argument is a date range object with only a start date.
 *
 * @export
 * @param {{ from: Date, to: Date }} range
 * @returns {Boolean}
 */
export function isPartialRange(range) {
  return range != null && range.from != null && range.to == null;
}

/**
 * Determine if the given date is the start date of a partial date range.
 *
 * @export
 * @param {Date} day
 * @param {{ from: Date, to: Date }} range
 * @returns {Boolean}
 */
export function isStartOfPartialRange(day, range) {
  return isPartialRange(range) && DateUtils.isSameDay(day, range.from);
}

/**
 * Determine if a given date is in any month prior to the minDate.
 *
 * @private
 * @param {Date} date
 * @param {Date} minDate
 * @returns {Boolean}
 */
const isBeforeMinMonth = (date, minDate) => {
  if (minDate == null) {
    return false;
  }
  if (date.getFullYear() < minDate.getFullYear()) {
    return true;
  }
  if (date.getFullYear() === minDate.getFullYear()) {
    return date.getMonth() < minDate.getMonth();
  }
  return false;
};

/**
 * Determine if a given date is in any month after to the maxDate.
 *
 * @private
 * @param {Date} date
 * @param {Date} maxDate
 * @returns {Boolean}
 */
const isAfterMaxMonth = (date, maxDate) => {
  if (maxDate == null) {
    return false;
  }
  if (maxDate.getFullYear() < date.getFullYear()) {
    return true;
  }
  if (maxDate.getFullYear() === date.getFullYear()) {
    return maxDate.getMonth() < date.getMonth();
  }
  return false;
};

/**
 * Make sure that a displayedMonth exists and is in the minDate/maxDate range.
 *
 * @export
 * @param {Date} [displayedMonth]
 * @param {Date} [minDate]
 * @param {Date} [maxDate]
 * @returns {Date}
 */
export function normalizeDisplayedMonth(displayedMonth, minDate, maxDate) {
  const normalized = displayedMonth == null ? new Date() : displayedMonth;
  if (isBeforeMinMonth(normalized, minDate)) {
    return DateUtils.clone(minDate);
  }
  if (isAfterMaxMonth(normalized, maxDate)) {
    return DateUtils.clone(maxDate);
  }
  return normalized;
}

/**
 * Get localised calendar data to send to react-day-picker. 2017 was chosen purposefully
 * for the date calculations, as it started on a Sunday.
 *
 * Inspired by https://www.abeautifulsite.net/posts/getting-localized-month-and-day-names-in-the-browser/
 *
 * @export
 * @param {String} [locale]
 * @returns {Object}
 */
export const getLocalisedDateTimeData = locale => {
  const formatter = options => new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' });

  const monthsDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
    const mm = month < 10 ? `0${month}` : month;

    return new Date(`2017-${mm}-01T00:00:00+00:00`);
  });

  const months = monthsDates.map(date => formatter({ month: 'long' }).format(date));

  const weekdaysDates = [1, 2, 3, 4, 5, 6, 7].map(day => {
    const dd = day < 10 ? `0${day}` : day;

    return new Date(`2017-01-${dd}T00:00:00+00:00`);
  });

  const weekdaysLong = weekdaysDates.map(date => formatter({ weekday: 'long' }).format(date));
  const weekdaysShort = weekdaysDates.map(date => formatter({ weekday: 'narrow' }).format(date));

  return { months, weekdaysLong, weekdaysShort };
};

/**
 * Check if given date is falling outside of given constraints.
 *
 * @param {Date} day The day to check if it meets given restrictions.
 * @param {Date} minDate The oldest date used to limit date selection.
 * @param {Date} maxDate The most recent date used to limit date selection.
 * @returns {Boolean} Whether date is disabled (outside of given limit).
 */
export function isDayOutsideRange(day, minDate, maxDate) {
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
