import React, { useRef } from 'react';
import { DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import arrow from '@xero/xui-icon/icons/arrow';
import XUIIconButton from '../../button/XUIIconButton';
import MonthSelector from './navbar/MonthSelector';
import YearSelector from './navbar/YearSelector';
import { baseClassName } from '../helpers/constants';
import { isKeyArrow, eventKeyValues } from '../../helpers/reactKeyHandler';

const CustomNavbar = ({
  classNames,
  dir,
  labels,
  locale,
  maxDate,
  minDate,
  months,
  onMonthSelect,
  onNextClick,
  onPreviousClick,
  previousMonth,
  qaHook,
  showNextButton,
  showPreviousButton,
}) => {
  const yearSelect = useRef();
  const monthSelect = useRef();

  const yearId = uuidv4();
  const monthId = uuidv4();

  const onDateChange = date => {
    if (onMonthSelect != null) {
      onMonthSelect(date);
    }
  };

  const onMonthChange = event => {
    const year =
      yearSelect == null ? DateUtils.addMonths(previousMonth, 1).getFullYear() : yearSelect.value;

    onDateChange(new Date(year, event.target.value, 1));
  };

  const onMonthSelectKeyDown = event => {
    if (isKeyArrow(event)) {
      event.stopPropagation(); // Prevent react-day-picker from doing anything
      const previousMonthKey = dir === 'rtl' ? eventKeyValues.right : eventKeyValues.left;
      const nextMonthKey = dir === 'rtl' ? eventKeyValues.left : eventKeyValues.right;
      if (event.key === previousMonthKey) {
        onDateChange(previousMonth);
      } else if (event.key === nextMonthKey) {
        const nextMonth = DateUtils.addMonths(previousMonth, 2);
        onDateChange(nextMonth);
      }
    }
  };

  const onYearChange = event => {
    const month =
      monthSelect == null ? DateUtils.addMonths(previousMonth, 1).getMonth() : monthSelect.value;

    onDateChange(new Date(event.target.value, month, 1));
  };

  const onYearSelectKeyDown = event => {
    if (isKeyArrow(event)) {
      event.stopPropagation(); // Prevent react-day-picker from doing anything
      const previousYearKey = dir === 'rtl' ? eventKeyValues.right : eventKeyValues.left;
      const nextYearKey = dir === 'rtl' ? eventKeyValues.left : eventKeyValues.right;
      if (event.key === previousYearKey) {
        const lastYear = DateUtils.addMonths(previousMonth, -11);
        onDateChange(lastYear);
      } else if (event.key === nextYearKey) {
        const nextYear = DateUtils.addMonths(previousMonth, 13);
        onDateChange(nextYear);
      }
    }
  };

  const currentMonthDate = DateUtils.addMonths(previousMonth, 1);
  const previousClickHandler = dir === 'rtl' ? onNextClick : onPreviousClick;
  const nextClickHandler = dir === 'rtl' ? onPreviousClick : onNextClick;
  const controlSize = 'small';
  const monthSelector = (
    <MonthSelector
      currentMonthDate={currentMonthDate}
      id={monthId}
      maxDate={maxDate}
      minDate={minDate}
      months={months}
      onChange={onMonthChange}
      onKeyDown={onMonthSelectKeyDown}
      qaHook={qaHook}
      selectRef={monthSelect}
      size={controlSize}
    />
  );
  const yearSelector = (
    <YearSelector
      currentMonthDate={currentMonthDate}
      id={yearId}
      locale={locale}
      maxDate={maxDate}
      minDate={minDate}
      onChange={onYearChange}
      onKeyDown={onYearSelectKeyDown}
      qaHook={qaHook}
      selectRef={yearSelect}
      size={controlSize}
    />
  );

  return (
    <header className={classNames.navBar}>
      <XUIIconButton
        ariaLabel={labels.previousMonth}
        className={classNames.navButtonPrev}
        icon={arrow}
        isDisabled={!showPreviousButton}
        // Can't just pass a function because DayPicker expects a function callback arg
        onClick={() => previousClickHandler()}
        qaHook={qaHook && `${qaHook}--previous-month-button`}
        rotation="90"
        size={controlSize}
      />

      <div className={`${baseClassName}--heading-dates`}>
        {dir === 'rtl' ? yearSelector : monthSelector}
        {dir === 'rtl' ? monthSelector : yearSelector}
      </div>

      <XUIIconButton
        ariaLabel={labels.nextMonth}
        className={classNames.navButtonNext}
        icon={arrow}
        isDisabled={!showNextButton}
        // Can't just pass a function because DayPicker expects a function callback arg
        onClick={() => nextClickHandler()}
        qaHook={qaHook && `${qaHook}--next-month-button`}
        rotation="270"
        size={controlSize}
      />
    </header>
  );
};

export default CustomNavbar;

CustomNavbar.propTypes = {
  classNames: PropTypes.shape({
    navBar: PropTypes.string,
    navButtonPrev: PropTypes.string,
    navButtonNext: PropTypes.string,
  }),
  showPreviousButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  labels: PropTypes.shape({
    previousMonth: PropTypes.string.isRequired,
    nextMonth: PropTypes.string.isRequired,
  }),
  dir: PropTypes.string,
  previousMonth: PropTypes.instanceOf(Date),
  months: PropTypes.arrayOf(PropTypes.string),
  onMonthSelect: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  qaHook: PropTypes.string,
};

CustomNavbar.defaultProps = {
  dir: 'ltr',
};
