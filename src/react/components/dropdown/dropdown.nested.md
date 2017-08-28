**Note:** This component is still considered beta, and it's API may change before it is officially released.

`NestedDropDown` is designed as a `DropDown` replacement that allows consumers to implement small, multi-step flows inside of a triggered dropdown.  A quick example would be allowing the user to choose between some convenience dates and a fixed custom date like below.

```
require('array.prototype.find').shim();
const NestedDropDown = require('./NestedDropDown').default;
const DropDownPanel = require('./DropDownPanel').default;
const DropDownToggled = require('./DropDownToggled').default;
const DropDownFooter = require('./DropDownFooter').default;
const XUIButton = require('../../button').default;
const XUIDatePicker = require('../../datepicker').default;
const Picklist = require('../../picklist').default;
const Pickitem = require('../picklist/Pickitem').default;
const { Component } = require('react');

const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

function getToday() {
	const today = new Date();
	today.setUTCHours(0);
	today.setUTCMinutes(0);
	today.setUTCSeconds(0);
	today.setUTCMilliseconds(0);
	return today;
}

const convenienceDates = [
	{
		id: 'week',
		text: 'Next Week',
		getDate: () => {
			const today = getToday();
			today.setDate(today.getDate() + 7);
			return today;
		}
	},
	{
		id: 'month',
		text: 'Next Month',
		getDate: () => {
			const today = getToday();
			const targetDate = today.getDate();
			today.setMonth(today.getMonth() + 1);
			if (today.getMonth() !== targetDate) {
				today.setDate(targetDate);
				today.setMonth(today.getMonth() - 1);
			}
			return today;
		}
	},
];

class NestedExample extends Component {
	constructor() {
		super();

		this.state = {
			activePanel: 'convenienceDates',
			currentMonth: new Date(),
			selectedConvenienceDate: null,
			selectedDate: null,
		};
		this.datepickerRefFn = c => this.datepicker = c;
		this.ddtRefFn = c => this.ddt = c;

		this.closeDropDown = this.closeDropDown.bind(this);
		this.focusDatePicker = this.focusDatePicker.bind(this);
		this.showConvenienceDates = this.showConvenienceDates.bind(this);
		this.showMonth = this.showMonth.bind(this);
		this.selectConvenienceDate = this.selectConvenienceDate.bind(this);
		this.selectDate = this.selectDate.bind(this);
	}

	closeDropDown() {
		this.ddt.closeDropDown();
	}

	focusDatePicker() {
		if (this.state.activePanel === 'customDate') {
			this.datepicker.focus();
		}
	}

	showConvenienceDates() {
		this.setState({
			activePanel: 'convenienceDates',
		});
	}

	showMonth(date) {
		this.setState({
			currentMonth: date,
		});
	}

	selectConvenienceDate(selectedCd) {
		if (selectedCd === 'custom') {
			this.setState({
				activePanel: 'customDate',
			});
		} else {
			const cd = convenienceDates.find(convenienceDate => convenienceDate.id === selectedCd);
			this.setState({
				selectedConvenienceDate: cd.id,
				selectedDate: cd.getDate(),
			});
			this.closeDropDown();
		}
	}

	selectDate(date) {
		this.setState({
			selectedConvenienceDate: 'custom',
			selectedDate: date,
		});
		this.closeDropDown();
	}

	render() {
		const { activePanel, selectedDate } = this.state;
		let triggerText = 'Select a Date';
		if (selectedDate != null) {
			triggerText = formatDate(selectedDate);
		}

		const trigger = (
			<XUIButton>
				{triggerText} <XUIButtonCaret />
			</XUIButton>
		);

		const dropdownFooter = (
			<DropDownFooter>
				<Picklist>
					<Pickitem
						id="custom"
						key="custom"
						onSelect={() => this.selectConvenienceDate('custom')}
					>
						Custom Date
					</Pickitem>
				</Picklist>
			</DropDownFooter>
		);

		const dropdown = (
			<NestedDropDown currentPanel={activePanel} onPanelChange={this.focusDatePicker} >
				<DropDownPanel panelId="convenienceDates" footer={dropdownFooter}>
					<Picklist>
						{convenienceDates.map(cd => (
							<Pickitem
								key={cd.id}
								id={cd.id}
								value={cd.id}
								isSelected={this.state.selectedConvenienceDate === cd.id}
								onSelect={this.selectConvenienceDate}
							>
								{cd.text}
							</Pickitem>
						))}
					</Picklist>
				</DropDownPanel>
				<DropDownPanel
					panelId="customDate"
					header={(
						<DropDownHeader
							title="Example Title"
							onBackButtonClick={this.showConvenienceDates}
							secondaryButtonContent="Cancel"
							onSecondaryButtonClick={this.closeDropDown}
						/>
					)}
				>
					<XUIDatePicker
						ref={this.datepickerRefFn}
						displayedMonth={this.state.currentMonth}
						selectedDate={this.state.selectedDate}
						onSelectDate={this.selectDate}
					/>
				</DropDownPanel>
			</NestedDropDown>
		);
		const isPicklist = activePanel !== 'customDate';
		return (
			<DropDownToggled
				ref={this.ddtRefFn}
				trigger={trigger}
				dropdown={dropdown}
				closeOnSelect={false}
				onClose={this.showConvenienceDates}
				closeOnTab={isPicklist}
				restrictFocus={isPicklist}
				restrictToViewPort={isPicklist}
			/>
		);
	}
}
<NestedExample />
```

As you can see, this is more involved than the other dropdowns.  This is due to **handling state for switching between two different experiences inside of the same dropdown: A custom Picklist and a DatePicker.**  Each experience is wrapped in a `DropDownPanel` and both panels are wrapped in a `NestedDropDown` instead of a `DropDown`.  Each panel gets a `panelId`, the currently active panel's ID gets passed to the nested dropdown, and the implementing class keeps track of the currently active panel in state.

**Note that the datepicker panel also has a `DropDownHeader`.**  While this isn't required, it's useful for telling the user where they are in the workflow while providing a way to go back a step. The header's back button becomes visible when you pass a callback to `onBackButtonClick` in `DropDownHeader`. In this case, the active panel is just switched back to the picklist panel.

Just like the `DropDown`, **the `NestedDropDown` is also optimised for the `Picklist`s**.  This means some behaviour will have to be either overridden or conditionally disabled through props and API calls.

**Since some items in the `Picklist` will result in the active panel switching**, pass in `closeOnSelect={false}` to prevent the dropdown from closing when the user selects "Custom Date", then manually call the `DropDownToggled.closeDropDown` API inside of the `onSelect` callback when appropriate.

When `Picklist` is shown, default behaviour like closing the dropdown when the user hits the tab key, or restricting the dimensions of the dropdown so that its contents scroll instead of dropping off the screen are desirable. However, these experiences are undesirable when displaying a datepicker. **That's why these behaviours are turned off by default when the datepicker panel is visible.**

Lastly, when the **datepicker panel becomes active, we need to ensure that the datepicker has focus** so that keyboard users can actually select a date.  Since it's not possible set focus onto the DOM node until it's visible, the `focusDatePicker` method is passed to the `NestedDropDown.onPanelChange` callback.  It will fire after the panel has already switched, so the components and DOM nodes will actually be rendered and visible at this point.
