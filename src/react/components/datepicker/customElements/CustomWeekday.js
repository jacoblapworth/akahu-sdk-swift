import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as DayPickerPropTypes } from 'react-day-picker';

export default function CustomWeekday({
	weekday,
	weekdaysLong,
	weekdaysShort,
	localeUtils,
	locale,
}) {
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
		<div className="xui-datepicker--weekdaywrapper" role="columnheader">
			<abbr className="xui-datepicker--weekday" title={title}>
				{content}
			</abbr>
		</div>
	);
}

CustomWeekday.propTypes = {
	weekday: PropTypes.number,
	locale: PropTypes.string,
	localeUtils: DayPickerPropTypes.default.localeUtils, // eslint-disable-line react/no-typos

	weekdaysLong: PropTypes.arrayOf(PropTypes.string),
	weekdaysShort: PropTypes.arrayOf(PropTypes.string),
};
