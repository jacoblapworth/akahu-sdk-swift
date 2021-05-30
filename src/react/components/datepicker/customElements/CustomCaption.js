import PropTypes from 'prop-types';

const CustomCaption = () => null;

export default CustomCaption;

CustomCaption.propTypes = {
  classNames: PropTypes.shape({
    caption: PropTypes.string,
  }),
  date: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  localeUtils: PropTypes.shape({
    formatMonthTitle: PropTypes.func,
    formatWeekdayLong: PropTypes.func,
    formatWeekdayShort: PropTypes.func,
    getFirstDayOfWeek: PropTypes.func,
  }),
  months: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};
