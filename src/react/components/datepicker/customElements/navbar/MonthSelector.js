import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import caret from '@xero/xui-icon/icons/caret';

import XUIIcon from '../../../icon/XUIIcon';
import { englishMonths } from '../../helpers/constants';
import { ns } from '../../../helpers/xuiClassNamespace';

const buttonSizeClasses = {
	small: `${ns}-button-small`,
	xsmall: `${ns}-button-xsmall`,
};

export default function MonthSelector({
	months,
	minDate,
	maxDate,
	currentMonthDate,
	id,
	selectRef,
	onChange,
	onKeyDown,
	size,
}) {
	const allMonths = Array.isArray(months) ? months : englishMonths;
	const currentMonth = currentMonthDate.getMonth();
	const currentYear = currentMonthDate.getFullYear();
	const startMonth = minDate != null && currentYear === minDate.getFullYear()
		? minDate.getMonth()
		: 0;
	const maxMonth = maxDate != null && currentYear === maxDate.getFullYear()
		? maxDate.getMonth()
		: 11;
	const visibleMonths =
			allMonths.map((name, idx) => ({ name, value: idx }))
				.filter(opt => opt.value >= startMonth && opt.value <= maxMonth);
	const label = (
		<label
			htmlFor={id}
			className={cn(
				`${ns}-button`,
				`${ns}-button-standard`,
				`${ns}-datepicker--heading-label`,
				`${ns}-datepicker--month-select-label`,
				buttonSizeClasses[size],
			)}
		>
			{allMonths[currentMonth]}
			<XUIIcon icon={caret} className={`${ns}-button--caret`} />
		</label>
	);

	/* eslint-disable jsx-a11y/no-onchange */
	const select = visibleMonths.length === 1
		? null
		: (
			<select
				ref={selectRef}
				id={id}
				className="xui-datepicker--heading-select xui-datepicker--monthselect-layout"
				name="month"
				value={currentMonth}
				onChange={onChange}
				onKeyDown={onKeyDown}
			>
				{
					visibleMonths.map(opt => (
						<option key={opt.value} value={opt.value}>
							{opt.name}
						</option>
					))
				}
			</select>
		);
	/* eslint-enable jsx-a11y/no-onchange */

	return (
		<div className="xui-datepicker--heading xui-heading-item xui-datepicker--heading-month">
			{select}
			{label}
		</div>
	);
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
	size: PropTypes.oneOf(Object.keys(buttonSizeClasses)),
};
