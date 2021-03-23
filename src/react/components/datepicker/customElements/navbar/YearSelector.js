import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import caret from '@xero/xui-icon/icons/caret';

import XUIIcon from '../../../icon/XUIIcon';
import { ns } from '../../../helpers/xuiClassNamespace';
import { baseClassName } from '../../helpers/constants';

const buttonSizeClasses = {
  small: `${ns}-button-small`,
  xsmall: `${ns}-button-xsmall`,
};

const YearSelector = ({
  currentMonthDate,
  id,
  maxDate,
  minDate,
  onChange,
  onKeyDown,
  qaHook,
  selectRef,
  size,
}) => {
  const [hasFocus, setHasFocus] = useState();

  const setFocus = () => {
    setHasFocus(true);
  };

  const setBlur = () => {
    setHasFocus(false);
  };

  const currentYear = currentMonthDate.getFullYear();
  const startYear = minDate ? minDate.getFullYear() : currentYear - 10;
  const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;
  const visibleYears = [];
  for (let i = startYear; i <= maxYear; i += 1) {
    visibleYears.push(i);
  }
  const label = (
    <label
      className={cn(
        `${ns}-button`,
        `${ns}-button-standard`,
        `${ns}-datepicker--heading-label`,
        `${ns}-datepicker--year-select-label`,
        buttonSizeClasses[size],
        hasFocus && `${ns}-datepicker--heading-select-has-focus`,
      )}
      htmlFor={id}
    >
      {currentYear}
      <XUIIcon className={`${ns}-datepicker--heading-label-icon`} icon={caret} />
    </label>
  );

  /* eslint-disable jsx-a11y/no-onchange */
  const select =
    visibleYears.length === 1 ? null : (
      <select
        className={`${baseClassName}--heading-select ${baseClassName}--yearselect-layout`}
        data-automationid={`${qaHook}--yearselector`}
        id={id}
        name="year"
        onBlur={setBlur}
        onChange={onChange}
        onFocus={setFocus}
        onKeyDown={onKeyDown}
        ref={selectRef}
        value={currentYear}
      >
        {visibleYears.map(year => (
          <option data-automationid={`${qaHook}--yearoption-${year}`} key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  /* eslint-enable jsx-a11y/no-onchange */

  return (
    <div className={`${baseClassName}--heading ${ns}-heading-item ${baseClassName}--heading-year`}>
      {select}
      {label}
    </div>
  );
};

export default YearSelector;

YearSelector.propTypes = {
  currentMonthDate: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  // TODO: Implement locale
  // eslint-disable-next-line react/no-unused-prop-types
  locale: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  qaHook: PropTypes.string,
  selectRef: PropTypes.shape({ current: PropTypes.object }),
  size: PropTypes.oneOf(Object.keys(buttonSizeClasses)),
};
