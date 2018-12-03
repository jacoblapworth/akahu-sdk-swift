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
	}
	setBlur = () => {
		this.setState({ hasFocus: false });
	}
	render() {
		const {
			minDate,
			maxDate,
			currentMonthDate,
			id,
			selectRef,
			onChange,
			onKeyDown,
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
				htmlFor={id}
				className={cn(
					`${ns}-button`,
					`${ns}-button-standard`,
					`${ns}-datepicker--heading-label`,
					`${ns}-datepicker--year-select-label`,
					buttonSizeClasses[size],
					this.state.hasFocus && `${ns}-datepicker--heading-select-has-focus`,
				)}
			>
				{currentYear}
				<XUIIcon icon={caret} className={`${ns}-button--caret`} />
			</label>
		);

		/* eslint-disable jsx-a11y/no-onchange */
		const select = visibleYears.length === 1
			? null
			: (
				<select
					ref={selectRef}
					id={id}
					className={`${baseClassName}--heading-select ${baseClassName}--yearselect-layout`}
					name="year"
					value={currentYear}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onFocus={this.setFocus}
					onBlur={this.setBlur}
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
			<div className={`${baseClassName}--heading ${ns}-heading-item ${baseClassName}--heading-year`}>
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
	// TODO: Implement locale
	locale: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
	size: PropTypes.oneOf(Object.keys(buttonSizeClasses)),
};
