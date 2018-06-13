<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-compounds-collectinginput-datepicker.html">Datepicker in the XUI Documentation</a>
</div>

For information about what to consider when using a `XUIDatePicker` within a `DropDown` component, check the [DropDown documentation](#dropdown).

**Note:** This component is a wrapper around the [OSS component, `react-day-picker`](http://react-day-picker.js.org/)

## Examples

### Standard

To use a standard `XUIDatePicker`, you should use the `onSelectDate` callback to update state in your application. This callback will receive the new selected date as a parameter.

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
   		};
     }

     render() {
       return (
   			<XUIDatePicker
   				onSelectDate={this.onSelectDate}
   				selectedDate={this.state.selectedDate}
   			/>
       );
     }
   }

   <div className="xui-panel xui-dropdown-large">
   	<ExamplePicker />
   </div>
```

### Date Ranges

To enable date range selection, you should set `selectRange` to true, handle the date selection in `onSelectDate`, and pass the selected range to `XUIDatePicker` using the `selectedRange` prop.

```
 const XUIDatePicker = require('./datepicker').default;

 function minDate(d1, d2) {
	 return d1 < d2 ? d1 : d2;
 }

 function maxDate(d1, d2) {
	 return d1 > d2 ? d1 : d2;
 }

 class RangePicker extends React.Component {
	 constructor() {
		 super();

		 this.state = {
			 selectedRange: null,
		 };

		 this.onSelectDate = this.onSelectDate.bind(this);
	 }

	 onSelectDate(newDate){
		this.setState(prevState => {
			const { selectedRange } = prevState;
			if (selectedRange && selectedRange.from && !selectedRange.to) {
				return {
					selectedRange: {
						from: minDate(selectedRange.from, newDate),
						to: maxDate(selectedRange.from, newDate),
					},
				};
			}
			return {
				selectedRange: {
					from: newDate,
					to: null,
				},
			};
		});
	}

	 render() {
		 return (
			<XUIDatePicker
				onSelectDate={this.onSelectDate}
				selectedRange={this.state.selectedRange}
				selectRange
			/>
		 );
	 }
 }

 <div className="xui-panel xui-dropdown-large">
	<RangePicker />
 </div>
 ```

### Disabled Dates

To disable selection of certain dates, pass a callback to `isDateDisabled`. It should take a date as an argument and return true if it's disabled. Below is an example that only allows the selection of dates within a week of today's date.

 ```
	const XUIDatePicker = require('./datepicker').default;
	const PropTypes = require('prop-types');

	const startDisabledDate = new Date();
	startDisabledDate.setDate(startDisabledDate.getDate() - 7);
	const endDisabledDate = new Date();
	endDisabledDate.setDate(endDisabledDate.getDate() + 8);

	const inRange = (d1, d2, targetD) => (targetD < d1 || targetD > d2);

	class DisabledDatePicker extends React.Component {
		constructor() {
			super();

			this.state = {
				selectedDate: null,
			};

		 this.onSelectDate = newDate => {
				this.setState({
					selectedDate: newDate,
				});
			};
		}

		isDateDisabled(day){
			return inRange(startDisabledDate, endDisabledDate, day);
		}

		render() {
			return (
				<XUIDatePicker
					onSelectDate={this.onSelectDate}
					selectedDate={this.state.selectedDate}
					isDateDisabled={this.isDateDisabled}
				/>
			);
		}
	}

	<div className="xui-panel xui-dropdown-large">
		<DisabledDatePicker />
	</div>
```

### Compact

This view slims down some of the padding to allow for a smaller view when needed.

```
	const XUIDatePicker = require('./datepicker').default;

	class CompactPicker extends React.Component {
		constructor() {
			super();

			this.state = {
				selectedDate: null,
			};

		 this.onSelectDate = newDate => {
				this.setState({
					selectedDate: newDate,
				});
			};
		}

		render() {
			return (
				<XUIDatePicker
					onSelectDate={this.onSelectDate}
					selectedDate={this.state.selectedDate}
					isCompact
				/>
			);
		}
	}

	<div className="xui-panel xui-dropdown-medium">
		<CompactPicker />
	</div>
```
### Fixed Number of Weeks

To keep `XUIDatePicker`'s height consistent, you can set `showFixedNumberOfWeeks` to true. This will display 6 week rows no matter how many are in the displayed month.

```
	const XUIDatePicker = require('./datepicker').default;

	class CompactPicker extends React.Component {
		constructor() {
			super();

			this.state = {
				selectedDate: null,
			};

		 this.onSelectDate = newDate => {
				this.setState({
					selectedDate: newDate,
				});
			};
		}

		render() {
			return (
				<XUIDatePicker
					onSelectDate={this.onSelectDate}
					selectedDate={this.state.selectedDate}
					showFixedNumberOfWeeks
				/>
			);
		}
	}

	<div className="xui-panel xui-dropdown-large">
		<CompactPicker />
	</div>
```
