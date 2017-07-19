

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-datepicker.html#datepicker">Datepicker in the XUI Documentation</a></span>
	</div>
</div>

For information about things to take into consideration when using a `Datepicker` within a `Dropdown` component, check the [DropDown documentation](#dropdown).

```
const XUIDatePicker = require('./datepicker').default;
const PropTypes = require('prop-types');

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
    };

		this.onSelectDate = newDate => {
			this.setState({
        selectedDate: newDate,
      });
			console.log(newDate);
			console.log(this.state);
		};
  }

  render() {
    return (
			<XUIDatePicker
				displayedMonth={today}
				onSelectDate={this.onSelectDate}
				isCompact={this.props.isCompact}
				maxDate={this.props.maxDate}
				minDate={this.props.minDate}
				showFixedNumberOfWeeks={this.props.showFixedNumberOfWeeks}
				months={this.props.months}
				weekdaysLong={this.props.weekdaysLong}
				weekdaysShort={this.props.weekdaysShort}
				dir={this.props.dir}
				locale={this.props.locale}
				selectedDate={this.state.selectedDate}
			/>
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

<div className="xui-panel xui-dropdown-large">
	<ExamplePicker />
</div>
```
