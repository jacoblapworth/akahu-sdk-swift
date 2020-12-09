import * as dayjs from 'dayjs';

/** Text Input: Format selected date to DD MMM YYY format eg. 01 Jan 2020 */
const formatSelectedDateToString = (selectedDate: Date, inputValue?: string) => {
  if (inputValue || inputValue === '') {
    return inputValue;
  }
  return dayjs().isValid() ? dayjs(selectedDate).format('DD MMM YYYY') : selectedDate;
};

export default formatSelectedDateToString;
