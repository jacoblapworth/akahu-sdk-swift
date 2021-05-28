import React from 'react';
import PropTypes from 'prop-types';
import { baseClassName, customClassNames } from '../helpers/constants';

const CustomWeekday = ({ locale, localeUtils, weekday, weekdaysLong, weekdaysShort }) => {
  let title;
  if (weekdaysLong) {
    title = weekdaysLong[weekday];
  } else {
    title = localeUtils.formatWeekdayLong(weekday, locale);
  }
  let content;
  if (weekdaysShort) {
    content = weekdaysShort[weekday];
  } else {
    content = localeUtils.formatWeekdayShort(weekday, locale);
  }

  return (
    <div className={`${baseClassName}--weekdaywrapper`} role="columnheader">
      <abbr className={customClassNames.weekday} title={title}>
        {content}
      </abbr>
    </div>
  );
};

export default CustomWeekday;

CustomWeekday.propTypes = {
  locale: PropTypes.string,
  localeUtils: PropTypes.shape({
    formatMonthTitle: PropTypes.func,
    formatWeekdayLong: PropTypes.func,
    formatWeekdayShort: PropTypes.func,
    getFirstDayOfWeek: PropTypes.func,
  }),
  weekday: PropTypes.number,
  weekdaysLong: PropTypes.arrayOf(PropTypes.string),
  weekdaysShort: PropTypes.arrayOf(PropTypes.string),
};
