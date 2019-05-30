import React, { PureComponent } from 'react';
import { DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import arrow from '@xero/xui-icon/icons/arrow';
import XUIIcon from '../../icon/XUIIcon';
import XUIButton from '../../button/XUIButton';
import MonthSelector from './navbar/MonthSelector';
import YearSelector from './navbar/YearSelector';
import { baseClassName } from '../helpers/constants';
import { isKeyArrow, eventKeyValues } from '../../helpers/reactKeyHandler';

export default class CustomNavbar extends PureComponent {
  constructor(props) {
    super(props);
    this.yearId = uuidv4();
    this.monthId = uuidv4();
  }

  onDateChange = date => {
    const { onMonthSelect } = this.props;
    if (onMonthSelect != null) {
      onMonthSelect(date);
    }
  };

  onMonthChange = event => {
    const { previousMonth } = this.props;
    const year =
      this.yearSelect == null
        ? DateUtils.addMonths(previousMonth, 1).getFullYear()
        : this.yearSelect.value;

    this.onDateChange(new Date(year, event.target.value, 1));
  };

  onMonthSelectKeyDown = event => {
    const { previousMonth } = this.props;
    if (isKeyArrow(event)) {
      event.stopPropagation(); // Prevent react-day-picker from doing anything
      const { dir } = this.props;
      const previousMonthKey = dir === 'rtl' ? eventKeyValues.right : eventKeyValues.left;
      const nextMonthKey = dir === 'rtl' ? eventKeyValues.left : eventKeyValues.right;
      if (event.key === previousMonthKey) {
        this.onDateChange(previousMonth);
      } else if (event.key === nextMonthKey) {
        const nextMonth = DateUtils.addMonths(previousMonth, 2);
        this.onDateChange(nextMonth);
      }
    }
  };

  onYearChange = event => {
    const { previousMonth } = this.props;
    const month =
      this.monthSelect == null
        ? DateUtils.addMonths(previousMonth, 1).getMonth()
        : this.monthSelect.value;

    this.onDateChange(new Date(event.target.value, month, 1));
  };

  onYearSelectKeyDown = event => {
    const { previousMonth } = this.props;
    if (isKeyArrow(event)) {
      event.stopPropagation(); // Prevent react-day-picker from doing anything
      const { dir } = this.props;
      const previousYearKey = dir === 'rtl' ? eventKeyValues.right : eventKeyValues.left;
      const nextYearKey = dir === 'rtl' ? eventKeyValues.left : eventKeyValues.right;
      if (event.key === previousYearKey) {
        const lastYear = DateUtils.addMonths(previousMonth, -11);
        this.onDateChange(lastYear);
      } else if (event.key === nextYearKey) {
        const nextYear = DateUtils.addMonths(previousMonth, 13);
        this.onDateChange(nextYear);
      }
    }
  };

  render() {
    const {
      classNames,
      showPreviousButton,
      showNextButton,
      onPreviousClick,
      onNextClick,
      labels,
      dir,
      previousMonth,
      months,
      maxDate,
      minDate,
      isCompact,
      locale,
      qaHook,
    } = this.props;
    const currentMonthDate = DateUtils.addMonths(previousMonth, 1);
    const previousClickHandler = dir === 'rtl' ? onNextClick : onPreviousClick;
    const nextClickHandler = dir === 'rtl' ? onPreviousClick : onNextClick;
    const controlSize = isCompact ? 'xsmall' : 'small';
    const monthSelector = (
      <MonthSelector
        minDate={minDate}
        maxDate={maxDate}
        months={months}
        currentMonthDate={currentMonthDate}
        selectRef={n => (this.monthSelect = n)}
        id={this.monthId}
        onChange={this.onMonthChange}
        onKeyDown={this.onMonthSelectKeyDown}
        size={controlSize}
      />
    );
    const yearSelector = (
      <YearSelector
        minDate={minDate}
        maxDate={maxDate}
        currentMonthDate={currentMonthDate}
        selectRef={n => (this.yearSelect = n)}
        id={this.yearId}
        onChange={this.onYearChange}
        onKeyDown={this.onYearSelectKeyDown}
        locale={locale}
        size={controlSize}
      />
    );

    return (
      <header className={classNames.navBar}>
        <XUIButton
          size={controlSize}
          variant="icon"
          isDisabled={!showPreviousButton}
          className={classNames.navButtonPrev}
          // Can't just pass a function because DayPicker expects a function callback arg
          onClick={() => previousClickHandler()}
          aria-label={labels.previousMonth}
          qaHook={qaHook && `${qaHook}--previous-month-button`}
        >
          <XUIIcon icon={arrow} rotation="90" />
        </XUIButton>

        <div className={`${baseClassName}--heading-dates`}>
          {dir === 'rtl' ? yearSelector : monthSelector}
          {dir === 'rtl' ? monthSelector : yearSelector}
        </div>

        <XUIButton
          size={controlSize}
          variant="icon"
          isDisabled={!showNextButton}
          className={classNames.navButtonNext}
          // Can't just pass a function because DayPicker expects a function callback arg
          onClick={() => nextClickHandler()}
          aria-label={labels.nextMonth}
          qaHook={qaHook && `${qaHook}--next-month-button`}
        >
          <XUIIcon icon={arrow} rotation="270" />
        </XUIButton>
      </header>
    );
  }
}

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
  isCompact: PropTypes.bool,
  locale: PropTypes.string,
  qaHook: PropTypes.string,
};

CustomNavbar.defaultProps = {
  isCompact: false,
  dir: 'ltr',
};
