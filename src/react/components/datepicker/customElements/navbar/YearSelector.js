import React from 'react';
import PropTypes from 'prop-types';
import { intlNumber } from '../../helpers/utils';

export default function YearSelector({
	minDate,
	maxDate,
	currentMonthDate,
	id,
	selectRef,
	onChange,
	onKeyDown,
	locale,
}) {
	const currentYear = currentMonthDate.getFullYear();
	const startYear = minDate ? minDate.getFullYear() : currentYear - 10;
	const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;
	const visibleYears = [];
	for (let i = startYear; i <= maxYear; i++) {
		visibleYears.push(i);
	}
	const label = (
		<label
			htmlFor={id}
			className="xui-datepicker--heading-label xui-text-compact xui-padding-xsmall xui-text-deemphasis"
		>
			{intlNumber(currentYear, locale)}
		</label>
	);

	const select = visibleYears.length === 1
		? null
		: (
			<select
				ref={selectRef}
				id={id}
				className="xui-datepicker--heading-select xui-datepicker--yearselect-layout"
				name="year"
				value={currentYear}
				onChange={onChange}
				onKeyDown={onKeyDown}
			>
				{
					visibleYears.map(year => (
						<option key={year} value={year}>
							{intlNumber(year, locale)}
						</option>
					))
				}
			</select>
		);

	return (
		<div className="xui-datepicker--heading xui-item-title xui-datepicker--heading-year">
			{select}
			{label}
		</div>
	);
}

YearSelector.propTypes = {
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	currentMonthDate: PropTypes.instanceOf(Date).isRequired,
	id: PropTypes.string.isRequired,
	selectRef: PropTypes.func,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	locale: PropTypes.string,
};
