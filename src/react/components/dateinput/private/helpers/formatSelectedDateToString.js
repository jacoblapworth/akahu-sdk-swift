import dayjs from 'dayjs';

/** Text Input: Format selected date to DD MMM YYY format eg. 01 Jan 2020 */
const formatSelectedDateToString = (selectedDate, inputValue) => {
  if (inputValue === null && !selectedDate) {
    return '';
  }
  if (inputValue || inputValue === '') {
    return inputValue;
  }
  return dayjs().isValid() ? dayjs(selectedDate).format('DD MMM YYYY') : selectedDate;
};

export default formatSelectedDateToString;
