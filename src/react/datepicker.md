<div class="xui-margin-vertical">
	<a href="../section-compounds-collectinginput-datepicker.html" isDocLink>Datepicker in the XUI Documentation</a>
</div>

For information about what to consider when using a `XUIDatePicker` within a `DropDown` component, check the [DropDown documentation](#dropdown).

**Note:** This component is a wrapper around the [OSS component, `react-day-picker`](http://react-day-picker.js.org/)

## Examples

### Standard

To use a standard `XUIDatePicker`, you should use the `onSelectDate` callback to update state in your application. This callback will receive the new selected date as a parameter.

```
	const XUIDatePicker = require('./datepicker').default;

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

   <div className="xui-panel xui-dropdown-medium">
   	<ExamplePicker />
   </div>
```

### Date Ranges

To enable date range selection, handle the date selection events in `onSelectDate`, and pass the selected range to `XUIDatePicker` using the `selectedRange` prop.

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
			/>
		 );
	 }
 }

 <div className="xui-panel xui-dropdown-medium">
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

	<div className="xui-panel xui-dropdown-medium">
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

	<div className="xui-panel xui-dropdown-medium">
		<CompactPicker />
	</div>
```

### Inside a dropdown

When displaying the datepicker inside a dropdown we recommend you display a cancel button inside a dropdown header to enable cancellation of the action. Don't use compact datepicker variant in dropdown sheet, as this results in small touch targets

```
const XUIDatepicker = require('./datepicker').default;
const {
  default: Dropdown,
  DropDownToggled,
} = require('./dropdown');
const { Component } = require ('react');

class DatepickerDropdown extends Component {
  constructor() {
    super();

    this.closeDropDown = this.closeDropDown.bind(this);
  }

   closeDropDown() {
      this.ddt.closeDropDown();
    }

  render() {
    const dropdownHeader = (
      <DropDownHeader
        title="Select date"
        secondaryButtonContent="Cancel"
        onSecondaryButtonClick={this.closeDropDown}
      />
    );

    const trigger = (
      <XUIButton>Select a date</XUIButton>
    );

    const dropdown = (
      <Dropdown header={dropdownHeader}>
        <XUIDatePicker />
      </Dropdown>
    );

    return (
     <DropDownToggled
        ref={c => this.ddt = c}
        dropdown={dropdown}
        trigger={trigger}
     />
    );
  }
}
<DatepickerDropdown />
```
