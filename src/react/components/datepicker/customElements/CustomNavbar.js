import React, { PureComponent } from 'react';
import { DateUtils } from 'react-day-picker';
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
const isArrowKey = keyCode => keyCode >= 37 && keyCode <= 40;

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
		const { previousMonth } = this.props;
		const year = this.yearSelect == null
			? DateUtils.addMonths(previousMonth, 1).getFullYear()
			: this.yearSelect.value;

		this.onDateChange(new Date(year, event.target.value, 1));
	}

	onMonthSelectKeyDown = event => {
		const { previousMonth } = this.props;
		const keyCode = event.keyCode == null ? event.which : event.keyCode;
		if (isArrowKey(keyCode)) {
			event.stopPropagation(); // Prevent react-day-picker from doing anything
			const { dir } = this.props;
			const previousMonthKey = dir === 'rtl' ? 39 : 37;
			const nextMonthKey = dir === 'rtl' ? 37 : 39;
			switch (keyCode) {
			case previousMonthKey: {
				this.onDateChange(previousMonth);
				break;
			}
			case nextMonthKey: {
				const nextMonth = DateUtils.addMonths(previousMonth, 2);
				this.onDateChange(nextMonth);
				break;
			}
			default:
				break;
			}
		}
	}

	onYearChange = event => {
		const { previousMonth } = this.props;
		const month = this.monthSelect == null
			? DateUtils.addMonths(previousMonth, 1).getMonth()
			: this.monthSelect.value;

		this.onDateChange(new Date(event.target.value, month, 1));
	}

	onYearSelectKeyDown = event => {
		const { previousMonth } = this.props;
		const keyCode = event.keyCode == null ? event.which : event.keyCode;
		if (isArrowKey(keyCode)) {
			event.stopPropagation(); // Prevent react-day-picker from doing anything
			const { dir } = this.props;
			const previousYearKey = dir === 'rtl' ? 39 : 37;
			const nextYearKey = dir === 'rtl' ? 37 : 39;
			switch (keyCode) {
			case previousYearKey: { // Left => previous year
				const lastYear = DateUtils.addMonths(previousMonth, -11);
				this.onDateChange(lastYear);
				break;
			}
			case nextYearKey: { // Right => next year
				const nextYear = DateUtils.addMonths(previousMonth, 13);
				this.onDateChange(nextYear);
				break;
			}
			default:
				break;
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
			qaHook,
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
					// Can't just pass a function because DayPicker expects a function callback arg
					onClick={() => previousClickHandler()}
					aria-label={labels.previousMonth}
					qaHook={qaHook && `${qaHook}--previous-month-button`}
				>
					<XUIIcon icon={arrow} rotation="90" isBoxed />
				</XUIButton>

				<div className="xui-datepicker--heading-dates">
					{dir === 'rtl' ? yearSelector : monthSelector}
					{dir === 'rtl' ? monthSelector : yearSelector}
				</div>

				<XUIButton
					variant={navButtonVariant}
					isDisabled={!showNextButton}
					className={classNames.navButtonNext}
					// Can't just pass a function because DayPicker expects a function callback arg
					onClick={() => nextClickHandler()}
					aria-label={labels.nextMonth}
					qaHook={qaHook && `${qaHook}--next-month-button`}
				>
					<XUIIcon icon={arrow} rotation="270" isBoxed />
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
