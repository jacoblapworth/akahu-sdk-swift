<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-datepicker.html#datepicker">Datepicker in the XUI Documentation</a></span>
	</div>
</div>

For information about what to consider when using a `Datepicker` within a `Dropdown` component, check the [DropDown documentation](#dropdown).

**Note:** This component is a wrapper around the [OSS component, `react-day-picker`](http://react-day-picker.js.org/)

## Examples

### Standard

To get a standard Datepicker running you should record the selected date in state by using the required onSelectDate callback. This prop will pass in the new selected date that can be recorded in state.

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

Allows you to select between one date and another. Simply set the `selectRange` prop to true and store the selected range in state for the `selectRange` prop.

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
			 selectedDate: null,
		 };

		 this.onSelectDate = this.onSelectDate.bind(this);
	 }

	 onSelectDate(newDate){
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
	}

	 render() {
		 return (
			<XUIDatePicker
				onSelectDate={this.onSelectDate}
				selectedRange={this.state.selectedDate}
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

Setting disabled date ranges requires a callback on the `isDateDisabled` prop. It should determine if the date selected is within a allowable range. Below is an example of disabled dates a week either side of today's date.

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

This view will slim down some of the padding to allow for a smaller view when needed.

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

	<div className="xui-panel xui-dropdown-large">
		<CompactPicker />
	</div>
```
### Fixed Number of Weeks

To keep consistency of height, you can set the prop `showFixedNumberOfWeeks` to true. this will always display 6 week rows no matter how many are in the displayed month.

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
