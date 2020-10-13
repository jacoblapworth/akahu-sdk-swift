import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';

const CustomCaption = () => null;

export default CustomCaption;

CustomCaption.propTypes = {
  date: PropTypes.instanceOf(Date),
  months: PropTypes.arrayOf(PropTypes.string),
  locale: PropTypes.string,
  localeUtils: DayPicker.propTypes.localeUtils,
  onClick: PropTypes.func,
  classNames: PropTypes.shape({
    caption: PropTypes.string,
  }),
};
