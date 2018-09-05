import React from 'react';
import PropTypes from 'prop-types';

export default function YearSelector({
	minDate,
	maxDate,
	currentMonthDate,
	id,
	selectRef,
	onChange,
	onKeyDown,
}) {
	const currentYear = currentMonthDate.getFullYear();
	const startYear = minDate ? minDate.getFullYear() : currentYear - 10;
	const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;
	const visibleYears = [];
	for (let i = startYear; i <= maxYear; i += 1) {
		visibleYears.push(i);
	}
	const label = (
		<label
			htmlFor={id}
			className="xui-datepicker--heading-label xui-text-compact xui-padding-xsmall xui-text-deemphasis"
		>
			{currentYear}
		</label>
	);

	/* eslint-disable jsx-a11y/no-onchange */
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
							{year}
						</option>
					))
				}
			</select>
		);
	/* eslint-enable jsx-a11y/no-onchange */

	return (
		<div className="xui-datepicker--heading xui-heading-item xui-datepicker--heading-year">
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
	// TODO: Implement locale
	locale: PropTypes.string,// eslint-disable-line
};
