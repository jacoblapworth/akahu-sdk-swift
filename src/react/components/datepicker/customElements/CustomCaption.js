import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';

const CustomCaption = () => null;

export default CustomCaption;

CustomCaption.propTypes = {
  classNames: PropTypes.shape({
    caption: PropTypes.string,
  }),
  date: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  localeUtils: DayPicker.propTypes.localeUtils,
  months: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};
