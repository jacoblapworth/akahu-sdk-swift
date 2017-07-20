import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import XUIDatePicker from '../XUIDatePicker';
import XUICheckbox from '../../checkbox/XUICheckbox';

function minDate(d1, d2) {
  return d1 < d2 ? d1 : d2;
}

function maxDate(d1, d2) {
  return d1 > d2 ? d1 : d2;
}

const arabic = {
	months: [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
	weekdaysLong: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
	weekdaysShort: [ "ح", "ن", "ث", "ر", "خ", "ج", "س" ],
	dir: 'rtl',
	nextButtonLabel: "التالي",
	prevButtonLabel: "السابق",
	locale: 'ar',
};

const today = new Date();
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);

class ExamplePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null,
      selectRange: false,
    };
  }

  onSelectDate = newDate => {
    if (this.state.selectRange) {
      this.setState(prevState => {
        const { selectedDate } = prevState;
        if (selectedDate && selectedDate.from && !selectedDate.to) {
          return {
            selectedDate: {
              from: minDate(selectedDate.from, newDate),
              to: maxDate(selectedDate.from, newDate),
            },
          };
        }
        return {
          selectedDate: {
            from: newDate,
            to: null,
          },
        };
      });
    } else {
      this.setState({
        selectedDate: newDate,
      });
    }
  }

  toggleRange = () => {
    this.setState(prevState => ({
      selectRange: !prevState.selectRange,
      selectedDate: null,
    }));
  }

  render() {
    const calendarProps = {
      displayedMonth: today,
      onSelectDate: this.onSelectDate,
			isCompact: this.props.isCompact,
			maxDate: this.props.maxDate,
			minDate: this.props.minDate,
			showFixedNumberOfWeeks: this.props.showFixedNumberOfWeeks,
			months: this.props.months,
			weekdaysLong: this.props.weekdaysLong,
			weekdaysShort: this.props.weekdaysShort,
			dir: this.props.dir,
			locale: this.props.locale,
    };
    if (this.state.selectRange) {
      calendarProps.selectedRange = this.state.selectedDate;
    } else {
      calendarProps.selectedDate = this.state.selectedDate;
    }
    return (
      <div>
				<XUICheckbox checked={this.state.selectRange} onChange={this.toggleRange}>
					Select Date Ranges
				</XUICheckbox>
        <XUIDatePicker {...calendarProps} />
      </div>
    );
  }
}

ExamplePicker.propTypes = {
	showFixedNumberOfWeeks: PropTypes.bool,
	isCompact: PropTypes.bool,
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	months: PropTypes.arrayOf(PropTypes.string),
	weekdaysLong: PropTypes.arrayOf(PropTypes.string),
	weekdaysShort: PropTypes.arrayOf(PropTypes.string),
	dir: PropTypes.string,
	nextButtonLabel: PropTypes.string,
	prevButtonLabel: PropTypes.string,
	locale: PropTypes.string,
};

ReactDOM.render(
	<div>
		<section>
			<h3>Plain - minDate = last week</h3>
			<ExamplePicker minDate={lastWeek} />
		</section>
		<section>
			<h3>Panel - maxDate = next month</h3>
			<div className="xui-panel xui-dropdown-large"><ExamplePicker maxDate={nextMonth} /></div>
		</section>
		<section>
			<h3>Compact - fixed weeks && minDate = last week && maxDate = next month</h3>
			<div className="xui-dropdown-large">
			<ExamplePicker isCompact showFixedNumberOfWeeks minDate={lastWeek} maxDate={nextMonth} />
			</div>
		</section>
		<section>
			<h3>Arabic - RTL</h3>
			<div className="xui-panel xui-dropdown-large">
				<ExamplePicker
					months={arabic.months}
					weekdaysLong={arabic.weekdaysLong}
					weekdaysShort={arabic.weekdaysShort}
					nextButtonLabel={arabic.nextButtonLabel}
					prevButtonLabel={arabic.prevButtonLabel}
					dir={arabic.dir}
					locale={arabic.locale}
				/>
			</div>
		</section>
	</div>,
	document.getElementById('app')
);
