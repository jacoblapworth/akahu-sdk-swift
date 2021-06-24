import dayjs from 'dayjs';

const defaultDateInputDateFormat = 'D MMM YYYY';

// If `locale` is passed, order of day, month and year is determined by `Intl` class.
// Formatting options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
const options = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

/** Handle date input content and date formatting */
const formatSelectedDateToString = (selectedDate, inputValue, locale) => {
  if (inputValue === null && !selectedDate) {
    return '';
  }
  if (inputValue || inputValue === '') {
    return inputValue;
  }
  if (dayjs(selectedDate).isValid()) {
    return locale
      ? new Intl.DateTimeFormat(locale, options).format(selectedDate)
      : dayjs(selectedDate).format(defaultDateInputDateFormat);
  }

  return selectedDate;
};

export default formatSelectedDateToString;
