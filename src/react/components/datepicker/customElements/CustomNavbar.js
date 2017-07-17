import React, { PureComponent } from 'react';
import { NavbarPropTypes, DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import arrow from '@xero/xui-icon/icons/arrow';
import XUIIcon from '../../icon/XUIIcon';
import XUIButton from '../../button/XUIButton';
import MonthSelector from './navbar/MonthSelector';
import YearSelector from './navbar/YearSelector';

/**
 * Simple helper function which determines if a given keyCode is one of the directional arrow keys.
 *
 * @private
 * @param {Number} keyCode
 * @returns {Boolean}
 */
const isArrowKey = keyCode => keyCode >=37 && keyCode <= 40;

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
	}

	onMonthChange = event => {
		const year = this.yearSelect == null
			? DateUtils.addMonths(this.props.previousMonth, 1).getFullYear()
			: this.yearSelect.value;

		this.onDateChange(new Date(year, event.target.value, 1));
	}

	onMonthSelectKeyDown = event => {
		const keyCode = event.keyCode == null ? event.which : event.keyCode;
		if (isArrowKey(keyCode)) {
			event.stopPropagation(); // Prevent react-day-picker from doing anything
			const { dir } = this.props;
			const previousMonthKey = dir === 'rtl' ? 39 : 37;
			const nextMonthKey = dir === 'rtl' ? 37 : 39;
			switch (keyCode) {
				case previousMonthKey: {
					this.onDateChange(this.props.previousMonth);
					break;
				}
				case nextMonthKey: {
					const nextMonth = DateUtils.addMonths(this.props.previousMonth, 2);
					this.onDateChange(nextMonth);
					break;
				}
			}
		}
	}

	onYearChange = event => {
		const month = this.monthSelect == null
			? DateUtils.addMonths(this.props.previousMonth, 1).getMonth()
			: this.monthSelect.value;

		this.onDateChange(new Date(event.target.value, month, 1));
	}

	onYearSelectKeyDown = event => {
		const keyCode = event.keyCode == null ? event.which : event.keyCode;
		if (isArrowKey(keyCode)) {
			event.stopPropagation(); // Prevent react-day-picker from doing anything
			const { dir } = this.props;
			const previousYearKey = dir === 'rtl' ? 39 : 37;
			const nextYearKey = dir === 'rtl' ? 37 : 39;
			switch (keyCode) {
				case previousYearKey: { // Left => previous year
					const lastYear = DateUtils.addMonths(this.props.previousMonth, -11);
					this.onDateChange(lastYear);
					break;
				}
				case nextYearKey: { // Right => next year
					const nextYear = DateUtils.addMonths(this.props.previousMonth, 13);
					this.onDateChange(nextYear);
					break;
				}
			}
		}
	}

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
		} = this.props;
		const currentMonthDate = DateUtils.addMonths(previousMonth, 1);
		const previousClickHandler = dir === 'rtl' ? onNextClick : onPreviousClick;
		const nextClickHandler = dir === 'rtl' ? onPreviousClick : onNextClick;
		const navButtonVariant = isCompact ? 'icon' : 'icon-large';
		const monthSelector = (
			<MonthSelector
				minDate={minDate}
				maxDate={maxDate}
				months={months}
				currentMonthDate={currentMonthDate}
				selectRef={n => this.monthSelect = n}
				id={this.monthId}
				onChange={this.onMonthChange}
				onKeyDown={this.onMonthSelectKeyDown}
			/>
		);
		const yearSelector = (
			<YearSelector
				minDate={minDate}
				maxDate={maxDate}
				currentMonthDate={currentMonthDate}
				selectRef={n => this.yearSelect = n}
				id={this.yearId}
				onChange={this.onYearChange}
				onKeyDown={this.onYearSelectKeyDown}
				locale={locale}
			/>
		);

		return (
			<header className={classNames.navBar}>
				<XUIButton
					variant={navButtonVariant}
					isDisabled={!showPreviousButton}
					className={classNames.navButtonPrev}
					onClick={() => previousClickHandler()} // If you just pass the fuction, shit blows up since the internals of DayPicker expect a function callback arg
					aria-label={labels.previousMonth}
				>
					<XUIIcon path={arrow} rotation="90" />
				</XUIButton>

				<form className="xui-datepicker--heading-dates">
					{dir === 'rtl' ? yearSelector : monthSelector}
					{dir === 'rtl' ? monthSelector : yearSelector}
				</form>

				<XUIButton
					variant={navButtonVariant}
					isDisabled={!showNextButton}
					className={classNames.navButtonNext}
					onClick={() => nextClickHandler()} // If you just pass the fuction, shit blows up since the internals of DayPicker expect a function callback arg
					aria-label={labels.nextMonth}
				>
					<XUIIcon path={arrow} rotation="270" />
				</XUIButton>
			</header>
		);
	}
}

CustomNavbar.propTypes = {
	...NavbarPropTypes,
	classNames: NavbarPropTypes.classNames,
	showPreviousButton: NavbarPropTypes.showPreviousButton,
	showNextButton: NavbarPropTypes.showNextButton,
	onPreviousClick: NavbarPropTypes.onPreviousClick,
	onNextClick: NavbarPropTypes.onNextClick,
	labels: NavbarPropTypes.labels,
	dir: NavbarPropTypes.dir,
	previousMonth: PropTypes.instanceOf(Date),
	months: PropTypes.arrayOf(PropTypes.string),
	onMonthSelect: PropTypes.func,
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	isCompact: PropTypes.bool,
	locale: PropTypes.string,
};

CustomNavbar.defaultProps = {
	isCompact: false,
	dir: 'ltr',
};
