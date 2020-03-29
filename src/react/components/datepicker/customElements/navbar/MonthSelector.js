import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import caret from '@xero/xui-icon/icons/caret';

import XUIIcon from '../../../icon/XUIIcon';
import { englishMonths, baseClassName } from '../../helpers/constants';
import { ns } from '../../../helpers/xuiClassNamespace';

const buttonSizeClasses = {
  small: `${ns}-button-small`,
  xsmall: `${ns}-button-xsmall`,
};

export default class MonthSelector extends PureComponent {
  state = {};
  setFocus = () => {
    this.setState({ hasFocus: true });
  };
  setBlur = () => {
    this.setState({ hasFocus: false });
  };
  render() {
    const {
      months,
      minDate,
      maxDate,
      currentMonthDate,
      id,
      selectRef,
      onChange,
      onKeyDown,
      qaHook,
      size,
    } = this.props;

    const allMonths = Array.isArray(months) ? months : englishMonths;
    const currentMonth = currentMonthDate.getMonth();
    const currentYear = currentMonthDate.getFullYear();
    const startMonth =
      minDate != null && currentYear === minDate.getFullYear() ? minDate.getMonth() : 0;
    const maxMonth =
      maxDate != null && currentYear === maxDate.getFullYear() ? maxDate.getMonth() : 11;
    const visibleMonths = allMonths
      .map((name, idx) => ({ name, value: idx }))
      .filter(opt => opt.value >= startMonth && opt.value <= maxMonth);
    const label = (
      <label
        className={cn(
          `${ns}-button`,
          `${ns}-button-standard`,
          `${ns}-datepicker--heading-label`,
          `${ns}-datepicker--month-select-label`,
          buttonSizeClasses[size],
          this.state.hasFocus && `${ns}-datepicker--heading-select-has-focus`,
        )}
        htmlFor={id}
      >
        {allMonths[currentMonth]}
        <XUIIcon className={`${ns}-button--caret`} icon={caret} />
      </label>
    );

    /* eslint-disable jsx-a11y/no-onchange */
    const select =
      visibleMonths.length === 1 ? null : (
        <select
          className={`${baseClassName}--heading-select ${baseClassName}--monthselect-layout`}
          data-automationid={`${qaHook}--monthselector`}
          id={id}
          name="month"
          onBlur={this.setBlur}
          onChange={onChange}
          onFocus={this.setFocus}
          onKeyDown={onKeyDown}
          ref={selectRef}
          value={currentMonth}
        >
          {visibleMonths.map(opt => (
            <option
              data-automationid={`${qaHook}--monthoption-${opt.name}`}
              key={opt.value}
              value={opt.value}
            >
              {opt.name}
            </option>
          ))}
        </select>
      );
    /* eslint-enable jsx-a11y/no-onchange */

    return (
      <div
        className={`${baseClassName}--heading ${ns}-heading-item ${baseClassName}--heading-month`}
      >
        {select}
        {label}
      </div>
    );
  }
}

MonthSelector.propTypes = {
  months: PropTypes.arrayOf(PropTypes.node),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  currentMonthDate: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  selectRef: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  qaHook: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(buttonSizeClasses)),
};
