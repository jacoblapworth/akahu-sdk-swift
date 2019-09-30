import PropTypes from 'prop-types';
import { PropTypes as DayPickerPropTypes } from 'react-day-picker';

export default function CustomCaption() {
  return null;
}

CustomCaption.propTypes = {
  date: PropTypes.instanceOf(Date),
  months: PropTypes.arrayOf(PropTypes.string),
  locale: PropTypes.string,
  localeUtils: DayPickerPropTypes.default.localeUtils,
  onClick: PropTypes.func,
  classNames: PropTypes.shape({
    caption: PropTypes.string,
  }),
};
