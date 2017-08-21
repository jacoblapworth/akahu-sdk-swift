**Note:** This component is still considered beta, and it's API may change before it is officially released.

The `NestedDropDown` component is designed to be a `DropDown` replacement that allows consumers to implement small, multi-step flows inside of a triggered dropdown.  A common case is allowing the user to choose between some convenience dates and a fixed custom date. See below for an example of this.

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

There are a few things to consider when replicating this example, below are the key points:

- **State handling** between two different components such as a `Datepicker` and `Picklist`. Each needs wrapping in the a `DropDownPanel` contained inside a  `NestedDropDown` instead of a `DropDown`. Each panel provides a `panelId` so the currently active panel's ID can be passed to the nested dropdown. This component records in state the currently active panel.

- **When you need a `DropDownHeader` **, such as the Datepicker panel above. Its recommended to tell the user where they are in the workflow. By passing in a `onBackButtonClick` handler, a back button will appear in the header. This provides an easy mechanism for them to go back to the previous step.


- **The `NestedDropdown` is optimized for wrapping Picklists**, similarly to the `DropDown` component. This means some behaviour will have to be either overridden or conditionally disabled through props and API calls.

- By setting **`closeOnSelect` to `false`, it prevents the dropdown from closing after a selection.** In the above example, this is shown when you select a "Custom Date". It conditionally calls `DropDownToggle.closeDropDown` manually inside of the internal `onSelect` callback `selectConvenienceDate`.

- Various keyboard behaviour inside the `DropDownPanel` is implemented depending on the NestedPicklists content. For example, default behaviour in like closing the dropdown when the user hits the tab key. Or restricting the dimensions of the dropdown so that its contents scroll, instead of dropping off the screen are desirable with a list. But for datepickers they aren't, so this behaviour is disabled when the datepicker panel is visible.

- When the **datepicker panel becomes active, the datepicker should be in focus** so you can select a date with the keyboard. This isn't possible until the DOM node is visible, so focus has to be set manually when the panel changes. Like the `onFocusChange` handler we can passed to the `onPanelChange` prop above. It will fire after the panel has already switched. So the components and DOM nodes will be rendered and visible at this point.
