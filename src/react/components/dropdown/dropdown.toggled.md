By default the Picklist determines the default behaviour of the Dropdown API.

The `DropDown` component is built to provide required functionality by default when used with a Picklist. However, it is very configurable for use with other child components. Below are some examples of common use cases to demonstrate this.

### DropDown with DatePicker

```
const Pickitem = require('../picklist/Pickitem').default;
const XUIDatePicker = require('../../datepicker').default;
const XUIButton = require('../../button').default;

const today = new Date();
const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

class SimpleDropDownDatePicker extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedDate: null,
			currentMonth: new Date(),
		};

		this.onSelectDate = this.onSelectDate.bind(this);
		this.focusDatePicker = this.focusDatePicker.bind(this);
	}

	focusDatePicker() {
		this.datepicker.focus();
	}

	onSelectDate(day) {
		this.setState({
			selectedDate: day,
			currentMonth: day,
		});
		this.ddt.closeDropDown();
	}

  render() {
		const { currentMonth, selectedDate } = this.state;
		const dropdown = (
			<DropDown>
				<XUIDatePicker
					ref={c => this.datepicker = c}
					displayedMonth={currentMonth}
					onSelectDate={this.onSelectDate}
					selectedDate={selectedDate}
				/>
			</DropDown>
		);
		const trigger = (
			<XUIButton>
				{selectedDate == null ? 'Select a date' : formatDate(selectedDate)}
			</XUIButton>
		);
    return (
      <DropDownToggled
				ref={c => this.ddt = c}
				trigger={trigger}
				dropdown={dropdown}
				closeOnTab={false}
				restrictToViewPort={false}
				onOpenAnimationEnd={this.focusDatePicker}
			/>
    );
  }
}
<SimpleDropDownDatePicker />
```
As mentioned, the above example is not using dropdown with its optimised use case so we need to manually handle some interactions. See the key points below for more details.

 - Set the `restrictToViewPort` to `false` on the DropDownToggled component to disable scrolling on the datepicker's panel. Enabled by default for lists, this isn't desirable for a datepicker. Instead it should be the full width and height of the datepicker. This might cause it to hang off the edge of the screen or cover the button but this is preferable to having the scroll inside the dropdown.

- **The `DropDown` component isn't able to focus the datepicker automatically**. It first has to receive focus to handle keyboard events. Using the `onAnimationEnd` prop of `DropDownToggled`, we can call `XUIDatePicker.focus` knowing it's in position and visible, unlike the `onOpen` prop. This method fires immediately after the user opens the dropdown. At this moment we can't be sure the datepicker is completely rendered.

- **Keyboard users need to use the tab key to navigate** to the next/previous month buttons or year buttons. By default the dropdown will close when the user hits the tab key by default. To prevent this, set the `closeOnTab` prop to false on `<DropDownToggled />`.

- **The dropdown must be manually closed when the user has selected a date**. The `XUIDatePicker.onSelectDate` callback will set state and call `DropDownToggled.closeDropDown`.

### DropDown with Text Input Trigger

It is highly recommended that you use the [Autocompleter](#autocompleter) to implement this pattern if it fits your use case. It handles theses customisations by default.

The DropDown handles keyboard events for you because focus is placed on the DropDown's DOM node. This may not be desirable for all situations. One common scenario is when the trigger is a text input, the user wants to type in the text box. For this, keyboard events should be disabled and manually handled in the component.

```
require('array.prototype.find').shim();
const debounce = require('lodash.debounce');
const { Component } = require('react');
const { boldMatch, decorateSubStr, EmptyState } = require('../../autocompleter');
const Pickitem = require('../picklist/Pickitem').default;

const items = [ 'Apricot', 'Banana', 'Cherry', 'Dragon Fruit', 'Eggplant', 'Fennel', 'Grape Fruit', 'Honeydew', 'Iceberg Lettuce', 'Jakefruit', 'Kiwi Fruit', 'Lime','Mango', 'Nectarine', 'Orange', 'Pineapple', 'Quince', 'Rapberry', 'Starfruit', 'Tmato', 'Ugl Fruit', 'ValenciaOrange', 'Watermelon', 'Xigua','Yellow quash', 'Zuchini'].map((text, id) => {
	return { id, text };
});

class InputTriggerExample extends Component {
	constructor() {
		super();

		this.state = {
			inputValue: '',
			selectedId: null,
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onInputChange(event) {
		this.setState({
			inputValue: event.target.value,
		});
	}

	onInputKeyDown(event) {
		if (this.ddt.isDropDownOpen() && this.dropdown != null) {
			this.dropdown.onKeyDown(event);
		} else {
			this.ddt.openDropDown();
		}
	}

	onSelect(value) {
		this.setState({
			inputValue: items.find(item => item.id === value).text,
			selectedId: value,
		});
	}

	render() {
		const { selectedId, inputValue } = this.state;
		const trigger = (
			<XUIInput
				inputAttributes={{
					placeholder: 'Type Here',
					value: inputValue,
					onInput: this.onInputChange,
					onKeyDown: this.onInputKeyDown,
				}}
			/>
		);

		let visibleItems;
		if (inputValue === '' || (selectedId != null && items[selectedId].text === inputValue)) {
			visibleItems = items;
		} else {
			const matcher = new RegExp(inputValue, 'i');
			visibleItems = items.filter(item => matcher.test(item.text));
		}
		let pickItems;
		if (visibleItems.length === 0) {
			pickItems = <EmptyState id="noItems">No Fruit Found</EmptyState>;
		} else {
			pickItems = visibleItems.map(item => (
				<Pickitem
					key={item.id}
					id={item.id}
					value={item.id}
					isSelected={selectedId === item.id}
				>
					<span>{decorateSubStr(item.text, inputValue, boldMatch)}</span>
				</Pickitem>
			));
		}

		const dropdown = (
			<DropDown
				ref={c => this.dropdown = c}
				hasKeyboardEvents={false}
				restrictFocus={false}
				onSelect={this.onSelect}
			>
				<Picklist>
					{pickItems}
				</Picklist>
			</DropDown>
		);

		return (
			<DropDownToggled
				ref={c => this.ddt = c}
				trigger={trigger}
				dropdown={dropdown}
				triggerClickAction="none"
			/>
		);
	}
}

<InputTriggerExample />
```

The above example illustrates how to use several props to achieve your desired UX. We'll cover these in more detail below.

- **`DropDownToggled.triggerClickAction` determines what happens when the user clicks on the trigger.**  By default, we toggle the dropdown's open state. You can turn this off with "none" or use "open" to always open.

- **For the focus to remain on the trigger when the dropdown is open**. Set the `DropDown.hasKeyboardEvents` and `DropDown.restrictFocus` props to `false` to ensure focus doesn't shift to the dropdown.

- The combination of setting those props means the **dropdown no longer automatically open**. To handle this, call the `DropDownToggled.openDropDown` method to open it. The example above does it on any keypress inside the input, but this is not required, the dropdown can open at any time.

- This combination also means **the arrow keys, escape key, etc no longer allow the user to navigate the dropdown**.
The public API `DropDown.onKeyDown` takes the keydown event, enabling all the normal keyboard handlers. You do not need to move focus from the trigger node to do this. Calling this public API method is comparable to simulating a keydown event on the dropdown. It provides the same behaviour as if the keydown did happen on the dropdown.
