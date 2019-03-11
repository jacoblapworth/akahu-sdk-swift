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
	}
	setBlur = () => {
		this.setState({ hasFocus: false });
	}
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
			size,
		} = this.props;

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
					this.state.hasFocus && `${ns}-datepicker--heading-select-has-focus`,
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
					className={`${baseClassName}--heading-select ${baseClassName}--monthselect-layout`}
					name="month"
					value={currentMonth}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onFocus={this.setFocus}
					onBlur={this.setBlur}
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
			<div className={`${baseClassName}--heading ${ns}-heading-item ${baseClassName}--heading-month`}>
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
	size: PropTypes.oneOf(Object.keys(buttonSizeClasses)),
};
