import React, { PureComponent } from 'react';
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

export default class YearSelector extends PureComponent {
  state = {};
  setFocus = () => {
    this.setState({ hasFocus: true });
  };
  setBlur = () => {
    this.setState({ hasFocus: false });
  };
  render() {
    const {
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
          this.state.hasFocus && `${ns}-datepicker--heading-select-has-focus`,
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
          onBlur={this.setBlur}
          onChange={onChange}
          onFocus={this.setFocus}
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
      <div
        className={`${baseClassName}--heading ${ns}-heading-item ${baseClassName}--heading-year`}
      >
        {select}
        {label}
      </div>
    );
  }
}

YearSelector.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  currentMonthDate: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  selectRef: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  qaHook: PropTypes.string,
  // TODO: Implement locale
  // eslint-disable-next-line react/no-unused-prop-types
  locale: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(buttonSizeClasses)),
};
