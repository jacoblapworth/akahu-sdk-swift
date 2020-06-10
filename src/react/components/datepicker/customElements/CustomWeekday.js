import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as DayPickerPropTypes } from 'react-day-picker';
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
  weekday: PropTypes.number,
  locale: PropTypes.string,
  // eslint-disable-next-line react/no-typos
  localeUtils: DayPickerPropTypes.default.localeUtils,

  weekdaysLong: PropTypes.arrayOf(PropTypes.string),
  weekdaysShort: PropTypes.arrayOf(PropTypes.string),
};
