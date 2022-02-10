import { DateFormat } from '@xero/blind-date';

/**
 * This method has been taken from the `blind-date` package [here](https://github.dev.xero.com/A22N/blind-date/blob/master/doc/Release%20Notes%20-%20v3.0.0.md).
 * It takes in a `locale` string, which creates an `Intl` object to then parse a date from.
 * The output of this formatted date is used to determine which `DateFormat` is appropriate.
 * @param locale The locale string for the date format to be obtained from
 * @returns The DMY/YMD/MDY DateFormat for `@xero/blind-date`
 */
export const getDateFormat = (locale: string): DateFormat => {
  const dateTimeFormat = Intl.DateTimeFormat(locale);

  // Random date to parse, using the locale above to find the order of date/month/year for the given locale
  const parts = dateTimeFormat.formatToParts(1594939521208).map(part => part.type);
  const dayIdx = parts.indexOf('day');
  const monthIdx = parts.indexOf('month');
  const yearIdx = parts.indexOf('year');

  if (dayIdx < monthIdx && monthIdx < yearIdx) {
    return DateFormat.DMY;
  }

  if (yearIdx < monthIdx && monthIdx < dayIdx) {
    return DateFormat.YMD;
  }

  return DateFormat.MDY;
};

export default getDateFormat;
